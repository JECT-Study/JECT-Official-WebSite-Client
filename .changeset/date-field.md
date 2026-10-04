---
"@jects/jds": minor
---

**DateField**

특정 날짜를 직접 입력하거나 달력에서 선택하는 `DateField` 컴포넌트를 추가합니다. 연, 월, 일을 세그먼트 단위로 편집하며 화면에는 `YYYY.MM.DD`로 표시하고 값은 `"YYYY-MM-DD"` 형식의 문자열입니다.

| prop                    | 기본값 | 용도                                                         |
| ----------------------- | ------ | ------------------------------------------------------------ |
| `value`, `defaultValue` | -      | `"YYYY-MM-DD"` 형식의 값, 입력이 완성되지 않으면 빈 문자열   |
| `onChange`              | -      | 값이 바뀌면 `"YYYY-MM-DD"` 문자열로 호출                     |
| `name`                  | -      | 값을 hidden input으로 폼에 전송                              |
| `withPicker`            | `true` | 달력 버튼 표시, 끄면 직접 입력만 가능                        |
| `minDate`, `maxDate`    | -      | 달력에서 선택할 수 있는 범위, 직접 입력한 값은 제한하지 않음 |
| `isDateDisabled`        | -      | `true`를 반환한 날짜는 달력에서 선택 불가                    |
| `suffix`                | -      | 달력 버튼 오른쪽 부가 요소                                   |

위 prop은 모두 `DateField.Input`이 받습니다. `DateField`는 다른 Field 계열과 같이 `status`, `disabled`, `readonly`, `required`를 받고, `DateField.Label`과 `DateField.Helper`를 함께 제공합니다.

일이 그 달의 마지막 날을 넘으면 마지막 날로 맞춥니다. `2026.02.30`을 입력하면 `2026.02.28`이 됩니다.

좌우 방향키로 세그먼트를 옮기고 위아래 방향키로 값을 바꿉니다. 전체 선택 후 Backspace를 누르면 값을 모두 지웁니다. 달력은 달력 버튼이나 입력에서 `Alt + ↓`로 열고, 날짜를 고르거나 Esc를 누르면 닫히며 포커스는 달력 버튼으로 돌아갑니다.

```tsx
<DateField required>
  <DateField.Label>시작일</DateField.Label>
  <DateField.Input
    name='startDate'
    value={date}
    onChange={setDate}
    minDate={new Date(2026, 0, 1)}
  />
  <DateField.Helper>2026년 이후 날짜를 입력해주세요</DateField.Helper>
</DateField>
```
