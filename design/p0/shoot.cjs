const { chromium } = require("/Users/linginchi/Projects/hkcas-website/node_modules/playwright-core");
const EXEC = "/Users/linginchi/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";
const URL = "http://127.0.0.1:8765/design/p0/";
const OUT = "/Users/linginchi/Projects/hkcas-website/design/p0/shots";

(async () => {
  const browser = await chromium.launch({ executablePath: EXEC });
  const errors = [];

  async function shotSet(lang, width, height, suffix) {
    const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate((l) => {
      document.querySelectorAll("[data-set-lang]").forEach((b) => {
        if (b.dataset.setLang === l) b.click();
      });
      document.body.classList.add("shot");
      window.scrollTo(0, 0);
    }, lang);
    await page.waitForTimeout(700);

    await page.screenshot({ path: `${OUT}/hero-a-${suffix}.png` });
    await page.evaluate(() => { const n = document.querySelector(".nav"); if (n) n.style.display = "none"; });
    for (const [name, sel] of [["hero-b", ".hero-b"], ["services", "#services"], ["partners", "#partners"], ["footer", ".footer"]]) {
      const el = page.locator(sel);
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
      await el.screenshot({ path: `${OUT}/${name}-${suffix}.png` });
    }

    if (lang === "en") {
      const text = await page.evaluate(() => document.body.innerText);
      const cjk = text.split("\n").filter((line) => /[\u4e00-\u9fff]/.test(line));
      console.log("EN CJK lines:", JSON.stringify(cjk.slice(0, 20)));
    }
    await ctx.close();
  }

  await shotSet("zh", 1440, 900, "1440-zh");
  await shotSet("en", 1440, 900, "1440-en");
  await shotSet("zh", 390, 844, "390-zh");
  await shotSet("en", 390, 844, "390-en");

  console.log("errors:", errors.length ? errors : "none");
  await browser.close();
})();
