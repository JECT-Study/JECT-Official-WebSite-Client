---
"@jects/jds": minor
---

**DateField**

날짜를 직접 입력하거나 달력에서 선택하는 `DateField`를 추가합니다. `DateField.Label`, `DateField.Input`, `DateField.Helper`와 관련 공개 타입을 제공합니다. 기존 컴포넌트 사용 코드는 변경할 필요가 없습니다.

다음 prop은 `DateField.Input`에서 사용합니다.

| prop                 | 기본값  | 용도                                                                  |
| -------------------- | ------- | --------------------------------------------------------------------- |
| `value`              | -       | 제어 모드의 확정값, `YYYY-MM-DD` 문자열 또는 `""`                     |
| `defaultValue`       | `""`    | 비제어 모드의 최초 값과 폼 초기화 기준                                |
| `onChange`           | -       | 유효하고 선택 가능한 날짜 완성 또는 전체 삭제로 확정값이 바뀔 때 호출 |
| `onInputStateChange` | -       | 현재 표시값, 유효한 제출값, 오류 종류, 오류 표시 여부 전달            |
| `name`, `form`       | -       | 현재 유효한 값을 `YYYY-MM-DD` 형식으로 폼에 제출                      |
| `withPicker`         | `true`  | 달력 버튼 표시, 날짜 선택 즉시 확정                                   |
| `withActionBar`      | `false` | 달력에 오늘, 지우기, 적용 버튼 표시, 적용 시 선택과 지우기 확정       |
| `minDate`, `maxDate` | -       | 직접 입력과 달력 선택에 적용되는 날짜 범위                            |
| `isDateDisabled`     | -       | `true`를 반환한 날짜는 직접 입력 시 오류, 달력에서 선택 불가          |
| `suffix`             | -       | 달력 버튼 오른쪽 부가 요소, 단축키 자동 등록 없음                     |

- `DateField`에서 `status`, `disabled`, `readonly`, `required` 사용 가능
- 0001–9999년 입력 지원, 화면에는 `YYYY.MM.DD` 표시, 숫자 연속 입력과 날짜 문자열 붙여넣기 지원
- 0001–0099년 날짜는 달력에서 올바르게 표시되지 않음
- 부분 입력과 잘못된 날짜는 화면에 유지하고 제출값은 `""`로 처리, 마지막 확정값은 유지
- 최초 오류는 필드 전체 이탈, 달력 선택 확정, 네이티브 검증 실패 시 표시, 폼 초기화 시 오류 표시 이력도 초기화
- 일반 폼에서 오류가 있는 입력의 제출 차단, 제출과 `reportValidity()`의 오류 툴팁 및 포커스는 브라우저 기본 동작 사용, `checkValidity()` 호출은 포커스 유지
- `DateFieldInputState.error`로 현재 유효성 확인, 오류가 숨겨진 상태에서도 `error === null`을 기준으로 제출 가능 여부 판단
- 읽기 전용 전환 시 편집 중 숫자 보존, 비활성이나 읽기 전용 전환 또는 `withPicker={false}` 설정 시 열린 달력 닫기
- `withActionBar`에서 적용 전에 닫으면 기존 입력 유지, 부분 입력과 잘못된 날짜는 달력의 지우기로 비울 수 없음
- 부모가 제어 모드의 변경을 거절하면 표시도 부모 값으로 복원, 같은 `value=""`를 다시 전달해도 부분 입력은 유지
- 부분 입력까지 초기화하려면 폼 reset 또는 Input 재마운트 필요, 제어 모드 reset은 `onChange("")`로 변경 요청
- 해석할 수 없는 외부 값은 빈 입력과 빈 제출값으로 처리, 개발 환경에서 경고 표시

```tsx
import { DateField } from "@jects/jds";
import { useState } from "react";

function DateFieldExample() {
  const [date, setDate] = useState("");

  return (
    <DateField required>
      <DateField.Label>시작일</DateField.Label>
      <DateField.Input name='startDate' value={date} onChange={setDate} withActionBar />
      <DateField.Helper>날짜를 입력하거나 달력에서 선택해주세요</DateField.Helper>
    </DateField>
  );
}
```
