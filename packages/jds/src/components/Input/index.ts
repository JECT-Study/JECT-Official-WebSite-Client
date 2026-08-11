import { InputArea } from "./InputArea";
import { TagField } from "./TagField";

export type {
  InputStyle,
  InputValidation,
  FieldPublicProps,
  FieldInputPublicProps,
  FieldTextAreaPublicProps,
} from "./input.types";

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
  InputArea,
  TagField,
};
