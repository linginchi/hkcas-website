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

export const TEAM_MEMBERS: TeamMember[] = [];
export const COOPERATION_ITEMS: CooperationItem[] = [];
