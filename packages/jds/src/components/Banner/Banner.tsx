import { forwardRef } from 'react';

import {
  StyledBannerBarContent,
  StyledBannerBarSubtitle,
  StyledBannerBarTitle,
  StyledBannerCloseButton,
  StyledBannerImageContent,
  StyledBannerImageContentWrapper,
  StyledBannerImageGradient,
  StyledBannerImageRoot,
  StyledBannerImageSubtitle,
  StyledBannerImageTitle,
  StyledBannerRoot,
  StyledBannerTitles,
} from './banner.styles';
import type { BannerProps } from './banner.types';
import { BlockButton } from '../Button/BlockButton';
import { IconButton } from '../Button/IconButton';
import { Image } from '../Image/Image';

export const Banner = forwardRef<HTMLDivElement, BannerProps>((props, ref) => {
  if (props.variant === 'image') {
    const { src, alt, title, subtitle, ...restProps } = props;

    return (
      <StyledBannerImageRoot ref={ref} {...restProps}>
        <Image
          src={src}
          alt={alt}
          orientation='landscape'
          isReadonly
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            padding: 0,
          }}
        />

        <StyledBannerImageGradient />

        <StyledBannerImageContentWrapper>
          <StyledBannerImageContent>
            <StyledBannerImageTitle>{title}</StyledBannerImageTitle>
            {subtitle && <StyledBannerImageSubtitle>{subtitle}</StyledBannerImageSubtitle>}
          </StyledBannerImageContent>
        </StyledBannerImageContentWrapper>
      </StyledBannerImageRoot>
    );
  }

  const { title, subtitle, label, onClose, closeAriaLabel = '배너 닫기', ...restProps } = props;

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
});

Banner.displayName = 'Banner';
