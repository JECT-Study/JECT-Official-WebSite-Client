---
"@jects/jds": minor
---

**Button (BlockButton / LabelButton)**

`BlockButton`과 `LabelButton`의 `.Basic`, `.Feedback` 컴파운드를 단일 컴포넌트 API로 통합합니다. 하위 컴포넌트와 이전 prop, 타입 이름을 제거했으므로 해당 API를 쓰던 코드는 단일 컴포넌트 호출로 바꿔야 합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                                     | TO-BE                                               |
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

`hierarchy`와 `feedback`은 상호 배타입니다. `feedback`을 지정하면 `hierarchy`와 `BlockButton`의 `variant`는 함께 지정할 수 없습니다.

```diff
- <BlockButton.Basic hierarchy='primary' variant='solid'>저장</BlockButton.Basic>
- <BlockButton.Feedback intent='destructive'>삭제</BlockButton.Feedback>
- <LabelButton.Basic hierarchy='secondary'>더보기</LabelButton.Basic>
- <LabelButton.Feedback intent='positive'>확인</LabelButton.Feedback>
+ <BlockButton hierarchy='primary' variant='solid'>저장</BlockButton>
+ <BlockButton feedback='destructive'>삭제</BlockButton>
+ <LabelButton hierarchy='secondary'>더보기</LabelButton>
+ <LabelButton feedback='positive'>확인</LabelButton>
```
