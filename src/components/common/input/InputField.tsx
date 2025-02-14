import clsx from "clsx";
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react"

import Input from "./Input";
import Label from "../Label";

interface InputFieldProps extends ComponentPropsWithoutRef<"input"> {
  isError: boolean;
  isSuccess: boolean;
  InputChildren?: ReactNode;
  children?: ReactNode;
  labelText?: string;
  helper?: string;
  className?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({ 
    InputChildren,
    children,
    isError, 
    isSuccess, 
    labelText, 
    helper,
    required, 
    disabled,
    className,
    ...props
}, ref)=>{
    return (
    <div className="flex flex-col gap-2xs">
        {labelText && (
          <Label
            hierarchy='normal'
            weight='normal'
            isRequired={required}
            textColor={`${disabled ? 'text-object-assistive-dark' : 'text-object-neutral-dark'}`}
          >{labelText}</Label>
        )}
        <div className="flex gap-xs">
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
        {helper && <div className={clsx(
            {
                'text-object-alternative-dark': !isError && !disabled && !isSuccess,
                'text-feedback-trans-negative-dark': isError && disabled,
                'text-feedback-negative-dark': isError && !disabled,
                'text-object-disabled-dark': !isError && disabled,
                'text-feedback-positive-dark': isSuccess,
            },
            'body-sm cursor-default',
        )}>{helper}</div>}
    </div>)
}) 

export default InputField