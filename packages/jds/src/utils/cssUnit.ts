/**
 * px값을 rem 단위로 변환합니다
 * @param pixels - 변환할 px 값
 * @param baseFontSize - 기본 폰트 크기 (px 단위, 기본값: 16)
 * @param precision - 소수점 자릿수 (기본값: 4)
 * @returns rem 값이 포함된 문자열
 */
export function pxToRem(pixels: number, baseFontSize: number = 16, precision: number = 4): string {
  return `${parseFloat((pixels / baseFontSize).toFixed(precision))}rem`;
}

/**
 * 특정 폰트 크기를 기준으로 스페이싱 값을 em 단위로 변환합니다
 * @param spacing - 변환할 스페이싱 값 (px단위)
 * @param fontSize - 기준이 되는 폰트 크기 (px단위)
 * @param precision - 소수점 자릿수 (기본값: 4)
 * @returns em 값이 포함된 문자열
 */
export function spacingToEm(spacing: number, fontSize: number, precision: number = 4): string {
  return `${parseFloat((spacing / fontSize).toFixed(precision))}em`;
}

/**
 * px값으로부터 line-height 비율을 계산합니다
 * @param lineHeight - 줄 간격 값 (px단위)
 * @param fontSize - 폰트 크기 (px단위)
 * @param precision - 소수점 자릿수 (기본값: 1)
 * @returns 단위 없는 line-height 비율 문자열
 */
export function lineHeightRatio(
  lineHeight: number,
  fontSize: number,
  precision: number = 1,
): string {
  return `${parseFloat((lineHeight / fontSize).toFixed(precision))}`;
}
