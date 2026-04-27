import type { IconName } from "components";
import type { ComponentPropsWithoutRef } from "react";

export type IconButtonSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type IconButtonHierarchy = "accent" | "primary" | "secondary" | "tertiary";

// TODO(a11y): 이후 작업에서 aria-label / aria-labelledby 중 하나를 required로 강제
//             현재는 호출부 마이그레이션 작업 중심이기 때문에 native button props 그대로 optional 유지
export interface IconButtonProps extends ComponentPropsWithoutRef<"button"> {
  icon: IconName;
  size?: IconButtonSize;
  hierarchy?: IconButtonHierarchy;
  condensed?: boolean;
}
