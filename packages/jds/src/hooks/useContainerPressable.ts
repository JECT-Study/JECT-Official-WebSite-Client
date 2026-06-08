import { useFocusRing } from "@react-aria/focus";
import { useHover, usePress } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";

interface UseContainerPressableOptions {
  disabled?: boolean;
}

/**
 * 내부에 native 폼 요소(input 등)를 포함하는 컨테이너 요소용 인터랙션 훅.
 *
 * `usePressable`의 `useButton`은 `role="button"`을 주입해 자식 폼 요소와 시맨틱 충돌을 일으키므로,
 * `usePress`(role 변경 없음) + `useFocusRing({ within: true })`(자식 포커스 버블링 감지)로 대체한다.
 *
 * @example Radio.Item, Checkbox.Item 같은 컨테이너에 사용
 */
export function useContainerPressable({ disabled = false }: UseContainerPressableOptions = {}) {
  const { hoverProps, isHovered } = useHover({ isDisabled: disabled });
  const { pressProps, isPressed } = usePress({ isDisabled: disabled });
  const { focusProps, isFocusVisible } = useFocusRing({ within: true });

  return {
    containerPressableProps: {
      ...mergeProps(hoverProps, pressProps, focusProps),
      "data-hovered": isHovered || undefined,
      "data-pressed": isPressed || undefined,
      "data-focus-visible": isFocusVisible || undefined,
      "data-disabled": disabled || undefined,
    },
  };
}
