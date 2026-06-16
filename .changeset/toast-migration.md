---
"@jects/jds": minor
---

**Toast**

Toast API를 피그마 프로퍼티에 맞춰 `feedback` / `description` 중심으로 정리하고, `notifying` 피드백 상태를 추가합니다.

일반적인 사용 방식인 `useToast()`와 `toastController` 호출 API는 대부분 유지됩니다. 기존 `basic`, `positive`, `destructive` 호출은 그대로 사용할 수 있으며, 두 번째 인자는 `caption` 대신 `description` 의미로 정리되었습니다.

새로운 `notifying` 피드백은 다음과 같이 호출할 수 있습니다.

```tsx
const { toast } = useToast();

toast.notifying("새 알림", "확인할 알림이 있습니다.");
toastController.notifying("새 알림", "확인할 알림이 있습니다.");
```

직접 `Toast.Basic` / `Toast.Feedback` 컴포넌트나 Toast 관련 public type을 사용하던 경우에는 단일 `Toast` 컴포넌트와 `feedback` props 구조로 변경해야 합니다.

| AS-IS | TO-BE |
| --- | --- |
| `Toast.Basic` | `<Toast feedback="none" />` 또는 `<Toast />` |
| `Toast.Feedback variant="positive"` | `<Toast feedback="positive" />` |
| `Toast.Feedback variant="destructive"` | `<Toast feedback="destructive" />` |
| `caption` | `description` |
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
/>;
```

디자인 스펙에 맞춰 Toast의 닫기 버튼은 제거되었습니다. 사용자가 직접 닫기 버튼에 의존하던 화면은 자동 종료되는 Toast 동작을 기준으로 확인해야 합니다.
