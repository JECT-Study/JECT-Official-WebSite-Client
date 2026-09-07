import type { FileFieldErrorType } from "./fileField.types";

const matchesAccept = (accept: string, file: File) => {
  const patterns = accept
    .split(",")
    .map(pattern => pattern.trim().toLowerCase())
    .filter(Boolean);

  if (patterns.length === 0) return true;

  const fileName = file.name.toLowerCase();
  const mimeType = file.type.toLowerCase();

  return patterns.some(pattern => {
    if (pattern === "*/*") return true;
    if (pattern.startsWith(".")) return fileName.endsWith(pattern);
    if (pattern.endsWith("/*")) return mimeType.startsWith(pattern.slice(0, -1));

    return mimeType === pattern;
  });
};

interface ValidateFileOptions {
  accept?: string;
  maxSize?: number;
}

export const validateFile = (
  file: File,
  { accept, maxSize }: ValidateFileOptions,
): FileFieldErrorType | null => {
  if (accept != null && !matchesAccept(accept, file)) return "INVALID_TYPE";
  if (maxSize != null && file.size > maxSize) return "FILE_TOO_LARGE";

  return null;
};
