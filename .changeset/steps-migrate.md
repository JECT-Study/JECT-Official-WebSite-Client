---
"@jects/jds": major
---

스텝 컴포넌트 API 이름을 `Step`에서 `Steps`로 변경합니다. 기존 `Step` 컴포넌트와 관련 타입 export를 더 이상 `@jects/jds`에서 사용할 수 없으므로 breaking change입니다.

마이그레이션 매핑:

- `Step` -> `Steps`
- `Step.Root` -> `Steps.Root`
- `Step.Item` -> `Steps.Item`
- `StepSize` -> `StepsSize`
- `StepLayout` -> `StepsLayout`
- `StepRootProps` -> `StepsRootProps`
- `StepItemProps` -> `StepsItemProps`

아래와 같이 import와 JSX 사용처를 함께 변경해야 합니다.

```tsx
import { Steps } from "@jects/jds";
import type { StepsItemProps, StepsRootProps } from "@jects/jds";

<Steps.Root current={1}>
  <Steps.Item index={0}>First</Steps.Item>
  <Steps.Item index={1}>Second</Steps.Item>
</Steps.Root>;
```
