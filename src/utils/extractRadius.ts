/**
 * 클래스 문자열에서 'radius-' 로 시작하는 클래스를 추출합니다.
 * @param sizeClass - 버튼 사이즈에 해당하는 클래스 문자열 (예: "py-... radius-xs label-xs")
 * @returns 'radius-'로 시작하는 클래스명 또는 빈 문자열
 */
export const extractRadius = (sizeClass: string): string => {
  const classes = sizeClass.split(' ');
  return classes.find(cls => cls.startsWith('radius-')) || '';
};
