import { useFocusRing } from "@react-aria/focus";
import { useHover, usePress } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { clsx } from "clsx";
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

      id,
      style,
      className,

      ...buttonProps
    },
    ref,
  ) => {
    const isPressableDisabled = disabled || readonly;

    const { hoverProps, isHovered } = useHover({ isDisabled: isPressableDisabled });
    const { pressProps, isPressed } = usePress({ isDisabled: isPressableDisabled });
    const { focusProps: mainFocusProps, isFocusVisible: isMainFocusVisible } = useFocusRing();

    const interactionClassName = disabled
      ? styles.disabled
      : readonly
        ? styles.readonly
        : styles.interactive;

    return (
      <div
        ref={ref}
        {...mergeProps(hoverProps, pressProps)}
        id={id}
        style={style}
        className={clsx(styles.root, interactionClassName, className)}
        data-readonly={readonly || undefined}
        data-file-disabled={disabled || undefined}
        data-disabled={disabled || undefined}
        data-hovered={isHovered || undefined}
        data-pressed={isPressed || undefined}
        data-focus-visible={isMainFocusVisible || undefined}
      >
        <button
          {...buttonProps}
          {...mainFocusProps}
          type={buttonProps.type ?? "button"}
          disabled={isPressableDisabled}
          className={styles.mainAction}
          aria-label={buttonProps["aria-label"] || `${fileName} 파일 열기`}
          onClick={e => {
            if (readonly) e.preventDefault(); // 클릭 방어
            buttonProps.onClick?.(e);
          }}
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
          />
        )}
      </div>
    );
  },
);

File.displayName = "File";
