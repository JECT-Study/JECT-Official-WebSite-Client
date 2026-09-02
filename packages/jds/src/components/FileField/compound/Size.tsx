import { clsx } from "clsx";
import { useLayoutEffect } from "react";

import { useFieldContext } from "../../Field/Field.context";
import * as fieldStyles from "../../Field/field.css";
import { useFileFieldContext } from "../FileField.context";
import { formatFileSize } from "../fileField.utils";

import { getLabelClassName } from "@/utils/typography";

export const FileFieldSize = () => {
  const { size } = useFileFieldContext("FileField.Size");
  const {
    counterId,
    onCounterMountChange,
    status,
    disabled: isDisabled,
  } = useFieldContext("FileField.Size");

  useLayoutEffect(() => {
    if (size == null) return;

    onCounterMountChange(true);
    return () => onCounterMountChange(false);
  }, [size, onCounterMountChange]);

  if (size == null) return null;

  return (
    <span
      id={counterId}
      className={clsx(
        getLabelClassName({ size: "sm" }),
        fieldStyles.supportText({ status, disabled: isDisabled }),
        fieldStyles.counter,
      )}
    >
      {formatFileSize(size)}
    </span>
  );
};

FileFieldSize.displayName = "FileField.Size";
