import { forwardRef, useState } from "react";

import { FileFieldInput } from "./compound/Input";
import { FileFieldSize } from "./compound/Size";
import { FileFieldProvider } from "./FileField.context";
import type { FileFieldProps } from "./fileField.types";
import { Field } from "../Field";

const FileFieldRoot = forwardRef<HTMLDivElement, FileFieldProps>((props, ref) => {
  const [size, setSize] = useState<number | null>(null);

  return (
    <FileFieldProvider size={size} onSizeChange={setSize}>
      <Field ref={ref} {...props} />
    </FileFieldProvider>
  );
});

FileFieldRoot.displayName = "FileField";

export const FileField = Object.assign(FileFieldRoot, {
  Label: Field.Label,
  Input: FileFieldInput,
  Footer: Field.Footer,
  Helper: Field.Helper,
  Size: FileFieldSize,
});
