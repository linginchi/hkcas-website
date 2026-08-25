import { CheckCircle2, Mail, MapPin, QrCode } from "lucide-react";
import { useState, type FormEvent } from "react";
import { postJson } from "../lib/api";
import { useInView } from "../hooks/useInView";
import { useLanguage } from "../hooks/useLanguage";

export function Contact() {
  const { language, t } = useLanguage();
  const { ref, visible } = useInView<HTMLElement>();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const { response, payload } = await postJson("/api/contact", formData, {
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok || payload.ok !== true) {
        throw new Error(typeof payload.error === "string" ? payload.error : t("contact.form.error"));
      }
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : t("contact.form.error"));
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 bg-[#D4A853]/15 text-[#8B7355] text-sm rounded-full mb-6 font-serif">
            {t("contact.sectionTitle")}
          </span>
          <h2 className="section-title">{t("contact.title")}</h2>
          <p className="section-subtitle max-w-3xl mx-auto">{t("contact.subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/70 rounded-3xl p-6 border border-[#E8DFD0] flex gap-4">
              <MapPin className="w-6 h-6 text-[#D4A853] shrink-0" />
              <div>
                <div className="text-sm text-[#8B7355] mb-1">{t("contact.info.address.title")}</div>
                <div>{t("contact.info.address.value")}</div>
              </div>
            </div>
            <div className="bg-white/70 rounded-3xl p-6 border border-[#E8DFD0] flex gap-4">
              <Mail className="w-6 h-6 text-[#D4A853] shrink-0" />
              <div>
                <div className="text-sm text-[#8B7355] mb-1">{t("contact.info.email.title")}</div>
                <a href="mailto:contact@hkcas.org" className="hover:text-[#4A7C59]">
                  {t("contact.info.email.value")}
                </a>
              </div>
            </div>
            <div className="bg-white/70 rounded-3xl p-6 border border-[#E8DFD0]">
              <div className="flex gap-4 mb-4">
                <QrCode className="w-6 h-6 text-[#4A7C59] shrink-0" />
                <div>
                  <div className="text-sm text-[#8B7355] mb-1">{t("contact.info.wechat.title")}</div>
                  <div>{t("contact.info.wechat.value")}</div>
                </div>
              </div>
              <div className="h-32 rounded-2xl bg-[#FFF9E6] flex items-center justify-center text-[#8B7355] text-sm">
                {language === "zh" ? "二维码" : "QR Code"}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-10"
              style={{ boxShadow: "0 4px 24px rgba(212, 168, 83, 0.08)" }}
            >
              <h3 className="text-xl font-medium text-[#1a1a1a] mb-2">{t("contact.form.title")}</h3>
              <p className="text-[#8B7355] mb-8 font-serif">{t("contact.form.description")}</p>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#4A7C59]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#4A7C59]" />
                  </div>
                  <h4 className="text-xl font-medium mb-2">{t("contact.form.success.title")}</h4>
                  <p className="text-[#8B7355] font-serif">{t("contact.form.success.message")}</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <label className="space-y-2 block">
                      <span className="text-sm">
                        {t("contact.form.name")} <span className="text-[#D4A853]">*</span>
                      </span>
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                        required
                        placeholder={language === "zh" ? "请输入您的姓名" : "Enter your name"}
                        className="w-full rounded-xl border border-[#E8DFD0] bg-white px-4 py-3 focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20 outline-none"
                      />
                    </label>
                    <label className="space-y-2 block">
                      <span className="text-sm">
                        {t("contact.form.email")} <span className="text-[#D4A853]">*</span>
                      </span>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={onChange}
                        required
                        placeholder={language === "zh" ? "请输入您的邮箱" : "Enter your email"}
                        className="w-full rounded-xl border border-[#E8DFD0] bg-white px-4 py-3 focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20 outline-none"
                      />
                    </label>
                  </div>
                  <label className="space-y-2 block">
                    <span className="text-sm">
                      {t("contact.form.message")} <span className="text-[#D4A853]">*</span>
                    </span>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={onChange}
                      required
                      rows={5}
                      placeholder={language === "zh" ? "请输入您想咨询的内容" : "Enter your message"}
                      className="w-full rounded-xl border border-[#E8DFD0] bg-white px-4 py-3 focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20 outline-none"
                    />
                  </label>
                  {error ? <p className="text-sm text-red-600">{error}</p> : null}
                  <button type="submit" disabled={sending} className="btn-primary disabled:opacity-50">
                    {sending ? t("contact.form.sending") : t("contact.form.submit")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
