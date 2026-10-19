import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";

const LINKS = [
  { key: "nav.home", href: "#home" },
  { key: "nav.about", href: "#about" },
  { key: "nav.services", href: "#services" },
  { key: "nav.companies", href: "#companies" },
  { key: "nav.cases", href: "#cases" },
  { key: "nav.partners", href: "#partners" },
  { key: "nav.philanthropy", href: "#philanthropy" },
  { key: "nav.contact", href: "#contact" },
] as const;

export function SiteFooter() {
  const { language, t } = useLanguage();
  const copy = translations[language].footer;
  const year = new Date().getFullYear();

  return (
    <footer className="rds-footer">
      <div className="rds-container">
        <div className="rds-footer-cta">
          <p>{copy.cta.title}</p>
          <a href="#contact">
            {copy.cta.button} <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="rds-footer-grid">
          <div className="rds-footer-brand">
            <a className="rds-brand rds-brand--footer" href="#home" aria-label="HKCAS home">
              <img
                className="rds-brand-logo rds-brand-logo--footer"
                src="/logo-horizontal-white.svg"
                alt="HKCAS"
                width={114}
                height={40}
              />
            </a>
            <p>{copy.description}</p>
          </div>

          <div className="rds-footer-col">
            <h4>{copy.quickLinks}</h4>
            <ul>
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{t(link.key)}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rds-footer-col">
            <h4>{copy.businessAreas}</h4>
            <ul>
              {copy.businessList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rds-footer-col">
            <h4>{t("nav.contact")}</h4>
            <ul>
              <li>
                <a href="mailto:contact@hkcas.org">contact@hkcas.org</a>
              </li>
              <li>{t("contact.info.address.value")}</li>
              <li>{language === "zh" ? "国科绿色发展国际实验室（香港）有限公司" : "CAS Laboratory of Green Development International (Hong Kong) Ltd."}</li>
            </ul>
          </div>
        </div>

        <div className="rds-footer-disclaimer">
          <p className="rds-footer-disclaimer-label">{copy.disclaimerLabel}</p>
          <p>{copy.disclaimer}</p>
        </div>

        <div className="rds-footer-legal">
          <p>{copy.copyright.replace("{year}", String(year))}</p>
          <p>{copy.companyType}</p>
        </div>
      </div>
    </footer>
  );
}
