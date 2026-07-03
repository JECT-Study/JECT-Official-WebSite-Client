---
"@jects/jds": minor
---

**Button (BlockButton / LabelButton)**

`BlockButton`과 `LabelButton`의 `.Basic` / `.Feedback` 컴파운드를 단일 컴포넌트 API로 통합했습니다. `hierarchy`와 `feedback`은 상호 배타(XOR)로 동작하며, `feedback`을 사용하는 경우 `hierarchy`, `BlockButton`의 `variant`는 함께 지정할 수 없습니다.

기존 `.Basic` / `.Feedback` 컴파운드와 이전 prop, 타입 이름은 `@deprecated` 별칭으로 유지되어 기존 코드도 계속 동작합니다.

| 이전                                    | 신규                              |
| --------------------------------------- | --------------------------------- |
| `<BlockButton.Basic hierarchy variant>` | `<BlockButton hierarchy variant>` |
| `<BlockButton.Feedback intent>`         | `<BlockButton feedback>`          |
| `<LabelButton.Basic hierarchy>`         | `<LabelButton hierarchy>`         |
| `<LabelButton.Feedback intent>`         | `<LabelButton feedback>`          |
| `.Feedback`의 `intent` prop             | `feedback`                        |
| `BlockButtonStyle`                      | `BlockButtonVariant`              |
| `FeedbackIntent`                        | `BlockButtonFeedback`             |
| `LabelButtonIntent`                     | `LabelButtonFeedback`             |

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
