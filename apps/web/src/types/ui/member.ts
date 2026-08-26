export type SupportersRole = "대표" | "운영" | "인프라" | "대외협력" | "BX";
export type MakersRole = "프론트엔드" | "백엔드" | "디자인" | "기획";

export interface SupporterMember {
  id: number;
  name: string;
  role: SupportersRole;
  imageUrl: string;
}

export interface MakersMember {
  id: number;
  name: string;
  role: MakersRole;
  imageUrl: string;
  description: string;
}

export interface MemberTabItem {
  value: string;
  label: string;
  gridClassName: string;
  renderCards: () => React.ReactNode;
}
