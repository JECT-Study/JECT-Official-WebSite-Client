import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import type { ForwardedRef } from "react";

type PressableElementType = "button" | "a" | "div" | "span" | "input";

interface UseCompositePressableOptions {
  disabled?: boolean;
  //NOTE: main action은 활성 상태지만 root hover 시각화만 막아야 하는 경우에 사용한다.
  // File의 readonly 상태처럼 클릭/포커스 가능 여부와 hover feedback 정책이 분리된 케이스.
  hoverDisabled?: boolean;
  //NOTE: Host element 종류이며 `useButton`의 dispatch에 사용된다.
  elementType?: PressableElementType;
}

/**
 * 내부에 main action과 보조 action(remove/close 등)이 같은 depth로 존재하는 합성형 컴포넌트용 훅.
 *
 * 실제 press/focus 대상은 내부 main action element가 담당하고, root는 hover/press/focus-visible
 * 시각 상태만 `data-*`로 위임받는다. Chip/File처럼 "탭 순서는 main action → 보조 action"이면서
 * main action의 상태를 컴포넌트 전체 스타일로 보여줘야 하는 구조에 사용한다.
 *
 * `useContainerPressable`과 달리 `useFocusRing({ within: true })`를 쓰지 않는다. within focus를 쓰면
 * close/remove button에 포커스가 이동했을 때도 root가 focus-visible 상태가 되어, root focus ring과
 * 보조 action focus ring이 동시에 보일 수 있기 때문이다.
 *
 * @example Chip, File처럼 root 안에 main action button과 IconButton이 나란히 있는 컴포넌트에 사용
 */
export function useCompositePressable<T extends HTMLElement>(
  forwardedRef: ForwardedRef<T>,
  {
    disabled = false,
    hoverDisabled = disabled,
    elementType = "button",
  }: UseCompositePressableOptions = {},
) {
  const mainActionRef = useObjectRef(forwardedRef);

  const { focusProps, isFocusVisible } = useFocusRing();
  const { hoverProps, isHovered } = useHover({ isDisabled: hoverDisabled });
  const { buttonProps, isPressed } = useButton(
    { isDisabled: disabled, elementType },
    mainActionRef,
  );

  // native `<button>`는 브라우저가 Enter/Space 활성화를 직접 처리한다.
  // 반면 `useButton`의 onKeyDown은 Enter/Space에서 `preventDefault()`를 호출하므로,
  // native button에서는 비워 브라우저 기본 동작과 합성된 onKeyDown을 방해하지 않게 한다.
  const resolvedButtonProps =
    elementType === "button" ? { ...buttonProps, onKeyDown: undefined } : buttonProps;

  return {
    mainActionRef,
    mainActionProps: mergeProps(resolvedButtonProps, focusProps),
    rootProps: {
      ...hoverProps,
      "data-hovered": isHovered || undefined,
      "data-pressed": isPressed || undefined,
      "data-focus-visible": isFocusVisible || undefined,
      "data-disabled": disabled || undefined,
    },
  };
}
