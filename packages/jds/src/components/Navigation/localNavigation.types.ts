import type { ReactNode } from 'react';

import type { IconButtonBasicProps, TitleProps } from '@/components';

export type LocalNavigationVariant = 'empty' | 'solid';

export interface LocalNavigationRootProps {
  isStretched?: boolean;
  children?: ReactNode;
}

export type LocalNavigationBackButtonProps = Omit<
  IconButtonBasicProps,
  'icon' | 'hierarchy' | 'size'
>;

export type LocalNavigationTitleProps = Omit<TitleProps, 'size' | 'textAlign'>;

export interface LocalNavigationButtonGroupProps {
  extraButtonVisible?: boolean;
  children?: ReactNode;
}

export interface StyledLocalNavigationRootProps {
  $isStretched: boolean;
}
