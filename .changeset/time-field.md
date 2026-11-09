---
"@jects/jds": minor
---

**TimeField**

`TimeField`를 추가합니다. 하루 안의 특정 시각을 오전/오후, 시, 분 단위로 직접 입력하거나 `TimePicker`에서 고를 수 있습니다. 화면에는 `오전 09:30`으로 표시하고, 값과 제출값은 24시간제 `"HH:mm"` 문자열입니다.

| prop                    | 기본값  | 용도                                                   |
| ----------------------- | ------- | ------------------------------------------------------ |
| `value`, `defaultValue` | `""`    | 확정된 `"HH:mm"` 값, `value`를 넘기면 제어 모드        |
| `onChange`              |         | 확정값이 바뀔 때 호출                                  |
| `onInputStateChange`    |         | 편집 내용, 유효한 값, 오류 종류, 오류 표시 여부 전달   |
| `minuteStep`            | `5`     | 분 목록과 방향키 증감 간격, 맞지 않는 분은 오류        |
| `minTime`, `maxTime`    |         | 직접 입력과 시간 선택에 함께 적용되는 범위             |
| `withPicker`            | `true`  | 시간 선택 버튼 표시 여부                               |
| `withActionBar`         | `false` | 적용 버튼 표시 여부, 켜면 적용을 눌러야 시간 선택 확정 |
| `suffix`                |         | 시간 선택 버튼 오른쪽 부가 요소, `Kbd` 등              |

`status`는 `"default"`, `"error"`만 받습니다.

```tsx
<TimeField required>
  <TimeField.Label>시작 시각</TimeField.Label>
  <TimeField.Input name='startTime' value={time} onChange={setTime} />
  <TimeField.Helper>5분 단위로 입력해 주세요</TimeField.Helper>
</TimeField>
```
