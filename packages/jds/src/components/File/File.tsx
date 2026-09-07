import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./file.css";
import type { FileProps } from "./file.types";
import { IconButton } from "../Button/IconButton";
import { Icon } from "../Icon";

import { formatFileSize } from "@/utils/formatFileSize";
import { getLabelClassName } from "@/utils/typography";

export const File = forwardRef<HTMLButtonElement, FileProps>(
  (
    {
      fileName,
      fileSize,
      sizeFormatter = formatFileSize,
      removable = false,
      readonly = false,
      disabled = false,
      onRemove,
      className,
      style,
      ...restProps
    },
    forwardedRef,
  ) => {
    const interactionClassName = disabled
      ? styles.disabled
      : readonly
        ? styles.readonly
        : styles.interactive;

    return (
      <div
        className={clsx(styles.root, interactionClassName, className)}
        style={style}
        data-readonly={readonly || undefined}
        data-disabled={disabled || undefined}
      >
        <button
          ref={forwardedRef}
          {...restProps}
          type={restProps.type ?? "button"}
          disabled={disabled}
          data-interaction-target
          className={styles.mainAction}
        >
          <span className={styles.fileInfo}>
            <Icon size='xs' name='paperclip' className={styles.icon} />
            <span
              className={clsx(getLabelClassName({ size: "md", weight: "subtle" }), styles.fileName)}
            >
              {fileName}
            </span>
          </span>
          <span
            className={clsx(getLabelClassName({ size: "sm", weight: "subtle" }), styles.fileSize)}
          >
            {sizeFormatter(fileSize)}
          </span>
        </button>

        {removable && !readonly && (
          <IconButton
            hierarchy='tertiary'
            size='sm'
            icon='x'
            className={styles.removeButton}
            aria-label={`${fileName} 파일 삭제`}
            onClick={onRemove}
          />
        )}
      </div>
    );
  },
);

File.displayName = "File";
