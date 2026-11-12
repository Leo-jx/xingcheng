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

/* 根路径 / 直接返回真正的首页，不再显示 meta refresh 等待页。
   页面里用的是 ../css、../js、../images 和同目录 xxx.html 链接，
   在根路径下 "../" 会被浏览器规范化为根，所有相对路径仍然有效。
   dist/html/ 保留一份，供知识库来源链接 /html/xxx.html 继续访问。 */
for (const file of fs.readdirSync(path.join(ROOT, "html"))) {
  if (!file.endsWith(".html")) continue;
  fs.copyFileSync(path.join(ROOT, "html", file), path.join(OUT, file));
}

fs.writeFileSync(path.join(OUT, "_headers"),
  "/*\n" +
  "  X-Content-Type-Options: nosniff\n" +
  "  Referrer-Policy: strict-origin-when-cross-origin\n" +
  "  Permissions-Policy: camera=(), microphone=(), geolocation=()\n" +
  "/api/*\n" +
  "  Cache-Control: no-store\n", "utf8");

const count = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "kb.json"), "utf8")).count;
console.log(`[build] dist/ 已生成（网页知识库 ${count} 条分片）`);
