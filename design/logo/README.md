# HKCAS horizontal lockup

目前網站使用的橫版 logo。因為品牌方沒有正式橫版 SVG，這一版是用既有素材重建的：

- **樹 mark**：`public/logo-tree.png`（由官方直式 PNG 裁切），內嵌為 148px PNG。
- **字標**：Source Serif 4（wght 400 / opsz 60），已轉成 SVG path；對應目前網站的襯線字體。
- **比例**：樹高 96、字帽高 42、間距 24，viewBox 341.5×120。

## 檔案

| 檔案 | 用途 |
|---|---|
| `public/logo-horizontal.svg` | 淺色底（樹綠 + 墨色字標）；nav |
| `public/logo-horizontal-white.svg` | 深色底全白；footer、OG |
| `public/logo-horizontal-green.svg` | 全綠；品牌／印刷備用 |

## 重建

```bash
python3 design/logo/build-logo.py
```

腳本會下載 Source Serif 4 variable TTF 到 `/tmp`，重新產生三個 SVG。

## 限制

樹 mark 仍是內嵌 PNG（148px），不是全向量；在 nav（32px）、footer（40px）、OG（38px）都夠清晰，但**印刷級**需要品牌方提供原始 AI／SVG，或用 potrace 等工具重新描圖。字標也不是官方原字，替換正式字標時只需改 `build-logo.py` 的字型與字距。
