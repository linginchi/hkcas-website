import { useState, type FormEvent } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";
import { postJson } from "../../lib/api";
import { SectionHead } from "../shared";

export function Contact() {
  const { language } = useLanguage();
  const copy = translations[language].contact;
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "", website: "" });

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSending(true);
    setError("");
    try {
      const { response, payload } = await postJson(
        "/api/contact",
        { ...formData, lang: language },
        { signal: AbortSignal.timeout(12000) },
      );
      if (!response.ok || payload.ok !== true) {
        throw new Error(
          typeof payload.error === "string" ? payload.error : copy.form.error,
        );
      }
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "", website: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.form.error);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="rds-section" id="contact">
      <div className="rds-container">
        <SectionHead label={`12 / ${copy.sectionTitle}`} title={copy.title} lead={copy.subtitle} />

        <div className="rds-contact-grid">
          <div className="rds-contact-info">
            <div className="rds-info-item">
              <span className="rds-info-label">{copy.info.address.title}</span>
              <span className="rds-info-value">{copy.info.address.value}</span>
            </div>
            <div className="rds-info-item">
              <span className="rds-info-label">{copy.info.email.title}</span>
              <a className="rds-info-value" href="mailto:contact@hkcas.org">
                {copy.info.email.value}
              </a>
            </div>
          </div>

          <div className="rds-contact-form">
            <h3>{copy.form.title}</h3>
            <p className="rds-form-desc">{copy.form.description}</p>

            {submitted ? (
              <div className="rds-form-success">
                <h4>{copy.form.success.title}</h4>
                <p>{copy.form.success.message}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                {/* Honeypot: hidden from people, often filled by bots. */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={onChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="rds-honeypot"
                />

                <div className="rds-form-row">
                  <label className="rds-field">
                    <span>
                      {copy.form.name} <i>*</i>
                    </span>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={onChange}
                      required
                      placeholder={language === "zh" ? "请输入您的姓名" : "Enter your name"}
                    />
                  </label>
                  <label className="rds-field">
                    <span>
                      {copy.form.email} <i>*</i>
                    </span>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={onChange}
                      required
                      placeholder={language === "zh" ? "请输入您的邮箱" : "Enter your email"}
                    />
                  </label>
                </div>

                <label className="rds-field">
                  <span>
                    {copy.form.message} <i>*</i>
                  </span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={onChange}
                    required
                    rows={4}
                    placeholder={
                      language === "zh" ? "请输入您想咨询的内容" : "Enter your message"
                    }
                  />
                </label>

                {error ? <p className="rds-form-error">{error}</p> : null}

                <button className="rds-btn" type="submit" disabled={sending}>
                  {sending ? copy.form.sending : copy.form.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
