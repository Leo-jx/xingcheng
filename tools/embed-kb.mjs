/* ==========================================================
   可选：用智谱 Embedding 为知识库分片生成语义向量
   运行：npm run kb:embed
   说明：智谱 embedding-3 属于计费资源；若账号无余额（错误码 1113），
        脚本会保留原有文件并自动退回「关键词检索」模式，站点功能不受影响。
   ========================================================== */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readSecret } from "./read-dev-vars.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA = path.join(ROOT, "data");
const KB_FILE = path.join(DATA, "kb.json");
const OUT_FILE = path.join(DATA, "kb-embed.js");

const KEY = readSecret("GLM_API_KEY", ROOT);
const URL = process.env.GLM_EMBEDDING_URL || "https://open.bigmodel.cn/api/paas/v4/embeddings";
const MODEL = process.env.GLM_EMBEDDING_MODEL || "embedding-3";
const DIM = Number(process.env.GLM_EMBEDDING_DIM || 512);
const BATCH = 8;

function writeDisabled(note) {
  if (!fs.existsSync(OUT_FILE)) {
    fs.writeFileSync(OUT_FILE,
      "/* 自动生成；启用语义检索请运行 npm run kb:embed */\n" +
      "export default " + JSON.stringify({ enabled: false, note, vectors: [] }) + ";\n",
      "utf8");
  }
  console.log("[embed] " + note);
  console.log("[embed] 当前使用关键词检索（BM25），功能完整可用。");
}

function quantize(vec) {
  let max = 0;
  for (const v of vec) max = Math.max(max, Math.abs(v));
  const scale = max || 1;
  const bytes = new Uint8Array(vec.length);
  for (let i = 0; i < vec.length; i++) {
    const q = Math.max(-127, Math.min(127, Math.round((vec[i] / scale) * 127)));
    bytes[i] = q + 128;
  }
  return { data: Buffer.from(bytes).toString("base64"), scale };
}

async function embedBatch(texts, useDim) {
  const body = { model: MODEL, input: texts };
  if (useDim) body.dimensions = DIM;
  const r = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + KEY },
    body: JSON.stringify(body)
  });
  const raw = await r.text();
  if (!r.ok) {
    let msg = raw.slice(0, 200);
    try { msg = JSON.parse(raw).error?.message || msg; } catch (e) { /* ignore */ }
    throw new Error("HTTP " + r.status + " " + msg);
  }
  const d = JSON.parse(raw);
  const list = [...(d.data || [])].sort((a, b) => (a.index || 0) - (b.index || 0));
  if (list.length !== texts.length) throw new Error("返回的向量数量与输入不一致");
  return list.map(x => x.embedding);
}

async function main() {
  if (!fs.existsSync(KB_FILE)) {
    console.error("[embed] 请先运行 npm run kb 生成知识库"); process.exit(1);
  }
  if (!KEY) { writeDisabled("未找到 GLM_API_KEY，跳过向量化。"); return; }

  const kb = JSON.parse(fs.readFileSync(KB_FILE, "utf8"));
  const texts = kb.chunks.map(c => (c.title + "：" + c.text).slice(0, 1000));
  const vectors = [];
  let dim = 0;
  let useDim = DIM > 0;

  for (let i = 0; i < texts.length; i += BATCH) {
    let batch;
    try {
      batch = await embedBatch(texts.slice(i, i + BATCH), useDim);
    } catch (e) {
      if (useDim && /dimensions|参数|400/i.test(String(e.message))) {
        useDim = false;
        batch = await embedBatch(texts.slice(i, i + BATCH), false);
      } else { throw e; }
    }
    for (const v of batch) {
      if (!dim) dim = v.length;
      const q = quantize(v);
      vectors.push(q.data);
    }
    if ((i / BATCH) % 5 === 0) console.log(`[embed] ${Math.min(i + BATCH, texts.length)}/${texts.length}`);
    await new Promise(r => setTimeout(r, 220));
  }

  const out = { enabled: true, model: MODEL, dim, count: vectors.length, vectors };
  fs.writeFileSync(OUT_FILE,
    "/* 自动生成，请勿手改；重新生成：npm run kb:embed */\nexport default " +
    JSON.stringify(out) + ";\n", "utf8");
  console.log(`[embed] 完成：${vectors.length} 条向量，维度 ${dim}，模型 ${MODEL}`);
  console.log("[embed] 在 Cloudflare 设置 GLM_EMBEDDINGS=1 即可启用语义检索。");
}

main().catch(e => {
  const m = String(e && e.message || e);
  if (/1113|余额不足|无可用资源包/.test(m)) {
    writeDisabled("智谱 Embedding 资源包不可用（余额不足），已跳过向量化。");
  } else {
    console.error("[embed] 向量化失败：" + m);
    writeDisabled("向量化未完成，已保留原有配置。");
  }
});
