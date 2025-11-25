import { forwardRef } from 'react';
import type { EmptyStateProps } from './emptyState.types';
import {
  EmptyStateLabel,
  EmptyStateDiv,
  EmptyStateBodyTextP,
  EmptyStateContentDiv,
  EmptyStateBlockButton,
  EmptyStateButtonContainerDiv,
} from './emptyState.styles';
import { Icon } from '../Icon';

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  {
    variant = 'empty',
    layout = 'vertical',
    labelText,
    bodyText,
    primaryLabel,
    secondaryLabel,
    primaryButtonProps,
    secondaryButtonProps,
    icon,
    ...rest
  },
  ref,
) {
  const hasPrimary = !!primaryLabel;
  const hasSecondary = !!secondaryLabel;

  const renderActions = () => {
    if (!hasPrimary) return null;

    return (
      <EmptyStateButtonContainerDiv $hasSecondary={hasSecondary}>
        {hasSecondary && (
          <EmptyStateBlockButton
            variant='outlined'
            hierarchy='secondary'
            size='sm'
            {...secondaryButtonProps}
          >
            {secondaryLabel}
          </EmptyStateBlockButton>
        )}
        <EmptyStateBlockButton size='sm' {...primaryButtonProps}>
          {primaryLabel}
        </EmptyStateBlockButton>
      </EmptyStateButtonContainerDiv>
    );
  };

  return (
    <EmptyStateDiv ref={ref} $variant={variant} $layout={layout} {...rest}>
      {icon && <Icon name={icon} size='3xl' aria-hidden='true' focusable={false} />}
      <EmptyStateContentDiv $layout={layout}>
        <EmptyStateLabel weight='bold' textAlign='center'>
          {labelText}
        </EmptyStateLabel>
        <EmptyStateBodyTextP $layout={layout}>{bodyText}</EmptyStateBodyTextP>
      </EmptyStateContentDiv>
      {renderActions()}
    </EmptyStateDiv>
  );
});

EmptyState.displayName = 'EmptyState';
