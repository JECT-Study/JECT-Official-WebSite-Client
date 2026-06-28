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

  // `usePress`의 onKeyDown은 Enter/Space에서 `preventDefault()`를 호출한다. 이 컨테이너는
  // 자식 native 폼 요소(input 등)의 keydown이 버블되어 들어오는데(`nodeContains` 통과),
  // 여기서 preventDefault가 걸리면 (1) 자식 폼 요소의 네이티브 키보드 동작을 방해할 수 있고
  // (2) 이 컨테이너를 Radix `Trigger asChild`로 쓸 때 합성된 트리거 onKeyDown이 스킵된다.
  // (cf. `usePressable`의 동일 이슈) 컨테이너 자신은 포커스/키보드 활성화 대상이 아니라
  // (실제 활성화는 자식 input이 담당) onKeyDown을 비워도 잃는 동작이 없다.
  // NOTE: 키보드 누름 시 컨테이너 press 오버레이만 빠지며, CSS `:active` fallback이 커버한다.
  const resolvedPressProps = { ...pressProps, onKeyDown: undefined };

  return {
    containerPressableProps: {
      ...mergeProps(hoverProps, resolvedPressProps, focusProps),
      "data-hovered": isHovered || undefined,
      "data-pressed": isPressed || undefined,
      "data-focus-visible": isFocusVisible || undefined,
      "data-disabled": disabled || undefined,
    },
  };
}
