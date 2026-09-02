import { clsx } from "clsx";
import { forwardRef, useLayoutEffect } from "react";

import { useFieldContext } from "../../Field/Field.context";
import * as fieldStyles from "../../Field/field.css";
import { useFileFieldContext } from "../FileField.context";
import type { FileFieldSizeProps } from "../fileField.types";

import { formatFileSize } from "@/utils/formatFileSize";
import { getLabelClassName } from "@/utils/typography";

/**
 * @description FileField.Input이 보고한 파일 용량을 렌더한다.
 * 선택된 파일이 없으면 배치해도 렌더되지 않는다.
 */
export const FileFieldSize = forwardRef<HTMLSpanElement, FileFieldSizeProps>(
  ({ className, ...restProps }, ref) => {
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
        {...restProps}
        ref={ref}
        id={counterId}
        className={clsx(
          getLabelClassName({ size: "sm" }),
          fieldStyles.supportText({ status, disabled: isDisabled }),
          fieldStyles.counter,
          className,
        )}
      >
        {formatFileSize(size)}
      </span>
    );
  },
);

FileFieldSize.displayName = "FileField.Size";
