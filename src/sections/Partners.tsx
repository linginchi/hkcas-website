import { translations } from "../i18n/translations";
import { useInView } from "../hooks/useInView";
import { useLanguage } from "../hooks/useLanguage";

export function Partners() {
  const { language, t } = useLanguage();
  const { ref, visible } = useInView<HTMLElement>();
  const copy = translations[language].partners;
  const goContact = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="partners" ref={ref} className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 bg-[#D4A853]/15 text-[#8B7355] text-sm rounded-full mb-6 font-serif">
            {t("partners.sectionTitle")}
          </span>
          <h2 className="section-title">{t("partners.title")}</h2>
          <p className="section-subtitle max-w-3xl mx-auto">{t("partners.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {[copy.partner1, copy.partner2].map((partner) => (
            <div key={partner.title} className="bg-white/80 rounded-3xl p-8 border border-[#E8DFD0]">
              <span className="inline-block px-3 py-1 text-xs rounded-full bg-[#2D4A3E] text-white mb-4">
                {partner.tag}
              </span>
              <h3 className="text-xl font-medium mb-2">{partner.title}</h3>
              <p className="text-[#8B7355] mb-4">{partner.subtitle}</p>
              <p className="text-[#666666] leading-relaxed font-serif">{partner.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center bg-[#FFF9E6] rounded-3xl p-10">
          <h3 className="text-2xl font-medium mb-3">{copy.cta.title}</h3>
          <p className="text-[#666666] mb-6 font-serif">{copy.cta.description}</p>
          <button type="button" onClick={goContact} className="btn-primary">
            {copy.cta.button}
          </button>
        </div>
      </div>
    </section>
  );
}
