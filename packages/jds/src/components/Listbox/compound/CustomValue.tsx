import { clsx } from "clsx";

import { useListboxContext } from "../listbox.context";
import * as styles from "../listbox.css";
import type { ListboxCustomValueProps } from "../listbox.types";
import { getOptionId } from "../listbox.utils";

import { getActiveDescendantItemProps } from "@/hooks/useActiveDescendant";
import { getLabelClassName } from "@/utils/typography";

export const ListboxCustomValue = ({ value, caption }: ListboxCustomValueProps) => {
  const {
    listboxId,
    disabled: isDisabled,
    activeValue,
    select,
    setActive,
  } = useListboxContext("Listbox.CustomValue");

  const handleClick = () => {
    if (isDisabled) return;
    setActive(value);
    select(value);
  };

  return (
    <div
      id={getOptionId(listboxId, value)}
      role='option'
      aria-selected={false}
      aria-disabled={isDisabled || undefined}
      {...getActiveDescendantItemProps({ value, disabled: isDisabled })}
      data-active={activeValue === value || undefined}
      className={styles.option}
      onClick={handleClick}
    >
      <span
        className={clsx(
          getLabelClassName({ size: "md" }),
          styles.optionText,
          styles.customValueText,
        )}
      >
        {`"${value}"`}
      </span>
      {caption && (
        <span
          className={clsx(
            getLabelClassName({ size: "sm", weight: "subtle" }),
            styles.optionCaption,
            styles.customValueCaption,
          )}
        >
          {caption}
        </span>
      )}
    </div>
  );
};

ListboxCustomValue.displayName = "Listbox.CustomValue";
