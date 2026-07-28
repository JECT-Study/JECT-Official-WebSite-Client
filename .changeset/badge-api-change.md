---
"@jects/jds": minor
---

**Badge (ContentBadge / DotBadge / NumericBadge)**

`ContentBadge`, `DotBadge`, `NumericBadge`를 각각 prop 기반의 단일 컴포넌트 API로 통합했습니다.

기존 `.Basic`, `.Feedback`, `.Theme` 하위 컴포넌트는 호환성을 위해 deprecated 별칭으로 유지되므로 기존 코드도 계속 동작합니다.

| 이전                                         | 신규                                   |
| -------------------------------------------- | -------------------------------------- |
| `<ContentBadge.Basic hierarchy="secondary">` | `<ContentBadge hierarchy="secondary">` |
| `<ContentBadge.Feedback variant="positive">` | `<ContentBadge feedback="positive">`   |
| `<ContentBadge.Theme variant="red">`         | `<ContentBadge variant="red">`         |
| `<DotBadge.Feedback variant="positive" />`   | `<DotBadge feedback="positive" />`     |
| `<NumericBadge.Basic hierarchy="secondary">` | `<NumericBadge hierarchy="secondary">` |
| `<NumericBadge.Feedback variant="positive">` | `<NumericBadge feedback="positive">`   |

`ContentBadge` 제거 버튼의 접근성 이름에 배지 내용과 동작을 함께 제공하도록 개선했습니다.

**AS-IS**

```tsx
import { ContentBadge, DotBadge, NumericBadge } from "@jects/jds";

<ContentBadge.Basic hierarchy='primary'>레이블</ContentBadge.Basic>
<ContentBadge.Feedback variant='positive'>레이블</ContentBadge.Feedback>
<DotBadge.Feedback variant='positive' />
<NumericBadge.Basic hierarchy='accent'>99</NumericBadge.Basic>
```

**TO-BE**

```tsx
import { ContentBadge, DotBadge, NumericBadge } from "@jects/jds";

<ContentBadge hierarchy='primary'>레이블</ContentBadge>
<ContentBadge feedback='positive'>레이블</ContentBadge>
<DotBadge feedback='positive' />
<NumericBadge hierarchy='accent'>99</NumericBadge>
```
