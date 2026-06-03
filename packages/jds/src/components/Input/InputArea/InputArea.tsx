import { forwardRef, useId } from "react";

import type { InputAreaProps } from "./inputArea.types";
import { getInteractionStates } from "../input.types";
import {
  StyledFieldContainer,
  StyledLabelContainer,
  StyledFieldLabel,
  StyledInputColumn,
  StyledTextAreaWrapper,
  StyledTextArea,
  StyledHelperContainer,
  StyledHelperText,
  StyledCountText,
} from "./inputArea.styles";
import { StyledLabelIcon } from "../shared/field.styles";

import { getLabelClassName } from "@/utils/typography";

export const InputArea = forwardRef<HTMLTextAreaElement, InputAreaProps>(
  (
    {
      style = "outlined",
      validation = "none",
      interaction = "enabled",
      label,
      labelIcon,
      labelVisible = true,
      helperText,
      maxLength,
      height,
      minHeight,
      value,
      onChange,
      ...restProps
    },
    ref,
  ) => {
    const inputId = useId();
    const { isDisabled, isReadOnly } = getInteractionStates(interaction);
    const currentLength = value.length;

    const hasHelperContainer = Boolean(helperText) || Boolean(maxLength);

    return (
      <StyledFieldContainer>
        {label && labelVisible && (
          <StyledLabelContainer $disabled={isDisabled} $readOnly={isReadOnly}>
            <StyledFieldLabel
              htmlFor={inputId}
              className={getLabelClassName({ size: "sm" })}
              $disabled={isDisabled}
              $readOnly={isReadOnly}
            >
              {label}
            </StyledFieldLabel>
            {labelIcon && <StyledLabelIcon name={labelIcon} size='2xs' />}
          </StyledLabelContainer>
        )}

        <StyledInputColumn>
          <StyledTextAreaWrapper
            $style={style}
            $validation={validation}
            $disabled={isDisabled}
            $readOnly={isReadOnly}
            $height={height}
            $minHeight={minHeight}
          >
            <StyledTextArea
              ref={ref}
              id={inputId}
              $disabled={isDisabled}
              $readOnly={isReadOnly}
              $hasFixedHeight={Boolean(height)}
              value={value}
              onChange={onChange}
              disabled={isDisabled}
              readOnly={isReadOnly}
              maxLength={maxLength}
              {...restProps}
            />
          </StyledTextAreaWrapper>

          {hasHelperContainer && (
            <StyledHelperContainer
              $validation={validation}
              $disabled={isDisabled}
              $readOnly={isReadOnly}
            >
              {helperText && (
                <StyledHelperText className={getLabelClassName({ size: "sm" })}>
                  {helperText}
                </StyledHelperText>
              )}

              {maxLength && (
                <StyledCountText
                  className={getLabelClassName({
                    size: "sm",
                    textAlign: "right",
                  })}
                >
                  {`${currentLength}/${maxLength}`}
                </StyledCountText>
              )}
            </StyledHelperContainer>
          )}
        </StyledInputColumn>
      </StyledFieldContainer>
    );
  },
);

InputArea.displayName = "InputArea";
