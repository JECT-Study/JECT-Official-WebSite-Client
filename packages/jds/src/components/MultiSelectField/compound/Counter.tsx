import { Field } from "../../Field";
import { useMultiSelectFieldContext } from "../MultiSelectField.context";
import * as styles from "../multiSelectField.css";

export const MultiSelectFieldCounter = () => {
  const { counter } = useMultiSelectFieldContext("MultiSelectField.Counter");

  if (counter == null) return null;

  return <Field.Counter current={counter.current} max={counter.max} className={styles.counter} />;
};

MultiSelectFieldCounter.displayName = "MultiSelectField.Counter";
