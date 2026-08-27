import { Field } from "../../Field";
import { useSuggestionFieldContext } from "../SuggestionField.context";
import * as styles from "../suggestionField.css";

export const SuggestionFieldCounter = () => {
  const { counter } = useSuggestionFieldContext("SuggestionField.Counter");

  if (counter == null) return null;

  return <Field.Counter current={counter.current} max={counter.max} className={styles.counter} />;
};

SuggestionFieldCounter.displayName = "SuggestionField.Counter";
