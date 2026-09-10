import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root")!;

const tree = (
  <StrictMode>
    <App />
  </StrictMode>
);

// 只有當這份 HTML 正是本路由的預渲染結果時才 hydrate；否則（空殼、或 SPA
// 兜底送來別條路由的頁面）重建，避免 hydrate 失配。
if (container.dataset.prerenderedPath === window.location.pathname) {
  hydrateRoot(container, tree);
} else {
  container.replaceChildren();
  createRoot(container).render(tree);
}
