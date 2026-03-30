import type { ThemeVariant } from "@jects/jds";

export interface BadgeItem {
  label: string;
  variant: ThemeVariant;
}

export interface TeamProjectItem {
  id: number;
  stepLabel: string;
  badges: BadgeItem[];
  title: string;
  description: string;
}

export interface FigmaGuideItem {
  id: number;
  title: string;
  descriptions: string[];
}
