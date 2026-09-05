import { clsx } from "clsx";
import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import { visuallyHidden } from "utils";

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
    });

    const { onSizeChange } = useFileFieldContext("FileField.Input");

    const inputRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useControllableState<FileFieldValue | null>(
      value,
      defaultValue ?? null,
      next => onChange?.(next instanceof File ? next : null),
    );

    const defaultValueRef = useRef(defaultValue ?? null);

    const valueId = `${fieldId}-value`;
    const stateId = `${fieldId}-state`;
    const stateText = [
      isRequired ? "필수 사항" : undefined,
      isReadOnly ? "읽기 전용" : undefined,
      ariaInvalid === true ? "유효하지 않은 데이터" : undefined,
    ]
      .filter(Boolean)
      .join(", ");
    const isInteractive = !isDisabled && !isReadOnly;
    const hasFile = file != null;
    const isNativeFile = file instanceof File;

    useLayoutEffect(() => {
      onSizeChange(file?.size ?? null);
      return () => onSizeChange(null);
    }, [file, onSizeChange]);

    // native 폼 전송과 현재 값을 일치시키기 위해 input.files를 동기화한다.
    // 실제 파일 데이터가 없는 값은 전송할 수 없으므로 목록을 비운다.
    const syncInputFiles = (next: FileFieldValue | null) => {
      const input = inputRef.current;
      if (input == null) return;

      const nextFile = next instanceof File ? next : null;
      if ((input.files?.[0] ?? null) === nextFile) return;

      const transfer = new DataTransfer();
      if (nextFile != null) transfer.items.add(nextFile);
      input.files = transfer.files;
    };

    useLayoutEffect(() => {
      syncInputFiles(file);
    });

    useEffect(() => {
      const form = inputRef.current?.form;
      if (form == null) return;

      // 클릭으로 발생한 reset 기본 동작은 마이크로태스크 이후에 실행되어 input.files를 비운다.
      // 기본 동작이 끝난 다음 태스크에서 값을 되돌린다. 소비처의 초기화 취소 여부도 이 시점에 확인할 수 있다.
      const handleReset = (e: Event) => {
        setTimeout(() => {
          if (e.defaultPrevented) return;

          setFile(defaultValueRef.current);
          syncInputFiles(defaultValueRef.current);
        }, 0);
      };

      form.addEventListener("reset", handleReset);
      return () => form.removeEventListener("reset", handleReset);
    }, [setFile]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!isInteractive) {
        syncInputFiles(file);
        return;
      }

      const selected = e.target.files?.[0] ?? null;
      if (selected == null) {
        syncInputFiles(file);
        return;
      }

      const error = validateFile(selected, { accept, maxSize });
      if (error != null) {
        // 거절한 파일은 값에 반영하지 않으므로 이전 파일로 되돌린다.
        syncInputFiles(file);
        onError?.({ type: error, file: selected });
        return;
      }

      if (value !== undefined) syncInputFiles(file);
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
        {stateText !== "" && (
          // input[type="file"]에는 대응하는 WAI-ARIA role이 정의되어 있지 않으며,
          // 플랫폼에 따라 서로 다른 native 접근성 컨트롤로 매핑된다.
          // 상태 정보를 일관되게 전달하기 위해 별도의 설명으로 제공한다.
          <span id={stateId} className={visuallyHidden}>
            {stateText}
          </span>
        )}
        <input
          {...restProps}
          ref={mergeRefs(ref, inputRef)}
          id={fieldId}
          type='file'
          accept={accept}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={[
            isNativeFile ? undefined : valueId,
            stateText !== "" ? stateId : undefined,
            ariaDescribedBy,
          ]
            .filter(Boolean)
            .join(" ")}
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
