import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { translations } from "../i18n/translations";
import { About } from "./sections/About";
import { Cases } from "./sections/Cases";
import { Companies } from "./sections/Companies";
import { Contact } from "./sections/Contact";
import { International } from "./sections/International";
import { Mission } from "./sections/Mission";
import { Partners } from "./sections/Partners";
import { Philanthropy } from "./sections/Philanthropy";
import { Platform } from "./sections/Platform";
import { Services } from "./sections/Services";
import { SiteFooter } from "./sections/SiteFooter";
import "./redesign.css";

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

const HERO_COPY = {
  zh: {
    eyebrow: "HKCAS · 香港 · 2019 年成立",
    lead:
      "国科绿色发展国际实验室（香港）有限公司，2019 年于香港注册的非营利平台。依托大湾区战略枢纽，以「咨询＋投资管理＋运营」全周期模式，推动绿色与数字技术的全球转化与实业落地。",
    cta1: "洽谈合作",
    cta2: "业务范围",
    caption: "宝思德经贸合作区 · 战略伙伴项目",
    alt: "中国匈牙利宝思德经贸合作区航拍",
    gba: "大湾区",
  },
  en: {
    eyebrow: "HKCAS · Hong Kong · Est. 2019",
    lead:
      "A Hong Kong non-profit platform, registered in 2019. From the Greater Bay Area, we turn green and digital technology into industry through consulting, investment management and operations.",
    cta1: "Discuss a project",
    cta2: "What we do",
    caption: "Borsod, Hungary · strategic partner project",
    alt: "Aerial view of the China–Hungary Borsod Economic and Trade Cooperation Zone",
    gba: "GBA",
  },
} as const;

export default function RedesignHome() {
  const { language, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = HERO_COPY[language];
  const hero = translations[language].hero;

  const switchLanguage = (next: "zh" | "en") => {
    if (next === language) return;
    window.location.assign(next === "en" ? "/en" : "/");
  };

  return (
    <div className="rds" data-lang={language} id="home">
      <header className="rds-nav">
        <div className="rds-container rds-nav-inner">
          <a className="rds-brand" href="#home" aria-label="HKCAS home">
            <img
              className="rds-brand-logo"
              src="/logo-horizontal.svg"
              alt="HKCAS"
              width={91}
              height={32}
            />
          </a>

          <nav className="rds-links" aria-label="Primary">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {t(link.key)}
              </a>
            ))}
          </nav>

          <div className="rds-nav-right">
            <div className="rds-lang" role="group" aria-label="Language">
              <button
                type="button"
                onClick={() => switchLanguage("zh")}
                aria-pressed={language === "zh"}
              >
                中
              </button>
              <button
                type="button"
                onClick={() => switchLanguage("en")}
                aria-pressed={language === "en"}
              >
                EN
              </button>
            </div>
            <button
              className="rds-menu-btn"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="rds-panel"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {language === "zh" ? "菜单" : "Menu"}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="rds-panel" id="rds-panel">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                {t(link.key)}
              </a>
            ))}
          </div>
        ) : null}
      </header>

      <main>
        <section aria-labelledby="rds-hero-title">
          <div className="rds-container">
            <div className="rds-hero-grid">
              <div className="rds-copy">
                <p className="rds-eyebrow">{copy.eyebrow}</p>
                <h1 className="rds-display-1" id="rds-hero-title">
                  {language === "zh" ? (
                    <>
                      绿色产业，<br />跨境落地。
                    </>
                  ) : (
                    <>
                      Green development,<br />delivered<br />across borders.
                    </>
                  )}
                </h1>
                <p className="rds-lead">{copy.lead}</p>
                <p className="rds-slogan">{hero.slogan}</p>
                <div className="rds-actions">
                  <a className="rds-btn" href="#contact">
                    {copy.cta1}
                  </a>
                  <a className="rds-link" href="#services">
                    {copy.cta2} <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <dl className="rds-stats">
                  <div>
                    <dt className="rds-stat-label">{hero.stats.founded}</dt>
                    <dd className="rds-stat-value">2019</dd>
                  </div>
                  <div>
                    <dt className="rds-stat-label">{hero.stats.business}</dt>
                    <dd className="rds-stat-value">5</dd>
                  </div>
                  <div>
                    <dt className="rds-stat-label">{hero.stats.location}</dt>
                    <dd className="rds-stat-value">{copy.gba}</dd>
                  </div>
                </dl>
              </div>

              <figure className="rds-figure">
                <img
                  src="/intl/borsod-zone.webp"
                  alt={copy.alt}
                  width={1000}
                  height={669}
                />
                <figcaption className="rds-caption">{copy.caption}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <Mission />
        <About />
        <Services />
        <Platform />
        <Companies />
        <Cases />
        <International />
        <Partners />
        <Philanthropy />
        <Contact />
      </main>

      <SiteFooter />
    </div>
  );
}
