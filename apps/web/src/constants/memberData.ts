import type { IconName, ThemeVariant } from "@jects/jds";

import {
  BX_김동영,
  BX_홍가민,
  대외협력_백자영,
  대표_왕효준,
  메이커스_강태성,
  메이커스_공희상,
  메이커스_권정인,
  메이커스_김지훈,
  메이커스_문소희,
  메이커스_이동현,
  메이커스_이재호,
  메이커스_최원준,
  메이커스_최준혁,
  메이커스_한아름,
  운영_김경욱,
  운영_박성령,
  운영_정서연,
  인프라_강석준,
  인프라_허정원,
} from "@/components/vision";
import type { SupportersRole, MakersRole, SupporterMember, MakersMember } from "@/types/ui/member";

export const roleBadgeVariantMap: Record<SupportersRole, ThemeVariant> = {
  대표: "lime",
  운영: "lime",
  인프라: "blue",
  대외협력: "orange",
  BX: "fuchsia",
};

export const roleIconMap: Record<MakersRole, IconName> = {
  프론트엔드: "frontend",
  백엔드: "backend",
  디자인: "design",
  기획: "product",
};

const withIds = <T>(members: readonly T[]): (T & { id: number })[] =>
  members.map((member, index) => ({ ...member, id: index + 1 }));

export const supportersData: SupporterMember[] = withIds<Omit<SupporterMember, "id">>([
  { name: "왕효준", role: "대표", imageUrl: 대표_왕효준 },
  { name: "김경욱", role: "운영", imageUrl: 운영_김경욱 },
  { name: "박성령", role: "운영", imageUrl: 운영_박성령 },
  { name: "정서연", role: "운영", imageUrl: 운영_정서연 },
  { name: "강석준", role: "인프라", imageUrl: 인프라_강석준 },
  { name: "허정원", role: "인프라", imageUrl: 인프라_허정원 },
  { name: "백자영", role: "대외협력", imageUrl: 대외협력_백자영 },
  { name: "김동영", role: "BX", imageUrl: BX_김동영 },
  { name: "홍가민", role: "BX", imageUrl: BX_홍가민 },
]);

export const makers1Data: MakersMember[] = withIds<Omit<MakersMember, "id">>([
  {
    name: "김지훈",
    role: "프론트엔드",
    imageUrl: 메이커스_김지훈,
    description:
      "사용자 경험 개선에 관심을 갖고, 젝트 구성원들이 편리하게 사용할 수 있는 서비스를 만들어갑니다.",
  },
  {
    name: "강태성",
    role: "백엔드",
    imageUrl: 메이커스_강태성,
    description: "호기심을 바탕으로 깊게 고민하며, 문제의 본질을 찾아 해결합니다.",
  },
  {
    name: "공희상",
    role: "백엔드",
    imageUrl: 메이커스_공희상,
    description: "사용자에게 필요한 기능을 실용적으로 구현하고자 고민하며 몰입하고 있습니다.",
  },
  {
    name: "최준혁",
    role: "백엔드",
    imageUrl: 메이커스_최준혁,
    description:
      "기능이 사용자에게 안정적으로 전달될 수 있도록 기술적 깊이와 운영 안정성을 함께 고민합니다.",
  },
  {
    name: "이재호",
    role: "기획",
    imageUrl: 메이커스_이재호,
    description:
      "개발자, 디자이너와 협업해 홈페이지와 백오피스 개발을 조율하며, 프로젝트 목표 달성을 이끌어갑니다.",
  },
  {
    name: "권정인",
    role: "디자인",
    imageUrl: 메이커스_권정인,
    description: "사용자가 쉽게 이해하고 편안하게 사용할 수 있도록 화면과 구조를 설계합니다.",
  },
  {
    name: "최원준",
    role: "디자인",
    imageUrl: 메이커스_최원준,
    description: "사용자 흐름과 운영을 함께 고려해 프로덕트를 설계하고, 경험의 완성도를 높입니다.",
  },
]);

export const makers2Data: MakersMember[] = withIds<Omit<MakersMember, "id">>([
  {
    name: "문소희",
    role: "프론트엔드",
    imageUrl: 메이커스_문소희,
    description:
      "디자인 시스템 문서 플랫폼을 구현하며, 사용자가 쉽게 이해하고 활용할 수 있도록 구조와 사용성에 집중합니다.",
  },
  {
    name: "이동현",
    role: "프론트엔드",
    imageUrl: 메이커스_이동현,
    description: "일관된 컴포넌트 API를 설계하고, 더 나은 개발자 경험을 만드는 데 집중합니다.",
  },
  {
    name: "한아름",
    role: "프론트엔드",
    imageUrl: 메이커스_한아름,
    description:
      "일관된 사용자 경험과 효율적인 개발 환경을 위해 접근성을 고려한 디자인 시스템을 구축하고 개선합니다.",
  },
  {
    name: "김동영",
    role: "디자인",
    imageUrl: BX_김동영,
    description: "젝트 BX 및 디자인 시스템(JDS)을 설계하며 긍정적인 협업 경험을 만들어냅니다.",
  },
]);
