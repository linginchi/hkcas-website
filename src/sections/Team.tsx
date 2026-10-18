import { TEAM_MEMBERS } from "../data/people";
import { useLanguage } from "../hooks/useLanguage";

const GROUPS = [
  { key: "management", zh: "核心管理团队", en: "Core Management" },
  { key: "experts", zh: "智库与专家团队", en: "Think Tank and Experts" },
  { key: "advisors", zh: "国际顾问委员会", en: "International Advisory Board" },
] as const;

export function Team() {
  const { language } = useLanguage();
  if (TEAM_MEMBERS.length === 0) return null;

  return (
    <section id="team" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="section-title text-center mb-16">{language === "zh" ? "团队成员" : "Our Team"}</h2>
        {GROUPS.map((group) => {
          const members = TEAM_MEMBERS.filter((m) => m.group === group.key);
          if (members.length === 0) return null;
          return (
            <div key={group.key} className="mb-16">
              <h3 className="text-2xl font-medium mb-8">{group[language]}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {members.map((m) => (
                  <article key={m.name.en} className="bg-white/80 rounded-3xl p-8 border border-[#E8DFD0]">
                    {m.photo ? (
                      <img src={m.photo} alt={m.name[language]} loading="lazy" className="w-24 h-24 rounded-full object-cover mb-4" />
                    ) : null}
                    <h4 className="text-xl font-medium">{m.name[language]}</h4>
                    <p className="text-[#8B7355] mb-3">{m.title[language]}</p>
                    <p className="text-[#666666] font-serif leading-relaxed">{m.bio[language]}</p>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
