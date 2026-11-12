import { clsx } from "clsx";
import {
  forwardRef,
  useEffect,
  type ComponentPropsWithoutRef,
  type ElementType,
  type Ref,
} from "react";

import { useCardContext } from "../card.context";
import { CARD_PART_OVERLAY, type CardOverlayProps } from "../card.types";
import * as styles from "./card.css";

/**
 * Card 표면 전체를 덮는 단일 클릭 타겟
 * 자체 접근성 이름이 없으면 카드 title을 `aria-labelledby`로 보강한다.
 *
 * 링크 모드에서 `linkAs`로 next/link 같은 라우팅 컴포넌트를 지정할 수 있다.
 * 라우팅 컴포넌트는 `href`를 받아야 하며, 비활성 상태에서는 `href` 없이 기본 `a` 요소로 렌더링한다.
 *
 * @remarks
 * `as="button"`일 때 카드 내부에 인터랙티브 요소를 두지 않는다.
 * 예외적으로 내부 액션이 필요하면 오버레이 위 레이어(`z-index` > overlay)로 올려 전체 클릭과 분리한다.
 */
export const CardOverlay = forwardRef<HTMLAnchorElement | HTMLButtonElement, CardOverlayProps>(
  ({ as = "a", linkAs, children, className, ...restProps }, ref) => {
    const { variant, isDisabled, titleId } = useCardContext("Card.Overlay");
    const overlayClassName = clsx(styles.overlay({ variant, isDisabled }), className);

    const ariaLabel = restProps["aria-label"];
    const explicitAriaLabelledby = restProps["aria-labelledby"];
    const hasAccessibleName =
      children != null || ariaLabel != null || explicitAriaLabelledby != null;
    const ariaLabelledby = explicitAriaLabelledby ?? (hasAccessibleName ? undefined : titleId);

    useEffect(() => {
      const isDevelopment =
        typeof process !== "undefined" && process.env?.NODE_ENV !== "production";

      if (!isDevelopment || hasAccessibleName) return;
      if (typeof document !== "undefined" && document.getElementById(titleId)) return;

      console.warn(
        "Card.Overlay는 접근 이름이 필요합니다. Card.Title, aria-label, aria-labelledby, children 중 하나를 제공하세요.",
      );
    }, [hasAccessibleName, titleId]);

    if (as === "button") {
      const { type, ...buttonProps } = restProps as ComponentPropsWithoutRef<"button">;

      return (
        <button
          ref={ref as Ref<HTMLButtonElement>}
          type={type ?? "button"}
          className={overlayClassName}
          {...buttonProps}
          aria-labelledby={ariaLabelledby}
          data-part={CARD_PART_OVERLAY}
          data-disabled={isDisabled || undefined}
          disabled={isDisabled}
        >
          {children}
        </button>
      );
    }

    const { href, onClick, tabIndex, ...anchorProps } = restProps as ComponentPropsWithoutRef<"a">;
    const LinkComponent: ElementType = isDisabled ? "a" : (linkAs ?? "a");

    return (
      <LinkComponent
        ref={ref as Ref<HTMLAnchorElement>}
        className={overlayClassName}
        {...anchorProps}
        onClick={isDisabled ? undefined : onClick}
        tabIndex={isDisabled ? -1 : tabIndex}
        aria-labelledby={ariaLabelledby}
        data-part={CARD_PART_OVERLAY}
        data-disabled={isDisabled || undefined}
        aria-disabled={isDisabled || undefined}
        href={isDisabled ? undefined : href}
      >
        {children}
      </LinkComponent>
    );
  },
);

CardOverlay.displayName = "Card.Overlay";
