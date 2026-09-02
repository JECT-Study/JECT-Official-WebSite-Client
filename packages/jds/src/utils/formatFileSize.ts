const SIZE_UNITS = ["B", "KB", "MB", "GB", "TB"] as const;

/**
 * @description 바이트를 단위 크기로 환산해 소수점 한 자리까지 내림한 문자열로 반환한다.
 * `unitStep`은 1KB를 몇 바이트로 볼지 정한다. 1024는 Windows 탐색기, 1000은 macOS와 iOS의 기준이다.
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
