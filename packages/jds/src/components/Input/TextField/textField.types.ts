import type { ChangeEvent, ReactNode } from "react";

import type { IconName } from "../../Icon/Icon.types";
import type { FieldPublicProps, FieldInputPublicProps } from "../input.types";

export interface TextFieldPublicProps
  extends FieldPublicProps, Omit<FieldInputPublicProps, "value" | "onChange" | "defaultValue"> {
  label?: ReactNode;
  isWithInfoIcon?: boolean;
  helperText?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export type TextFieldProps = TextFieldPublicProps;

export interface TextFieldButtonProps extends TextFieldPublicProps {
  labelIcon?: IconName;
  button: ReactNode;
}
