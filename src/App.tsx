import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { LanguageProvider } from "./hooks/useLanguage";
import { isLocalizedPath, languageFromPath, pathForLanguage } from "./i18n/site-meta";
import type { Language } from "./i18n/translations";
import { HomePage } from "./pages/HomePage";
import { PayCancelPage } from "./pages/PayCancelPage";
import { PayRedirectPage } from "./pages/PayRedirectPage";
import { PaySuccessPage } from "./pages/PaySuccessPage";
import { StaffPayPage } from "./pages/StaffPayPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/en" element={<HomePage />} />
      <Route path="/staff/pay" element={<StaffPayPage />} />
      <Route path="/pay/success" element={<PaySuccessPage />} />
      <Route path="/pay/cancel" element={<PayCancelPage />} />
      <Route path="/pay/:id" element={<PayRedirectPage />} />
    </Routes>
  );
}

// 首頁的語言由路徑決定（/ 與 /en），讓兩個版本各有可索引的 URL。
export function LocalizedApp() {
  const location = useLocation();
  const navigate = useNavigate();
  const routeLanguage = languageFromPath(location.pathname);
  const [language, setLanguageState] = useState<Language>(routeLanguage);

  useEffect(() => {
    setLanguageState(routeLanguage);
  }, [routeLanguage]);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    if (isLocalizedPath(location.pathname)) {
      navigate(pathForLanguage(next) + location.hash);
    }
  };

  return (
    <LanguageProvider language={language} setLanguage={setLanguage}>
      <AppRoutes />
    </LanguageProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LocalizedApp />
    </BrowserRouter>
  );
}
