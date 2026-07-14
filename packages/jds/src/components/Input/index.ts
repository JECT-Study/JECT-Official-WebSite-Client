import { SelectField } from "./SelectField";
import { TagField } from "./TagField";

export type {
  InputStyle,
  InputValidation,
  FieldPublicProps,
  FieldInputPublicProps,
  FieldTextAreaPublicProps,
} from "./input.types";

export { SelectField } from "./SelectField";
export type { SelectFieldProps } from "./SelectField";

export { TagField } from "./TagField";
export type { TagFieldProps, Tag } from "./TagField";

export const Input = {
  SelectField,
  TagField,
};
