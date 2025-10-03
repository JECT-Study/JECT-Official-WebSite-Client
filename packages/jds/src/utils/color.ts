/**
 * Hex 색상 코드를 RGBA로 변환하는 함수
 *
 * @param hex - Hex 색상 코드 (예: '#FF5733' 또는 'FF5733') 현재 토큰의 경우 #이 붙여져서 등록되어있음
 * @param alpha - 투명도 (0~1 사이의 값)
 * @returns RGBA 문자열 (예: 'rgba(255, 87, 51, 0.55)')
 *
 * @example
 * hexToRgba('토큰 명(혹은 실제 코드)',투명도)'
 * hexToRgba('#FF5733', 0.55) // 'rgba(255, 87, 51, 0.55)'
 * hexToRgba('FF5733', 1) // 'rgba(255, 87, 51, 1)'
 */
export function HexToRgba(hex: string, alpha: number): string {
  const cleanedHex = hex.replace('#', '');

  const r = parseInt(cleanedHex.slice(0, 2), 16);
  const g = parseInt(cleanedHex.slice(2, 4), 16);
  const b = parseInt(cleanedHex.slice(4, 6), 16);

  const validAlpha = Math.max(0, Math.min(1, alpha));

  return `rgba(${r}, ${g}, ${b}, ${validAlpha})`;
}
