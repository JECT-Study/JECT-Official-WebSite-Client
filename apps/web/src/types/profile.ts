export type CareerDetails =
  | "STUDENT"
  | "EXPECTED_GRADUATE"
  | "JOB_SEEKER"
  | "BETWEEN_JOBS"
  | "EMPLOYEE";

export const CAREER_DETAILS_LABELS: Record<CareerDetails, string> = {
  STUDENT: "대학생(재학/휴학)",
  EXPECTED_GRADUATE: "대학 졸업 예정",
  JOB_SEEKER: "취준생",
  BETWEEN_JOBS: "이직 준비 중",
  EMPLOYEE: "재직자",
};

export type Region =
  | "SEOUL"
  | "GYEONGGI"
  | "INCHEON"
  | "BUSAN"
  | "DAEGU"
  | "DAEJEON"
  | "GWANGJU"
  | "ULSAN"
  | "SEJONG"
  | "GANGWON"
  | "CHUNGBUK"
  | "CHUNGNAM"
  | "JEONBUK"
  | "JEONNAM"
  | "GYEONGBUK"
  | "GYEONGNAM"
  | "JEJU"
  | "OVERSEAS";

export const REGION_LABELS: Record<Region, string> = {
  SEOUL: "서울",
  GYEONGGI: "경기",
  INCHEON: "인천",
  BUSAN: "부산",
  DAEGU: "대구",
  DAEJEON: "대전",
  GWANGJU: "광주",
  ULSAN: "울산",
  SEJONG: "세종",
  GANGWON: "강원",
  CHUNGBUK: "충북",
  CHUNGNAM: "충남",
  JEONBUK: "전북",
  JEONNAM: "전남",
  GYEONGBUK: "경북",
  GYEONGNAM: "경남",
  JEJU: "제주",
  OVERSEAS: "해외",
};

export type ExperiencePeriod = "NONE" | "ONE_TO_TWO" | "THREE_TO_FOUR" | "FIVE_PLUS";

export const EXPERIENCE_PERIOD_LABELS: Record<ExperiencePeriod, string> = {
  NONE: "경험 없음",
  ONE_TO_TWO: "1~2년",
  THREE_TO_FOUR: "3~4년",
  FIVE_PLUS: "5년 이상",
};

export type InterestedDomain =
  | "GAME"
  | "EDUCATION"
  | "MARKETING"
  | "MOBILITY"
  | "PRODUCTIVITY"
  | "SOCIAL_NETWORK"
  | "UTILITY"
  | "E_COMMERCE"
  | "COMMUNITY"
  | "CONTENTS"
  | "TRAVELTECH"
  | "FASHION_BEAUTY"
  | "FOODTECH"
  | "PROPTECH"
  | "FINTECH"
  | "HEALTHCARE"
  | "HR";

export const INTERESTED_DOMAIN_LABELS: Record<InterestedDomain, string> = {
  GAME: "게임",
  EDUCATION: "교육",
  MARKETING: "마케팅",
  MOBILITY: "모빌리티",
  PRODUCTIVITY: "생산성",
  SOCIAL_NETWORK: "소셜 네트워크",
  UTILITY: "유틸리티",
  E_COMMERCE: "이커머스",
  COMMUNITY: "커뮤니티",
  CONTENTS: "콘텐츠",
  TRAVELTECH: "트래블테크",
  FASHION_BEAUTY: "패션/뷰티",
  FOODTECH: "푸드테크",
  PROPTECH: "프롭테크",
  FINTECH: "핀테크",
  HEALTHCARE: "헬스케어",
  HR: "HR",
};

export interface ProfileData {
  name: string;
  phoneNumber: string;
  careerDetails: CareerDetails;
  region: Region;
  experiencePeriod: ExperiencePeriod;
  interestedDomains: InterestedDomain[];
}
