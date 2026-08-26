import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readJson } from "../lib/api";
import { Navigation } from "../sections/Navigation";
import { useLanguage } from "../hooks/useLanguage";

export function PayRedirectPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [message, setMessage] = useState<"loading" | "expired" | "paid" | "paidDonation" | "missing">("loading");

  useEffect(() => {
    if (!id) {
      setMessage("missing");
      return;
    }
    fetch(`/api/payments/status?id=${encodeURIComponent(id)}`, { signal: AbortSignal.timeout(8000) })
      .then(async (res) => {
        const payload = await readJson(res);
        if (!res.ok) {
          setMessage("missing");
          return;
        }
        if (payload.status === "paid") {
          setMessage(payload.purpose === "donation" ? "paidDonation" : "paid");
          return;
        }
        if (payload.status === "expired" || payload.status === "failed") {
          setMessage("expired");
          return;
        }
        if (typeof payload.checkoutUrl === "string" && payload.checkoutUrl) {
          window.location.href = payload.checkoutUrl;
          return;
        }
        setMessage("missing");
      })
      .catch(() => setMessage("missing"));
  }, [id]);

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-16 px-6">
        <div className="max-w-lg mx-auto text-center bg-white/80 rounded-3xl p-10 border border-[#E8DFD0]">
          <p className="text-[#666666] font-serif mb-8">{t(`pay.${message}`)}</p>
          {message !== "loading" ? (
            <Link to="/" className="btn-primary">
              {t("pay.back")}
            </Link>
          ) : null}
        </div>
      </main>
    </>
  );
}
