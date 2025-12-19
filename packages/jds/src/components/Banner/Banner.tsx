import { forwardRef } from "react";

import {
  StyledBannerBarCloseButton,
  StyledBannerBarContent,
  StyledBannerBarRoot,
  StyledBannerBarSubtitle,
  StyledBannerBarTitle,
  StyledBannerBarTitles,
  StyledBannerImageContent,
  StyledBannerImageContentWrapper,
  StyledBannerImageGradient,
  StyledBannerImageRoot,
  StyledBannerImageSubtitle,
  StyledBannerImageTitle,
} from "./banner.styles";
import type { BannerBarProps, BannerImageProps } from "./banner.types";
import { BlockButton } from "../Button/BlockButton";
import { IconButton } from "../Button/IconButton";
import { Image } from "../Image/Image";

const BannerBar = forwardRef<HTMLDivElement, BannerBarProps>((props, ref) => {
  const { title, subtitle, label, onClose, closeAriaLabel = "배너 닫기", ...restProps } = props;

  return (
    <StyledBannerBarRoot ref={ref} {...restProps}>
      <StyledBannerBarContent>
        <StyledBannerBarTitles>
          <StyledBannerBarTitle>{title}</StyledBannerBarTitle>
          {subtitle && <StyledBannerBarSubtitle>{subtitle}</StyledBannerBarSubtitle>}
        </StyledBannerBarTitles>

        {label && (
          <BlockButton.Basic size='xs' hierarchy='primary' variant='solid'>
            {label}
          </BlockButton.Basic>
        )}
      </StyledBannerBarContent>

      {onClose && (
        <StyledBannerBarCloseButton>
          <IconButton.Basic
            icon='close-line'
            size='lg'
            aria-label={closeAriaLabel}
            onClick={onClose}
          />
        </StyledBannerBarCloseButton>
      )}
    </StyledBannerBarRoot>
  );
});

BannerBar.displayName = "Banner.Bar";

const BannerImage = forwardRef<HTMLDivElement, BannerImageProps>((props, ref) => {
  const { title, subtitle, isReadonly = true, ...imgProps } = props;

  return (
    <StyledBannerImageRoot ref={ref}>
      <Image
        orientation='landscape'
        isReadonly={isReadonly}
        alt={title}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          padding: 0,
        }}
        {...imgProps}
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
});

BannerImage.displayName = "Banner.Image";

export const Banner = {
  Bar: BannerBar,
  Image: BannerImage,
};
