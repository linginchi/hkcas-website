import { COOPERATION_ITEMS } from "../data/people";
import { useLanguage } from "../hooks/useLanguage";

export function International() {
  const { language } = useLanguage();
  if (COOPERATION_ITEMS.length === 0) return null;

  return (
    <section id="international" className="py-24 md:py-32 sunlit-bg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="section-title text-center mb-16">{language === "zh" ? "国际合作" : "International Cooperation"}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COOPERATION_ITEMS.map((item) => (
            <article key={item.title.en} className="bg-white/80 rounded-3xl overflow-hidden border border-[#E8DFD0]">
              {item.photo ? (
                <img src={item.photo} alt={item.title[language]} loading="lazy" className="w-full h-48 object-cover" />
              ) : null}
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2">{item.title[language]}</h3>
                <p className="text-[#666666] font-serif leading-relaxed">{item.description[language]}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
