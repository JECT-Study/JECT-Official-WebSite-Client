import type { IconName } from 'components';
import { BlockButtonBasicProps } from '../Button/BlockButton';

export type EmptyStateStyle = 'empty' | 'outlined' | 'alpha';
export type EmptyStateLayout = 'vertical' | 'horizontal';
export type EmptyStateButton = 'primary' | 'both';

type BlockButtonProps = Omit<BlockButtonBasicProps, 'children' | 'size' | 'variant' | 'hierarchy'>;

type EmptyStateActionOptions =
  | {
      primaryLabel?: undefined;
      primaryButtonProps?: never;
      secondaryLabel?: never;
      secondaryButtonProps?: never;
    }
  | {
      primaryLabel: string;
      primaryButtonProps: BlockButtonProps;
      secondaryLabel?: string;
      secondaryButtonProps?: BlockButtonProps;
    };

interface EmptyStateBaseProps {
  labelText: string;
  bodyText: string;
  variant?: EmptyStateStyle;
  layout?: EmptyStateLayout;
  icon?: IconName;
}

export type EmptyStateProps = EmptyStateBaseProps & EmptyStateActionOptions;
