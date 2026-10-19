import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";
import { SectionHead, SectionNote } from "../shared";

export function Partners() {
  const { language } = useLanguage();
  const copy = translations[language].partners;
  const items = [copy.partner1, copy.partner2, copy.partner3];

  return (
    <section className="rds-section" id="partners">
      <div className="rds-container">
        <SectionHead
          label={`10 / ${copy.sectionTitle}`}
          title={copy.title}
          lead={copy.subtitle}
        />

        <div className="rds-partner-rows">
          {items.map((partner, index) => (
            <article className="rds-partner" key={partner.title}>
              <span className="rds-partner-no">{String(index + 1).padStart(2, "0")}</span>
              <div className="rds-partner-main">
                <p className="rds-partner-tag">{partner.tag}</p>
                <div className="rds-partner-name-row">
                  {index === 2 ? (
                    <img
                      className="rds-partner-logo"
                      src="/partners/sunbird-mark.png"
                      alt=""
                      aria-hidden="true"
                      width={62}
                      height={57}
                    />
                  ) : null}
                  <h3 className="rds-partner-name">{partner.title}</h3>
                </div>
                <p className="rds-partner-sub">{partner.subtitle}</p>
              </div>
              <p className="rds-partner-desc">{partner.description}</p>
              {"website" in partner && partner.website ? (
                <a
                  className="rds-partner-link"
                  href={partner.website}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {copy.visit} <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </article>
          ))}
        </div>

        <SectionNote>
          <span>{copy.cta.description}</span>
          <a href="#contact">
            {copy.cta.button} <span aria-hidden="true">↗</span>
          </a>
        </SectionNote>
      </div>
    </section>
  );
}
