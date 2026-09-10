import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// 只預渲染公開行銷頁；/staff 與 /pay 為交易頁，改由 app.html 空殼提供（見 netlify.toml）。
const ROUTES = ["/"];

const ROOT_PLACEHOLDER = '<div id="root"></div>';

const { render } = await import(pathToFileURL(resolve(root, "dist-ssr/entry-server.js")).href);

const template = readFileSync(resolve(root, "dist/index.html"), "utf8");

if (!template.includes(ROOT_PLACEHOLDER)) {
  throw new Error(`prerender: 於 dist/index.html 找不到 ${ROOT_PLACEHOLDER}`);
}

function write(target, html) {
  const targetPath = resolve(root, target);
  mkdirSync(dirname(targetPath), { recursive: true });
  writeFileSync(targetPath, html);
  console.log(`prerender: ${target} (${html.length} bytes)`);
}

// 未預渲染的路由必須拿到空殼，否則 hydrate 會與首頁 HTML 失配。
write("dist/app.html", template);

for (const route of ROUTES) {
  const html = render(route);

  if (!html.trim()) {
    throw new Error(`prerender: 路由 ${route} 渲染結果為空`);
  }

  const target = route === "/" ? "dist/index.html" : `dist${route}/index.html`;
  write(target, template.replace(ROOT_PLACEHOLDER, `<div id="root">${html}</div>`));
}
