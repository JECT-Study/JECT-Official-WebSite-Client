import { TextField as TextFieldBase } from './TextField';
import { TextFieldButton } from './TextFieldButton';

export const TextField = Object.assign(TextFieldBase, {
  Button: TextFieldButton,
});

export type { TextFieldPublicProps, TextFieldProps, TextFieldButtonProps } from './textField.types';
