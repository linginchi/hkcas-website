import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";
import { SectionHead, SectionNote } from "../shared";

export function Cases() {
  const { language } = useLanguage();
  const copy = translations[language].cases;
  const domestic = copy.case2;

  return (
    <section className="rds-section" id="cases">
      <div className="rds-container">
        <SectionHead label={`07 / ${copy.sectionTitle}`} title={copy.title} lead={copy.subtitle} />

        <h3 className="rds-group-title">{copy.domesticTitle}</h3>

        <article className="rds-case-lead">
          <div className="rds-case-kicker">
            <span className="rds-case-status">{domestic.status}</span>
            <span>{domestic.category}</span>
            <span>{domestic.location}</span>
          </div>

          <div className="rds-case-lead-grid">
            <div className="rds-case-body">
              <h4>{domestic.title}</h4>
              <p className="rds-case-sub">{domestic.subtitle}</p>
              <p>{domestic.description}</p>
              <ul className="rds-detail-list">
                {domestic.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>

            <div className="rds-case-side">
              <dl className="rds-meta-list">
                <div>
                  <dt>{domestic.highlights.scale.label}</dt>
                  <dd>{domestic.highlights.scale.value}</dd>
                </div>
                <div>
                  <dt>{domestic.highlights.location.label}</dt>
                  <dd>{domestic.highlights.location.value}</dd>
                </div>
                <div>
                  <dt>{domestic.highlights.period.label}</dt>
                  <dd>{domestic.highlights.period.value}</dd>
                </div>
              </dl>

              <p className="rds-case-coming">{domestic.comingSoon}</p>
            </div>
          </div>
        </article>

        <h3 className="rds-group-title rds-group-title--spaced">{copy.internationalTitle}</h3>

        <div className="rds-case-intl-list">
          {copy.international.map((item) => (
            <article className="rds-case-intl" key={item.title}>
              <div className={item.photos.length > 1 ? "rds-case-media rds-case-media--pair" : "rds-case-media"}>
                {item.photos.map((photo) => (
                  <figure key={photo.src}>
                    <img src={photo.src} alt={photo.caption} loading="lazy" decoding="async" />
                    <figcaption>{photo.caption}</figcaption>
                  </figure>
                ))}
              </div>

              <div className="rds-case-body">
                <div className="rds-case-kicker">
                  <span className="rds-case-status">{item.status}</span>
                  <span>{item.category}</span>
                  <span>{item.location}</span>
                </div>
                <h4>{item.title}</h4>
                <p className="rds-case-sub">{item.subtitle}</p>
                <p>{item.description}</p>
                <dl className="rds-meta-list rds-meta-list--inline">
                  {item.highlights.map((highlight) => (
                    <div key={highlight.label}>
                      <dt>{highlight.label}</dt>
                      <dd>{highlight.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>

        <SectionNote>
          <span>{copy.internationalNote}</span>
        </SectionNote>

        <div className="rds-case-cta">
          <p>{copy.cta}</p>
          <a className="rds-btn" href="#contact">
            {copy.ctaButton}
          </a>
        </div>
      </div>
    </section>
  );
}
