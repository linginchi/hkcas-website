import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";
import { SectionHead } from "../shared";

export function Mission() {
  const { language } = useLanguage();
  const copy = translations[language].mission;
  const hero = translations[language].hero;

  return (
    <section className="rds-section" id="mission">
      <div className="rds-container">
        <SectionHead label={`02 / ${copy.sectionTitle}`} title={copy.title} lead={copy.subtitle} />

        <p className="rds-intro">{hero.description}</p>

        <div className="rds-split">
          <div className="rds-statement">
            <p className="rds-kicker">Mission</p>
            <h3>{copy.mission.title}</h3>
            <p>{copy.mission.content}</p>
          </div>
          <div className="rds-statement rds-statement--vision">
            <p className="rds-kicker">Vision</p>
            <h3>{copy.vision.title}</h3>
            <p>{copy.vision.content}</p>
          </div>
        </div>

        <div className="rds-cap-head">
          <h3>{copy.capabilities.title}</h3>
          <p>{copy.capabilities.subtitle}</p>
        </div>

        <div className="rds-cap-grid">
          {copy.capabilities.items.map((item, index) => (
            <article className="rds-cap" key={item.title}>
              <span className="rds-cap-no">{String(index + 1).padStart(2, "0")}</span>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </article>
          ))}
        </div>

        <div className="rds-features">
          <div className="rds-feature">
            <strong>{copy.features.consulting}</strong>
            <span>{copy.features.consultingDesc}</span>
          </div>
          <div className="rds-feature">
            <strong>{copy.features.digital}</strong>
            <span>{copy.features.digitalDesc}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
