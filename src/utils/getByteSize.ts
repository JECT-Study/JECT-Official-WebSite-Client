/**
 * 파일 크기를 KB 또는 MB 단위로 변환합니다.
 *
 * @param size - 변환할 파일 크기 (byte 단위)
 * @returns  변환된 파일 크기 (KB or MB 단위, 소수점 1자리까지 표시)
 */
export const getByteSize = (size: number) => {
  if (size < 1024 * 1024) {
    return (size / 1024).toFixed(1) + 'KB';
  }

  return (size / (1024 * 1024)).toFixed(1) + 'MB';
};
