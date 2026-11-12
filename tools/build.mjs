/* ==========================================================
   生成 Cloudflare Pages 静态产物 dist/（零依赖、零打包）
   运行：npm run build
   ========================================================== */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "dist");

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

/* 手写递归复制：部分 Windows + Node 24 环境下 fs.cpSync 会异常退出 */
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else if (entry.isFile()) fs.copyFileSync(from, to);
  }
}
for (const dir of ["html", "css", "js", "images", "data"]) {
  const src = path.join(ROOT, dir);
  if (fs.existsSync(src)) copyDir(src, path.join(OUT, dir));
}

fs.writeFileSync(path.join(OUT, "index.html"),
  '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">' +
  '<meta http-equiv="refresh" content="0;url=/html/">' +
  '<title>星城风物志</title></head><body>' +
  '<p>正在入城…… <a href="/html/">进入星城风物志</a></p>' +
  '</body></html>', "utf8");

fs.writeFileSync(path.join(OUT, "_headers"),
  "/*\n" +
  "  X-Content-Type-Options: nosniff\n" +
  "  Referrer-Policy: strict-origin-when-cross-origin\n" +
  "  Permissions-Policy: camera=(), microphone=(), geolocation=()\n" +
  "/api/*\n" +
  "  Cache-Control: no-store\n", "utf8");

const count = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "kb.json"), "utf8")).count;
console.log(`[build] dist/ 已生成（网页知识库 ${count} 条分片）`);
