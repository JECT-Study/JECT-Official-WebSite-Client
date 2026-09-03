import { useContext, createContext, useMemo, type ReactNode } from "react";

export interface ProviderProps<T> {
  value: T;
  children: ReactNode;
}

export function createCtxProvider<T extends object>(
  componentName: string,
  rootName = componentName + "Provider",
) {
  const Context = createContext<T | undefined>(undefined);
  Context.displayName = componentName + "Context";

  function Provider({ value, children }: ProviderProps<T>) {
    const memoized = useMemo(
      () => value,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(value),
    );

    return <Context.Provider value={memoized}>{children}</Context.Provider>;
  }

  Provider.displayName = componentName + "Provider";

  function useCtx(consumerName?: string) {
    const value = useContext(Context);
    if (value === undefined) {
      throw new Error(
        `${consumerName ?? "use" + componentName}는 ${rootName} 내부에서만 사용할 수 있습니다.`,
      );
    }
    return value;
  }

  return [Provider, useCtx] as const;
}

export function createOptionalCtxProvider<T extends object>(componentName: string) {
  const Context = createContext<T | null>(null);
  Context.displayName = componentName + "Context";

  function Provider({ value, children }: ProviderProps<T | null>) {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  Provider.displayName = componentName + "Provider";

  const useCtx = () => useContext(Context);

  return [Provider, useCtx] as const;
}
