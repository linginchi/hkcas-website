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
  /** 結構化數據（JSON-LD）中依語言變化的欄位，由預渲染腳本套入 */
  organization: {
    name: string;
    description: string;
    knowsAbout: string[];
    addressRegion: string;
    addressLocality: string;
  };
};

export const ROUTE_META: RouteMeta[] = [
  {
    path: "/",
    language: "zh",
    lang: "zh-CN",
    ogLocale: "zh_CN",
    title: "国科绿色发展国际实验室（香港）有限公司 | 大湾区绿色发展与零碳产业平台",
    description:
      "国科绿色发展国际实验室（香港）有限公司（CAS Laboratory of Green Development International (Hong Kong) Ltd.）于 2019 年在中国香港注册成立，为非营利性质法人组织。依托粤港澳大湾区战略枢纽，以「咨询+投资+运营」全周期模式，聚焦地方实业资产市场化并购重组、零碳产业园区投资运营、跨境「绿电+算力」数字基础设施，以及企业出海服务平台四大核心业务。",
    organization: {
      name: "国科绿色发展国际实验室（香港）有限公司",
      description:
        "国科绿色发展国际实验室（香港）有限公司于 2019 年在中国香港注册成立，为非营利性质法人组织，源自 2017 年香港科技园公司与国科控股合办的「科技『一带一路』与粤港澳大湾区创新论坛」。公司依托粤港澳大湾区战略枢纽，以「咨询+投资+运营」全周期模式，推动绿色与数字技术的全球转化与实业落地，并联合地方政府与央企智库共建企业出海服务平台。2023 年中咨产融（北京）科技有限公司成为实控机构成员。",
      knowsAbout: [
        "绿色发展",
        "零碳产业园区",
        "绿电与算力数字基础设施",
        "地方实业资产市场化并购与重组",
        "粤港澳大湾区跨境产业整合",
        "企业出海服务平台",
      ],
      addressRegion: "香港",
      addressLocality: "湾仔",
    },
  },
  {
    path: "/en",
    language: "en",
    lang: "en",
    ogLocale: "en_US",
    title:
      "CAS Laboratory of Green Development International (Hong Kong) Ltd. | Green Development in the Greater Bay Area",
    description:
      "CAS Laboratory of Green Development International (Hong Kong) Ltd. was registered in Hong Kong in 2019 as a non-profit organisation. Using the Guangdong-Hong Kong-Macao Greater Bay Area as a strategic hub, it applies a full-cycle Consulting, Investment and Operations model across four core businesses: market-driven M&A and restructuring of local industrial assets, investment and operation of zero-carbon industrial parks, cross-border green power and computing digital infrastructure, and an enterprise overseas expansion platform.",
    organization: {
      name: "CAS Laboratory of Green Development International (Hong Kong) Ltd.",
      description:
        'CAS Laboratory of Green Development International (Hong Kong) Ltd. was registered in Hong Kong in 2019 as a non-profit organisation, originating from the 2017 "Technology Belt and Road and Greater Bay Area Innovation Forum" co-hosted by Hong Kong Science and Technology Parks Corporation and CAS Holdings. Using the Greater Bay Area as a strategic hub, it applies a full-cycle Consulting, Investment and Operations model to bring green and digital technologies into industrial practice worldwide, and works with local governments and a central-SOE think tank to build an enterprise overseas expansion platform. In 2023, CIECC Industry-Finance (Beijing) Technology Co., Ltd. became a controlling institution.',
      knowsAbout: [
        "Green development",
        "Zero-carbon industrial parks",
        "Green power and computing digital infrastructure",
        "Market-driven M&A and restructuring of local industrial assets",
        "Cross-border industrial integration in the Greater Bay Area",
        "Enterprise overseas expansion platform",
      ],
      addressRegion: "Hong Kong",
      addressLocality: "Wan Chai",
    },
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
