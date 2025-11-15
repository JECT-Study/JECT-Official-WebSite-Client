import { useState, useRef, useCallback } from 'react';

export interface LimitedQueueProviderBaseItem {
  id?: string;
  isClosing?: boolean;
}

interface UseLimitedQueueProviderProps {
  limit?: number;
}

export const useLimitedQueueProvider = <T extends LimitedQueueProviderBaseItem>({
  limit = 3,
}: UseLimitedQueueProviderProps) => {
  const AUTO_RESOLVE_TIME = 1500;
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
    async (item: T) => {
      const id = crypto.randomUUID();
      const newItem = { ...item, id };

      if (items.length >= limit) {
        const first = items[0];
        closeItem(first.id!);

        await new Promise<void>(resolve => {
          removeResolvers.current.set(first.id!, resolve);

          setTimeout(() => {
            if (removeResolvers.current.has(first.id!)) {
              resolve();
              removeResolvers.current.delete(first.id!);
            }
          }, AUTO_RESOLVE_TIME);
        });
      }

      setItems(prev => [...prev, newItem]);
      return id;
    },
    [items, limit],
  );

  return { items, addItem, closeItem, removeItem };
};
