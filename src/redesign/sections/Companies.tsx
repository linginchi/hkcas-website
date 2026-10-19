import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";
import { SectionHead, SectionNote } from "../shared";

export function Companies() {
  const { language } = useLanguage();
  const copy = translations[language].companies;

  return (
    <section className="rds-section" id="companies">
      <div className="rds-container">
        <SectionHead label={`06 / ${copy.sectionTitle}`} title={copy.title} lead={copy.subtitle} />

        <div className="rds-company-grid">
          {copy.items.map((company) => (
            <article className="rds-company" key={company.name}>
              <span className="rds-company-tag">{company.tag}</span>
              <h3>{company.name}</h3>
              {company.altName ? <p className="rds-company-alt">{company.altName}</p> : null}
              <p className="rds-company-desc">{company.description}</p>
              {company.website ? (
                <a
                  className="rds-company-link"
                  href={company.website}
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
          <span>{copy.note}</span>
        </SectionNote>
      </div>
    </section>
  );
}
