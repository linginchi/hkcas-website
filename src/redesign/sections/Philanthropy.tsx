import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";
import { SectionHead, SectionNote } from "../shared";

export function Philanthropy() {
  const { language } = useLanguage();
  const copy = translations[language].philanthropy;

  const donations = [
    {
      name:
        language === "zh"
          ? "香港福建商会教育基金会有限公司"
          : "Hong Kong Fujian Chamber of Commerce Education Foundation",
      category: copy.donations.education,
    },
    {
      name: language === "zh" ? "香港福建社团联会" : "Hong Kong Fujian Association",
      category: copy.donations.organization,
    },
    {
      name: language === "zh" ? "香港北京社团总会" : "Hong Kong Beijing Clansmen Association",
      category: copy.donations.organization,
    },
    {
      name:
        language === "zh"
          ? "美国哥伦比亚大学晓东金融科技研究基金"
          : "Columbia University Aurora Fintech Research Fund",
      subtitle: "Aurora Fintech Research Fund",
      category: copy.donations.research,
    },
    {
      name: language === "zh" ? "晓东未来创业家奖" : "Aurora Future Entrepreneurs Award",
      subtitle: "Aurora Future Entrepreneurs Award",
      category: copy.donations.entrepreneurship,
    },
  ];

  return (
    <section className="rds-section" id="philanthropy">
      <div className="rds-container">
        <SectionHead label={`11 / ${copy.sectionTitle}`} title={copy.title} lead={copy.subtitle} />

        <SectionNote>
          <span>{copy.note}</span>
        </SectionNote>

        <div className="rds-donations">
          {donations.map((item) => (
            <article className="rds-donation" key={item.name}>
              <span className="rds-donation-cat">{item.category}</span>
              <h3>{item.name}</h3>
              {item.subtitle ? <p>{item.subtitle}</p> : null}
            </article>
          ))}
        </div>

        <blockquote className="rds-quote">
          <p>“{copy.quote}”</p>
          <cite>{copy.quoteAuthor}</cite>
        </blockquote>
      </div>
    </section>
  );
}
