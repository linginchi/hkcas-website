import { ArrowUpRight } from "lucide-react";
import { translations } from "../i18n/translations";
import { useInView } from "../hooks/useInView";
import { useLanguage } from "../hooks/useLanguage";

export function Cases() {
  const { language, t } = useLanguage();
  const { ref, visible } = useInView<HTMLElement>();
  const copy = translations[language].cases;

  const goContact = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="cases" ref={ref} className="py-24 md:py-32 sunlit-bg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 bg-[#D4A853]/15 text-[#8B7355] text-sm rounded-full mb-6 font-serif">
            {t("cases.sectionTitle")}
          </span>
          <h2 className="section-title">{t("cases.title")}</h2>
          <p className="section-subtitle max-w-3xl mx-auto">{t("cases.subtitle")}</p>
        </div>

        <div className="space-y-10">
          <article className="bg-white/80 rounded-3xl p-8 md:p-12 border border-[#E8DFD0]">
            <div className="flex flex-wrap gap-3 mb-4 text-sm">
              <span className="px-3 py-1 rounded-full bg-[#2D4A3E] text-white">{copy.case1.status}</span>
              <span className="px-3 py-1 rounded-full bg-[#D4A853]/15 text-[#8B7355]">{copy.case1.category}</span>
              <span className="text-[#666666]">{copy.case1.location}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-medium mb-2">{copy.case1.title}</h3>
            <p className="text-[#8B7355] mb-6">{copy.case1.subtitle}</p>
            <p className="text-[#666666] leading-relaxed font-serif mb-8">{copy.case1.description}</p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {Object.values(copy.case1.highlights).map((item) => (
                <div key={item.label}>
                  <div className="text-sm text-[#8B7355] mb-1">{item.label}</div>
                  <div className="font-medium">{item.value}</div>
                </div>
              ))}
            </div>
            <ul className="space-y-2 text-[#666666] font-serif mb-8 list-disc pl-5">
              {copy.case1.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            <a
              href="http://www.hzszjt.cn"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[#2D4A3E] font-medium"
            >
              {copy.case1.website}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </article>

          <article className="bg-white/80 rounded-3xl p-8 md:p-12 border border-[#E8DFD0]">
            <div className="flex flex-wrap gap-3 mb-4 text-sm">
              <span className="px-3 py-1 rounded-full bg-[#D4A853] text-white">{copy.case2.status}</span>
              <span className="px-3 py-1 rounded-full bg-[#D4A853]/15 text-[#8B7355]">{copy.case2.category}</span>
              <span className="text-[#666666]">{copy.case2.location}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-medium mb-2">{copy.case2.title}</h3>
            <p className="text-[#8B7355] mb-6">{copy.case2.subtitle}</p>
            <p className="text-[#666666] leading-relaxed font-serif mb-8">{copy.case2.description}</p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {Object.values(copy.case2.highlights).map((item) => (
                <div key={item.label}>
                  <div className="text-sm text-[#8B7355] mb-1">{item.label}</div>
                  <div className="font-medium">{item.value}</div>
                </div>
              ))}
            </div>
            <ul className="space-y-2 text-[#666666] font-serif">
              {copy.case2.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="text-center mt-16">
          <p className="section-subtitle mb-6">{t("cases.cta")}</p>
          <button type="button" onClick={goContact} className="btn-primary">
            {t("cases.ctaButton")}
          </button>
        </div>
      </div>
    </section>
  );
}
