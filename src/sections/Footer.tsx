import { translations } from "../i18n/translations";
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

export function Footer() {
  const { language, t } = useLanguage();
  const year = new Date().getFullYear();
  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-[#1a3a2e] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <img src="/logo-hkcas.png" alt="HKCAS" className="h-14 w-auto object-contain mb-6 brightness-0 invert" />
            <p className="text-white/70 font-serif leading-relaxed max-w-lg">{t("footer.description")}</p>
          </div>
          <div>
            <h4 className="mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2 text-white/70">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(link.href);
                    }}
                    className="hover:text-[#D4A853]"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4">{t("footer.businessAreas")}</h4>
            <ul className="space-y-2 text-white/70 font-serif">
              {translations[language].footer.businessList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <p className="text-lg">{t("footer.cta.title")}</p>
          <button
            type="button"
            onClick={() => go("#contact")}
            className="rounded-full bg-[#D4A853] text-[#1a1a1a] px-6 py-3 font-medium hover:bg-[#E8C87A]"
          >
            {t("footer.cta.button")}
          </button>
        </div>

        <div className="border-t border-white/10 pt-6 text-sm text-white/50 flex flex-col md:flex-row justify-between gap-2">
          <p>{t("footer.copyright").replace("{year}", String(year))}</p>
          <p>{t("footer.companyType")}</p>
        </div>
      </div>
    </footer>
  );
}
