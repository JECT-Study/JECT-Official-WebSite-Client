import { useCallback, useRef, useState } from "react";

/**
 * 스크롤 컨테이너의 세로 오버플로 여부를 관찰한다.
 *
 * 컨테이너와 직계 자식의 크기 변화, 자식의 추가/제거를 감지해 `isOverflowing`을 갱신한다.
 * 스크롤이 실제로 생길 때만 `tabIndex`를 부여해 키보드 탐색을 허용하는 용도로 쓴다.
 *
 * @example
 * ```tsx
 * const { ref, isOverflowing } = useVerticalOverflow<HTMLDivElement>();
 * <div ref={ref} tabIndex={isOverflowing ? 0 : undefined} />
 * ```
 */
export const useVerticalOverflow = <T extends HTMLElement>() => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const disconnectRef = useRef<(() => void) | null>(null);

  const ref = useCallback((node: T | null) => {
    disconnectRef.current?.();
    disconnectRef.current = null;

    if (!node || typeof ResizeObserver === "undefined") {
      setIsOverflowing(false);
      return;
    }

    const measure = () => {
      setIsOverflowing(node.scrollHeight - node.clientHeight > 1);
    };

    const resizeObserver = new ResizeObserver(measure);
    const observeTargets = () => {
      resizeObserver.disconnect();
      resizeObserver.observe(node);
      for (const child of Array.from(node.children)) resizeObserver.observe(child);
    };

    const mutationObserver = new MutationObserver(() => {
      observeTargets();
      measure();
    });

    observeTargets();
    mutationObserver.observe(node, { childList: true });
    measure();

    disconnectRef.current = () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return { ref, isOverflowing };
};
