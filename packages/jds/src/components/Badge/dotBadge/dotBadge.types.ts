import type { ComponentPropsWithoutRef } from "react";

import type { BadgeSize, FeedbackVariant } from "../badge.types";

export interface DotBadgeProps extends Omit<ComponentPropsWithoutRef<"span">, "children"> {
  variant?: FeedbackVariant;
  size?: BadgeSize;
  isMuted?: boolean;
}

// TODO(deprecation): 호출부 마이그레이션 완료 후 아래 deprecated 타입과 .Feedback 별칭 제거
/** @deprecated `<DotBadge variant>`를 사용하세요. */
export type DotBadgeFeedbackProps = DotBadgeProps;
