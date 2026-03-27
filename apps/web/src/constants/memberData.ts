import type { IconName, ThemeVariant } from "@jects/jds";

import {
  대표_왕효준,
  운영_김경욱,
  운영_홍지호,
  운영_고혜린,
  운영_최지민,
  인프라_강석준,
  인프라_김민진,
  인프라_허정원,
  BX_김동영,
  BX_신현지,
  BX_홍승민,
  메이커스_김원준,
  메이커스_김민준,
  메이커스_김지훈,
  메이커스_김현중,
  메이커스_공희상,
  메이커스_오준용,
  메이커스_강태성,
  메이커스_이재호,
  메이커스_최원준,
  메이커스_권정인,
  메이커스_문소희,
  메이커스_정효림,
  메이커스_방재현,
} from "@/components/vision";
import type { SupportersRole, MakersRole, SupporterMember, MakersMember } from "@/types/ui/member";

export const roleBadgeVariantMap: Record<SupportersRole, ThemeVariant> = {
  대표: "lime",
  운영: "lime",
  인프라: "blue",
  BX: "fuchsia",
};

export const roleIconMap: Record<MakersRole, IconName> = {
  프론트엔드: "frontend",
  백엔드: "backend",
  디자인: "design",
  기획: "product",
};

export const supportersData: SupporterMember[] = [
  { id: 1, name: "왕효준", role: "대표", imageUrl: 대표_왕효준 },
  { id: 2, name: "김경욱", role: "운영", imageUrl: 운영_김경욱 },
  { id: 3, name: "홍지호", role: "운영", imageUrl: 운영_홍지호 },
  { id: 4, name: "고혜린", role: "운영", imageUrl: 운영_고혜린 },
  { id: 5, name: "최지민", role: "운영", imageUrl: 운영_최지민 },
  { id: 6, name: "강석준", role: "인프라", imageUrl: 인프라_강석준 },
  { id: 7, name: "김민진", role: "인프라", imageUrl: 인프라_김민진 },
  { id: 8, name: "허정원", role: "인프라", imageUrl: 인프라_허정원 },
  { id: 9, name: "김동영", role: "BX", imageUrl: BX_김동영 },
  { id: 10, name: "신현지", role: "BX", imageUrl: BX_신현지 },
  { id: 11, name: "홍승민", role: "BX", imageUrl: BX_홍승민 },
];

export const makers1Data: MakersMember[] = [
  {
    id: 12,
    name: "김원준",
    role: "프론트엔드",
    imageUrl: 메이커스_김원준,
    description: "홈페이지 운영과 유지 보수 및 전반적인 시스템을 개선합니다.",
  },
  {
    id: 13,
    name: "김민준",
    role: "프론트엔드",
    imageUrl: 메이커스_김민준,
    description: "직관적인 UX/UI를 고민하며 홈페이지와 백오피스를 개발합니다.",
  },
  {
    id: 14,
    name: "김지훈",
    role: "프론트엔드",
    imageUrl: 메이커스_김지훈,
    description: "공식 홈페이지 유지보수와 백오피스 개발을 통해 안정적인 서비스 운영을 지원합니다.",
  },
  {
    id: 15,
    name: "김현중",
    role: "프론트엔드",
    imageUrl: 메이커스_김현중,
    description:
      "디자인 시스템과 컴포넌트 구조에 관심 많은 프론트엔드 개발자입니다. 함께 성장하며 더 나은 경험을 만듭니다.",
  },
  {
    id: 16,
    name: "공희상",
    role: "백엔드",
    imageUrl: 메이커스_공희상,
    description: "사용자에게 필요한 기능을 실용적으로 구현하고자 고민하며 몰입하고 있습니다.",
  },
  {
    id: 17,
    name: "오준용",
    role: "백엔드",
    imageUrl: 메이커스_오준용,
    description:
      "효율적이고 견고한 백엔드 시스템을 구축하며, 안정성과 확장성을 갖춘 아키텍처를 설계하고 구현합니다.",
  },
  {
    id: 18,
    name: "강태성",
    role: "백엔드",
    imageUrl: 메이커스_강태성,
    description: "호기심을 바탕으로 깊게 고민하며, 문제의 본질을 찾아 해결합니다.",
  },
  {
    id: 19,
    name: "이재호",
    role: "기획",
    imageUrl: 메이커스_이재호,
    description:
      "개발자, 디자이너와 협업해 홈페이지와 백오피스 개발을 조율하며, 프로젝트 목표 달성을 이끌어갑니다.",
  },
  {
    id: 20,
    name: "최원준",
    role: "디자인",
    imageUrl: 메이커스_최원준,
    description:
      "프로덕트 관점에서 사용자 흐름과 경험을 설계하며, 서비스 전반의 품질과 일관된 경험을 만들어갑니다.",
  },
  {
    id: 21,
    name: "권정인",
    role: "디자인",
    imageUrl: 메이커스_권정인,
    description: "사용자가 쉽게 이해하고 편안하게 사용할 수 있도록 화면과 구조를 설계합니다.",
  },
];

export const makers2Data: MakersMember[] = [
  {
    id: 20,
    name: "문소희",
    role: "프론트엔드",
    imageUrl: 메이커스_문소희,
    description:
      "디자인 시스템 문서 플랫폼을 구현하며, 사용자가 쉽게 이해하고 활용할 수 있도록 구조와 사용성에 집중합니다.",
  },
  {
    id: 20,
    name: "방재현",
    role: "프론트엔드",
    imageUrl: 메이커스_방재현,
    description:
      "누구나 접근할 수 있는 디자인 시스템 문서 플랫폼을 구축하며, 쉽게 활용할 수 있도록 패키지를 제작합니다.",
  },
  {
    id: 21,
    name: "정효림",
    role: "기획",
    imageUrl: 메이커스_정효림,
    description:
      "디자인 시스템의 구조와 기능을 기획하며, 팀이 같은 방향으로 나아갈 수 있도록 이끌어갑니다.",
  },
  {
    id: 22,
    name: "김동영",
    role: "디자인",
    imageUrl: BX_김동영,
    description: "젝트 BX 및 디자인 시스템(JDS)을 설계하며 긍정적인 협업 경험을 만들어냅니다.",
  },
];
