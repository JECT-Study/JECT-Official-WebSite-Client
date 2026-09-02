import { clsx } from "clsx";
import { forwardRef, useLayoutEffect, useRef, type ChangeEvent, type MouseEvent } from "react";

import { IconButton } from "../../Button/IconButton";
import { FieldContent } from "../../Field";
import { useFieldControl } from "../../Field/useFieldControl";
import { Icon } from "../../Icon";
import { useFileFieldContext } from "../FileField.context";
import * as styles from "../fileField.css";
import type { FileFieldInputProps, FileFieldValue } from "../fileField.types";
import { validateFile } from "../fileField.utils";

import { mergeRefs } from "@/hooks/mergeRefs";
import { useControllableState } from "@/hooks/useControllableState";
import { getBodyClassName } from "@/utils/typography";

/**
 * @description Field 컨텍스트를 소비해 필드 박스와 실제 file input을 함께 렌더한다.
 * 박스를 클릭하면 파일 선택창이 열리고, 이미 파일이 선택된 상태에서는 다른 파일로 교체할 수 있다.
 * controlled(`value`, `onChange`)와 uncontrolled(`defaultValue`) 방식을 지원한다.
 * 실제 파일 데이터가 없는 값은 표시만 하고 native 폼 전송에는 포함하지 않는다.
 */
export const FileFieldInput = forwardRef<HTMLInputElement, FileFieldInputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      accept,
      maxSize,
      onError,
      placeholder,
      suffix,
      disabled: disabledFromProps,
      readOnly: readOnlyFromProps,
      required: requiredFromProps,
      onClick: onClickFromProps,
      "aria-label": ariaLabelFromProps,
      "aria-labelledby": labelledByFromProps,
      "aria-describedby": describedByFromProps,
      "aria-invalid": invalidFromProps,
      className,
      ...restProps
    },
    ref,
  ) => {
    const {
      fieldId,
      isDisabled,
      isReadOnly,
      isRequired,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      ariaInvalid,
    } = useFieldControl("FileField.Input", {
      disabled: disabledFromProps,
      readOnly: readOnlyFromProps,
      required: requiredFromProps,
      ariaLabel: ariaLabelFromProps,
      ariaLabelledBy: labelledByFromProps,
      ariaDescribedBy: describedByFromProps,
      ariaInvalid: invalidFromProps,
    });

    const { onSizeChange } = useFileFieldContext("FileField.Input");

    const inputRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useControllableState<FileFieldValue | null>(
      value,
      defaultValue ?? null,
      next => onChange?.(next instanceof File ? next : null),
    );

    const valueId = `${fieldId}-value`;
    const isInteractive = !isDisabled && !isReadOnly;
    const hasFile = file != null;

    useLayoutEffect(() => {
      onSizeChange(file?.size ?? null);
      return () => onSizeChange(null);
    }, [file, onSizeChange]);

    // native 폼 전송과 현재 값을 일치시키기 위해 input.files를 동기화한다.
    // 실제 파일 데이터가 없는 값은 전송할 수 없으므로 목록을 비운다.
    const syncInputFiles = (next: FileFieldValue | null) => {
      const input = inputRef.current;
      if (input == null || typeof DataTransfer === "undefined") return;

      const nextFile = next instanceof File ? next : null;
      if ((input.files?.[0] ?? null) === nextFile) return;

      const transfer = new DataTransfer();
      if (nextFile != null) transfer.items.add(nextFile);
      input.files = transfer.files;
    };

    useLayoutEffect(() => {
      syncInputFiles(file);
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!isInteractive) {
        syncInputFiles(file);
        return;
      }

      const selected = e.target.files?.[0] ?? null;
      if (selected == null) return;

      const error = validateFile(selected, { accept, maxSize });
      if (error != null) {
        // 거절한 파일은 값에 반영하지 않으므로 이전 파일로 되돌린다.
        syncInputFiles(file);
        onError?.({ type: error, file: selected });
        return;
      }

      setFile(selected);
    };

    const handleClick = (e: MouseEvent<HTMLInputElement>) => {
      onClickFromProps?.(e);
      if (e.defaultPrevented) return;

      if (!isInteractive) e.preventDefault();
    };

    const handleClear = () => {
      setFile(null);
      inputRef.current?.focus();
    };

    return (
      <FieldContent data-disabled={isDisabled || undefined}>
        <span className={clsx(getBodyClassName({ size: "md" }), styles.value)} aria-hidden>
          {hasFile ? (
            <>
              <Icon name='paperclip' size='sm' className={styles.icon} />
              <span id={valueId} className={styles.fileName}>
                {file.name}
              </span>
            </>
          ) : (
            <span id={valueId} className={styles.placeholder}>
              {placeholder}
            </span>
          )}
        </span>
        <input
          {...restProps}
          ref={mergeRefs(ref, inputRef)}
          id={fieldId}
          type='file'
          accept={accept}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={[valueId, ariaDescribedBy].filter(Boolean).join(" ")}
          aria-invalid={ariaInvalid}
          // input[type="file"]은 native readonly를 지원하지 않으므로 aria-readonly를 명시한다.
          aria-readonly={isReadOnly || undefined}
          aria-required={isRequired || undefined}
          disabled={isDisabled}
          data-field-control=''
          data-readonly={isReadOnly || undefined}
          className={clsx(styles.input, className)}
          onChange={handleChange}
          onClick={handleClick}
        />
        {hasFile && (
          <IconButton
            hierarchy='tertiary'
            size='md'
            icon='x'
            aria-label={`${file.name} 파일 삭제`}
            disabled={!isInteractive}
            className={styles.clearButton}
            onClick={handleClear}
          />
        )}
        {suffix != null && <span className={styles.suffix}>{suffix}</span>}
      </FieldContent>
    );
  },
);

FileFieldInput.displayName = "FileField.Input";
