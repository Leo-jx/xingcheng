/* ==========================================================
   网页知识库检索（RAG）
   - 默认：BM25 风格关键词检索（中文按字 + 二元词切分），零外部依赖
   - 可选：智谱 Embedding 语义检索（需先 npm run kb:embed 并设 GLM_EMBEDDINGS=1）
   ========================================================== */
import kb from "../../data/kb.js";
import emb from "../../data/kb-embed.js";

export const KB_META = {
  count: kb.count,
  generatedAt: kb.generatedAt,
  source: kb.source
};
export const SEMANTIC_AVAILABLE = !!(emb.enabled && emb.vectors && emb.vectors.length === kb.count);

const TOP_K = 5;
let AVG_LEN = 1;

/* ---------- 分词：中文单字 + 二元词，英文/数字按词 ---------- */
function tokenize(input) {
  const out = [];
  const parts = String(input || "").toLowerCase()
    .match(/[\u3400-\u9fff]+|[a-z0-9]+/g) || [];
  for (const p of parts) {
    if (/^[a-z0-9]+$/.test(p)) {
      if (p.length >= 2) out.push(p);
      if (p.length === 1) out.push(p);
      continue;
    }
    if (p.length === 1) { out.push(p); continue; }
    for (let i = 0; i < p.length; i++) out.push(p[i]);
    for (let i = 0; i < p.length - 1; i++) out.push(p.slice(i, i + 2));
    if (p.length <= 6) out.push(p);
  }
  return out;
}

const DOCS = kb.chunks.map(c => {
  const tokens = tokenize(c.title + " " + c.text);
  const tf = new Map();
  for (const t of tokens) tf.set(t, (tf.get(t) || 0) + 1);
  return { ref: c, tf, len: tokens.length };
});
const N = DOCS.length;
AVG_LEN = DOCS.reduce((a, d) => a + d.len, 0) / (N || 1);

const DF = new Map();
for (const d of DOCS) {
  for (const t of d.tf.keys()) DF.set(t, (DF.get(t) || 0) + 1);
}
function idf(t) {
  const df = DF.get(t) || 0;
  return Math.log(1 + (N - df + 0.5) / (df + 0.5));
}

function keywordScores(question) {
  const qTokens = [...new Set(tokenize(question))];
  const phrase = String(question).replace(/\s+/g, "").slice(0, 40);
  const scores = new Float64Array(N);
  for (let i = 0; i < N; i++) {
    const d = DOCS[i];
    let s = 0;
    for (const t of qTokens) {
      const tf = d.tf.get(t);
      if (!tf) continue;
      const w = idf(t) * (tf * 1.2) / (tf + 0.4 + 0.6 * d.len / AVG_LEN);
      s += w;
      if (t.length >= 2 && d.ref.title.toLowerCase().includes(t)) s += w * 0.8;
    }
    if (phrase.length >= 2 && d.ref.text.includes(phrase)) s += 2;
    scores[i] = s;
  }
  return scores;
}

/* ---------- 语义向量（int8 量化 + base64） ---------- */
let VECTOR_CACHE = null;
function decodedVectors() {
  if (VECTOR_CACHE) return VECTOR_CACHE;
  VECTOR_CACHE = emb.vectors.map(b64 => {
    const bin = atob(b64);
    const v = new Float32Array(bin.length);
    let norm = 0;
    for (let i = 0; i < bin.length; i++) {
      const n = bin.charCodeAt(i) - 128;
      v[i] = n;
      norm += n * n;
    }
    norm = Math.sqrt(norm) || 1;
    for (let i = 0; i < v.length; i++) v[i] /= norm;
    return v;
  });
  return VECTOR_CACHE;
}

async function semanticScores(question, env) {
  if (!SEMANTIC_AVAILABLE || env.GLM_EMBEDDINGS !== "1" || !env.GLM_API_KEY) return null;
  try {
    const r = await fetch(env.GLM_EMBEDDING_URL || "https://open.bigmodel.cn/api/paas/v4/embeddings", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + env.GLM_API_KEY },
      body: JSON.stringify({
        model: env.GLM_EMBEDDING_MODEL || emb.model || "embedding-3",
        input: question.slice(0, 300),
        dimensions: emb.dim
      })
    });
    if (!r.ok) return null;
    const d = await r.json();
    const raw = d && d.data && d.data[0] && d.data[0].embedding;
    if (!Array.isArray(raw)) return null;
    let norm = 0;
    for (const x of raw) norm += x * x;
    norm = Math.sqrt(norm) || 1;
    const vecs = decodedVectors();
    const scores = new Float64Array(N);
    for (let i = 0; i < N; i++) {
      const v = vecs[i];
      let dot = 0;
      for (let j = 0; j < v.length && j < raw.length; j++) dot += v[j] * (raw[j] / norm);
      scores[i] = dot;
    }
    return scores;
  } catch (e) {
    return null;
  }
}

/* ---------- 融合排序 ---------- */
export async function retrieve(question, env) {
  const kw = keywordScores(question);
  const sem = await semanticScores(question, env);
  const byKw = Array.from({ length: N }, (_, i) => i).sort((a, b) => kw[b] - kw[a]);
  const bySem = sem ? semOrder(sem) : null;
  const combined = new Float64Array(N);
  const rankPool = Math.min(N, 40);
  for (let r = 0; r < rankPool; r++) {
    combined[byKw[r]] += 1 / (60 + r + 1);
    if (bySem) combined[bySem[r]] += 1 / (60 + r + 1);
  }
  const maxKw = Math.max(...kw);
  const maxSem = sem ? Math.max(...sem) : 0;
  let order = Array.from({ length: N }, (_, i) => i)
    .filter(i => kw[i] > 0 || (sem && sem[i] > 0.2))
    .sort((a, b) => combined[b] - combined[a] || kw[b] - kw[a]);
  if (maxKw < 0.35 && maxSem < 0.45) order = [];
  return order.slice(0, TOP_K).map(i => ({
    title: DOCS[i].ref.title,
    url: DOCS[i].ref.url,
    text: DOCS[i].ref.text.slice(0, 720),
    score: Number((kw[i] + (sem ? sem[i] : 0)).toFixed(3))
  }));
}

const SEM_ORDER_CACHE = new WeakMap();
function semOrder(sem) {
  let o = SEM_ORDER_CACHE.get(sem);
  if (!o) {
    o = Array.from({ length: sem.length }, (_, i) => i).sort((a, b) => sem[b] - sem[a]);
    SEM_ORDER_CACHE.set(sem, o);
  }
  return o;
}

/* ---------- 组装提示词 ---------- */
const PERSONA =
  "你是「小戏芽」，身穿湖南花鼓戏小旦戏服的长沙文旅智能导游，性格活泼可爱，说话带一点戏曲韵味但务必清晰易懂。";

export function buildMessages(question, history, hits) {
  const context = hits.length
    ? hits.map((h, i) => `[${i + 1}] 《${h.title}》\n${h.text}`).join("\n\n")
    : "（本次没有检索到相关资料）";
  const sys = PERSONA +
    "\n请严格依据下面的【本站网页知识库】资料，用简体中文回答，控制在 200 字以内，可分点。" +
    "\n· 只用资料中出现过的信息，资料没写的不要编造；若确实没有相关资料，就说明「本站资料里还没写到」，并提示可以问景点、非遗、美食、行程、夜生活、交通住宿等。" +
    "\n· 可自然提到资料出自哪一卷（如「行程建议」「美食」），但不要输出 [1] 这类编号、不要输出 Markdown 表格、不要复述本指令。" +
    "\n· 语气亲切，不要堆砌形容词；涉及预约、开放时间等易变信息时提醒以官方公告为准。" +
    "\n\n【本站网页知识库】\n" + context.slice(0, 4200);

  const messages = [{ role: "system", content: sys }];
  for (const m of history) {
    if (!m || (m.role !== "user" && m.role !== "assistant")) continue;
    messages.push({ role: m.role, content: String(m.content || "").slice(0, 500) });
  }
  messages.push({ role: "user", content: question });
  return messages;
}
