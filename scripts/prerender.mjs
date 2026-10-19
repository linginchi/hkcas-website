import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const ROOT_PLACEHOLDER = '<div id="root"></div>';

const { render, ROUTE_META, SITE_ORIGIN } = await import(
  pathToFileURL(resolve(root, "dist-ssr/entry-server.js")).href
);

const template = readFileSync(resolve(root, "dist/index.html"), "utf8");

if (!template.includes(ROOT_PLACEHOLDER)) {
  throw new Error(`prerender: 於 dist/index.html 找不到 ${ROOT_PLACEHOLDER}`);
}

const escapeAttr = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

/** 逐條套用並驗證，避免 index.html 改版後靜默漏改 head。 */
function applyReplacements(html, replacements) {
  return replacements.reduce((acc, [pattern, replacement, label]) => {
    if (!pattern.test(acc)) {
      throw new Error(`prerender: 於 dist/index.html 找不到需替換的 ${label}`);
    }
    return acc.replace(pattern, () => replacement);
  }, html);
}

function buildHead(html, meta) {
  const url = `${SITE_ORIGIN}${meta.path}`;
  const title = escapeAttr(meta.title);
  const description = escapeAttr(meta.description);

  return applyReplacements(html, [
    [/<html lang="[^"]*">/, `<html lang="${meta.lang}">`, "<html lang>"],
    [/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`, "<title>"],
    [
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${description}" />`,
      "description",
    ],
    [
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${url}" />`,
      "canonical",
    ],
    [
      /<meta property="og:locale" content="[^"]*" \/>/,
      `<meta property="og:locale" content="${meta.ogLocale}" />`,
      "og:locale",
    ],
    [
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${url}" />`,
      "og:url",
    ],
    [
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${title}" />`,
      "og:title",
    ],
    [
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${description}" />`,
      "og:description",
    ],
    [
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${title}" />`,
      "twitter:title",
    ],
    [
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${description}" />`,
      "twitter:description",
    ],
  ]);
}

/** JSON-LD 內容依語言變化，否則英文頁會帶著中文實體描述。 */
function localizeJsonLd(html, meta) {
  const pattern = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let seen = 0;
  const out = html.replace(pattern, (_, body) => {
    seen += 1;
    const data = JSON.parse(body);
    const org = meta.organization;
    if (data["@type"] === "Organization") {
      data.name = org.name;
      data.description = org.description;
      data.knowsAbout = org.knowsAbout;
      data.address = {
        ...data.address,
        streetAddress: org.streetAddress,
        addressRegion: org.addressRegion,
        addressLocality: org.addressLocality,
      };
    } else if (data["@type"] === "WebSite") {
      data.name = org.name;
    }
    return `<script type="application/ld+json">${JSON.stringify(data, null, 2)}</script>`;
  });
  if (seen < 2) {
    throw new Error("prerender: 於 dist/index.html 找不到足夠的 JSON-LD 區塊");
  }
  return out;
}

function write(target, html) {
  const targetPath = resolve(root, target);
  mkdirSync(dirname(targetPath), { recursive: true });
  writeFileSync(targetPath, html);
  console.log(`prerender: ${target} (${html.length} bytes)`);
}

// 未預渲染的路由必須拿到空殼，否則 hydrate 會與預渲染頁面失配。
write("dist/app.html", template);

for (const meta of ROUTE_META) {
  const body = render(meta.path);

  if (!body.trim()) {
    throw new Error(`prerender: 路由 ${meta.path} 渲染結果為空`);
  }

  // 標記本檔對應的路由，客戶端據此判斷能否 hydrate（見 src/main.tsx）。
  const html = localizeJsonLd(buildHead(template, meta), meta).replace(
    ROOT_PLACEHOLDER,
    `<div id="root" data-prerendered-path="${escapeAttr(meta.path)}">${body}</div>`,
  );

  write(meta.path === "/" ? "dist/index.html" : `dist${meta.path}.html`, html);
}
