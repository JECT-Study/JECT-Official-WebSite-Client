import { mergeProps } from "@react-aria/utils";
import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./file.css";
import type { FileProps } from "./file.types";
import { IconButton } from "../Button/IconButton";
import { Icon } from "../Icon";

import { useCompositePressable } from "@/hooks";
import { getLabelClassName } from "@/utils/typography";

export const File = forwardRef<HTMLButtonElement, FileProps>(
  (
    {
      fileName,
      fileSize,
      removable = false,
      readonly = false,
      disabled = false,
      onRemove,
      className,
      ...restProps
    },
    forwardedRef,
  ) => {
    const { mainActionRef, mainActionProps, rootProps } = useCompositePressable(forwardedRef, {
      disabled,
      hoverDisabled: disabled || readonly,
      elementType: "button",
    });

    const interactionClassName = disabled
      ? styles.disabled
      : readonly
        ? styles.readonly
        : styles.interactive;

    return (
      <div
        {...rootProps}
        className={clsx(styles.root, interactionClassName, className)}
        data-readonly={readonly || undefined}
        data-file-disabled={disabled || undefined}
      >
        <button
          ref={mainActionRef}
          {...mergeProps(mainActionProps, restProps)}
          type={restProps.type ?? "button"}
          disabled={disabled}
          className={styles.mainAction}
        >
          <span className={styles.fileInfo}>
            <Icon size='xs' name='link-diagonal-line' className={styles.icon} />
            <span
              className={clsx(getLabelClassName({ size: "md", weight: "subtle" }), styles.fileName)}
            >
              {fileName}
            </span>
          </span>
          <span
            className={clsx(
              getLabelClassName({ size: "sm", textAlign: "right", weight: "subtle" }),
              styles.fileSize,
            )}
          >
            {fileSize}
          </span>
        </button>

        {removable && !readonly && (
          <IconButton
            hierarchy='accent'
            size='sm'
            icon='close-line'
            className={styles.removeButton}
            aria-label={`${fileName} 파일 삭제`}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onRemove?.(e);
            }}
          />
        )}
      </div>
    );
  },
);

File.displayName = "File";
