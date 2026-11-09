import { clsx } from "clsx";
import { forwardRef } from "react";

import { useFieldContext } from "../../Field/field.context";
import * as fieldStyles from "../../Field/field.css";
import { useFieldCounterSlot } from "../../Field/useFieldCounter";
import { useFileFieldContext } from "../fileField.context";
import type { FileFieldSizeProps } from "../fileField.types";

import { formatFileSize } from "@/utils/formatFileSize";
import { getLabelClassName } from "@/utils/typography";

/**
 * @description FileField.Input이 보고한 파일 용량을 렌더한다.
 * 선택된 파일이 없으면 배치해도 렌더되지 않는다.
 */
export const FileFieldSize = forwardRef<HTMLSpanElement, FileFieldSizeProps>(
  ({ sizeFormatter = formatFileSize, className, ...restProps }, ref) => {
    const { size } = useFileFieldContext("FileField.Size");
    const { status, disabled: isDisabled } = useFieldContext("FileField.Size");
    const { counterId, isOwner } = useFieldCounterSlot("FileField.Size", size != null);

    if (size == null || !isOwner) return null;

    return (
      <span
        {...restProps}
        ref={ref}
        id={counterId}
        className={clsx(
          getLabelClassName({ size: "sm", weight: "subtle" }),
          fieldStyles.supportText({ status, disabled: isDisabled }),
          fieldStyles.counter,
          className,
        )}
      >
        {sizeFormatter(size)}
      </span>
    );
  },
);

FileFieldSize.displayName = "FileField.Size";
