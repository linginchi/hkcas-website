import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "./App";
import { LanguageProvider } from "./hooks/useLanguage";

// 建構期預渲染入口：組件層級須與 main.tsx 一致，否則客戶端 hydrate 會失配。
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <LanguageProvider>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </LanguageProvider>
    </StrictMode>,
  );
}
