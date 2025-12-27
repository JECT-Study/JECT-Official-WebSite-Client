/**
 * yyyy-mm-dd 형식의 날짜 문자열을 "yyyy년 m월 d일(요일)" 형식으로 변환합니다.
 * @param dateString - yyyy-mm-dd 형식의 날짜 문자열
 * @returns yyyy년 m월 d일(요일) 형식의 문자열
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[date.getDay()];

  return `${year}년 ${month}월 ${day}일(${weekday})`;
};
