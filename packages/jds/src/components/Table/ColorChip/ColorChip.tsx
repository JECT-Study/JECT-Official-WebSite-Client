import { StyledColorChip } from "./ColorChip.styles";
import type { ColorChipProps } from "./ColorChip.types";

export const ColorChip = ({ color, className, ...restProps }: ColorChipProps) => {
  return <StyledColorChip $color={color} className={className} {...restProps} />;
};

ColorChip.displayName = "ColorChip";
