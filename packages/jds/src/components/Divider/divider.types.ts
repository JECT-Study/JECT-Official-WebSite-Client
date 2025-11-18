import type { ComponentPropsWithoutRef } from 'react';

export type DividerThickness = 'normal' | 'bold' | 'bolder' | 'boldest';
export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps extends Omit<ComponentPropsWithoutRef<'hr'>, 'children' | 'color'> {
  thickness?: DividerThickness;
  decorative?: boolean;
  orientation?: DividerOrientation;
}
