import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";
import { SectionHead, SectionNote } from "../shared";

export function Platform() {
  const { language } = useLanguage();
  const copy = translations[language].platform;

  return (
    <section className="rds-section" id="platform">
      <div className="rds-container">
        <SectionHead label={`05 / ${copy.sectionTitle}`} title={copy.title} lead={copy.subtitle} />

        <p className="rds-standfirst">{copy.intro}</p>

        <h3 className="rds-subhead">{copy.rolesTitle}</h3>
        <div className="rds-roles">
          {copy.roles.map((role, index) => (
            <article className="rds-role" key={role.name}>
              <span className="rds-role-no">{String(index + 1).padStart(2, "0")}</span>
              <h4>{role.name}</h4>
              <p className="rds-role-tag">{role.tag}</p>
              <ul>
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <h3 className="rds-subhead">{copy.architectureTitle}</h3>
        <div className="rds-arch">
          {copy.architecture.map((tier) => (
            <article className="rds-arch-item" key={tier.title}>
              <h4>{tier.title}</h4>
              <p>{tier.description}</p>
            </article>
          ))}
        </div>

        <h3 className="rds-subhead">{copy.pathTitle}</h3>
        <ol className="rds-path">
          {copy.path.map((step, index) => (
            <li className="rds-path-item" key={step.stage}>
              <span className="rds-path-no">{String(index + 1).padStart(2, "0")}</span>
              <h4>{step.stage}</h4>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>

        <SectionNote>
          <span>{copy.note}</span>
          <a href="#contact">
            {copy.cta} <span aria-hidden="true">↗</span>
          </a>
        </SectionNote>
      </div>
    </section>
  );
}
