import { Link, useSearchParams } from "react-router-dom";
import { Navigation } from "../sections/Navigation";
import { useLanguage } from "../hooks/useLanguage";

export function PaySuccessPage() {
  const { t } = useLanguage();
  const [params] = useSearchParams();
  const donation = params.get("purpose") === "donation";

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-16 px-6">
        <div className="max-w-lg mx-auto text-center bg-white/80 rounded-3xl p-10 border border-[#E8DFD0]">
          <h1 className="text-3xl font-medium mb-4">
            {donation ? t("pay.donationSuccessTitle") : t("pay.successTitle")}
          </h1>
          <p className="text-[#666666] font-serif mb-8">
            {donation ? t("pay.donationSuccessBody") : t("pay.successBody")}
          </p>
          <Link to="/" className="btn-primary">
            {t("pay.back")}
          </Link>
        </div>
      </main>
    </>
  );
}
