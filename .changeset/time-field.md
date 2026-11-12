---
"@jects/jds": minor
---

**TimeField**

`TimeField`를 추가합니다. 하루 안의 특정 시각을 오전/오후, 시, 분 단위로 직접 입력하거나 `TimePicker`에서 고를 수 있습니다. 화면에는 `오전 09:30`으로 표시하고, 값과 제출값은 24시간제 `"HH:mm"` 문자열입니다. 기존 컴포넌트 사용 코드는 변경할 필요가 없습니다.

| prop                    | 기본값  | 용도                                                                  |
| ----------------------- | ------- | --------------------------------------------------------------------- |
| `value`, `defaultValue` | `""`    | 확정된 `"HH:mm"` 값, `value`를 넘기면 제어 모드                       |
| `onChange`              |         | 확정값이 바뀔 때 호출                                                 |
| `onInputStateChange`    |         | 편집 중 표시값, 현재 유효한 값, 오류 종류 `error` 전달                |
| `onBlur`                |         | 입력칸, 시간 선택 버튼, 시간 선택을 포함한 필드 전체를 벗어날 때 호출 |
| `minuteStep`            | `5`     | 분 목록과 방향키 증감 간격, 맞지 않는 분은 오류                       |
| `minTime`, `maxTime`    |         | 직접 입력과 시간 선택에 함께 적용되는 범위                            |
| `withPicker`            | `true`  | 시간 선택 버튼 표시 여부                                              |
| `withActionBar`         | `false` | 적용 버튼 표시 여부, 켜면 적용을 눌러야 시간 선택 확정                |
| `suffix`                |         | 시간 선택 버튼 오른쪽 부가 요소, `Kbd` 등                             |

`status`는 `"default"`, `"error"`만 받습니다.

TimeField는 오류 문구를 제공하지 않고 제출도 막지 않습니다. 오류 문구와 `status`, 보여줄 시점은 사용처가 정하며, 제출 전에는 `error`가 `null`인지 확인해야 합니다. `incomplete`와 `invalid`는 시각이 만들어지지 않은 입력이라 폼 값만으로는 알 수 없으므로 `error`로 반드시 처리해야 합니다. `onBlur`는 필드 안의 포커스 이동에서는 호출되지 않으므로 React Hook Form의 `field.onBlur`를 그대로 연결할 수 있습니다.

```tsx
import { TimeField, type TimeFieldInputError } from "@jects/jds";
import { useState } from "react";

const START_TIME_ERROR_MESSAGES: Record<TimeFieldInputError, string> = {
  required: "시작 시각을 입력해 주세요.",
  incomplete: "시각을 끝까지 입력해 주세요.",
  invalid: "있는 시각을 입력해 주세요.",
  outOfRange: "허용된 범위의 시각을 입력해 주세요.",
  stepMismatch: "분은 5분 단위로 입력해 주세요.",
};

function TimeFieldExample() {
  const [time, setTime] = useState("");
  const [timeError, setTimeError] = useState<TimeFieldInputError | null>(null);
  const [isTouched, setIsTouched] = useState(false);
  const errorMessage =
    isTouched && timeError !== null ? START_TIME_ERROR_MESSAGES[timeError] : null;

  return (
    <TimeField required status={errorMessage === null ? "default" : "error"}>
      <TimeField.Label>시작 시각</TimeField.Label>
      <TimeField.Input
        name='startTime'
        value={time}
        onChange={setTime}
        onInputStateChange={state => setTimeError(state.error)}
        onBlur={() => setIsTouched(true)}
      />
      <TimeField.Helper>{errorMessage ?? "5분 단위로 입력해 주세요"}</TimeField.Helper>
    </TimeField>
  );
}
```
