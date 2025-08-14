/**
 * 페이지의 가장 하단으로 스크롤을 이동시킵니다.
 * 부드러운 스크롤 애니메이션을 적용합니다.
 */

export const moveToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
};
