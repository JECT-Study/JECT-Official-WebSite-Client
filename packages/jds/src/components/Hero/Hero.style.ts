import styled from "@emotion/styled";

export const SIZE_TO_TEXT_STYLE = {
  xs: "semantic-textStyle-hero-1",
  sm: "semantic-textStyle-hero-2",
  md: "semantic-textStyle-hero-3",
  lg: "semantic-textStyle-hero-4",
} as const;

export const TEXT_ALIGN_MAPPING = {
  center: "center",
  left: "flex-start",
  right: "flex-end",
} as const;

export type HeroSize = keyof typeof SIZE_TO_TEXT_STYLE;
export type HeroTextAlign = keyof typeof TEXT_ALIGN_MAPPING;

interface StyledHeroProps {
  size: HeroSize;
  textAlign: HeroTextAlign;
  color: string;
}

export const HeroDiv = styled.div<StyledHeroProps>(({ theme, size, textAlign, color }) => {
  const textStyleKey = SIZE_TO_TEXT_STYLE[size];
  const justifyContent = TEXT_ALIGN_MAPPING[textAlign];

  return {
    display: "flex",
    justifyContent,
    alignItems: "center",
    color,
    cursor: "default",
    ...theme.textStyle[textStyleKey],
  };
});
