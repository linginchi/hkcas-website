import { useLanguage } from "../hooks/useLanguage";

export function Hero() {
  const { language, t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden bg-[#FFF9E6]">
      {/* 主標題與簡介僅存在於背景圖，需另給可讀文本供螢幕閱讀器與爬蟲取用；口號為真文字，隨語言切換 */}
      <div className="sr-only">
        <h1>
          {t("hero.title")}
          {t("hero.subtitle")}
        </h1>
        <p>{t("hero.badge")}</p>
        <p>{t("hero.description")}</p>
      </div>
      <div className="parallax-bg absolute inset-0 w-full h-full">
        <div
          className="absolute inset-x-0 top-0 flex flex-col items-center justify-start pt-16 sm:pt-20 px-4"
          style={{ height: "calc(100% - 150px)" }}
        >
          <img
            src="/hero-bg.jpg"
            alt={`${t("hero.title")}${t("hero.subtitle")}`}
            width={1024}
            height={893}
            fetchPriority="high"
            className="object-contain min-h-0"
            style={{ maxWidth: "min(95%, 1200px)", maxHeight: "calc(100% - 4.5rem)" }}
          />
          <p className="mt-4 sm:mt-5 text-center text-xl sm:text-3xl md:text-4xl font-semibold tracking-wide text-[#1a1a1a]">
            {t("hero.slogan")}
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9E6]/30 via-transparent to-[#FFF9E6]/80 pointer-events-none" />
      </div>
      <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 z-10 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-2xl sm:text-4xl md:text-5xl font-medium text-[#2D4A3E]">2019</div>
              <div className="text-[#1a1a1a] text-xs sm:text-sm md:text-base mt-1 sm:mt-2 font-serif">
                {t("hero.stats.founded")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-4xl md:text-5xl font-medium text-[#2D4A3E]">5</div>
              <div className="text-[#1a1a1a] text-xs sm:text-sm md:text-base mt-1 sm:mt-2 font-serif">
                {t("hero.stats.business")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-3xl md:text-4xl font-medium text-[#2D4A3E]">
                {language === "zh" ? "大湾区" : "GBA"}
              </div>
              <div className="text-[#1a1a1a] text-xs sm:text-sm md:text-base mt-1 sm:mt-2 font-serif">
                {t("hero.stats.location")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
