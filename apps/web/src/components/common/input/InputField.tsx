import clsx from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef } from "react";

import Input from "./Input";

import Label from "@/components/common/label/Label";

interface InputFieldProps extends ComponentPropsWithoutRef<"input"> {
  isError?: boolean;
  isSuccess: boolean;
  InputChildren?: ReactNode;
  children?: ReactNode;
  labelText?: string;
  helper?: string;
  className?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      InputChildren,
      children,
      isError = false,
      isSuccess,
      labelText,
      helper,
      required,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className='gap-2xs flex flex-col'>
        {labelText && (
          <Label
            hierarchy='normal'
            weight='normal'
            isRequired={required}
            textColor={`${disabled ? "text-object-assistive-dark" : "text-object-neutral-dark"}`}
          >
            {labelText}
          </Label>
        )}
        <div className='gap-xs flex'>
          <Input
            {...props}
            ref={ref}
            isError={isError}
            required={required}
            disabled={disabled}
            className={`grow ${className}`}
          >
            {InputChildren}
          </Input>
          {children}
        </div>
        {helper && (
          <div
            className={clsx(
              {
                "text-object-alternative-dark": !isError && !disabled && !isSuccess,
                "text-feedback-trans-negative-dark": isError && disabled,
                "text-feedback-negative-dark": isError && !disabled,
                "text-object-disabled-dark": !isError && disabled && !isSuccess,
                "text-feedback-positive-dark": isSuccess,
              },
              "body-sm cursor-default",
            )}
          >
            {helper}
          </div>
        )}
      </div>
    );
  },
);

InputField.displayName = "InputField";

export default InputField;
