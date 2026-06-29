import { useState, useRef, useCallback } from "react";

export interface LimitedQueueProviderBaseItem {
  id: string;
  isClosing?: boolean;
}

interface UseLimitedQueueProviderProps {
  limit?: number;
  fallbackTimeout: number;
}

export const useLimitedQueueProvider = <T extends LimitedQueueProviderBaseItem>({
  limit = 3,
  fallbackTimeout,
}: UseLimitedQueueProviderProps) => {
  const [items, setItems] = useState<T[]>([]);
  const removeResolvers = useRef<Map<string, () => void>>(new Map());

  const removeItem = useCallback((id: string) => {
    const resolver = removeResolvers.current.get(id);
    if (resolver) {
      resolver();
      removeResolvers.current.delete(id);
    }

    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const closeItem = useCallback((id: string) => {
    setItems(prev =>
      prev.map(item => (item.id === id && !item.isClosing ? { ...item, isClosing: true } : item)),
    );
  }, []);

  const addItem = useCallback(
    async (item: Omit<T, "id">) => {
      const id = crypto.randomUUID();
      const newItem = { ...item, id } as T;

      if (items.length >= limit) {
        const first = items[0];
        closeItem(first.id);

        await new Promise<void>(resolve => {
          removeResolvers.current.set(first.id, resolve);

          setTimeout(() => {
            if (removeResolvers.current.has(first.id)) {
              resolve();
              removeResolvers.current.delete(first.id);
              setItems(prev => prev.filter(i => i.id !== first.id));
            }
          }, fallbackTimeout);
        });
      }

      setItems(prev => [...prev, newItem]);
      return id;
    },
    [items, limit, fallbackTimeout, closeItem],
  );

  return { items, addItem, closeItem, removeItem };
};
