---
"@jects/jds": minor
---

**Dialog**

Dialog의 스타일 구현을 Emotion(`@emotion/styled`)에서 vanilla-extract로 마이그레이션하고, 버튼 레이아웃을 Figma 디자인 variant에 맞게 정렬했습니다.

- `Dialog.styles.ts` → `dialog.css.ts` (vanilla-extract `style` / `recipe`)로 전환
- overlay dim, `shadow` 오버레이는 semantic 토큰(`vars.color.semantic.curtain.static.dim`, `vars.environment.semantic.shadow.overlay`)으로 참조
- 본문 타이포그래피를 `getBodyClassName` 유틸로 적용 (css에 textStyle 하드코딩 제거)
- **[Breaking] `tertiaryAction` prop 제거** — Figma 디자인은 primary/secondary 두 위계만 지원합니다.
- `isButtonStretched`이면서 `secondaryAction`이 있을 때 버튼을 세로로 쌓고(primary 위, secondary 아래), 그 외에는 우측 정렬 행으로 배치하도록 수정
- `isButtonStretched`이면 버튼 크기를 `lg`, 아니면 `md`로 적용
- Figma 스펙에 맞춰 간격·타이포 보정: 내부 패딩 `24px → 20px`, 본문 타이포 `body/xs → body/md`, 제목·본문 간격 `16px → 12px`(체크박스는 별도 `16px` 간격 유지)
