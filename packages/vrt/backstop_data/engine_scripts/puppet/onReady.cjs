/**
 * 캡처 직전에 실행되는 훅.
 *
 * VRT 오탐을 줄이기 위해 캡처 시점에만 스타일을 주입하고,
 * 비결정적인 렌더링 요소가 모두 안정된 뒤 스냅샷을 캡처한다.
 *
 * - 애니메이션과 트랜지션을 비활성화한다.
 * - 텍스트 커서(caret) 깜빡임을 숨긴다.
 * - 등록된 웹폰트를 명시적으로 로드한다.
 * - 모든 이미지 로딩이 끝날 때까지 기다린다.
 * - 위가 모두 끝난 뒤 프레임을 기다려 페인트가 반영되게 한다.
 */

const IMAGE_WAIT_TIMEOUT = 10000;

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

  // 등록된 font face를 강제 로드한다.
  try {
    await page.evaluate(async () => {
      if (!document.fonts) return;
      await Promise.all(Array.from(document.fonts).map(font => font.load().catch(() => {})));
      await document.fonts.ready;
    });
  } catch {
    /* document.fonts 미지원 환경은 무시 */
  }

  // 모든 이미지가 로드되거나 에러가 확정될 때까지 대기한다.
  // lazy 이미지를 eager로 강제하고, 외부 네트워크가 끝나지 않는 경우를 대비해 상한을 둔다.
  try {
    await page.evaluate(async timeout => {
      const settle = img => {
        img.loading = "eager";
        if (img.complete) return undefined;
        return new Promise(resolve => {
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
          setTimeout(done, timeout);
        });
      };
      await Promise.all(Array.from(document.images).map(settle));
    }, IMAGE_WAIT_TIMEOUT);
  } catch {
    /* 이미지가 없거나 평가 실패 시 무시 */
  }

  try {
    await page.evaluate(
      () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))),
    );
  } catch {
    /* 무시 */
  }
};
