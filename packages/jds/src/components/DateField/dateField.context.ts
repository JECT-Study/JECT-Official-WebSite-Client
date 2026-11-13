import { createCtxProvider } from "@/hooks/createCtxProvider";

interface DateFieldContextValue {
  /** Helper 문구 대신 보여 줄 입력 오류 문구. 보여 줄 입력 오류가 없으면 null이다. */
  inputErrorMessage: string | null;
  /** Input이 입력 오류를 보여 줄 시점인지 알린다. */
  onInputErrorVisibleChange: (isVisible: boolean) => void;
  /** DateField.Helper가 mount/unmount될 때 호출된다. */
  onHelperMountChange: (isMounted: boolean) => void;
}

export const [DateFieldProvider, useDateFieldContext] = createCtxProvider<DateFieldContextValue>(
  "DateField",
  "DateField",
);
