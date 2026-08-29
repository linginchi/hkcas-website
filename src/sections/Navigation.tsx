import { Globe, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

const LINKS = [
  { key: "nav.home", href: "#home" },
  { key: "nav.about", href: "#about" },
  { key: "nav.services", href: "#services" },
  { key: "nav.cases", href: "#cases" },
  { key: "nav.partners", href: "#partners" },
  { key: "nav.philanthropy", href: "#philanthropy" },
  { key: "nav.contact", href: "#contact" },
] as const;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    if (!onHome) {
      window.location.href = `/${href}`;
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !onHome ? "bg-[#FFFEF5]/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {onHome ? (
            <a href="#home" onClick={(e) => { e.preventDefault(); go("#home"); }} className="flex items-center">
              <img src="/logo-hkcas.png" alt="HKCAS" className="h-12 w-auto object-contain" />
            </a>
          ) : (
            <Link to="/" className="flex items-center">
              <img src="/logo-hkcas.png" alt="HKCAS" className="h-12 w-auto object-contain" />
            </Link>
          )}

          <div className="hidden lg:flex items-center space-x-8">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={onHome ? link.href : `/${link.href}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(link.href);
                }}
                className="text-sm tracking-wide transition-all duration-300 hover:opacity-70 text-[#1a1a1a]"
              >
                {t(link.key)}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center">
            <button
              type="button"
              onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
              className="flex items-center gap-2 px-4 py-2 text-sm tracking-wide transition-all duration-300 rounded-full border text-[#1a1a1a] border-[#D4A853]/40 hover:border-[#D4A853]/70"
            >
              <Globe className="w-4 h-4" />
              <span>{language === "zh" ? "EN" : "中文"}</span>
            </button>
          </div>

          <div className="lg:hidden">
            <button type="button" onClick={() => setOpen((v) => !v)} className="p-2 rounded-md text-[#1a1a1a]">
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[#FFFEF5] shadow-lg transition-all duration-300 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-6 py-4 space-y-3">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={onHome ? link.href : `/${link.href}`}
              onClick={(e) => {
                e.preventDefault();
                go(link.href);
              }}
              className="block py-2 text-[#1a1a1a]"
            >
              {t(link.key)}
            </a>
          ))}
          <button
            type="button"
            onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
            className="flex items-center gap-2 py-2"
          >
            <Globe className="w-4 h-4" />
            {language === "zh" ? "EN" : "中文"}
          </button>
        </div>
      </div>
    </nav>
  );
}
