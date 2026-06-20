import { mergeProps } from "@react-aria/utils";
import { clsx } from "clsx";
import { usePressable } from "hooks";
import { forwardRef } from "react";

import * as styles from "./file.css";
import type { FileProps } from "./file.types";
import { IconButton } from "../Button/IconButton";
import { Icon } from "../Icon";

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
      ...rootProps
    },
    ref,
  ) => {
    const isPressableDisabled = disabled || readonly;
    const { ref: pressableRef, pressableProps } = usePressable(ref, {
      disabled: isPressableDisabled,
    });

    const interactionClassName = disabled
      ? styles.disabled
      : readonly
        ? styles.readonly
        : styles.interactive;

    return (
      <button
        ref={pressableRef}
        {...mergeProps(rootProps, pressableProps, {
          "data-file-disabled": disabled || undefined,
          "aria-disabled": disabled || undefined,
        })}
        className={clsx(styles.root, interactionClassName, className)}
      >
        <span className={styles.fileInfo}>
          <Icon size='xs' name='attachment-line' className={styles.icon} />
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
        {removable && !readonly && (
          <IconButton
            hierarchy='accent'
            size='sm'
            icon='close-line'
            disabled={disabled}
            className={styles.removeButton}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onRemove?.(e);
            }}
          />
        )}
      </button>
    );
  },
);

File.displayName = "File";
