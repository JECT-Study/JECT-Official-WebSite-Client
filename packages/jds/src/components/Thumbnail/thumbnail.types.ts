import type { ComponentPropsWithoutRef, ReactNode } from "react";

export const THUMBNAIL_RATIO_OPTIONS = ["1:1", "4:5", "3:4", "9:16", "1:2", "9:21"] as const;
export const THUMBNAIL_ORIENTATION_OPTIONS = ["portrait", "landscape"] as const;
export const THUMBNAIL_CORNER_STYLE_OPTIONS = ["angular", "curved", "rounded"] as const;
export const THUMBNAIL_APPEARANCE_OPTIONS = ["hollow", "outlined"] as const;

export type ThumbnailRatio = (typeof THUMBNAIL_RATIO_OPTIONS)[number];
export type ThumbnailOrientation = (typeof THUMBNAIL_ORIENTATION_OPTIONS)[number];
export type ThumbnailCornerStyle = (typeof THUMBNAIL_CORNER_STYLE_OPTIONS)[number];
export type ThumbnailAppearance = (typeof THUMBNAIL_APPEARANCE_OPTIONS)[number];

type NonSquareRatio = Exclude<ThumbnailRatio, "1:1">;
type NonRoundedCornerStyle = Exclude<ThumbnailCornerStyle, "rounded">;

export type ThumbnailShapeProps =
  | {
      ratio?: "1:1";
      orientation?: "portrait";
      cornerStyle?: ThumbnailCornerStyle;
    }
  | {
      ratio: NonSquareRatio;
      orientation?: ThumbnailOrientation;
      cornerStyle?: NonRoundedCornerStyle;
    };

interface ThumbnailBaseProps extends ComponentPropsWithoutRef<"div"> {
  src?: string;
  alt: string;
  loading?: "lazy" | "eager";
  appearance?: ThumbnailAppearance;
  fallback?: ReactNode;
}

type ThumbnailContentProps =
  | { asChild?: false; children?: never }
  | { asChild: true; children: ReactNode };

export type ThumbnailProps = Omit<ThumbnailBaseProps, "children"> &
  ThumbnailShapeProps &
  ThumbnailContentProps;
