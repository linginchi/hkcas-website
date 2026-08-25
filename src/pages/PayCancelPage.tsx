import { Link, useSearchParams } from "react-router-dom";
import { Navigation } from "../sections/Navigation";
import { useLanguage } from "../hooks/useLanguage";

export function PayCancelPage() {
  const { t } = useLanguage();
  const [params] = useSearchParams();
  const id = params.get("id");

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-16 px-6">
        <div className="max-w-lg mx-auto text-center bg-white/80 rounded-3xl p-10 border border-[#E8DFD0]">
          <h1 className="text-3xl font-medium mb-4">{t("pay.cancelTitle")}</h1>
          <p className="text-[#666666] font-serif mb-8">{t("pay.cancelBody")}</p>
          <div className="flex justify-center gap-4">
            {id ? (
              <Link to={`/pay/${id}`} className="btn-primary">
                {t("pay.retry")}
              </Link>
            ) : null}
            <Link to="/" className="px-6 py-3 rounded-full border border-[#D4A853]/40">
              {t("pay.back")}
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
