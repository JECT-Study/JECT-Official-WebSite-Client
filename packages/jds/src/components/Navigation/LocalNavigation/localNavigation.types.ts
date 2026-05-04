import type { ElementType, ReactNode } from 'react';

import type { IconButtonProps } from '../../Button/IconButton';

export interface LocalNavigationRootProps {
  isStretched?: boolean;
  children?: ReactNode;
}

export type LocalNavigationBackButtonProps = Omit<
  IconButtonProps,
  'icon' | 'hierarchy' | 'size'
>;

export interface LocalNavigationTitleProps {
  as?: ElementType;
  children?: ReactNode;
}

export interface LocalNavigationButtonGroupProps {
  extraButtonVisible?: boolean;
  children?: ReactNode;
}

export interface StyledLocalNavigationRootProps {
  $isStretched: boolean;
}
