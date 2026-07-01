import { useState, useRef, useCallback, useMemo } from "react";
import type { SetStateAction } from "react";

export interface LimitedQueueProviderBaseItem {
  id: string;
  isClosing?: boolean;
}

interface UseLimitedQueueProviderProps {
  limit: number;
  fallbackTimeout: number;
}

/**
 * 지정한 개수를 초과하지 않도록 아이템 큐를 관리하는 훅.
 *
 * limit에 도달한 상태에서 새 아이템이 추가되면 가장 오래된 아이템을 닫고,
 * 제거가 완료된 뒤 새 아이템을 큐에 추가한다.
 */
export const useLimitedQueueProvider = <T extends LimitedQueueProviderBaseItem>({
  limit,
  fallbackTimeout,
}: UseLimitedQueueProviderProps) => {
  const normalizedLimit = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 1;
  
  const [items, setItems] = useState<T[]>([]);
  const itemsRef = useRef<T[]>([]);

  // 같은 아이템의 제거를 여러 addItem 호출이 기다릴 수 있어 resolver를 배열로 관리한다.
  const removeResolvers = useRef<Map<string, Array<() => void>>>(new Map());

  const syncSetItems = useCallback((updater: SetStateAction<T[]>) => {
    const next = typeof updater === "function" ? updater(itemsRef.current) : updater;
    itemsRef.current = next;
    setItems(next);
  }, []);

  const removeItem = useCallback(
    (id: string) => {
      const resolvers = removeResolvers.current.get(id);
      if (resolvers) {
        // 동일한 제거 완료를 기다리던 모든 addItem 흐름을 함께 재개한다.
        resolvers.forEach(resolve => resolve());
        removeResolvers.current.delete(id);
      }
      syncSetItems(prev => prev.filter(item => item.id !== id));
    },
    [syncSetItems],
  );

  const closeItem = useCallback(
    (id: string) => {
      syncSetItems(prev =>
        prev.map(item => (item.id === id && !item.isClosing ? { ...item, isClosing: true } : item)),
      );
    },
    [syncSetItems],
  );

  const waitForItemRemoval = useCallback(
    (id: string) =>
      new Promise<void>(resolve => {
        const existing = removeResolvers.current.get(id) || [];
        removeResolvers.current.set(id, [...existing, resolve]);

        setTimeout(() => {
          const current = removeResolvers.current.get(id);
          if (current && current.includes(resolve)) {
            // exit animation의 완료 콜백이 누락되어도 큐가 멈추지 않도록 fallback으로 제거한다.
            const allResolvers = removeResolvers.current.get(id) || [];
            allResolvers.forEach(r => r());
            removeResolvers.current.delete(id);
            syncSetItems(prev => prev.filter(item => item.id !== id));
          }
        }, fallbackTimeout);
      }),
    [fallbackTimeout, syncSetItems],
  );

  const addItem = useCallback(
    async (item: Omit<T, "id">) => {
      const id = crypto.randomUUID();
      const newItem = { ...item, id } as T;

      // 연속 호출 중에도 실제 렌더링되는 아이템 수가 limit을 넘지 않도록 추가 전까지 대기한다.
      while (itemsRef.current.length >= normalizedLimit) {
        const firstClosingItem = itemsRef.current.find(item => item.isClosing);

        if (firstClosingItem) {
          // 닫히는 중인 아이템이 있으면 새 아이템을 닫지 않도록 해당 제거를 먼저 기다린다.
          await waitForItemRemoval(firstClosingItem.id);
          continue;
        }

        const firstActiveItem = itemsRef.current[0];
        if (!firstActiveItem) break;

        closeItem(firstActiveItem.id);
        await waitForItemRemoval(firstActiveItem.id);
      }

      syncSetItems(prev => [...prev, newItem]);
      return id;
    },
    [normalizedLimit, closeItem, waitForItemRemoval, syncSetItems],
  );

  const value = useMemo(
    () => ({ items, addItem, closeItem, removeItem }),
    [items, addItem, closeItem, removeItem],
  );

  return value;
};
