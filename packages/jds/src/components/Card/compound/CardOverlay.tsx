import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithoutRef, type Ref } from "react";

import type { CardOverlayProps } from "../Card.types";
import { useCardContext } from "../cardContext";
import * as styles from "./card.css";

/**
 * Card 표면 전체를 덮는 단일 클릭 타겟
 * 자체 접근성 이름이 없으면 카드 title을 `aria-labelledby`로 보강한다.
 *
 * @remarks
 * `as="button"`일 때 카드 내부에 인터랙티브 요소를 두지 않는다.
 * 예외적으로 내부 액션이 필요하면 오버레이 위 레이어(`z-index` > overlay)로 올려 전체 클릭과 분리한다.
 */
export const CardOverlay = forwardRef<HTMLAnchorElement | HTMLButtonElement, CardOverlayProps>(
  ({ as = "a", children, className, ...restProps }, ref) => {
    const { variant, isDisabled, titleId } = useCardContext("Card.Overlay");
    const overlayClassName = clsx(styles.overlay({ variant, isDisabled }), className);

    const ariaLabel = restProps["aria-label"];
    const explicitAriaLabelledby = restProps["aria-labelledby"];
    const hasAccessibleName = children != null || ariaLabel != null;
    const ariaLabelledby = explicitAriaLabelledby ?? (hasAccessibleName ? undefined : titleId);

    if (as === "button") {
      const { type, ...buttonProps } = restProps as ComponentPropsWithoutRef<"button">;

      return (
        <button
          ref={ref as Ref<HTMLButtonElement>}
          type={type ?? "button"}
          className={overlayClassName}
          {...buttonProps}
          aria-labelledby={ariaLabelledby}
          data-overlay
          data-disabled={isDisabled || undefined}
          disabled={isDisabled}
        >
          {children}
        </button>
      );
    }

    const { href, ...anchorProps } = restProps as ComponentPropsWithoutRef<"a">;

    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        className={overlayClassName}
        {...anchorProps}
        aria-labelledby={ariaLabelledby}
        data-overlay
        data-disabled={isDisabled || undefined}
        aria-disabled={isDisabled || undefined}
        href={isDisabled ? undefined : href}
      >
        {children}
      </a>
    );
  },
);

CardOverlay.displayName = "Card.Overlay";
