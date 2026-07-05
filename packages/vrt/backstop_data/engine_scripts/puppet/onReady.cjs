/**
 * 캡처 직전에 실행되는 훅.
 *
 * VRT 오탐을 줄이기 위해 캡처 시점에만 스타일을 주입하고,
 * 비결정적인 렌더링 요소가 모두 안정된 뒤 스냅샷을 캡처한다.
 *
 * - 애니메이션과 트랜지션을 비활성화한다.
 * - 텍스트 커서(caret) 깜빡임을 숨긴다.
 * - 웹폰트 로딩이 끝날 때까지 기다린다.
 * - 모든 이미지 로딩이 끝날 때까지 기다린다.
 */
module.exports = async page => {
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

  // 웹폰트 로딩이 끝날 때까지 대기 (텍스트 렌더가 안정된 뒤 캡처)
  try {
    await page.evaluate(() => document.fonts && document.fonts.ready);
  } catch {
    /* document.fonts 미지원 환경은 무시 */
  }

  // 모든 이미지가 로드될 때까지 대기 (빈 이미지가 찍히는 것을 막는다)
  // lazy 이미지를 eager로 강제하고, 무한 대기를 막기 위해 타임아웃을 둔다.
  try {
    await page.evaluate(() =>
      Promise.all(
        Array.from(document.images).map(img => {
          img.loading = "eager";
          if (img.complete) return undefined;
          return Promise.race([
            new Promise(resolve => {
              img.onload = resolve;
              img.onerror = resolve;
            }),
            new Promise(resolve => setTimeout(resolve, 3000)),
          ]);
        }),
      ),
    );
  } catch {
    /* 이미지가 없거나 평가 실패 시 무시 */
  }
};
