---
"@jects/jds": minor
---

**Button (BlockButton / LabelButton)**

`BlockButton`과 `LabelButton`의 `.Basic` / `.Feedback` 컴파운드를 단일 컴포넌트 API로 통합했습니다. `hierarchy`와 `feedback`은 상호 배타(XOR)로 동작하며, `feedback`을 사용하는 경우 `hierarchy`, `BlockButton`의 `variant`는 함께 지정할 수 없습니다.

기존 `.Basic` / `.Feedback` 하위 컴포넌트와 이전 prop, 타입 이름을 제거했습니다. 해당 API를 사용하던 코드는 아래와 같이 단일 컴포넌트 API로 변경해야 합니다.

| 이전                                                      | 신규                                                |
| --------------------------------------------------------- | --------------------------------------------------- |
| `<BlockButton.Basic hierarchy="primary" variant="solid">` | `<BlockButton hierarchy="primary" variant="solid">` |
| `<BlockButton.Feedback intent="destructive">`             | `<BlockButton feedback="destructive">`              |
| `<LabelButton.Basic hierarchy="secondary">`               | `<LabelButton hierarchy="secondary">`               |
| `<LabelButton.Feedback intent="positive">`                | `<LabelButton feedback="positive">`                 |
| `.Feedback`의 `intent` prop                               | `feedback`                                          |
| `BlockButtonStyle`                                        | `BlockButtonVariant`                                |
| `FeedbackIntent`                                          | `BlockButtonFeedback`                               |
| `LabelButtonIntent`                                       | `LabelButtonFeedback`                               |
| `BlockButtonBasicProps`, `BlockButtonFeedbackProps`       | `BlockButtonProps`                                  |
| `LabelButtonBasicProps`, `LabelButtonFeedbackProps`       | `LabelButtonProps`                                  |

**신규 export**

- 타입
  - `BlockButtonProps`
  - `LabelButtonProps`
  - `BlockButtonVariant`
  - `BlockButtonFeedback`
  - `LabelButtonFeedback`

**AS-IS**

```tsx
<BlockButton.Basic hierarchy='primary' variant='solid'>저장</BlockButton.Basic>
<BlockButton.Feedback intent='destructive'>삭제</BlockButton.Feedback>
<LabelButton.Basic hierarchy='secondary'>더보기</LabelButton.Basic>
<LabelButton.Feedback intent='positive'>확인</LabelButton.Feedback>
```

**TO-BE**

```tsx
<BlockButton hierarchy='primary' variant='solid'>저장</BlockButton>
<BlockButton feedback='destructive'>삭제</BlockButton>
<LabelButton hierarchy='secondary'>더보기</LabelButton>
<LabelButton feedback='positive'>확인</LabelButton>
```
