import { ArrowUpRight } from "lucide-react";
import { translations } from "../i18n/translations";
import { useInView } from "../hooks/useInView";
import { useLanguage } from "../hooks/useLanguage";

export function Companies() {
  const { language } = useLanguage();
  const { ref, visible } = useInView<HTMLElement>();
  const copy = translations[language].companies;

  return (
    <section id="companies" ref={ref} className="py-24 md:py-32 sunlit-bg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 bg-[#D4A853]/15 text-[#8B7355] text-sm rounded-full mb-6 font-serif">
            {copy.sectionTitle}
          </span>
          <h2 className="section-title">{copy.title}</h2>
          <p className="section-subtitle max-w-3xl mx-auto">{copy.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          {copy.items.map((company, index) => (
            <article
              key={company.name}
              className={`bg-white/80 rounded-3xl p-8 border border-[#E8DFD0] flex flex-col transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <span className="self-start px-3 py-1 text-xs rounded-full bg-[#2D4A3E] text-white mb-4">
                {company.tag}
              </span>
              <h3 className="text-xl font-medium mb-1">{company.name}</h3>
              {company.altName ? <p className="text-[#8B7355] text-sm mb-4">{company.altName}</p> : <div className="mb-4" />}
              <p className="text-[#666666] leading-relaxed font-serif flex-1">{company.description}</p>
              {company.website ? (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-[#2D4A3E] font-medium mt-6"
                >
                  {copy.visit}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              ) : null}
            </article>
          ))}
        </div>

        <p className="text-center text-sm text-[#8B7355] font-serif">{copy.note}</p>
      </div>
    </section>
  );
}
