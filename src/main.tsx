import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { LanguageProvider } from "./hooks/useLanguage";
import "./index.css";

// 與 scripts/prerender.mjs 的 ROUTES 保持一致。
const PRERENDERED_ROUTES = new Set(["/"]);

const container = document.getElementById("root")!;

const tree = (
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);

// 首頁已於建構期預渲染，需 hydrate 而非重建，否則會丟棄爬蟲可讀的初始 HTML。
if (PRERENDERED_ROUTES.has(window.location.pathname) && container.firstElementChild) {
  hydrateRoot(container, tree);
} else {
  container.replaceChildren();
  createRoot(container).render(tree);
}
