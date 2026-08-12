---
"@jects/jds": minor
---

**Badge (ContentBadge / DotBadge / NumericBadge)**

세 배지를 prop 기반의 단일 컴포넌트 API로 통합합니다. `.Basic`, `.Feedback`, `.Theme` 하위 컴포넌트와 관련 props 타입을 제거했으므로 해당 API를 쓰던 코드는 단일 컴포넌트 호출로 바꿔야 합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                                                           | TO-BE                                  |
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

```diff
- <ContentBadge.Basic hierarchy='primary'>레이블</ContentBadge.Basic>
- <ContentBadge.Feedback variant='positive'>레이블</ContentBadge.Feedback>
- <ContentBadge.Theme variant='red'>레이블</ContentBadge.Theme>
- <DotBadge.Feedback variant='positive' />
- <NumericBadge.Basic hierarchy='accent'>99</NumericBadge.Basic>
- <NumericBadge.Feedback variant='positive'>99</NumericBadge.Feedback>
+ <ContentBadge hierarchy='primary'>레이블</ContentBadge>
+ <ContentBadge feedback='positive'>레이블</ContentBadge>
+ <ContentBadge variant='red'>레이블</ContentBadge>
+ <DotBadge feedback='positive' />
+ <NumericBadge hierarchy='accent'>99</NumericBadge>
+ <NumericBadge feedback='positive'>99</NumericBadge>
```

**동작 변경 (코드 수정 불필요)**

- `ContentBadge` 제거 버튼의 접근성 이름에 배지 내용과 동작이 함께 포함됩니다.
