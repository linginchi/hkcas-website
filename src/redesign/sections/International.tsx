import { COOPERATION_GALLERY, COOPERATION_ITEMS, COOPERATION_STATS } from "../../data/people";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";
import { SectionHead, SectionNote } from "../shared";

export function International() {
  const { language } = useLanguage();
  const copy = translations[language].international;
  const photo =
    COOPERATION_GALLERY.find((item) => item.src.includes("inga")) ?? COOPERATION_GALLERY[0];

  return (
    <section className="rds-section" id="international">
      <div className="rds-container">
        <SectionHead label={`08 / ${copy.sectionTitle}`} title={copy.title} lead={copy.subtitle} />

        <dl className="rds-stat-band">
          {COOPERATION_STATS.map((stat) => (
            <div key={stat.label.en}>
              <dt className="rds-band-label">{stat.label[language]}</dt>
              <dd className="rds-band-value">{stat.value[language]}</dd>
            </div>
          ))}
        </dl>

        <figure className="rds-intl-photo">
          <img src={photo.src} alt={photo.caption[language]} loading="lazy" decoding="async" />
          <figcaption>{photo.caption[language]}</figcaption>
        </figure>

        <div className="rds-intl-items">
          {COOPERATION_ITEMS.map((item, index) => (
            <article className="rds-intl-item" key={item.title.en}>
              <span className="rds-intl-no">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title[language]}</h3>
              <p>{item.description[language]}</p>
            </article>
          ))}
        </div>

        <details className="rds-gallery">
          <summary>
            <span>{copy.galleryTitle}</span>
            <span className="rds-gallery-count">{COOPERATION_GALLERY.length}</span>
          </summary>
          <div className="rds-gallery-grid">
            {COOPERATION_GALLERY.map((image) => (
              <figure key={image.src}>
                <img src={image.src} alt={image.caption[language]} loading="lazy" decoding="async" />
                <figcaption>{image.caption[language]}</figcaption>
              </figure>
            ))}
          </div>
        </details>

        <SectionNote>
          <span>{copy.note}</span>
        </SectionNote>
      </div>
    </section>
  );
}
