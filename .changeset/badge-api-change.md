---
"@jects/jds": minor
---

**Badge (ContentBadge / DotBadge / NumericBadge)**

`ContentBadge`, `DotBadge`, `NumericBadge`를 각각 prop 기반의 단일 컴포넌트 API로 통합했습니다.

기존 `.Basic`, `.Feedback`, `.Theme` 하위 컴포넌트와 관련 props 타입을 제거했습니다. 해당 API를 사용하던 코드는 아래와 같이 단일 컴포넌트 API로 변경해야 합니다.

| 이전                                                                            | 신규                                   |
| ------------------------------------------------------------------------------- | -------------------------------------- |
| `<ContentBadge.Basic hierarchy="secondary">`                                    | `<ContentBadge hierarchy="secondary">` |
| `<ContentBadge.Feedback variant="positive">`                                    | `<ContentBadge feedback="positive">`   |
| `<ContentBadge.Theme variant="red">`                                            | `<ContentBadge variant="red">`         |
| `<DotBadge.Feedback variant="positive" />`                                      | `<DotBadge feedback="positive" />`     |
| `<NumericBadge.Basic hierarchy="secondary">`                                    | `<NumericBadge hierarchy="secondary">` |
| `<NumericBadge.Feedback variant="positive">`                                    | `<NumericBadge feedback="positive">`   |
| `ContentBadgeBasicProps`, `ContentBadgeFeedbackProps`, `ContentBadgeThemeProps` | `ContentBadgeProps`                    |
| `DotBadgeFeedbackProps`                                                         | `DotBadgeProps`                        |
| `NumericBadgeBasicProps`, `NumericBadgeFeedbackProps`                           | `NumericBadgeProps`                    |

`ContentBadge` 제거 버튼의 접근성 이름에 배지 내용과 동작을 함께 제공하도록 개선했습니다.

**AS-IS**

```tsx
import { ContentBadge, DotBadge, NumericBadge } from "@jects/jds";

<ContentBadge.Basic hierarchy='primary'>레이블</ContentBadge.Basic>
<ContentBadge.Feedback variant='positive'>레이블</ContentBadge.Feedback>
<ContentBadge.Theme variant='red'>레이블</ContentBadge.Theme>
<DotBadge.Feedback variant='positive' />
<NumericBadge.Basic hierarchy='accent'>99</NumericBadge.Basic>
<NumericBadge.Feedback variant='positive'>99</NumericBadge.Feedback>
```

**TO-BE**

```tsx
import { ContentBadge, DotBadge, NumericBadge } from "@jects/jds";

<ContentBadge hierarchy='primary'>레이블</ContentBadge>
<ContentBadge feedback='positive'>레이블</ContentBadge>
<ContentBadge variant='red'>레이블</ContentBadge>
<DotBadge feedback='positive' />
<NumericBadge hierarchy='accent'>99</NumericBadge>
<NumericBadge feedback='positive'>99</NumericBadge>
```
