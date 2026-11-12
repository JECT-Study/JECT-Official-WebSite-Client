---
"@jects/jds": minor
---

**DateField**

날짜를 직접 입력하거나 달력에서 선택하는 `DateField`를 추가합니다. `DateField.Label`, `DateField.Input`, `DateField.Helper`로 구성하며, 서버 컴포넌트에서는 같은 파트를 `DateFieldLabel`, `DateFieldInput`, `DateFieldHelper`로 가져와 조합할 수 있습니다. 화면에는 `YYYY.MM.DD`로 표시하고 값과 폼 제출값은 `YYYY-MM-DD` 문자열입니다. 기존 컴포넌트 사용 코드는 변경할 필요가 없습니다.

루트 `DateField`는 `status`(`default`, `error`), `disabled`, `readonly`, `required`를 받고, 다음 prop은 `DateField.Input`에서 사용합니다.

| prop                 | 기본값  | 용도                                                                                   |
| -------------------- | ------- | -------------------------------------------------------------------------------------- |
| `value`              | -       | 제어 모드의 확정값, `YYYY-MM-DD` 또는 `""` — 덜 입력한 날짜를 고치는 동안 이전 값 유지 |
| `defaultValue`       | `""`    | 비제어 모드의 최초 값과 폼 초기화 기준                                                 |
| `onChange`           | -       | 유효하고 선택 가능한 날짜를 완성하거나 모두 지웠을 때 호출                             |
| `onInputStateChange` | -       | 편집 중 표시값, 현재 유효한 값, 오류 종류 `error`, 입력 완료 여부 `isTouched` 전달     |
| `name`, `form`       | -       | 현재 유효한 값을 폼에 제출, 오류가 있으면 `""`                                         |
| `withPicker`         | `true`  | 달력 버튼 표시, 날짜 선택 즉시 확정                                                    |
| `withActionBar`      | `false` | 달력에 오늘, 지우기, 적용 버튼 표시, 적용 시 선택과 지우기 확정                        |
| `minDate`, `maxDate` | -       | 직접 입력과 달력 선택에 적용되는 날짜 범위                                             |
| `isDateDisabled`     | -       | `true`를 반환한 날짜는 직접 입력 시 오류, 달력에서 선택 불가                           |
| `suffix`             | -       | 달력 버튼 오른쪽 부가 요소, 단축키 자동 등록 없음                                      |

DateField는 오류 문구를 제공하지 않고 제출도 막지 않습니다. 사용처가 `error`와 `isTouched`로 문구와 `status`를 정하고, 제출 전에는 `error`가 `null`인지 확인해야 합니다. `isTouched`는 필드를 처음 벗어나거나 달력에서 확정하면 `true`가 되고, 폼을 초기화하면 `false`로 돌아갑니다.

연, 월, 일을 칸 단위로 편집하며 좌우 방향키로 칸을, 위아래 방향키로 값을 바꾸고, Alt와 아래 방향키로 달력을 엽니다. `20260725`, `2026-07-25`, `2026.07.25` 형식을 붙여넣을 수 있고, 덜 입력한 날짜와 없는 날짜는 고치지 않고 그대로 둡니다. 0001–0099년 날짜는 달력에서 올바르게 표시되지 않습니다. 해석할 수 없는 `value`와 `defaultValue`는 빈 값으로 처리하고 개발 환경에서 경고합니다.

```tsx
import { DateField, type DateFieldInputError, type DateFieldInputState } from "@jects/jds";
import { useState } from "react";

const START_DATE_ERROR_MESSAGES: Record<DateFieldInputError, string> = {
  required: "시작일을 입력해 주세요.",
  incomplete: "날짜를 끝까지 입력해 주세요.",
  invalid: "있는 날짜를 입력해 주세요.",
  outOfRange: "오늘 이후 날짜를 입력해 주세요.",
  disabledDate: "선택할 수 없는 날짜예요.",
};

function DateFieldExample() {
  const [date, setDate] = useState("");
  const [dateState, setDateState] = useState<DateFieldInputState | null>(null);
  const errorMessage =
    dateState?.isTouched && dateState.error !== null
      ? START_DATE_ERROR_MESSAGES[dateState.error]
      : null;

  return (
    <DateField required status={errorMessage === null ? "default" : "error"}>
      <DateField.Label>시작일</DateField.Label>
      <DateField.Input
        name='startDate'
        value={date}
        onChange={setDate}
        onInputStateChange={setDateState}
        minDate={new Date()}
      />
      <DateField.Helper>
        {errorMessage ?? "날짜를 입력하거나 달력에서 선택해주세요"}
      </DateField.Helper>
    </DateField>
  );
}
```
