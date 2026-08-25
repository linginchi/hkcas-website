import { ArrowRight } from "lucide-react";
import { translations } from "../i18n/translations";
import { useInView } from "../hooks/useInView";
import { useLanguage } from "../hooks/useLanguage";

export function Services() {
  const { language, t } = useLanguage();
  const { ref, visible } = useInView<HTMLElement>();
  const copy = translations[language].services;
  const items = [
    { number: "01", ...copy.service1 },
    { number: "02", ...copy.service2 },
    { number: "03", ...copy.service3 },
  ];

  const goContact = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="services"
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a3a2e 0%, #2D4A3E 50%, #1a3a2e 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 0%, rgba(255, 215, 140, 0.15) 0%, transparent 40%), radial-gradient(ellipse at 20% 100%, rgba(255, 220, 150, 0.08) 0%, transparent 35%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 bg-white/10 text-[#D4A853] text-sm rounded-full mb-6 font-serif">
            {t("services.sectionTitle")}
          </span>
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-4">{t("services.title")}</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-serif">{t("services.subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={item.number}
              className={`group relative bg-white/5 backdrop-blur-sm border border-white/15 rounded-3xl p-8 hover:border-[#D4A853]/40 transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="absolute -top-4 -right-4 w-14 h-14 bg-[#D4A853] rounded-2xl flex items-center justify-center text-white text-lg font-medium shadow-lg group-hover:scale-110 transition-transform duration-300">
                {item.number}
              </div>
              <h3 className="text-xl font-medium text-white mb-4 pr-10">{item.title}</h3>
              <p className="text-white/70 leading-relaxed mb-6 font-serif">{item.description}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {item.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 text-xs rounded-full bg-white/10 text-[#E8C87A] border border-white/10"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <button type="button" onClick={goContact} className="inline-flex items-center gap-2 text-[#D4A853]">
                {t("services.ctaButton")}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-white/70 mb-6 font-serif">{t("services.cta")}</p>
          <button type="button" onClick={goContact} className="btn-primary">
            {t("services.ctaButton")}
          </button>
        </div>
      </div>
    </section>
  );
}
