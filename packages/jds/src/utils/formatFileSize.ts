const SIZE_UNITS = ["B", "KB", "MB", "GB", "TB"] as const;

/**
 * @description 바이트를 단위 크기로 환산해 소수점 한 자리까지 내림한 문자열로 반환한다.
 *
 * @param bytes - 바이트 단위의 파일 크기
 * @param unitStep - 1KB의 바이트 기준. 기본값은 1024이다.
 */
export const formatFileSize = (bytes: number, unitStep: 1000 | 1024 = 1024) => {
  let size = bytes;
  let unitIndex = 0;

  while (size >= unitStep && unitIndex < SIZE_UNITS.length - 1) {
    size /= unitStep;
    unitIndex += 1;
  }

  return `${Math.floor(size * 10) / 10}${SIZE_UNITS[unitIndex]}`;
};
