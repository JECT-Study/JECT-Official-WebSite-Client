import { mergeProps } from "@react-aria/utils";
import { clsx } from "clsx";
import { usePressable } from "hooks";
import { forwardRef } from "react";

import * as styles from "./file.css";
import type { FileProps } from "./file.types";
import { IconButton } from "../Button/IconButton";
import { Icon } from "../Icon";

import { getLabelClassName } from "@/utils/typography";

export const File = forwardRef<HTMLDivElement, FileProps>(
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
      elementType: "div",
    });

    const interactionClassName = disabled
      ? styles.disabled
      : readonly
        ? styles.readonly
        : styles.interactive;

    return (
      <div
        ref={pressableRef}
        {...mergeProps(rootProps, pressableProps, {
          "data-readonly": readonly || undefined,
          "data-file-disabled": disabled || undefined,
          "aria-disabled": disabled || undefined,
        })}
        className={clsx(styles.root, interactionClassName, className)}
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
        {removable && !readonly && !disabled && (
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
            onPointerDown={e => e.stopPropagation()}
          />
        )}
      </div>
    );
  },
);

File.displayName = "File";
