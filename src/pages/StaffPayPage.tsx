import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { postJson } from "../lib/api";
import { Navigation } from "../sections/Navigation";
import { useLanguage } from "../hooks/useLanguage";

type CreatedPayment = {
  id: string;
  checkoutUrl: string;
  siteUrl: string;
  currency: string;
  amount: number;
};

export function StaffPayPage() {
  const { t, language } = useLanguage();
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState<"checkout" | "site" | "">("");
  const [created, setCreated] = useState<CreatedPayment | null>(null);
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    amount: "",
    region: "overseas",
    purpose: "consultation",
    description: "",
  });

  useEffect(() => {
    fetch("/api/staff/session", { credentials: "include", signal: AbortSignal.timeout(4000) })
      .then((res) => {
        setAuthed(res.ok);
        setChecking(false);
      })
      .catch(() => setChecking(false));
  }, []);

  const login = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const { response } = await postJson("/api/staff/login", { password }, {
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      setError(language === "zh" ? "密码不正确" : "Incorrect password");
      return;
    }
    setAuthed(true);
  };

  const create = async (e: FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError("");
    setCreated(null);
    try {
      const { response, payload } = await postJson("/api/payments/create", {
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        amount: Number(form.amount),
        region: form.region,
        purpose: form.purpose,
        description: form.description,
      }, { signal: AbortSignal.timeout(15000) });
      if (!response.ok) {
        throw new Error(typeof payload.error === "string" ? payload.error : "Failed");
      }
      setCreated({
        id: String(payload.id ?? ""),
        checkoutUrl: String(payload.checkoutUrl ?? ""),
        siteUrl: String(payload.siteUrl ?? ""),
        currency: String(payload.currency ?? ""),
        amount: Number(payload.amount),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setCreating(false);
    }
  };

  const copy = async (kind: "checkout" | "site", value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(kind);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-28 pb-16 px-6">
        <div className="max-w-xl mx-auto bg-white/80 rounded-3xl p-8 border border-[#E8DFD0]">
          <h1 className="text-3xl font-medium mb-3">{t("staff.title")}</h1>
          <p className="text-[#666666] font-serif mb-8">{t("staff.subtitle")}</p>

          {checking ? (
            <p className="text-[#8B7355]">{language === "zh" ? "检查登录状态…" : "Checking session…"}</p>
          ) : !authed ? (
            <form onSubmit={login} className="space-y-4">
              <label className="block space-y-2">
                <span>{t("staff.password")}</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-[#E8DFD0] px-4 py-3"
                  required
                />
              </label>
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <button type="submit" className="btn-primary">
                {t("staff.login")}
              </button>
            </form>
          ) : (
            <form onSubmit={create} className="space-y-5">
              <fieldset className="space-y-2">
                <legend>{t("staff.purpose")}</legend>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="purpose"
                    value="consultation"
                    checked={form.purpose === "consultation"}
                    onChange={() => setForm({ ...form, purpose: "consultation" })}
                  />
                  {t("staff.purposeConsultation")}
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="purpose"
                    value="donation"
                    checked={form.purpose === "donation"}
                    onChange={() => setForm({ ...form, purpose: "donation" })}
                  />
                  {t("staff.purposeDonation")}
                </label>
              </fieldset>
              <label className="block space-y-2">
                <span>{t("staff.customerName")}</span>
                <input
                  value={form.customerName}
                  onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                  className="w-full rounded-xl border border-[#E8DFD0] px-4 py-3"
                  required
                />
              </label>
              <label className="block space-y-2">
                <span>{t("staff.customerEmail")}</span>
                <input
                  type="email"
                  value={form.customerEmail}
                  onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                  className="w-full rounded-xl border border-[#E8DFD0] px-4 py-3"
                  required
                />
              </label>
              <fieldset className="space-y-2">
                <legend>{t("staff.region")}</legend>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="region"
                    value="overseas"
                    checked={form.region === "overseas"}
                    onChange={() => setForm({ ...form, region: "overseas" })}
                  />
                  {t("staff.overseas")}
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="region"
                    value="china"
                    checked={form.region === "china"}
                    onChange={() => setForm({ ...form, region: "china" })}
                  />
                  {t("staff.china")}
                </label>
              </fieldset>
              <label className="block space-y-2">
                <span>
                  {t("staff.amount")} ({form.region === "china" ? "CNY" : "HKD"})
                </span>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full rounded-xl border border-[#E8DFD0] px-4 py-3"
                  required
                />
              </label>
              <label className="block space-y-2">
                <span>
                  {form.purpose === "donation" ? t("staff.descriptionDonation") : t("staff.description")}
                </span>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-xl border border-[#E8DFD0] px-4 py-3"
                  rows={3}
                  required
                />
              </label>
              <p className="text-sm text-[#8B7355]">
                {form.purpose === "donation" ? t("staff.invoiceNoteDonation") : t("staff.invoiceNote")}
              </p>
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <button type="submit" disabled={creating} className="btn-primary disabled:opacity-50">
                {creating ? t("staff.creating") : t("staff.create")}
              </button>

              {created ? (
                <div className="space-y-3 pt-4 border-t border-[#E8DFD0]">
                  <p className="text-sm text-[#4A7C59]">
                    {created.amount} {created.currency.toUpperCase()}
                  </p>
                  <CopyRow
                    label={t("staff.checkoutLink")}
                    value={created.checkoutUrl}
                    copyLabel={copied === "checkout" ? t("staff.copied") : t("staff.copy")}
                    onCopy={() => copy("checkout", created.checkoutUrl)}
                  />
                  <CopyRow
                    label={t("staff.siteLink")}
                    value={created.siteUrl}
                    copyLabel={copied === "site" ? t("staff.copied") : t("staff.copy")}
                    onCopy={() => copy("site", created.siteUrl)}
                  />
                </div>
              ) : null}
            </form>
          )}

          <Link to="/" className="inline-block mt-8 text-sm text-[#4A7C59]">
            {t("pay.back")}
          </Link>
        </div>
      </main>
    </>
  );
}

function CopyRow({
  label,
  value,
  copyLabel,
  onCopy,
}: {
  label: string;
  value: string;
  copyLabel: string;
  onCopy: () => void;
}) {
  return (
    <div>
      <div className="text-sm mb-1">{label}</div>
      <div className="flex gap-2">
        <input readOnly value={value} className="flex-1 rounded-xl border border-[#E8DFD0] px-3 py-2 text-sm" />
        <button type="button" onClick={onCopy} className="px-3 py-2 rounded-xl bg-[#2D4A3E] text-white text-sm">
          {copyLabel}
        </button>
      </div>
    </div>
  );
}
