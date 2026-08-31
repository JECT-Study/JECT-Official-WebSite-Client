---
"@jects/jds": minor
---

**JDSThemeProvider**

`JDSThemeProvider`가 Emotion `ThemeProvider`와 `<Global>` 없이 자식을 그대로 통과시킵니다. 전역 토큰과 reset CSS는 Vanilla Extract가 추출한 `@jects/jds/styles`로 분리되므로 소비처가 직접 import해야 합니다. `@emotion/react`, `@emotion/styled`는 더 이상 peerDependency가 아닙니다.

**소비처 영향 (코드 수정 필요)**

- 전역 토큰 CSS와 reset CSS가 `JDSThemeProvider` 렌더 시점에 주입되지 않음 — 애플리케이션 진입점에서 `@jects/jds/styles`를 import해야 적용

```diff
+ import "@jects/jds/styles";
  import { JDSThemeProvider } from "@jects/jds/theme";
```

**동작 변경 (코드 수정 불필요)**

- `JDSThemeProvider`가 Emotion 컨텍스트를 더 이상 제공하지 않음 — 소비처 코드가 `useTheme`이나 `styled`로 JDS theme을 읽고 있었다면 동작하지 않음
- `@emotion/react`, `@emotion/styled`가 peerDependencies에서 제거 — JDS 때문에 설치했다면 제거 가능하고, 애플리케이션 코드에서 직접 쓰고 있다면 직접 의존성으로 남겨야 함
