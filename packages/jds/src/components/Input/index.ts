import { InputArea } from "./InputArea";
import { SelectField } from "./SelectField";
import { TagField } from "./TagField";
import { TextField } from "./TextField";

export type {
  InputStyle,
  InputLayout,
  InputValidation,
  FieldPublicProps,
  FieldInputPublicProps,
  FieldTextAreaPublicProps,
} from "./input.types";

export { TextField } from "./TextField";
export type { TextFieldPublicProps, TextFieldProps, TextFieldButtonProps } from "./TextField";

export { SelectField } from "./SelectField";
export type { SelectFieldProps } from "./SelectField";

export { InputArea } from "./InputArea";
export type {
  InputAreaStyle,
  InputAreaLayout,
  InputAreaValidation,
  InputAreaStatus,
  InputAreaProps,
} from "./InputArea";

export { TagField } from "./TagField";
export type { TagFieldProps, Tag } from "./TagField";

export const Input = {
  TextField,
  SelectField,
  InputArea,
  TagField,
};
