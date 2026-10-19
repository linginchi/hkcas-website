import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";
import { SectionHead } from "../shared";

const MILESTONES = ["forum", "mou", "founded", "control"] as const;

export function About() {
  const { language } = useLanguage();
  const copy = translations[language].about;
  const label = language === "zh" ? copy.sectionTitle : "Company";

  return (
    <section className="rds-section" id="about">
      <div className="rds-container">
        <SectionHead label={`03 / ${label}`} title={copy.title} lead={copy.subtitle} />

        <div className="rds-about-grid">
          <figure className="rds-about-photo">
            <img src="/forum-photo.webp" alt={copy.forumAlt} width={660} height={435} loading="lazy" />
            <figcaption>{copy.forumAlt}</figcaption>
          </figure>

          <div className="rds-about-copy">
            <h3>{copy.historyTitle}</h3>
            <p>{copy.history1}</p>
            <p>{copy.history2}</p>
            <p>{copy.history3}</p>
            <p>{copy.structureNote}</p>

            <dl className="rds-about-stats">
              <div>
                <dt className="rds-stat-label">{copy.founded}</dt>
                <dd className="rds-stat-value">{copy.foundedValue}</dd>
              </div>
              <div>
                <dt className="rds-stat-label">{copy.location}</dt>
                <dd className="rds-stat-value">{copy.locationValue}</dd>
              </div>
              <div>
                <dt className="rds-stat-label">{copy.nature}</dt>
                <dd className="rds-stat-value">{copy.natureValue}</dd>
              </div>
            </dl>
          </div>
        </div>

        <h3 className="rds-timeline-title">{copy.timelineTitle}</h3>
        <div className="rds-timeline">
          {MILESTONES.map((key) => {
            const item = copy.milestones[key];
            return (
              <article className="rds-timeline-item" key={key}>
                <span className="rds-timeline-year">{item.year}</span>
                <h4>{item.title}</h4>
                <p>{item.content}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
