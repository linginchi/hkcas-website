import { Leaf, Sun } from "lucide-react";
import { useInView } from "../hooks/useInView";
import { translations } from "../i18n/translations";
import { useLanguage } from "../hooks/useLanguage";

export function MissionVision() {
  const { language, t } = useLanguage();
  const capabilities = translations[language].mission.capabilities;
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section id="mission" ref={ref} className="py-24 md:py-32 sunlit-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 bg-[#D4A853]/15 text-[#8B7355] text-sm rounded-full mb-6 font-serif">
            {t("mission.sectionTitle")}
          </span>
          <h2 className="section-title">{t("mission.title")}</h2>
          <p className="section-subtitle max-w-3xl mx-auto">{t("mission.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-10 border border-[#E8DFD0]">
            <div className="w-12 h-12 rounded-2xl bg-[#2D4A3E]/10 flex items-center justify-center mb-6">
              <Sun className="w-6 h-6 text-[#D4A853]" />
            </div>
            <h3 className="text-2xl font-medium mb-4">{t("mission.mission.title")}</h3>
            <p className="text-[#666666] leading-relaxed font-serif">{t("mission.mission.content")}</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-10 border border-[#E8DFD0]">
            <div className="w-12 h-12 rounded-2xl bg-[#4A7C59]/10 flex items-center justify-center mb-6">
              <Leaf className="w-6 h-6 text-[#4A7C59]" />
            </div>
            <h3 className="text-2xl font-medium mb-4">{t("mission.vision.title")}</h3>
            <p className="text-[#666666] leading-relaxed font-serif">{t("mission.vision.content")}</p>
          </div>
        </div>

        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-medium mb-3">{capabilities.title}</h3>
          <p className="text-[#666666] font-serif max-w-3xl mx-auto">{capabilities.subtitle}</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {capabilities.items.map((item) => (
            <div key={item.title} className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-[#E8DFD0]">
              <h4 className="text-xl font-medium mb-3 text-[#2D4A3E]">{item.title}</h4>
              <p className="text-[#666666] leading-relaxed font-serif">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="text-center p-6">
            <div className="text-lg font-medium text-[#2D4A3E] mb-2">{t("mission.features.consulting")}</div>
            <div className="text-[#666666] font-serif">{t("mission.features.consultingDesc")}</div>
          </div>
          <div className="text-center p-6">
            <div className="text-lg font-medium text-[#2D4A3E] mb-2">{t("mission.features.digital")}</div>
            <div className="text-[#666666] font-serif">{t("mission.features.digitalDesc")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
