/* ==========================================================
   本地一体化开发服务：静态站点 + /api/chat（与 Cloudflare 完全同一套逻辑）
   运行：npm run dev      然后打开 http://127.0.0.1:8788/
   密钥读取顺序：环境变量 GLM_API_KEY > .dev.vars > .env
   ========================================================== */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { handleApi } from "../functions/_lib/handler.js";
import { readSecret } from "./read-dev-vars.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.env.PORT || 8788);
const HOST = process.env.HOST || "127.0.0.1";

const env = {
  GLM_API_KEY: readSecret("GLM_API_KEY", ROOT),
  GLM_API_URL: process.env.GLM_API_URL || "https://open.bigmodel.cn/api/paas/v4/chat/completions",
  GLM_EMBEDDING_URL: process.env.GLM_EMBEDDING_URL || "https://open.bigmodel.cn/api/paas/v4/embeddings",
  GLM_MODEL: process.env.GLM_MODEL || "glm-4-flash",
  GLM_EMBEDDING_MODEL: process.env.GLM_EMBEDDING_MODEL || "embedding-3",
  GLM_EMBEDDINGS: process.env.GLM_EMBEDDINGS || "0"
};

const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".gif": "image/gif", ".webp": "image/webp", ".ico": "image/x-icon"
};

function serveStatic(req, res, pathname) {
  let rel = decodeURIComponent(pathname);
  if (rel === "/" || rel === "/index.html") {
    res.writeHead(302, { Location: "/html/index.html" });
    res.end();
    return;
  }
  const file = path.resolve(ROOT, "." + rel);
  if (!file.startsWith(ROOT + path.sep)) { res.writeHead(403); res.end("Forbidden"); return; }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404); res.end("Not found"); return; }
    res.writeHead(200, {
      "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    fs.createReadStream(file).pipe(res);
  });
}

async function serveApi(req, res) {
  const parts = [];
  for await (const c of req) parts.push(c);
  const body = Buffer.concat(parts);
  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (typeof v === "string") headers.set(k, v);
    else if (Array.isArray(v)) headers.set(k, v.join(", "));
  }
  headers.set("X-Forwarded-For", req.socket.remoteAddress || "127.0.0.1");
  const url = "http://" + (req.headers.host || HOST + ":" + PORT) + req.url;
  const request = new Request(url, {
    method: req.method,
    headers,
    body: req.method === "GET" || req.method === "HEAD" ? undefined : body
  });
  try {
    const out = await handleApi(request, env);
    out.headers.forEach((v, k) => res.setHeader(k, v));
    res.writeHead(out.status);
    res.end(Buffer.from(await out.arrayBuffer()));
  } catch (e) {
    console.error("[dev] /api/chat 处理失败", e);
    res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: "本地服务处理失败" }));
  }
}

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url || "/", "http://localhost").pathname;
  if (pathname === "/api/chat") { serveApi(req, res); return; }
  if (req.method !== "GET" && req.method !== "HEAD") { res.writeHead(405); res.end(); return; }
  serveStatic(req, res, pathname);
});

server.listen(PORT, HOST, () => {
  console.log("星城风物志本地服务：http://" + HOST + ":" + PORT + "/");
  console.log("AI 接口：http://" + HOST + ":" + PORT + "/api/chat");
  console.log("模型：" + env.GLM_MODEL + " · 密钥：" + (env.GLM_API_KEY ? "已读取" : "未配置（将返回 503）"));
});
