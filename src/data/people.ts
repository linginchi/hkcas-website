// 團隊與國際合作的展示內容。目前沒有經本人確認、取得授權的素材，故保持為空；
// 兩個板塊在資料為空時不會渲染，也不會出現在導航中。填入真實資料後即自動顯示。

export type Localized = { zh: string; en: string };

export type TeamMember = {
  group: "management" | "experts" | "advisors";
  name: Localized;
  title: Localized;
  bio: Localized;
  /** /public 下的圖片路徑；須已取得肖像授權 */
  photo?: string;
};

export type CooperationItem = {
  title: Localized;
  description: Localized;
  /** /public 下的圖片路徑；須已取得版權與人物授權 */
  photo?: string;
};

export type CooperationStat = { value: Localized; label: Localized };

export const TEAM_MEMBERS: TeamMember[] = [];

// 以下數據與圖片來自戰略合作夥伴中咨公司的介紹材料，須保持來源標註，不得寫成 HKCAS 自身業績。
export const COOPERATION_STATS: CooperationStat[] = [
  { value: { zh: "400余项", en: "400+" }, label: { zh: "“一带一路”项目咨询（8年累计）", en: "Belt and Road project consultations (8 years)" } },
  { value: { zh: "50余项", en: "50+" }, label: { zh: "项目建设管理", en: "Project construction management assignments" } },
  { value: { zh: "20个", en: "20" }, label: { zh: "推动获中央财政资金支持的境外经贸合作区", en: "Overseas economic and trade cooperation zones supported with central funding" } },
  { value: { zh: "150个", en: "150" }, label: { zh: "国际业务覆盖的国家和地区", en: "Countries and regions covered by international work" } },
];

export const COOPERATION_ITEMS: CooperationItem[] = [
  {
    title: { zh: "政策研究与规划编制", en: "Policy Research and Planning" },
    description: {
      zh: "参与起草“一带一路”及境外合作园区相关政策文件，开展基础设施合作、战略产业布局、对外投资合作和境外港口布局等政策与规划研究。",
      en: "Taking part in drafting Belt and Road and overseas cooperation park policy documents, and carrying out policy and planning research on infrastructure cooperation, strategic industrial layout, outbound investment cooperation and overseas port layout.",
    },
  },
  {
    title: { zh: "重大项目咨询论证与建设管理", en: "Major Project Appraisal and Construction Management" },
    description: {
      zh: "8年来累计完成“一带一路”项目咨询400余项，承担了柬埔寨吴哥国际机场、孟加拉卡纳普里河底隧道等项目管理50余项，为项目科学决策和顺利推进提供技术支撑。",
      en: "Over eight years, more than 400 Belt and Road projects have been appraised and more than 50 projects, including Angkor International Airport in Cambodia and the Karnaphuli river-bed tunnel in Bangladesh, managed, providing technical support for sound decisions and smooth delivery.",
    },
    photo: "/intl/inga-hydropower.webp",
  },
  {
    title: { zh: "对外援助与国际产能合作评估", en: "Foreign Aid and International Capacity Cooperation Assessment" },
    description: {
      zh: "承担对外援助项目可研评估、技术和物资援助咨询、项目验收等200余项，完成109个重点国家的《国别援助指导意见》；连续7年协助开展国际产能合作补助资金支持项目评估，累计300余项。",
      en: "Undertaking more than 200 foreign-aid assignments covering feasibility assessment, technical and material aid advisory and project acceptance, completing country aid guidance for 109 priority countries, and assisting for seven consecutive years in assessing more than 300 projects for international capacity cooperation subsidies.",
    },
  },
];

export type GalleryImage = { src: string; caption: Localized };

// 圖片與說明均取自《国家“一带一路”战略部署及中咨实践》，說明沿用原文，不得改寫或移作他用。
export const COOPERATION_GALLERY: GalleryImage[] = [
  { src: "/intl/laos-thailand-railway.webp", caption: { zh: "中老铁路；中泰铁路合作项目启动仪式", en: "China-Laos Railway; Launch Ceremony of the China-Thailand Railway Cooperation Project" } },
  { src: "/intl/inga-hydropower.webp", caption: { zh: "刚果（金）英加水电站", en: "Inga Hydropower Station, DR Congo" } },
  { src: "/intl/angkor-airport.webp", caption: { zh: "柬埔寨吴哥国际机场项目", en: "Angkor International Airport Project, Cambodia" } },
  { src: "/intl/cpec-map.webp", caption: { zh: "中巴经济走廊项目地图", en: "China-Pakistan Economic Corridor Project Map" } },
  { src: "/intl/borsod-zone.webp", caption: { zh: "中国匈牙利宝思德经贸合作区", en: "China-Hungary Borsod Economic and Trade Cooperation Zone" } },
  { src: "/intl/qingshan-park.webp", caption: { zh: "印尼青山工业园", en: "Indonesia Qingshan Industrial Park" } },
  { src: "/intl/great-stone-park.webp", caption: { zh: "中白工业园", en: "China-Belarus Industrial Park (Great Stone)" } },
  { src: "/intl/mombasa-nairobi-railway.webp", caption: { zh: "蒙内铁路", en: "Mombasa-Nairobi Railway" } },
  { src: "/intl/cnooc-shell-ethylene.webp", caption: { zh: "中海壳牌乙烯工程后评价", en: "Post-evaluation of the CNOOC-Shell Ethylene Project" } },
  { src: "/intl/jilin-zone.webp", caption: { zh: "吉林中部产业转型升级示范区", en: "Central Jilin Industrial Transformation and Upgrading Demonstration Zone" } },
  { src: "/intl/tangshan-zone.webp", caption: { zh: "河北唐山产业转型升级示范区", en: "Tangshan (Hebei) Industrial Transformation and Upgrading Demonstration Zone" } },
];
