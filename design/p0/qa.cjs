const { chromium } = require("/Users/linginchi/Projects/hkcas-website/node_modules/playwright-core");
const EXEC = "/Users/linginchi/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";
(async () => {
  const b = await chromium.launch({ executablePath: EXEC });
  for (const w of [1440, 1180, 1024, 768, 390]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
    const p = await ctx.newPage();
    await p.goto("http://127.0.0.1:8765/design/p0/", { waitUntil: "networkidle" });
    await p.evaluate(() => document.fonts.ready);
    const m = await p.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
      navLinks: getComputedStyle(document.querySelector(".nav-links")).display,
      menuBtn: getComputedStyle(document.querySelector("#menuBtn")).display,
    }));
    console.log(w, JSON.stringify(m));
    if (w === 390) {
      await p.click("#menuBtn");
      await p.waitForTimeout(200);
      console.log("menu open:", await p.evaluate(() => ({
        open: document.body.classList.contains("nav-open"),
        visible: getComputedStyle(document.querySelector("#navPanel")).display,
        expanded: document.querySelector("#menuBtn").getAttribute("aria-expanded"),
      })));
    }
    if (w === 1024) {
      await p.click('.nav .lang-switch button[data-set-lang="en"]');
      await p.waitForTimeout(300);
      const leftovers = await p.evaluate(() => {
        const bad = [];
        document.querySelectorAll("[data-i18n]").forEach((el) => {
          if (/[\u4e00-\u9fff]/.test(el.textContent) && !el.closest(".spec")) bad.push(el.dataset.i18n + "=" + el.textContent.trim());
        });
        return { lang: document.documentElement.lang, bad };
      });
      console.log("EN check:", JSON.stringify(leftovers));
    }
    await ctx.close();
  }
  await b.close();
})();
