import { Field } from "../../Field";
import { useTextareaContext } from "../Textarea.context";
import * as styles from "../textarea.css";

export const TextareaCounter = () => {
  const { counter } = useTextareaContext("Textarea.Counter");

  if (counter == null) return null;

  return <Field.Counter current={counter.current} max={counter.max} className={styles.counter} />;
};

TextareaCounter.displayName = "Textarea.Counter";
