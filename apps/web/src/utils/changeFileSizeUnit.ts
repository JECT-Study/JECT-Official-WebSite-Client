import { FileSizeUnits } from '@/types/ui/file';

/**
 * 파일 크기를 KB 또는 MB 단위로 변환합니다.
 *
 * @param size - 변환할 파일 크기 (byte 단위)
 * @param units - 변환할 파일 단위 KB만, MB만, KB MB 둘 다
 * @param attachUnit - 단위 표기 여부
 * @returns  변환된 파일 크기 (KB or MB 단위, 소수점 1자리까지 표시)
 */
export const changeFileSizeUnit = (size: number, units: FileSizeUnits[], attachUnit: boolean) => {
  const sizeInKB = (size / 1024).toFixed(1) + (attachUnit ? 'KB' : '');
  const sizeInMB = (size / (1024 * 1024)).toFixed(1) + (attachUnit ? 'MB' : '');

  if (!units.includes('MB')) return sizeInKB;

  if (!units.includes('KB')) return sizeInMB;

  return size < 1024 * 1024 ? sizeInKB : sizeInMB;
};
