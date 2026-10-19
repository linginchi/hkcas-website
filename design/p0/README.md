# HKCAS — P0 設計樣張（Institutional Editorial）

狀態：**設計稿 + 已實作；首頁已切換為新版（尚未 commit / push / 部署）**。`design/p0` 是不進 build 的設計存檔；正式實作在 `src/redesign/`。

## 怎麼看

```bash
# 目前開發伺服器（新版首頁）
npm run dev
# → http://localhost:5199/（中文）／ /en（英文）

# 設計存檔（靜態樣張）
open design/p0/index.html
```

第二種（靜態樣張）左下角黑色小條可切換 **中 / EN**；新版正式站用路由切換。

## 內容

| 檔案 | 用途 |
|---|---|
| `index.html` | 導航、Hero A、Hero B、業務服務、戰略夥伴、頁尾、design tokens |
| `styles.css` | 色彩、字體、12 欄網格、元件 |
| `app.js` | 只做語言切換，沒有其他邏輯 |
| `shots/` | 1440 / 390、中英對照截圖 |
| `shoot.cjs` / `qa.cjs` | 截圖與檢查腳本（可刪） |

## 已套用的三個決定

1. **方向 A — Institutional Editorial**：暖紙白、墨綠、襯線大標、細線網格、紀錄片攝影、mono 標籤。
2. **範圍 A**：維持單頁與全部 12 個區塊，不拆內頁；先換視覺語言與節奏。
3. **金色與插畫**：金色降為 1px 細線與小面積點綴（不再當文字色）；漢字插畫退出 hero，未上站（保留為品牌檔案）；英文版不再使用。

## 內容保留

- 五項業務、平台、公司、案例、國際合作、夥伴、公益、聯絡的文案**全部保留**；P0 示範 Hero、業務服務、戰略夥伴三個區塊；其餘區塊在 P2 按同一系統改造。
- 原口號「致力於發展陽光化的產業」保留，位置改為 H1 下方的 supporting line。
- 原 hero 的 sr-only 長描述已完整放入「使命與願景」區塊的 intro，沒有刪除。
- **Sunbird Group 已加入**：Hero B 底部夥伴線與「戰略夥伴」區塊都含 Sunbird（三列索引：中咨產融、中企會、Sunbird）。
- **免責聲明**：頁尾新增中英雙語聲明——本站內容不構成投資建議、要約或招攬；HKCAS 涉及監管的業務，均委託持牌機構執行。設計稿與正式站同步。
- 團隊區目前資料為空（`TEAM_MEMBERS = []`），樣張不渲染；正式改造時保留插槽，有資料即出現。
- 法定全名、非營利性質、香港擔保有限公司、© 年份全部保留。

### 12 個區塊的改造方式（P2 範圍）

| # | 現有區塊 | 改造 |
|---|---|---|
| 01 | Hero | A（照片）或 B（純排版＋業務索引） |
| 02 | 使命與願景 | 7/5 分欄，使命／願景各一段，取消卡片 |
| 03 | 關於我們 | 照片＋歷史 7/5，時間軸改細線橫排 |
| 04 | 業務服務 | **P0 已完成**：01–05 索引列 |
| 05 | 企業出海平台 | 三方分工改 3 欄細線表；母平台／國別主體改 2 欄圖示，不用卡片 |
| 06 | 旗下公司 | 3 欄索引，公司名為 serif，標籤為 mono |
| 07 | 成功案例 | 1 大 + 2 小；metadata 用細線表格；「規劃中」改 small caps 標記，不再用綠色膠囊 |
| 08 | 國際合作 | 4 個數字＋國別索引＋3 張照片；12 張圖集改為可展開圖庫 |
| 09 | 團隊 | 空資料隱藏；有資料時 3 欄人物，不用圓角卡 |
| 10 | 戰略夥伴 | **P0 已完成**：3 列文字索引（CIECC、中企會、Sunbird）；Sunbird mark 已上，其餘待授權 |
| 11 | 公益捐贈 | 文字列表＋細線，取消 icon 卡 |
| 12 | 聯絡＋頁尾 | 5/7 分欄，底線輸入框；深綠頁尾 |

## 刻意的取捨

- **沒有三張等寬卡、沒有漸變、沒有玻璃、沒有陰影**（只有語言／浮層用）。
- 全站只有一個 accent（`#2F5A2A`），金色只做線。
- 中文與英文不是同一套字級：中文 display 約為拉丁的 0.78 倍，行高 1.16 vs 1.02。
- 英文正文重寫成短句，不是逐字翻譯；中文保留原有語氣。
- 圖片說明（caption）承擔來源標註，避免把中咨的專案寫成 HKCAS 自身業績。

## 已確認的決策

1. **Hero A**（照片主導）。
2. **H1 文案**：中文「绿色产业，跨境落地。」／英文「Green development, delivered across borders.」照用。
3. **Sunbird**：文字名 + mark（由官方 lockup 裁切）。
4. **Hero 照片**：宝思德經貿合作區（匈牙利，中咨專案）作 placeholder，caption 已標明「戰略夥伴項目」。

## 素材與工程備註

- **Logo**：現有 `logo-hkcas.png` 是 382×480 直式，字標在 48px 高度下不可讀。已製作橫版 lockup：`logo-horizontal.svg`、`-white.svg`、`-green.svg`（nav／footer／OG 已用）。樹 mark 內嵌 148px PNG，字標為 Source Serif 4 轉曲線；印刷級全向量仍需品牌方原始檔。
- **字體**：Source Serif 4／IBM Plex Sans／IBM Plex Mono／Noto Serif SC／Noto Sans SC。正式站要 self-host + subset（中文首屏 <180KB），否則 Google Fonts 在大陸不可用。
- **圖片**：`borsod-zone.webp` 只有 1000px，2× 螢幕會偏軟；正式版需 ≥2400px 與 4:5、3:2 兩種裁切。
- **效能**：樣張是靜態 HTML；正式版沿用現有 Vite + React + Tailwind，不新增依賴。

## 下一步

- **素材**：換 hero 高解析照片（論壇照片保留，不換）；若品牌方有正式字標，替換 `design/logo/build-logo.py` 後重出 SVG；字體 subset。
- **字體**：self-host + subset（中文首屏 <180KB）。
- **清理**：舊的 `src/sections/*` 已不再被首頁引用，確認新版後可一次性刪除。
- **上線**：commit / push（Netlify 會自動 build & deploy），再做 Lighthouse、a11y、跨瀏覽器視覺回歸。

## 正式站同步紀錄

2026-10-19：免責聲明已加入頁尾；新版 footer 亦已包含，舊 footer 保留但不再被首頁使用。

- `src/i18n/translations.ts`：新增 `footer.disclaimerLabel`、`footer.disclaimer`（中英）
- `src/sections/Footer.tsx`：頁尾免責聲明區塊
- 驗證：`tsc --noEmit` 通過；`npm run build` 通過；`dist/index.html`、`dist/en.html` 已預渲染此段

## 實作與驗證

12 個區塊已全部落成 React + CSS，`HomePage` 直接渲染新版；`?redesign=1` 不再需要（仍可加，會被忽略）。

- [RedesignHome.tsx](../../src/redesign/RedesignHome.tsx)（導航、Hero、組裝）
- [sections/](../../src/redesign/sections/)（Mission、About、Services、Platform、Companies、Cases、International、Partners、Philanthropy、Contact、SiteFooter）
- [redesign.css](../../src/redesign/redesign.css)（全部 scoped 在 `.rds` 下）
- [HomePage.tsx](../../src/pages/HomePage.tsx)（改為直接渲染 `RedesignHome`）
- 素材：`public/partners/sunbird-mark.png`、`public/partners/sunbird.png`
- 驗證：`tsc --noEmit` 通過；`npm run build` 通過；`dist/index.html`、`dist/en.html` 已預渲染全部區塊與免責聲明；1440/1024/768/390 無橫向溢出、無 console error。

舊的 `src/sections/*` 與舊 footer 仍在 repo，但已不被首頁引用；保留是為了方便回滾，下一輪可刪。

## 2026-10-19 素材更新

- **論壇照片保留**在「關於我們 → 歷史沿革」，沒有替換。
- **OG image**：以 `design/og/index.html` 重新渲染，1200×630，輸出 `public/og-image.jpg`。
- **Favicon**：`public/favicon-32.png`、`public/logo-tree.png`、`public/apple-touch-icon.png`；`index.html` 已更新。
- **Logo**：新增 `logo-horizontal.svg`、`-white.svg`、`-green.svg`；nav／footer 已改用完整 lockup，OG 亦同。建置腳本在 `design/logo/`。
- **Hero 照片**仍是寶思德 placeholder：原始簡報最高只有 1074px，不足以 2× 顯示；待換 2400px 授權照片。
