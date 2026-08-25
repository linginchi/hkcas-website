import { GraduationCap, Landmark, Lightbulb, Sprout } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { useInView } from "../hooks/useInView";

export function Philanthropy() {
  const { language, t } = useLanguage();
  const { ref, visible } = useInView<HTMLElement>();
  const goContact = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  const donations = [
    {
      name: language === "zh" ? "香港福建商会教育基金会有限公司" : "Hong Kong Fujian Chamber of Commerce Education Foundation",
      category: t("philanthropy.donations.education"),
      icon: GraduationCap,
    },
    {
      name: language === "zh" ? "香港福建社团联会" : "Hong Kong Fujian Association",
      category: t("philanthropy.donations.organization"),
      icon: Landmark,
    },
    {
      name: language === "zh" ? "香港北京社团总会" : "Hong Kong Beijing Clansmen Association",
      category: t("philanthropy.donations.organization"),
      icon: Landmark,
    },
    {
      name: language === "zh" ? "美国哥伦比亚大学晓东金融科技研究基金" : "Columbia University Aurora Fintech Research Fund",
      subtitle: "Aurora Fintech Research Fund",
      category: t("philanthropy.donations.research"),
      icon: Lightbulb,
    },
    {
      name: language === "zh" ? "晓东未来创业家奖" : "Aurora Future Entrepreneurs Award",
      subtitle: "Aurora Future Entrepreneurs Award",
      category: t("philanthropy.donations.entrepreneurship"),
      icon: Sprout,
    },
  ];

  return (
    <section id="philanthropy" ref={ref} className="py-24 md:py-32 sunlit-bg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 bg-[#D4A853]/15 text-[#8B7355] text-sm rounded-full mb-6 font-serif">
            {t("philanthropy.sectionTitle")}
          </span>
          <h2 className="section-title">{t("philanthropy.title")}</h2>
          <p className="section-subtitle max-w-3xl mx-auto">{t("philanthropy.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {donations.map((item) => (
            <div key={item.name} className="bg-white/80 rounded-3xl p-6 border border-[#E8DFD0]">
              <item.icon className="w-8 h-8 text-[#D4A853] mb-4" />
              <div className="text-xs text-[#8B7355] mb-2">{item.category}</div>
              <h3 className="font-medium mb-1">{item.name}</h3>
              {item.subtitle ? <p className="text-sm text-[#666666]">{item.subtitle}</p> : null}
            </div>
          ))}
        </div>

        <blockquote className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xl md:text-2xl font-serif text-[#2D4A3E] mb-4">“{t("philanthropy.quote")}”</p>
          <cite className="text-[#8B7355] not-italic">{t("philanthropy.quoteAuthor")}</cite>
        </blockquote>

        <div className="text-center">
          <h3 className="text-2xl font-medium mb-3">{t("philanthropy.cta.title")}</h3>
          <p className="text-[#666666] mb-6 font-serif">{t("philanthropy.cta.description")}</p>
          <button type="button" onClick={goContact} className="btn-primary">
            {t("philanthropy.cta.button")}
          </button>
        </div>
      </div>
    </section>
  );
}
