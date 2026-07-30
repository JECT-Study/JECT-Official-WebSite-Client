import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";

import type { BadgeSize, BasicHierarchy, FeedbackVariant } from "../badge.types";

export const CONTENT_BADGE_STYLE_OPTIONS = ["solid", "alpha", "outlined"] as const;
export type ContentBadgeStyle = (typeof CONTENT_BADGE_STYLE_OPTIONS)[number];

export const THEME_VARIANT_OPTIONS = [
  "red",
  "orange",
  "yellow",
  "lime",
  "green",
  "teal",
  "sky",
  "indigo",
  "purple",
  "pink",
] as const;
export type ThemeVariant = (typeof THEME_VARIANT_OPTIONS)[number];

type BaseContentBadgeProps = Omit<ComponentPropsWithoutRef<"span">, "children"> & {
  size?: BadgeSize;
  badgeStyle?: ContentBadgeStyle;
  isMuted?: boolean;
  children: ReactNode;
};

type ContentBadgeIconButtonProps =
  | {
      withIconButton?: false;
      onIconClick?: never;
    }
  | {
      withIconButton: true;
      onIconClick: (e: MouseEvent<Element>) => void;
    };

export type ContentBadgeProps = BaseContentBadgeProps &
  (
    | (ContentBadgeIconButtonProps & {
        hierarchy?: BasicHierarchy;
        feedback?: never;
        variant?: never;
      })
    | (ContentBadgeIconButtonProps & {
        feedback?: FeedbackVariant;
        hierarchy?: never;
        variant?: never;
      })
    | {
        variant?: ThemeVariant;
        hierarchy?: never;
        feedback?: never;
        withIconButton?: never;
        onIconClick?: never;
      }
  );

// TODO(deprecation): 호출부 마이그레이션 완료 후 아래 deprecated 타입과 .Basic/.Feedback/.Theme 별칭 제거
/** @deprecated `<ContentBadge hierarchy badgeStyle>`를 사용하세요. */
export type ContentBadgeBasicProps = BaseContentBadgeProps &
  ContentBadgeIconButtonProps & {
    hierarchy?: BasicHierarchy;
  };

/** @deprecated `<ContentBadge feedback badgeStyle>`를 사용하세요. */
export type ContentBadgeFeedbackProps = BaseContentBadgeProps &
  ContentBadgeIconButtonProps & {
    /** @deprecated `feedback`을 사용하세요. */
    variant?: FeedbackVariant;
  };

/** @deprecated `<ContentBadge variant badgeStyle>`를 사용하세요. */
export type ContentBadgeThemeProps = BaseContentBadgeProps & {
  variant?: ThemeVariant;
};
