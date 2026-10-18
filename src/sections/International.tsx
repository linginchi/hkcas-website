import { COOPERATION_GALLERY, COOPERATION_ITEMS, COOPERATION_STATS } from "../data/people";
import { useInView } from "../hooks/useInView";
import { useLanguage } from "../hooks/useLanguage";

export function International() {
  const { language, t } = useLanguage();
  const { ref, visible } = useInView<HTMLElement>();
  if (COOPERATION_ITEMS.length === 0) return null;

  return (
    <section id="international" ref={ref} className="py-24 md:py-32 sunlit-bg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 bg-[#D4A853]/15 text-[#8B7355] text-sm rounded-full mb-6 font-serif">
            {t("international.sectionTitle")}
          </span>
          <h2 className="section-title">{t("international.title")}</h2>
          <p className="section-subtitle max-w-3xl mx-auto">{t("international.subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {COOPERATION_STATS.map((stat) => (
            <div key={stat.label.en} className="text-center bg-white/70 rounded-3xl p-6 border border-[#E8DFD0]">
              <div className="text-3xl md:text-4xl font-medium text-[#2D4A3E]">{stat.value[language]}</div>
              <div className="text-sm text-[#666666] mt-2 font-serif leading-relaxed">{stat.label[language]}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {COOPERATION_ITEMS.map((item) => (
            <article key={item.title.en} className="bg-white/80 rounded-3xl overflow-hidden border border-[#E8DFD0]">
              {item.photo ? (
                <img
                  src={item.photo}
                  alt={item.title[language]}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-48 object-cover"
                />
              ) : null}
              <div className="p-6">
                <h3 className="text-xl font-medium mb-3">{item.title[language]}</h3>
                <p className="text-[#666666] font-serif leading-relaxed">{item.description[language]}</p>
              </div>
            </article>
          ))}
        </div>

        <h3 className="text-2xl md:text-3xl font-medium my-10 text-center">{t("international.galleryTitle")}</h3>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 mb-10">
          {COOPERATION_GALLERY.map((img) => (
            <figure key={img.src} className="mb-6 break-inside-avoid bg-white/80 rounded-2xl overflow-hidden border border-[#E8DFD0]">
              <img src={img.src} alt={img.caption[language]} loading="lazy" decoding="async" className="w-full h-auto" />
              <figcaption className="px-4 py-3 text-sm text-[#666666] font-serif">{img.caption[language]}</figcaption>
            </figure>
          ))}
        </div>

        <p className="text-center text-sm text-[#8B7355] font-serif">{t("international.note")}</p>
      </div>
    </section>
  );
}
