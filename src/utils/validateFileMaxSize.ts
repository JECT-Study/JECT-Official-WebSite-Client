/**
 * 새로운 파일들의 크기와 기존 파일의 크기의 합이 허용 최대 파일 크기(100MB)를 초과하는지 검사하는 함수
 *
 * @param curSize 현재 업로드되어있는 파일의 총 크기 (바이트 단위)
 * @param newFiles 새로 추가된 파일들의 배열
 * @returns 파일들의 합산 크기가 100MB(104,857,600 bytes)를 초과하면 true, 그렇지 않으면 false
 */
export const validateMaxSize = (curSize: number, newFiles: File[]) => {
  const newSize = newFiles.reduce((acc, file) => acc + file.size, 0);
  return curSize + newSize > 104857600;
};
