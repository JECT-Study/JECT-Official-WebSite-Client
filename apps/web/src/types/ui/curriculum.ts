export interface TeamProjectItem {
  id: number;
  stepLabel: string;
  title: string;
  description: string;
  isOptional?: boolean;
}

export interface FigmaGuideItem {
  id: number;
  title: string;
  descriptions: string[];
}
