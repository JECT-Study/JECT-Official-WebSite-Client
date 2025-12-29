import type { IconSize } from "@/types/ui/icon";

interface IconStyleType {
  size: Record<IconSize, number>;
}

export const iconStyle: IconStyleType = {
  size: {
    "4xl": 48,
    "3xl": 40,
    "2xl": 32,
    xl: 28,
    lg: 24,
    md: 20,
    sm: 18,
    xs: 16,
    "2xs": 14,
  },
};
