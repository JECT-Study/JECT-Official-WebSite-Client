import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type DividerThickness = 'normal' | 'bold' | 'bolder' | 'boldest';
export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerTextAlign = 'left' | 'center' | 'right';

interface BaseDividerProps {
  thickness?: DividerThickness;
  decorative?: boolean;
}

export interface DividerProps
  extends BaseDividerProps,
    Omit<ComponentPropsWithoutRef<'hr'>, 'children' | 'color'> {
  orientation?: DividerOrientation;
}

export interface DividerWithTextProps
  extends BaseDividerProps,
    Omit<ComponentPropsWithoutRef<'div'>, 'color'> {
  children: ReactNode;
  textAlign?: DividerTextAlign;
}
