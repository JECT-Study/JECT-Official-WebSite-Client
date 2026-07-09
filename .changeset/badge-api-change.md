---
"@jects/jds": minor
---

**Badge (Content / Dot / Numeric)**

`ContentBadge`, `DotBadge`, `NumericBadge`를 `Badge.Content`, `Badge.Dot`, `Badge.Numeric` 네임스페이스 API로 통합했습니다.

기존 개별 컴포넌트 export는 호환성을 위해 유지되어 기존 코드도 계속 동작합니다. 각 Badge는 조합형 하위 요소가 아닌 독립된 단일 컴포넌트이며, 사용 방식과 props는 기존과 동일합니다.

| 이전           | 신규            |
| -------------- | --------------- |
| `ContentBadge` | `Badge.Content` |
| `DotBadge`     | `Badge.Dot`     |
| `NumericBadge` | `Badge.Numeric` |

**신규 export**

- `Badge`

**AS-IS**

```tsx
import { ContentBadge, DotBadge, NumericBadge } from "@jects/jds";

<ContentBadge hierarchy='primary'>레이블</ContentBadge>
<DotBadge feedback='positive' />
<NumericBadge hierarchy='accent'>99</NumericBadge>
```

**TO-BE**

```tsx
import { Badge } from "@jects/jds";

<Badge.Content hierarchy='primary'>레이블</Badge.Content>
<Badge.Dot feedback='positive' />
<Badge.Numeric hierarchy='accent'>99</Badge.Numeric>
```
