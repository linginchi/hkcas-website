# hkcas-website

国科绿色发展国际实验室（香港）有限公司（HKCAS）官方網站的靜態鏡像倉庫。

## 說明

本倉庫由 `https://hkcas.org`（Netlify 託管）線上資產完整鏡像而來。該站為 Vite 建置的
React 單頁應用（SPA），整站由以下檔案組成：

```
.
├── index.html                  # 入口頁面
├── assets/
│   ├── index-BujSeGCj.js       # React 應用主 bundle（含路由與內容）
│   └── index-DREQJtU4.css      # 全站樣式
├── hero-bg.jpg                 # 首頁主視覺背景圖
├── logo-hkcas.png              # 組織 Logo
└── forum-photo.png             # 論壇照片
```

> 注意：JS bundle 內原以絕對路徑（如 `/hero-bg.jpg`）引用的圖片已改寫為相對路徑
> （`./hero-bg.jpg`），因此直接以瀏覽器開啟本地 `index.html` 即可正常顯示全站。

## 本地預覽

直接雙擊 `index.html`，或啟動一個簡易靜態伺服器：

```bash
python3 -m http.server 8080
# 瀏覽 http://localhost:8080
```

## 來源

- 線上網站：<https://hkcas.org>
- 鏡像日期：2026-08-15
