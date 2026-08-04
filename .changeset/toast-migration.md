---
"@jects/jds": minor
---

**Toast**

Toast가 Compound 구조에서 `feedback` prop을 사용하는 단일 컴포넌트 구조로 변경되었습니다. `notifying` 피드백 상태가 추가되고, Toast 노출 시간을 `duration`으로 조절할 수 있습니다. 스크린리더 낭독은 시각용 Toast 스택과 분리된 live region에서 alert/status 채널별 가장 최근 Toast를 읽도록 개선되었습니다.

`ToastProvider`는 스크린리더 자동 낭독용 live region을 둘로 나눠, `feedback="destructive"` 토스트는 `role="alert"`와 `aria-live="assertive"` 영역에서 즉시 낭독하고 나머지 피드백은 `role="status"`와 `aria-live="polite"` 영역에서 안내합니다. 같은 렌더에 동일한 alert/status 채널의 Toast가 여러 개 추가되면 해당 채널의 가장 최근 항목만 안내합니다. 여러 알림의 내용을 모두 전달해야 하는 경우에는 하나의 Toast로 통합해 사용해야 합니다. 이 자동 낭독은 `useToast` 또는 `toastController`를 통해 `ToastProvider`의 큐에 추가한 경우에만 동작하며, `<Toast>`를 직접 렌더링하면 동작하지 않습니다.

**소비자 영향 (코드 수정 필요)**

| AS-IS                                                   | TO-BE                                                                  |
| ------------------------------------------------------- | ---------------------------------------------------------------------- |
| `Toast.Basic` / `Toast.Feedback`                        | 단일 `Toast` 컴포넌트                                                  |
| `Toast.Feedback variant`                                | `Toast feedback`                                                       |
| `caption`                                               | `description`                                                          |
| `toast.basic(title, description)`                       | `toast.basic(title, { description })`                                  |
| 고정된 Toast 노출 시간                                  | `ToastProvider duration` 또는 toast 호출 옵션의 `duration`             |
| `ToastVariant = "positive" \| "destructive"`            | `ToastFeedback = "none" \| "positive" \| "destructive" \| "notifying"` |
| `ToastBasicProps`, `ToastFeedbackProps`                 | `ToastProps`                                                           |
| `ToastStyle`, `ToastFeedbackIconProps`, `ToastDivProps` | 제거                                                                   |
| 닫기 버튼                                               | 제거. `duration` 기반 자동 종료로 대체                                 |

**마이그레이션 예시**

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
