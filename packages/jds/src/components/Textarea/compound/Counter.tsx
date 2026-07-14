import { clsx } from "clsx";

import { useTextareaContext } from "../Textarea.context";
import * as styles from "../textarea.css";

import { getLabelClassName } from "@/utils/typography";

/**
 * @description maxLength 가 지정된 경우에만 `현재/최대` 형태로 글자 수를 박스 내부 우측 하단에 표시한다.
 * 길이는 Textarea 컨텍스트에서 읽으므로 별도 prop 이 필요 없다.
 */
export const TextareaCounter = () => {
  const { valueLength, maxLength } = useTextareaContext("Textarea.Counter");

  if (maxLength == null) return null;

  return (
    <span className={clsx(getLabelClassName({ size: "sm" }), styles.counter)}>
      {`${valueLength}/${maxLength}`}
    </span>
  );
};

TextareaCounter.displayName = "Textarea.Counter";
