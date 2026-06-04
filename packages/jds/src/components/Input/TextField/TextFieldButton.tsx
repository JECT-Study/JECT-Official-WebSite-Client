import { forwardRef, useId } from "react";

import {
  StyledFieldContainer,
  StyledLabelContainer,
  StyledFieldLabel,
  StyledInputWrapper,
  StyledInput,
  StyledHelperText,
  StyledInputRow,
  StyledInputColumn,
} from "./textField.styles";
import type { TextFieldButtonProps } from "./textField.types";
import { Icon } from "../../Icon";

import { getLabelClassName } from "@/utils/typography";

export const TextFieldButton = forwardRef<HTMLInputElement, TextFieldButtonProps>(
  (
    {
      style = "outlined",
      validation = "none",
      disabled = false,
      readOnly = false,
      label,
      labelIcon,
      helperText,
      button,
      value,
      onChange,
      ...restProps
    },
    ref,
  ) => {
    const inputId = useId();

    return (
      <StyledFieldContainer>
        {label && (
          <StyledLabelContainer>
            <StyledFieldLabel
              htmlFor={inputId}
              className={getLabelClassName({ weight: "bold" })}
              $disabled={disabled}
              $readOnly={readOnly}
            >
              {label}
            </StyledFieldLabel>
            {labelIcon && <Icon name={labelIcon} size='sm' />}
          </StyledLabelContainer>
        )}

        <StyledInputColumn>
          <StyledInputRow $style={style}>
            <StyledInputWrapper
              $style={style}
              $validation={validation}
              $disabled={disabled}
              $readOnly={readOnly}
            >
              <StyledInput
                ref={ref}
                id={inputId}
                $disabled={disabled}
                $readOnly={readOnly}
                value={value}
                onChange={onChange}
                disabled={disabled}
                readOnly={readOnly}
                {...restProps}
              />
            </StyledInputWrapper>
            {button}
          </StyledInputRow>

          {helperText && (
            <StyledHelperText
              className={getLabelClassName({ size: "sm" })}
              $validation={validation}
              $disabled={disabled}
              $readOnly={readOnly}
            >
              {helperText}
            </StyledHelperText>
          )}
        </StyledInputColumn>
      </StyledFieldContainer>
    );
  },
);

TextFieldButton.displayName = "TextField.Button";
