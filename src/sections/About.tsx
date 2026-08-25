import { useInView } from "../hooks/useInView";
import { useLanguage } from "../hooks/useLanguage";

const MILESTONES = ["forum", "mou", "founded", "control"] as const;

export function About() {
  const { t } = useLanguage();
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 bg-[#D4A853]/15 text-[#8B7355] text-sm rounded-full mb-6 font-serif">
            {t("about.sectionTitle")}
          </span>
          <h2 className="section-title">{t("about.title")}</h2>
          <p className="section-subtitle max-w-3xl mx-auto">{t("about.subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img src="/forum-photo.png" alt="Forum" className="w-full h-auto object-cover" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-medium mb-6">{t("about.historyTitle")}</h3>
            <div className="space-y-4 text-[#666666] leading-relaxed font-serif">
              <p>{t("about.history1")}</p>
              <p>{t("about.history2")}</p>
              <p>{t("about.history3")}</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-10">
              <div>
                <div className="text-2xl font-medium text-[#2D4A3E]">{t("about.foundedValue")}</div>
                <div className="text-sm text-[#666666] mt-1">{t("about.founded")}</div>
              </div>
              <div>
                <div className="text-2xl font-medium text-[#2D4A3E]">{t("about.locationValue")}</div>
                <div className="text-sm text-[#666666] mt-1">{t("about.location")}</div>
              </div>
              <div>
                <div className="text-2xl font-medium text-[#2D4A3E]">{t("about.natureValue")}</div>
                <div className="text-sm text-[#666666] mt-1">{t("about.nature")}</div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-medium mb-10 text-center">{t("about.timelineTitle")}</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MILESTONES.map((key) => (
            <div key={key} className="bg-white/70 rounded-3xl p-6 border border-[#E8DFD0]">
              <div className="text-[#D4A853] font-medium mb-2">{t(`about.milestones.${key}.year`)}</div>
              <div className="text-lg font-medium mb-3">{t(`about.milestones.${key}.title`)}</div>
              <p className="text-sm text-[#666666] leading-relaxed font-serif">
                {t(`about.milestones.${key}.content`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
