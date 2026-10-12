---
"@jects/jds": minor
---

**DateField**

특정 날짜를 직접 입력하거나 달력에서 선택하는 `DateField` 컴포넌트를 추가합니다. 연, 월, 일을 세그먼트 단위로 편집하며 화면에는 `YYYY.MM.DD`로 표시하고 값은 `"YYYY-MM-DD"` 형식의 문자열입니다.

**소비처 영향 (코드 수정 필요)**

네이티브 길이 제한과 입력 이벤트 props를 받지 않습니다. 확정값 변경은 `onChange`로 관찰합니다.

| AS-IS                                          | TO-BE                                                             |
| ---------------------------------------------- | ----------------------------------------------------------------- |
| `minLength`, `maxLength`                       | 제거, 고정 날짜 형식의 입력 길이 제한 미지원                      |
| `onInput`, `onInputCapture`, `onChangeCapture` | `onChange`로 확정값 변경 관찰                                     |
| `onBeforeInput`, `onBeforeInputCapture`        | 제거, 키보드나 붙여넣기 동작 취소에는 `onKeyDown`, `onPaste` 사용 |

```diff
 <DateField.Input
-  minLength={10}
-  maxLength={10}
-  onInput={event => validateDate(event.currentTarget.value)}
+  onChange={value => validateDate(value)}
 />
```

키보드의 문자 입력을 취소하는 소비처는 다음과 같이 옮깁니다.

```diff
 <DateField.Input
-  onBeforeInput={event => event.preventDefault()}
+  onKeyDown={event => {
+    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
+      event.preventDefault();
+    }
+  }}
 />
```

**추가**

| prop                 | 기본값  | 용도                                                                |
| -------------------- | ------- | ------------------------------------------------------------------- |
| `value`              | -       | `"YYYY-MM-DD"` 형식의 마지막 확정값, 완성된 날짜가 없으면 빈 문자열 |
| `defaultValue`       | -       | 최초 마운트의 초기값이자 폼 초기화 기준                             |
| `onChange`           | -       | 확정값이 바뀌면 `"YYYY-MM-DD"` 문자열로 호출                        |
| `onBlur`             | -       | 부분 입력을 확정하기 전에 실행하는 입력의 blur 콜백                 |
| `name`               | -       | 값을 hidden input으로 폼에 전송                                     |
| `withPicker`         | `true`  | 달력 버튼 표시, 끄면 직접 입력만 가능                               |
| `withActionBar`      | `false` | 달력의 오늘, 지우기, 적용 버튼 표시, 적용 시 선택 확정              |
| `minDate`, `maxDate` | -       | 달력에서 선택할 수 있는 범위, 직접 입력한 값은 제한하지 않음        |
| `isDateDisabled`     | -       | `true`를 반환한 날짜는 달력에서 선택 불가                           |
| `suffix`             | -       | 달력 버튼 오른쪽 부가 요소                                          |

위 prop은 모두 `DateField.Input`이 받습니다. `DateField`는 다른 Field 계열과 같이 `status`, `disabled`, `readonly`, `required`를 받고, `DateField.Label`과 `DateField.Helper`를 함께 제공합니다.

텍스트 입력에 적용되지 않는 네이티브 `min`, `max` prop은 받지 않습니다. 달력의 선택 범위는 `minDate`, `maxDate`로 지정하고, 직접 입력한 값의 범위는 소비처에서 검증합니다.

부분 입력은 내부에서 유지하며 숫자를 입력할 때마다 `onChange`가 호출되지는 않습니다. 기존 날짜 재입력 중에는 이전 확정값을 유지합니다. 확정값이 이미 빈 문자열인 상태에서는 같은 빈 문자열을 다시 설정해도 부분 입력이 남습니다. 부분 입력까지 초기화하려면 폼을 초기화하거나 `DateField.Input`의 `key`를 변경합니다. `key`를 변경하면 현재 `value` 또는 `defaultValue`로 다시 마운트하므로, 입력을 모두 비우려면 값도 빈 문자열로 지정합니다.

비제어 모드의 폼 초기화는 최초 `defaultValue`로 돌아갑니다. 이후 `defaultValue` prop을 바꿔도 초기화 기준은 바뀌지 않습니다. 제어 모드의 `value`가 빈 문자열이 아니면 폼 초기화가 `onChange("")`로 변경을 요청하며 소비처가 반영해야 합니다.

blur에서는 소비처 `onBlur`를 실행한 뒤 부분 입력을 확정합니다. 확정값이 바뀌면 이어서 `onChange`를 호출하므로 날짜 검증에는 `onChange`가 전달한 값을 사용합니다. `pattern`은 표시 문자열인 `YYYY.MM.DD`를 검증합니다.

일이 그 달의 마지막 날을 넘으면 마지막 날로 맞춥니다. `2026.02.30`을 입력하면 `2026.02.28`이 됩니다.

좌우 방향키로 세그먼트를 옮기고 위아래 방향키로 값을 바꿉니다. 전체 선택 후 Backspace를 누르면 값을 모두 지웁니다. 달력은 달력 버튼이나 입력에서 `Alt + ↓`로 열고, 날짜를 고르거나 Esc를 누르면 닫힙니다. 입력에서 열었다면 기존 세그먼트로, 달력 버튼에서 열었다면 버튼으로 포커스가 돌아갑니다.

`withActionBar`를 켜면 날짜 선택과 지우기는 적용을 누를 때 확정되며 달력이 닫힙니다. 적용하지 않고 닫으면 임시 선택은 버립니다. 오늘 버튼은 오늘이 있는 달로 이동하고 오늘을 임시 선택합니다. 직접 입력한 날짜는 기존 입력 방식대로 확정됩니다.

임시 선택 뒤 `minDate`, `maxDate`, `isDateDisabled`가 바뀌면 적용할 때 최신 제한을 다시 검사합니다. 제한 밖 날짜는 값을 변경하지 않고 달력을 유지합니다. 부모 `fieldset`이 비활성화된 뒤 달력 선택으로 값을 변경할 수 없습니다.

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
