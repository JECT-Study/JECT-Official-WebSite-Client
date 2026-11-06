import { clsx } from "clsx";
import { forwardRef, useLayoutEffect } from "react";

import { IconButton } from "../../Button/IconButton";
import { Tooltip } from "../../Tooltip";
import { useFieldContext } from "../field.context";
import * as styles from "../field.css";
import type { FieldLabelProps } from "../field.types";

import { getLabelClassName } from "@/utils/typography";

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ children, tooltip, className, ...restProps }, ref) => {
    const {
      fieldId,
      labelId,
      onLabelMountChange,
      isControlRequired,
      disabled: isDisabled,
    } = useFieldContext("Field.Label");

    useLayoutEffect(() => {
      onLabelMountChange(true);
      return () => onLabelMountChange(false);
    }, [onLabelMountChange]);

    return (
      <span className={styles.labelContainer}>
        <span className={styles.labelMain}>
          <label
            {...restProps}
            ref={ref}
            id={labelId}
            htmlFor={fieldId}
            className={clsx(
              getLabelClassName({ size: "sm" }),
              styles.label({ disabled: isDisabled }),
              className,
            )}
          >
            {children}
          </label>
          {isControlRequired && (
            <span
              className={clsx(
                getLabelClassName({ size: "sm" }),
                styles.requiredMark({ disabled: isDisabled }),
              )}
              aria-hidden
            >
              *
            </span>
          )}
        </span>
        {tooltip != null &&
          // disabled 폼 컨트롤도 click 계열을 제외한 마우스 이벤트를 받아 버튼을 비활성화해도 hover로 툴팁이 열리므로, 비활성 상태에서는 툴팁 없이 아이콘만 렌더링한다.
          (isDisabled ? (
            <IconButton hierarchy='tertiary' size='2xs' icon='info' aria-label='도움말' disabled />
          ) : (
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <IconButton hierarchy='tertiary' size='2xs' icon='info' aria-label='도움말' />
                </Tooltip.Trigger>
                <Tooltip.Content>{tooltip}</Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
          ))}
      </span>
    );
  },
);

FieldLabel.displayName = "Field.Label";
