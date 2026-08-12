---
"@jects/jds": minor
---

**Toast**

Toast를 Compound 구조에서 `feedback` prop을 쓰는 단일 컴포넌트 구조로 변경합니다. `notifying` 피드백이 추가되고 노출 시간을 `duration`으로 조절합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                                   | TO-BE                                                                  |
| ------------------------------------------------------- | ---------------------------------------------------------------------- |
| `Toast.Basic` / `Toast.Feedback`                        | 단일 `Toast`                                                           |
| `Toast.Feedback`의 `variant`                            | `Toast`의 `feedback`                                                   |
| `caption`                                               | `description`                                                          |
| `toast.basic(title, description)`                       | `toast.basic(title, { description })`                                  |
| 고정된 노출 시간                                        | `ToastProvider`의 `duration` 또는 호출 옵션의 `duration`               |
| `ToastVariant = "positive" \| "destructive"`            | `ToastFeedback = "none" \| "positive" \| "destructive" \| "notifying"` |
| `ToastBasicProps`, `ToastFeedbackProps`                 | `ToastProps`                                                           |
| `ToastStyle`, `ToastFeedbackIconProps`, `ToastDivProps` | 제거 — 대체재 없음                                                     |
| 닫기 버튼                                               | 제거 — `duration` 기반 자동 종료로 대체                                |

```diff
- toast.basic("저장 완료", "변경사항이 저장되었습니다.");
+ toast.basic("저장 완료", {
+   description: "변경사항이 저장되었습니다.",
+   duration: 3000,
+ });
```

```diff
- <Toast.Feedback id="toast-1" variant="positive" title="저장 완료" caption="변경사항이 저장되었습니다." />
+ <Toast id="toast-1" feedback="positive" title="저장 완료" description="변경사항이 저장되었습니다." />
```

**동작 변경 (코드 수정 불필요)**

- `ToastProvider`가 스크린리더 낭독용 live region을 둘로 나눕니다. `feedback="destructive"`는 `role="alert"`와 `aria-live="assertive"` 영역에서 즉시 낭독하고 나머지는 `role="status"`와 `aria-live="polite"` 영역에서 안내합니다.
- 같은 렌더에 동일한 alert 또는 status 채널의 Toast가 여러 개 추가되면 해당 채널의 가장 최근 항목만 안내합니다. 여러 알림의 내용을 모두 전달해야 하면 하나의 Toast로 통합해야 합니다.
- 자동 낭독은 `useToast` 또는 `toastController`로 `ToastProvider`의 큐에 추가한 경우에만 동작하고, `<Toast>`를 직접 렌더링하면 동작하지 않습니다.
