const { chromium } = require("/Users/linginchi/Projects/hkcas-website/node_modules/playwright-core");
const { execSync } = require("child_process");
const EXEC = "/Users/linginchi/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";
(async () => {
  const b = await chromium.launch({ executablePath: EXEC });
  const ctx = await b.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.goto("file:///Users/linginchi/Projects/hkcas-website/design/og/index.html", { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForFunction(() => document.querySelector(".bg")?.complete === true);
  await p.waitForTimeout(600);
  await p.screenshot({ path: "/tmp/og-2x.png" });
  await b.close();
  execSync(`python3 -c "from PIL import Image; im=Image.open('/tmp/og-2x.png').convert('RGB').resize((1200,630), Image.LANCZOS); im.save('/Users/linginchi/Projects/hkcas-website/public/og-image.jpg', quality=92, optimize=True)"`);
  console.log("og written");
})();
