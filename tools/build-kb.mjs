/* ==========================================================
   从全站网页内容生成 AI 知识库
   来源：html/*.html 正文 + js/script.js 结构化数据 + js/ip.js 内置问答
   输出：data/kb.js（供 Cloudflare Functions / 本地服务 import）
        data/kb.json（便于人工查看，也会被复制到站点供前端调试）
   运行：npm run kb
   ========================================================== */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HTML_DIR = path.join(ROOT, "html");
const DATA_DIR = path.join(ROOT, "data");
const CHUNK_SIZE = 620;
const CHUNK_OVERLAP = 80;

const chunks = [];
function addChunk(title, url, text, kind) {
  const clean = String(text || "")
    .replace(/[ \t\u00a0]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
  if (clean.length < 18) return;
  chunks.push({
    id: "c" + String(chunks.length).padStart(4, "0"),
    title: String(title || "星城风物志").slice(0, 80),
    url,
    kind,
    text: clean.slice(0, 1400)
  });
}

/* ---------- HTML 清洗 ---------- */
const ENTITIES = {
  nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", middot: "·",
  hellip: "…", mdash: "—", ndash: "–", ldquo: "“", rdquo: "”",
  lsquo: "‘", rsquo: "’", times: "×", copy: "©", trade: "™"
};
function decodeEntities(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, c) => {
    if (c[0] === "#") {
      const n = c[1] === "x" || c[1] === "X"
        ? parseInt(c.slice(2), 16) : parseInt(c.slice(1), 10);
      return Number.isFinite(n) && n > 0 && n < 0x110000 ? String.fromCodePoint(n) : m;
    }
    return ENTITIES[c.toLowerCase()] ?? m;
  });
}
function stripNonText(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ");
}
function splitLong(line) {
  if (line.length <= 900) return [line];
  const out = [];
  for (let i = 0; i < line.length; i += 700) out.push(line.slice(i, i + 700));
  return out;
}
function htmlToChunks(file) {
  const raw = fs.readFileSync(path.join(HTML_DIR, file), "utf8");
  const titleMatch = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(raw);
  const pageTitle = (titleMatch ? titleMatch[1] : file)
    .replace(/\s*[·|]\s*长沙.*$/, "").trim() || file;
  const main = /<main\b[^>]*>([\s\S]*?)<\/main>/i.exec(raw);
  if (!main) return;

  let s = stripNonText(main[1]);
  s = s.replace(/<section\b([^>]*)>/gi, (_m, attrs) => {
    const id = /id\s*=\s*["']([^"']+)["']/i.exec(attrs);
    return "\n@@SEC:" + (id ? id[1] : "") + "@@\n";
  });
  s = s.replace(/<h[1-4]\b[^>]*>/gi, "\n@@H@@\n");
  s = s.replace(/<\/h[1-4]>/gi, "\n@@/H@@\n");
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<\/(p|div|li|tr|section|article|blockquote|ul|ol|table|figcaption|button|dd|dt|nav|header|footer)>/gi, "\n");
  s = s.replace(/<[^>]*>/g, " ");
  s = decodeEntities(s).replace(/\r/g, "");

  let sectionId = "";
  let heading = pageTitle;
  let buffer = [];
  let capturing = false;
  let captured = "";

  const emit = (text) => {
    const url = "/html/" + file + (sectionId ? "#" + sectionId : "");
    addChunk(heading, url, text, "page");
  };
  const flush = () => {
    const text = buffer.join("\n").trim();
    buffer = [];
    if (text.length < 25) return;
    const lines = text.split("\n").flatMap(splitLong);
    let cur = "";
    for (const line of lines) {
      const p = line.trim();
      if (!p) continue;
      if (cur && (cur.length + p.length + 1) > CHUNK_SIZE) {
        emit(cur);
        cur = cur.slice(-CHUNK_OVERLAP) + "\n" + p;
      } else {
        cur += (cur ? "\n" : "") + p;
      }
    }
    if (cur.trim()) emit(cur.trim());
  };

  for (const rawLine of s.split("\n")) {
    const line = rawLine.trim();
    if (line === "@@H@@") { capturing = true; captured = ""; continue; }
    if (line === "@@/H@@") {
      capturing = false;
      if (captured) { flush(); heading = pageTitle + " · " + captured; }
      continue;
    }
    const sec = /^@@SEC:(.*)@@$/.exec(line);
    if (sec) { flush(); sectionId = sec[1] || ""; continue; }
    if (!line) continue;
    if (capturing) { captured += (captured ? " " : "") + line; continue; }
    buffer.push(line);
  }
  flush();
}

/* ---------- 读取 JS 里的结构化数据（不执行整个脚本） ---------- */
function readVar(file, name) {
  const src = fs.readFileSync(path.join(ROOT, file), "utf8");
  const re = new RegExp("(?:^|\\n)\\s*var\\s+" + name + "\\s*=\\s*(\\[[\\s\\S]*?\\n\\s*\\]);", "m");
  const m = re.exec(src);
  if (!m) throw new Error("未能从 " + file + " 读取 " + name);
  return vm.runInNewContext("(" + m[1] + ")", Object.create(null), { timeout: 2000 });
}

function addStructured() {
  const SCRIPT = "js/script.js";
  const spots = readVar(SCRIPT, "SPOTS");
  const heritage = readVar(SCRIPT, "HERITAGE");
  const routes = readVar(SCRIPT, "ROUTES");
  const foods = readVar(SCRIPT, "FOODS");

  spots.forEach(x => addChunk(
    "景点 · " + x.name, "/html/spots.html",
    `${x.name}（${x.tag || ""}）。${x.desc || ""}\n${x.detail || ""}`, "spot"));
  heritage.forEach(x => addChunk(
    "非遗 · " + x.name, "/html/heritage.html",
    `${x.name}，${x.level || ""}，${x.brief || ""}。${x.text || ""}`, "heritage"));
  routes.forEach(x => addChunk(
    "行程 · " + x.title, "/html/routes.html#sec-routes",
    `${x.title}，${x.dur || ""}。${x.text || ""}`, "route"));
  foods.forEach(x => addChunk(
    "美食 · " + x.name, "/html/food.html",
    `${x.name}，${x.kind || ""}：${x.desc || ""}`, "food"));

  const faq = readVar("js/ip.js", "KB");
  faq.forEach(x => addChunk(
    "常问 · " + (x.k || []).slice(0, 2).join("、"), "/html/routes.html#sec-faq",
    "问：" + (x.k || []).join(" / ") + "\n答：" + (x.a || ""), "faq"));
}

/* ---------- 主流程 ---------- */
function main() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const files = fs.readdirSync(HTML_DIR).filter(f => f.endsWith(".html")).sort();
  files.forEach(htmlToChunks);
  const pageCount = chunks.length;
  addStructured();

  /* 内容未变化时保持时间戳不变，避免每次构建都让 Git 工作区变脏 */
  let generatedAt = new Date().toISOString();
  const oldFile = path.join(DATA_DIR, "kb.json");
  if (fs.existsSync(oldFile)) {
    try {
      const old = JSON.parse(fs.readFileSync(oldFile, "utf8"));
      if (old.count === chunks.length && JSON.stringify(old.chunks) === JSON.stringify(chunks)) {
        generatedAt = old.generatedAt;
      }
    } catch (e) { /* 旧文件损坏则重新生成 */ }
  }
  const kb = {
    version: 1,
    generatedAt,
    source: "星城风物志全站网页内容",
    count: chunks.length,
    chunks
  };
  fs.writeFileSync(path.join(DATA_DIR, "kb.json"), JSON.stringify(kb, null, 2), "utf8");
  fs.writeFileSync(path.join(DATA_DIR, "kb.js"),
    "/* 自动生成，请勿手改；重新生成：npm run kb */\nexport default " +
    JSON.stringify(kb) + ";\n", "utf8");

  console.log(`[kb] 网页正文分片 ${pageCount} 条，结构化数据 ${chunks.length - pageCount} 条，合计 ${chunks.length} 条`);
  console.log(`[kb] 已写入 data/kb.js 与 data/kb.json`);
}
main();
