import { translations } from "../i18n/translations";
import { useInView } from "../hooks/useInView";
import { useLanguage } from "../hooks/useLanguage";

export function Platform() {
  const { language } = useLanguage();
  const { ref, visible } = useInView<HTMLElement>();
  const copy = translations[language].platform;

  const goContact = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  const reveal = `transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`;

  return (
    <section id="platform" ref={ref} className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className={`text-center mb-12 ${reveal}`}>
          <span className="inline-block px-4 py-2 bg-[#D4A853]/15 text-[#8B7355] text-sm rounded-full mb-6 font-serif">
            {copy.sectionTitle}
          </span>
          <h2 className="section-title">{copy.title}</h2>
          <p className="section-subtitle max-w-3xl mx-auto">{copy.subtitle}</p>
        </div>

        <p className={`max-w-4xl mx-auto text-[#666666] leading-relaxed font-serif text-center mb-16 ${reveal}`}>
          {copy.intro}
        </p>

        <h3 className="text-2xl md:text-3xl font-medium mb-10 text-center">{copy.rolesTitle}</h3>
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {copy.roles.map((role, index) => (
            <div
              key={role.name}
              className={`bg-white/80 rounded-3xl p-8 border border-[#E8DFD0] ${reveal}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <h4 className="text-xl font-medium mb-1">{role.name}</h4>
              <p className="text-[#8B7355] text-sm mb-5">{role.tag}</p>
              <ul className="space-y-3 text-[#666666] font-serif leading-relaxed list-disc pl-5">
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="text-2xl md:text-3xl font-medium mb-10 text-center">{copy.architectureTitle}</h3>
        <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto">
          {copy.architecture.map((tier) => (
            <div key={tier.title} className="rounded-3xl p-8 bg-[#2D4A3E] text-white">
              <h4 className="text-xl font-medium mb-3 text-[#E8C87A]">{tier.title}</h4>
              <p className="text-white/80 leading-relaxed font-serif">{tier.description}</p>
            </div>
          ))}
        </div>

        <h3 className="text-2xl md:text-3xl font-medium mb-10 text-center">{copy.pathTitle}</h3>
        <ol className="grid md:grid-cols-3 gap-8 mb-12">
          {copy.path.map((step, index) => (
            <li key={step.stage} className="bg-white/80 rounded-3xl p-8 border border-[#E8DFD0]">
              <div className="w-10 h-10 rounded-full bg-[#D4A853] text-white flex items-center justify-center mb-4">
                {index + 1}
              </div>
              <h4 className="text-lg font-medium mb-2">{step.stage}</h4>
              <p className="text-[#666666] font-serif leading-relaxed">{step.description}</p>
            </li>
          ))}
        </ol>

        <p className="text-center text-sm text-[#8B7355] font-serif mb-8">{copy.note}</p>
        <div className="text-center">
          <button type="button" onClick={goContact} className="btn-primary">
            {copy.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
