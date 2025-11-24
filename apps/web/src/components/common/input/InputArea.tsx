import clsx from "clsx";
import type { ChangeEvent, ComponentPropsWithoutRef } from "react";
import { forwardRef, useEffect, useRef, useState } from "react";

import TextArea from "./TextArea";

import Label from "@/components/common/label/Label";
import { mergeRefs } from "@/utils/mergeRefs";

interface InputAreaProps extends ComponentPropsWithoutRef<"textarea"> {
  labelText: string;
  errorHelper?: string;
}

const InputArea = forwardRef<HTMLTextAreaElement, InputAreaProps>(
  (
    {
      labelText,
      errorHelper = "",
      maxLength = 0,
      disabled,
      required,
      placeholder,
      onChange,
      value,
      ...props
    },
    ref,
  ) => {
    const [text, setText] = useState(value ?? "");
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const textLength = text.toString().length;
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);

      if (onChange) onChange(e);
    };

    useEffect(() => {
      const ref = textareaRef.current;

      if (ref) {
        ref.style.height = "auto";
        ref.style.height = ref.scrollHeight + "px";
      }
    }, [text]);

    return (
      <div className="gap-2xs flex flex-col">
        <Label
          hierarchy="normal"
          weight="normal"
          isRequired={required}
          textColor={`${disabled ? "text-object-assistive-dark" : "text-object-neutral-dark"}`}
        >
          {labelText}
        </Label>
        <TextArea
          {...props}
          ref={mergeRefs(ref, textareaRef)}
          value={text}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          isError={textLength > maxLength}
          className="peer"
        />
        <div className="peer-focus:*:last:text-object-neutral-dark flex justify-between">
          <p
            className={`${disabled ? "text-feedback-trans-negative-dark" : "text-feedback-negative-dark"} body-sm`}
          >
            {textLength > maxLength ? errorHelper : ""}
          </p>
          <div
            className={clsx(
              textLength > maxLength && "text-feedback-negative-dark!",
              disabled && "text-object-disabled-dark",
              !disabled && "text-object-assistive-dark",
              "body-sm cursor-default self-end",
            )}
          >
            {`${textLength}/${maxLength}`}
          </div>
        </div>
      </div>
    );
  },
);

InputArea.displayName = "InputArea";

export default InputArea;
