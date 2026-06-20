---
"@jects/jds": minor
---

**Toast**

Toast API를 피그마 프로퍼티에 맞춰 `feedback` / `description` 중심으로 정리하고, `notifying` 피드백 상태와 노출 시간 설정을 추가합니다.

일반적인 사용 방식인 `useToast()`와 `toastController` 호출 API는 대부분 유지됩니다. 기존 `basic`, `positive`, `destructive` 호출은 그대로 사용할 수 있으며, 선택적으로 전달하는 `description`, `duration`은 두 번째 인자의 `ToastOptions` 객체로 전달해야 합니다.

새로운 `notifying` 피드백은 다음과 같이 호출할 수 있습니다.

```tsx
const { toast } = useToast();

toast.notifying("새 알림", {
  description: "확인할 알림이 있습니다.",
});

toastController.notifying("새 알림", {
  description: "확인할 알림이 있습니다.",
});
```

Toast 노출 시간은 `duration`으로 조절할 수 있습니다. 우선순위는 다음 순서로 적용됩니다.

1. toast 호출 함수의 `options.duration`
2. `ToastProvider`의 `duration`
3. Toast 기본값 `DEFAULT_TOAST_DURATION`

```tsx
<ToastProvider duration={5000}>
  {children}
</ToastProvider>

toast.basic("저장 완료", {
  description: "변경사항이 저장되었습니다.",
  duration: 3000,
});
```

직접 `Toast.Basic` / `Toast.Feedback` 컴포넌트나 Toast 관련 public type을 사용하던 경우에는 단일 `Toast` 컴포넌트와 `feedback` props 구조로 변경해야 합니다.

| AS-IS | TO-BE |
| --- | --- |
| `Toast.Basic` | `<Toast feedback="none" />` 또는 `<Toast />` |
| `Toast.Feedback variant="positive"` | `<Toast feedback="positive" />` |
| `Toast.Feedback variant="destructive"` | `<Toast feedback="destructive" />` |
| `caption` | `description` |
| `toast.basic(title, description)` | `toast.basic(title, { description })` |
| 고정된 Toast 노출 시간 | `ToastProvider duration` 또는 `toast.basic(title, { duration })` |
| `ToastVariant = "positive" \| "destructive"` | `ToastFeedback = "none" \| "positive" \| "destructive" \| "notifying"` |
| `ToastBasicProps`, `ToastFeedbackProps` | `ToastProps` |
| `ToastStyle`, `ToastFeedbackIconProps`, `ToastDivProps` | 더 이상 export하지 않음 |

```tsx
import { Toast } from "@jects/jds";
import type { ToastFeedback, ToastProps } from "@jects/jds";

<Toast
  id="toast-1"
  feedback="positive"
  title="저장 완료"
  description="변경사항이 저장되었습니다."
  duration={3000}
/>;
```

디자인 스펙에 맞춰 Toast의 닫기 버튼은 제거되었습니다. 사용자가 직접 닫기 버튼에 의존하던 화면은 자동 종료되는 Toast 동작을 기준으로 확인해야 합니다.

`duration: Infinity`를 전달하면 자동 종료 타이머를 생성하지 않습니다. 다만 Toast에는 닫기 버튼이 없으므로, 영구 노출이 필요한 사용처인지 확인한 뒤 사용해야 합니다.

스크린리더 낭독은 시각용 Toast 스택과 분리된 live region에서 가장 최근 Toast만 읽도록 개선했습니다. 여러 Toast가 쌓여 있을 때 이전 Toast까지 반복 낭독되는 것을 줄이기 위한 변경이며, 별도 마이그레이션은 필요하지 않습니다.
