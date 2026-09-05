import { useContext, createContext, useMemo, type ReactNode } from "react";

export interface ProviderProps<T> {
  value: T;
  children: ReactNode;
}

/**
 * Provider 안에서만 사용하는 필수 컨텍스트를 만든다.
 *
 * 훅은 Provider 밖에서 호출되면 에러를 던지므로 소비처는 값의 존재를 확인하지 않아도 된다.
 * Provider가 `value`를 memo하므로 호출부에서는 객체 리터럴을 그대로 넘긴다.
 * memo는 `value`의 프로퍼티 값을 순서대로 비교하므로 프로퍼티 구성이 렌더마다 동일해야 한다.
 *
 * @param componentName - 컨텍스트와 Provider의 `displayName`에 사용하는 이름
 * @param rootName - 에러 메시지에서 안내할 상위 컴포넌트 이름
 */
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

/**
 * Provider 밖에서도 사용할 수 있는 선택적 컨텍스트를 만든다.
 *
 * 훅은 Provider 밖이거나 Provider가 `null`을 전달하면 `null`을 반환하므로 소비처에서 값이 없는 경우를 처리해야 한다.
 * `value`를 memo하지 않으므로 참조 안정성이 필요한 경우 호출부에서 memo해 전달한다.
 *
 * @param componentName - 컨텍스트와 Provider의 `displayName`에 사용하는 이름
 */
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
