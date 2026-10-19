import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";
import { SectionHead, SectionNote } from "../shared";

export function Services() {
  const { language } = useLanguage();
  const copy = translations[language].services;
  const items = [
    copy.service1,
    copy.service2,
    copy.service3,
    copy.service4,
    copy.service5,
  ];

  return (
    <section className="rds-section" id="services">
      <div className="rds-container">
        <SectionHead label="04 / Services" title={copy.title} lead={copy.subtitle} />

        <ol className="rds-rows">
          {items.map((item, index) => (
            <li className="rds-row" key={item.title}>
              <span className="rds-row-no">{String(index + 1).padStart(2, "0")}</span>
              <div className="rds-row-main">
                <h3 className="rds-row-title">{item.title}</h3>
                <p className="rds-row-desc">{item.description}</p>
              </div>
              <div className="rds-tags">
                {item.features.map((feature) => (
                  <span key={feature}>{feature}</span>
                ))}
              </div>
              <span className="rds-row-arrow" aria-hidden="true">
                ↗
              </span>
            </li>
          ))}
        </ol>

        <SectionNote>
          <a href="#contact">
            {copy.cta} <span aria-hidden="true">↗</span>
          </a>
        </SectionNote>
      </div>
    </section>
  );
}
