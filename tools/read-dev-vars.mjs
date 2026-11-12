/* 本地开发密钥读取：环境变量优先，其次 .dev.vars / .env（均不入库） */
import fs from "node:fs";
import path from "node:path";

let cache = null;
export function readDevVars(root) {
  if (cache) return cache;
  cache = {};
  for (const name of [".dev.vars", ".env"]) {
    const file = path.join(root, name);
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const s = line.trim();
      if (!s || s.startsWith("#")) continue;
      const m = /^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(s);
      if (!m) continue;
      const v = m[2].trim().replace(/^["']|["']$/g, "");
      if (!(m[1] in cache)) cache[m[1]] = v;
    }
  }
  return cache;
}
export function readSecret(name, root) {
  return process.env[name] || readDevVars(root)[name] || "";
}
