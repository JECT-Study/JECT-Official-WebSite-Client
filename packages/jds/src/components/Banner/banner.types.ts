import type { ComponentPropsWithoutRef } from "react";

import type { ThumbnailProps } from "../Thumbnail";

export type BannerVariant = "bar" | "image";

interface BaseBannerProps extends ComponentPropsWithoutRef<"div"> {
  title: string;
  subtitle?: string;
}

export interface BannerBarProps extends BaseBannerProps {
  variant?: "bar";
  label?: string;
  onClose?: () => void;
  closeAriaLabel?: string;
}

export interface BannerImageProps extends Omit<
  ThumbnailProps,
  "ratio" | "orientation" | "cornerStyle" | "alt" | "asChild" | "children"
> {
  variant?: "image";
  title: string;
  subtitle?: string;
}

export type BannerProps = BannerBarProps | BannerImageProps;
