import { forwardRef } from 'react';

import {
  StyledBannerBarContent,
  StyledBannerBarSubtitle,
  StyledBannerBarTitle,
  StyledBannerCloseButton,
  StyledBannerRoot,
  StyledBannerTitles,
} from './banner.styles';
import type { BannerProps } from './banner.types';
import { BlockButton } from '../Button/BlockButton';
import { IconButton } from '../Button/IconButton';

export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  ({ title, subtitle, label, onClose, closeAriaLabel = '배너 닫기', ...restProps }, ref) => {
    return (
      <StyledBannerRoot ref={ref} {...restProps}>
        <StyledBannerBarContent>
          <StyledBannerTitles>
            <StyledBannerBarTitle>{title}</StyledBannerBarTitle>
            {subtitle && <StyledBannerBarSubtitle>{subtitle}</StyledBannerBarSubtitle>}
          </StyledBannerTitles>

          {label && (
            <BlockButton.Basic size='xs' hierarchy='primary' variant='solid'>
              {label}
            </BlockButton.Basic>
          )}
        </StyledBannerBarContent>

        {onClose && (
          <StyledBannerCloseButton>
            <IconButton.Basic
              icon='close-line'
              size='lg'
              aria-label={closeAriaLabel}
              onClick={onClose}
            />
          </StyledBannerCloseButton>
        )}
      </StyledBannerRoot>
    );
  },
);

Banner.displayName = 'Banner';
