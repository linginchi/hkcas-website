import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { LocalizedApp } from "./App";

export { ROUTE_META, SITE_ORIGIN } from "./i18n/site-meta";

// 建構期預渲染入口：組件層級須與 main.tsx 一致，否則客戶端 hydrate 會失配。
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <LocalizedApp />
      </StaticRouter>
    </StrictMode>,
  );
}
