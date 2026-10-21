---
"@jects/jds": minor
---

**DateField**

날짜를 연, 월, 일 단위로 직접 편집하거나 달력에서 선택하는 `DateField`를 추가합니다. 0001–9999년을 지원하며 화면에는 `YYYY.MM.DD`, 확정값은 `YYYY-MM-DD` 문자열로 사용합니다. 기존 컴포넌트 사용 코드는 변경할 필요가 없습니다.

다음 prop은 `DateField.Input`에서 사용합니다.

| prop                 | 기본값  | 용도                                                                                                                   |
| -------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------- |
| `value`              | -       | 제어 모드의 마지막 확정값, 빈 값은 `""`, 부모가 날짜 변경을 반영하지 않으면 기존 값으로 복원                           |
| `defaultValue`       | -       | 비제어 모드의 최초 값과 폼 reset 기준, 마운트 이후 변경은 미반영                                                       |
| `onChange`           | -       | 유효하고 선택 가능한 날짜 완성 또는 전체 삭제로 확정값이 바뀔 때 호출, 부분 입력과 오류 입력 중에는 마지막 확정값 유지 |
| `onInputStateChange` | -       | 마운트와 변경 시 현재 입력, 유효한 제출값, 오류 종류, 오류 표시 여부 전달                                              |
| `onBlur`             | -       | 내부 부분 입력 확정 처리 전에 실행되는 blur 콜백                                                                       |
| `name`               | -       | 현재 유효한 값을 hidden input으로 제출, 오류 입력의 제출값은 `""`로 처리                                               |
| `form`               | -       | 입력과 제출값을 지정한 폼에 연결                                                                                       |
| `withPicker`         | `true`  | 달력 버튼 표시, 날짜 선택 즉시 확정 후 닫기                                                                            |
| `withActionBar`      | `false` | 달력에 오늘, 지우기, 적용 버튼 표시, 선택과 지우기는 적용 시 확정하고 닫으면 미적용 선택 취소                          |
| `minDate`, `maxDate` | -       | 직접 입력과 달력 선택에 동일하게 적용되는 날짜 범위                                                                    |
| `isDateDisabled`     | -       | `true`를 반환한 날짜는 직접 입력 시 오류이며 달력에서도 선택 불가                                                      |
| `suffix`             | -       | 달력 버튼 오른쪽 부가 요소                                                                                             |

`DateField`는 `status`, `disabled`, `readonly`, `required`를 받으며 `DateField.Label`, `DateField.Helper`를 제공합니다. 부분 입력과 존재하지 않는 날짜는 보정하지 않고 입력 중 즉시 오류로 표시합니다. `20260725`, `2026-07-25`, `2026.07.25` 입력과 붙여넣기를 지원합니다.

입력이 비활성 또는 읽기 전용 상태가 되거나 `withPicker={false}`로 바뀌면 열린 달력을 닫습니다. 부모 `fieldset`이 비활성 상태이면 달력에서 날짜 선택과 지우기를 확정할 수 없습니다.

개발 환경에서는 해석할 수 없는 외부 `value`와 최초 `defaultValue`에 경고를 표시합니다. 같은 입력 인스턴스에서 동일한 prop과 잘못된 값의 조합은 한 번만 경고하며, 사용자 입력과 날짜 제한 오류는 경고하지 않습니다.

선택 입력의 완전히 빈 값은 유효합니다. 필수 빈 값은 최초 오류를 숨깁니다. 입력 후 전체 삭제, 달력의 지우기 확정, 제출 또는 `checkValidity()`, `reportValidity()` 검증 실패 시 필수 오류를 표시합니다. 내장 오류는 테두리와 도움말에 자동으로 반영하며 네이티브 폼 검증으로 제출을 차단합니다.

공개 타입 `DateFieldInputState`는 `inputValue`, `value`, `error`, `isErrorVisible`을 제공합니다. `error`는 `DateFieldInputError` 타입의 `required`, `incomplete`, `invalid`, `outOfRange`, `disabledDate` 또는 `null`입니다. 오류 입력의 `value`는 `""`이며 마지막 확정값과 다를 수 있습니다. `noValidate` 폼이나 외부 폼 라이브러리는 `error === null`을 기준으로 제출을 제어합니다.

제어 모드에서 같은 `value=""`를 다시 전달해도 부분 입력은 유지합니다. 부분 입력까지 초기화하려면 폼 reset 또는 `DateField.Input` 재마운트를 사용합니다. 제어 모드 reset은 확정값이 비어 있지 않으면 `onChange("")`로 비우기를 요청하며 부모가 반영한 값을 따릅니다.

```tsx
import { DateField } from "@jects/jds";
import { useState } from "react";

function DateFieldExample() {
  const [date, setDate] = useState("");

  return (
    <DateField required>
      <DateField.Label>시작일</DateField.Label>
      <DateField.Input name='startDate' value={date} onChange={setDate} />
      <DateField.Helper>날짜를 입력하거나 달력에서 선택해주세요</DateField.Helper>
    </DateField>
  );
}
```
