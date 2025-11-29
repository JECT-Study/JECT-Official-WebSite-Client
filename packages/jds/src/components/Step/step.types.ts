import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type StepSize = 'lg' | 'md' | 'sm' | 'xs';
export type StepStatus = 'completed' | 'ongoing' | 'uncompleted';

export interface StepRootProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export interface StepItemProps extends ComponentPropsWithoutRef<'div'> {
  status: StepStatus;
  size?: StepSize;
  children: ReactNode;
}
