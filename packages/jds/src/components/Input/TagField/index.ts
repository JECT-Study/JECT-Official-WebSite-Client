import { TagField as TagFieldBase } from "./TagField";
import { TagFieldButton } from "./TagFieldButton";

export const TagField = Object.assign(TagFieldBase, {
  Button: TagFieldButton,
});

export type { TagFieldProps, TagFieldButtonProps, Tag } from "./tagField.types";
