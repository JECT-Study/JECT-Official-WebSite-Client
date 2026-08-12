import { Field } from "../../Field";
import { useMultiSelectFieldContext } from "../MultiSelectField.context";
import * as styles from "../multiSelectField.css";

export const MultiSelectFieldCounter = () => {
  const { selectedValues, maxValues } = useMultiSelectFieldContext("MultiSelectField.Counter");

  if (maxValues == null) return null;

  return (
    <Field.Counter current={selectedValues.length} max={maxValues} className={styles.counter} />
  );
};

MultiSelectFieldCounter.displayName = "MultiSelectField.Counter";
