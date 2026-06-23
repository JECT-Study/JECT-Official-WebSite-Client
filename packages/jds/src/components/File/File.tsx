import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { clsx } from "clsx";
import { forwardRef, useRef } from "react";

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

      onPress,
      ...buttonProps
    },
    ref,
  ) => {
    const isPressableDisabled = disabled || readonly;
    const innerButtonRef = useRef<HTMLButtonElement>(null);

    const { focusProps: mainFocusProps, isFocusVisible: isMainFocusVisible } = useFocusRing();
    const { hoverProps, isHovered } = useHover({ isDisabled: isPressableDisabled });
    const { buttonProps: ariaButtonProps, isPressed } = useButton(
      {
        elementType: "button",
        isDisabled: isPressableDisabled,
        onPress,
      },
      innerButtonRef,
    );

    const interactionClassName = disabled
      ? styles.disabled
      : readonly
        ? styles.readonly
        : styles.interactive;

    return (
      <div
        ref={ref}
        {...hoverProps}
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
          ref={innerButtonRef}
          {...mergeProps(buttonProps, mainFocusProps, ariaButtonProps)}
          type={buttonProps.type ?? "button"}
          disabled={isPressableDisabled}
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
