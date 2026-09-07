import { ContentBadge } from "@/components/Badge";
import type { SelectOption } from "@/components/Listbox";

export const REGIONS: SelectOption[] = [
  { value: "seoul", label: "서울특별시" },
  { value: "jeonnam-gwangju", label: "전남광주통합특별시" },
  { value: "busan", label: "부산광역시" },
  { value: "daegu", label: "대구광역시" },
  { value: "incheon", label: "인천광역시" },
  { value: "daejeon", label: "대전광역시" },
  { value: "ulsan", label: "울산광역시" },
  { value: "sejong", label: "세종특별자치시" },
  { value: "gyeonggi", label: "경기도" },
  { value: "gangwon", label: "강원특별자치도" },
  { value: "chungbuk", label: "충청북도" },
  { value: "chungnam", label: "충청남도" },
  { value: "jeonbuk", label: "전북특별자치도" },
  { value: "gyeongbuk", label: "경상북도" },
  { value: "gyeongnam", label: "경상남도" },
  { value: "jeju", label: "제주특별자치도" },
];

export const REGION_OPTIONS = REGIONS.slice(0, 4);

export const OPTION_SUFFIX = (
  <ContentBadge hierarchy='tertiary' size='xs' badgeStyle='outlined'>
    레이블
  </ContentBadge>
);

const DISABLED_INDEX = 2;

export const toCaptionedOptions = (options: SelectOption[]): SelectOption[] =>
  options.map((option, index) => {
    if (index === 0) return { ...option, caption: "캡션" };
    if (index === DISABLED_INDEX) return { ...option, disabled: true };
    return option;
  });

export const toSuffixedOptions = (options: SelectOption[]): SelectOption[] =>
  options.map(option => ({ ...option, caption: "캡션", suffix: OPTION_SUFFIX }));

export const toExpressiveOptions = (options: SelectOption[]): SelectOption[] =>
  options.map((option, index) =>
    index === DISABLED_INDEX
      ? { ...option, disabled: true }
      : { ...option, caption: "캡션", suffix: OPTION_SUFFIX },
  );
