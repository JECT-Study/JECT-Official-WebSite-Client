---
"@jects/jds": minor
---

**JDSThemeProvider**

`JDSThemeProvider`가 Emotion `ThemeProvider`와 `<Global>` 없이 자식을 그대로 통과시킵니다. 전역 토큰과 reset CSS는 Vanilla Extract side-effect import로 적용되므로 마운트 위치는 그대로 두면 됩니다. `@emotion/react`, `@emotion/styled`는 더 이상 peerDependency가 아닙니다.

**동작 변경 (코드 수정 불필요)**

- `JDSThemeProvider`가 Emotion 컨텍스트를 더 이상 제공하지 않음 — 소비처 코드가 `useTheme`이나 `styled`로 JDS theme을 읽고 있었다면 동작하지 않음
- 전역 토큰 CSS와 reset CSS의 적용 시점이 렌더에서 모듈 로드로 변경 — `@jects/jds/theme` import만으로 적용
- `@emotion/react`, `@emotion/styled`가 peerDependencies에서 제거 — JDS 때문에 설치했다면 제거 가능하고, 애플리케이션 코드에서 직접 쓰고 있다면 직접 의존성으로 남겨야 함
