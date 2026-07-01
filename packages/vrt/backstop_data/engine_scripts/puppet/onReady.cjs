/**
 * 캡처 직전에 실행되는 훅. 비결정적 렌더 요소를 제거해 VRT 오탐을 막는다.
 * - 애니메이션/트랜지션을 0s로 만들어 등장 중간 프레임이 찍히지 않게 한다.
 * - 텍스트 커서(caret) 깜빡임을 숨긴다.
 * - 웹폰트 로딩(FOUT)이 끝난 뒤 캡처해 텍스트가 흔들리는 오탐을 막는다.
 * jds에는 손대지 않고 캡처 시점에만 스타일을 주입한다.
 */
module.exports = async (page) => {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        caret-color: transparent !important;
        scroll-behavior: auto !important;
      }
    `,
  });

  // 웹폰트 로딩이 끝날 때까지 대기 (텍스트 렌더가 안정된 뒤 캡처).
  try {
    await page.evaluate(() => document.fonts && document.fonts.ready);
  } catch {
    /* document.fonts 미지원 환경은 무시 */
  }
};
