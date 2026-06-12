---
"@jects/jds": minor
---

**Interaction Utility Migration**

`focusRing`과 `overlay` 유틸을 style string export에서 recipe 함수 형태로 변경합니다. 두 유틸은 `@jects/jds/utils`를 통해 외부에 공개되어 있으므로, 외부 소비자가 직접 사용하고 있었다면 호출 방식 변경이 필요합니다.

| AS-IS | TO-BE |
| --- | --- |
| `focusRing` | `focusRing()` |
| `overlay` | `overlay()` |

**AS-IS**

```tsx
import { focusRing, overlay } from "@jects/jds/utils";

const root = style([focusRing, overlay, baseStyles]);
```

**TO-BE**

```tsx
import { focusRing, overlay } from "@jects/jds/utils";

const root = style([focusRing(), overlay(), baseStyles]);
```

`focusRing`은 `border`, `feedback` variant를 지원하고, `overlay`는 `hierarchy`, `density`, `nativeHover` variant를 지원합니다. `nativeHover`는 `usePressable` / `useContainerPressable`을 거치지 않는 Radix 기반 컴포넌트 등에서 native `:hover` fallback이 필요한 경우에만 명시적으로 opt-in해야 합니다.

```tsx
overlay({ hierarchy: "secondary", density: "normal", nativeHover: true });
```

또한 interaction focus 색상과 interaction layer 토큰이 갱신되어, 관련 컴포넌트의 focus ring / hover / pressed 렌더링 결과가 달라질 수 있습니다.
