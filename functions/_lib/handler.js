/* ==========================================================
   /api/chat 统一处理器（Cloudflare Pages Functions 与本地开发服务共用）
   API Key 只保存在服务端环境变量 / Cloudflare Secret 中，绝不下发到浏览器。
   ========================================================== */
import { retrieve, buildMessages, KB_META, SEMANTIC_AVAILABLE } from "./rag.js";

const DEFAULT_API_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
const DEFAULT_MODEL = "glm-4-flash";
const RATE_WINDOW = 60 * 1000;
const RATE_MAX = 12;
const hits = new Map();

const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
  "X-Content-Type-Options": "nosniff"
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: HEADERS });
}
function clientIp(request) {
  return request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For") ||
    "local";
}
function allow(ip) {
  const now = Date.now();
  if (hits.size > 2000) {
    for (const [k, v] of hits) if (now - v.start > RATE_WINDOW) hits.delete(k);
  }
  const rec = hits.get(ip);
  if (!rec || now - rec.start > RATE_WINDOW) {
    hits.set(ip, { start: now, count: 1 });
    return true;
  }
  rec.count += 1;
  return rec.count <= RATE_MAX;
}
function health(env) {
  return {
    ok: true,
    service: "小戏芽 · 星城 AI 导游",
    model: env.GLM_MODEL || DEFAULT_MODEL,
    provider: "智谱 BigModel",
    knowledgeBase: KB_META.source,
    chunks: KB_META.count,
    generatedAt: KB_META.generatedAt,
    retrieval: SEMANTIC_AVAILABLE && env.GLM_EMBEDDINGS === "1"
      ? "关键词 + 语义向量" : "关键词 (BM25)",
    configured: !!env.GLM_API_KEY
  };
}
function friendlyError(status, raw) {
  if (status === 401 || status === 403) return "服务端 AI 密钥无效或已过期，请联系站点管理员。";
  if (status === 429) return "模型请求太频繁啦，歇一小会儿再问我～";
  if (status >= 500) return "模型服务暂时打盹了，请稍后再试。";
  return "模型接口返回异常：" + String(raw || "").slice(0, 120);
}

export async function handleApi(request, env) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: HEADERS });

  if (request.method === "GET") return json(health(env));
  if (request.method !== "POST") return json({ error: "仅支持 GET / POST" }, 405);

  if (!allow(clientIp(request))) return json({ error: "问得太快啦，稍等一分钟再问吧～" }, 429);
  if (!env.GLM_API_KEY) return json({ error: "服务端尚未配置 GLM_API_KEY" }, 503);

  let body;
  try { body = await request.json(); } catch (e) { return json({ error: "请求格式不正确" }, 400); }
  const question = typeof body.question === "string" ? body.question.trim().slice(0, 300) : "";
  if (!question) return json({ error: "请先输入问题" }, 400);
  const history = (Array.isArray(body.history) ? body.history : [])
    .slice(-6)
    .map(m => ({
      role: m && m.role === "assistant" ? "assistant" : "user",
      content: String((m && m.content) || "").slice(0, 500)
    }))
    .filter(m => m.content.trim());

  let sources = [];
  try {
    sources = await retrieve(question, env);
  } catch (e) {
    console.error("[rag] 检索失败", e);
  }
  const messages = buildMessages(question, history, sources);

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 20000);
  try {
    const r = await fetch(env.GLM_API_URL || DEFAULT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + env.GLM_API_KEY
      },
      body: JSON.stringify({
        model: env.GLM_MODEL || DEFAULT_MODEL,
        messages,
        temperature: 0.6,
        top_p: 0.9,
        max_tokens: 400,
        stream: false
      }),
      signal: ctrl.signal
    });
    const raw = await r.text();
    if (!r.ok) {
      console.error("[glm] HTTP " + r.status + " " + raw.slice(0, 300));
      return json({ error: friendlyError(r.status, raw) }, 502);
    }
    let d;
    try { d = JSON.parse(raw); } catch (e) { throw new Error("响应不是 JSON"); }
    let answer = d && d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content;
    if (Array.isArray(answer)) answer = answer.map(x => x.text || "").join("");
    answer = String(answer || "").trim();
    if (!answer) throw new Error("模型返回空内容");

    return json({ answer, model: env.GLM_MODEL || DEFAULT_MODEL });
  } catch (e) {
    console.error("[glm] 调用失败", e && e.message);
    return json({ error: "小戏芽暂时连不上模型，请稍后再试～" }, 502);
  } finally {
    clearTimeout(timer);
  }
}
