/**
 * 주어진 File 객체가 비어있거나 손상된 PDF 파일인지 검사하는 함수
 *
 *
 * @param file 검사할 File 객체
 * @returns 파일이 손상되지 않았다면 true, 손상되었다면 false를 반환하는 Promise
 */
export const validateValidFile = async (file: File) => {
  if (!(file instanceof File)) return false;

  if (file.size === 0) return false;

  try {
    const buffer = await file.arrayBuffer();
    const header = new TextDecoder().decode(buffer.slice(0, 4));
    return header === "%PDF";
  } catch {
    return false;
  }
};

/**
 * 전달된 File 배열에서 손상된 파일 배열과 손상되지않은 파일 배열로 분리하는 함수
 *
 *
 * @param files 검사할 File 객체 배열
 * @returns 손상된 파일 배열과 손상되지않은 파일 배열로 분리한 객체를 반환하는 Promise
 *
 * @example
 * const { validPdfFiles, invalidPdfFiles } = await splitValidAndInvalidFiles(fileList);
 */
type FileValidationResult = {
  validPdfFiles: File[];
  invalidPdfFiles: File[];
};

export const splitValidAndInvalidFiles = async (files: File[]): Promise<FileValidationResult> => {
  const results = await Promise.all(
    files.map(async file => {
      const isValid = await validateValidFile(file);
      return { file, isValid };
    }),
  );

  return results.reduce<FileValidationResult>(
    (acc, { file, isValid }) => {
      if (isValid) return { ...acc, validPdfFiles: [...acc.validPdfFiles, file] };

      return { ...acc, invalidPdfFiles: [...acc.invalidPdfFiles, file] };
    },
    { validPdfFiles: [], invalidPdfFiles: [] },
  );
};
