import { GraduationCap, Landmark, Lightbulb, Sprout } from "lucide-react";
import { useState, type FormEvent } from "react";
import { postJson } from "../lib/api";
import { useLanguage } from "../hooks/useLanguage";
import { useInView } from "../hooks/useInView";

export function Philanthropy() {
  const { language, t } = useLanguage();
  const { ref, visible } = useInView<HTMLElement>();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "" });

  const donations = [
    {
      name: language === "zh" ? "香港福建商会教育基金会有限公司" : "Hong Kong Fujian Chamber of Commerce Education Foundation",
      category: t("philanthropy.donations.education"),
      icon: GraduationCap,
    },
    {
      name: language === "zh" ? "香港福建社团联会" : "Hong Kong Fujian Association",
      category: t("philanthropy.donations.organization"),
      icon: Landmark,
    },
    {
      name: language === "zh" ? "香港北京社团总会" : "Hong Kong Beijing Clansmen Association",
      category: t("philanthropy.donations.organization"),
      icon: Landmark,
    },
    {
      name: language === "zh" ? "美国哥伦比亚大学晓东金融科技研究基金" : "Columbia University Aurora Fintech Research Fund",
      subtitle: "Aurora Fintech Research Fund",
      category: t("philanthropy.donations.research"),
      icon: Lightbulb,
    },
    {
      name: language === "zh" ? "晓东未来创业家奖" : "Aurora Future Entrepreneurs Award",
      subtitle: "Aurora Future Entrepreneurs Award",
      category: t("philanthropy.donations.entrepreneurship"),
      icon: Sprout,
    },
  ];

  const donate = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const { response, payload } = await postJson("/api/payments/donate", form, {
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok || typeof payload.checkoutUrl !== "string") {
        throw new Error(typeof payload.error === "string" ? payload.error : t("philanthropy.give.error"));
      }
      window.location.href = payload.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : t("philanthropy.give.error"));
      setSending(false);
    }
  };

  return (
    <section id="philanthropy" ref={ref} className="py-24 md:py-32 sunlit-bg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 bg-[#D4A853]/15 text-[#8B7355] text-sm rounded-full mb-6 font-serif">
            {t("philanthropy.sectionTitle")}
          </span>
          <h2 className="section-title">{t("philanthropy.title")}</h2>
          <p className="section-subtitle max-w-3xl mx-auto">{t("philanthropy.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {donations.map((item) => (
            <div key={item.name} className="bg-white/80 rounded-3xl p-6 border border-[#E8DFD0]">
              <item.icon className="w-8 h-8 text-[#D4A853] mb-4" />
              <div className="text-xs text-[#8B7355] mb-2">{item.category}</div>
              <h3 className="font-medium mb-1">{item.name}</h3>
              {item.subtitle ? <p className="text-sm text-[#666666]">{item.subtitle}</p> : null}
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mb-16 bg-[#2D4A3E] text-[#FFF9E6] rounded-3xl p-8 md:p-10">
          <p className="text-sm tracking-wide text-[#D4A853] mb-3">{t("philanthropy.give.kicker")}</p>
          <h3 className="text-2xl md:text-3xl font-medium mb-4">{t("philanthropy.give.title")}</h3>
          <p className="font-serif text-[#FFF9E6]/85 mb-8">{t("philanthropy.give.body")}</p>
          <div className="flex items-end gap-3 mb-8">
            <span className="text-sm text-[#D4A853] pb-2">{t("philanthropy.give.currency")}</span>
            <span className="text-5xl md:text-6xl font-medium leading-none">1,000</span>
          </div>
          <form onSubmit={donate} className="grid sm:grid-cols-2 gap-4">
            <label className="space-y-2 block">
              <span className="text-sm text-[#FFF9E6]/80">{t("philanthropy.give.name")}</span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#D4A853]"
                placeholder={language === "zh" ? "捐赠人姓名" : "Donor name"}
              />
            </label>
            <label className="space-y-2 block">
              <span className="text-sm text-[#FFF9E6]/80">{t("philanthropy.give.email")}</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#D4A853]"
                placeholder={language === "zh" ? "用于接收收据" : "For your receipt"}
              />
            </label>
            <div className="sm:col-span-2">
              <p className="text-sm text-[#FFF9E6]/70 mb-4">{t("philanthropy.give.note")}</p>
              {error ? <p className="text-sm text-red-200 mb-3">{error}</p> : null}
              <button type="submit" disabled={sending} className="btn-primary bg-[#D4A853] text-[#1a3a2e] hover:bg-[#c49a48] disabled:opacity-50">
                {sending ? t("philanthropy.give.sending") : t("philanthropy.give.button")}
              </button>
            </div>
          </form>
        </div>

        <blockquote className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xl md:text-2xl font-serif text-[#2D4A3E] mb-4">“{t("philanthropy.quote")}”</p>
          <cite className="text-[#8B7355] not-italic">{t("philanthropy.quoteAuthor")}</cite>
        </blockquote>
      </div>
    </section>
  );
}
