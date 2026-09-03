import { useContext, createContext, useMemo, type ReactNode } from "react";

type ProviderProps<T> = T & { children: ReactNode };

export function createCtxProvider<T extends object>(componentName: string, defaultValue?: T) {
  const Context = createContext<T | undefined>(defaultValue);
  Context.displayName = componentName + "Context";

  function Provider(props: ProviderProps<T>) {
    const { children, ...rest } = props;
    const value = rest as unknown as T;

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
        `${consumerName ?? "use" + componentName}는 ${componentName}Provider 내부에서만 사용할 수 있습니다.`,
      );
    }
    return value;
  }

  return [Provider, useCtx] as const;
}

export function createOptionalCtxProvider<T>(componentName: string) {
  const Context = createContext<T | null>(null);
  Context.displayName = componentName + "Context";

  const useCtx = () => useContext(Context);

  return [Context.Provider, useCtx] as const;
}
