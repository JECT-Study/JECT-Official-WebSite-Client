---
"@jects/jds": major
---

**Steps**

스텝 컴포넌트 API 이름을 Step에서 Steps로 변경합니다. 기존 Step 컴포넌트와 관련 타입 export를 더 이상 @jects/jds에서 사용할 수 없으므로 breaking change입니다.

| AS-IS           | TO-BE            |
| --------------- | ---------------- |
| `Step`          | `Steps`          |
| `Step.Root`     | `Steps.Root`     |
| `Step.Item`     | `Steps.Item`     |
| `StepSize`      | `StepsSize`      |
| `StepLayout`    | `StepsLayout`    |
| `StepRootProps` | `StepsRootProps` |
| `StepItemProps` | `StepsItemProps` |

**AS-IS**

```tsx
import { Step } from "@jects/jds";
import type { StepItemProps, StepRootProps } from "@jects/jds";

<Step.Root current={1}>
  <Step.Item index={0}>First</Step.Item>
  <Step.Item index={1}>Second</Step.Item>
</Step.Root>;
```

**TO-BE**

```tsx
import { Steps } from "@jects/jds";
import type { StepsItemProps, StepsRootProps } from "@jects/jds";

<Steps.Root current={1}>
  <Steps.Item index={0}>First</Steps.Item>
  <Steps.Item index={1}>Second</Steps.Item>
</Steps.Root>;
```
