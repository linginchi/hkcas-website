import type { Language } from "./translations";

export const SITE_ORIGIN = "https://hkcas.org";

export type RouteMeta = {
  path: string;
  language: Language;
  /** <html lang> 與 hreflang 用值 */
  lang: string;
  ogLocale: string;
  title: string;
  description: string;
};

export const ROUTE_META: RouteMeta[] = [
  {
    path: "/",
    language: "zh",
    lang: "zh-CN",
    ogLocale: "zh_CN",
    title: "国科绿色发展国际实验室（香港）有限公司 | 大湾区绿色发展与零碳产业平台",
    description:
      "国科绿色发展国际实验室（香港）有限公司（CAS Laboratory of Green Development International (Hong Kong) Ltd.）于 2019 年在中国香港注册成立，为非营利性质法人组织。依托粤港澳大湾区战略枢纽，以「咨询+投资+运营」全周期模式，聚焦地方实业资产市场化并购重组、零碳产业园区投资运营，以及跨境「绿电+算力」数字基础设施三大核心业务。",
  },
  {
    path: "/en",
    language: "en",
    lang: "en",
    ogLocale: "en_US",
    title:
      "CAS Laboratory of Green Development International (Hong Kong) Ltd. | Green Development in the Greater Bay Area",
    description:
      "CAS Laboratory of Green Development International (Hong Kong) Ltd. was registered in Hong Kong in 2019 as a non-profit organisation. Using the Guangdong-Hong Kong-Macao Greater Bay Area as a strategic hub, it applies a full-cycle Consulting, Investment and Operations model across three core businesses: market-driven M&A and restructuring of local industrial assets, investment and operation of zero-carbon industrial parks, and cross-border green power and computing digital infrastructure.",
  },
];

const PATH_BY_LANGUAGE: Record<Language, string> = { zh: "/", en: "/en" };

export function languageFromPath(pathname: string): Language {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "zh";
}

/** 只有首頁有中英各自的 URL；交易頁不做本地化路徑。 */
export function isLocalizedPath(pathname: string): boolean {
  return pathname === "/" || pathname === "/en";
}

export function pathForLanguage(language: Language): string {
  return PATH_BY_LANGUAGE[language];
}
