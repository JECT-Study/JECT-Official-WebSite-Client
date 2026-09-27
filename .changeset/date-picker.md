---
"@jects/jds": minor
---

**DatePicker**

날짜 하나를 고르는 달력 패널 `DatePicker`를 추가했습니다. 헤더의 연도와 월 버튼으로 연월 목록을 열 수 있고, 표시 중인 달에 속하지 않는 날짜는 표시만 되고 선택되지 않습니다.

| prop             | 기본값    | 용도                                                                  |
| ---------------- | --------- | --------------------------------------------------------------------- |
| `value`          | -         | 선택된 날짜, 넘기면 제어 모드이고 표시 중인 달이 함께 이동            |
| `defaultValue`   | `null`    | 비제어 모드의 시작 선택값                                             |
| `onChange`       | -         | 선택이 확정될 때 로컬 시간대 자정 기준 날짜로 호출                    |
| `month`          | -         | 표시할 달, 넘기면 표시 중인 달을 호출부가 소유                        |
| `defaultMonth`   | 선택된 달 | 처음 표시할 달, 선택이 없으면 오늘이 속한 달                          |
| `onMonthChange`  | -         | 표시 중인 달이 바뀌면 그 달의 1일로 호출                              |
| `weekStartsOn`   | `1`       | 한 주의 시작 요일, 0은 일요일                                         |
| `withActionBar`  | `false`   | 오늘, 지우기, 적용 버튼 표시, 켜면 적용 시에만 `onChange` 호출        |
| `fixedWeeks`     | `false`   | 모든 달을 6주로 표시, 끄면 달에 필요한 주 수만 표시                   |
| `disabled`       | `false`   | 날짜 선택과 달 이동을 모두 막음                                       |
| `readOnly`       | `false`   | 달 이동은 가능하고 선택만 막음                                        |
| `minDate`        | -         | 선택할 수 있는 가장 이른 날짜, 이 날짜가 속한 달보다 앞으로 이동 불가 |
| `maxDate`        | -         | 선택할 수 있는 가장 늦은 날짜, 이 날짜가 속한 달보다 뒤로 이동 불가   |
| `isDateDisabled` | -         | `true`를 반환한 날짜는 선택 불가                                      |

달력은 `role="grid"`로 노출되고, 방향키, Home, End, PageUp, PageDown으로 날짜를 이동합니다. Tab 정지점은 달력마다 하나입니다.

`weekStartsOn`에 넘기는 값의 타입 `Weekday`도 함께 공개합니다.

```tsx
const [date, setDate] = useState<Date | null>(null);

<DatePicker
  value={date}
  onChange={setDate}
  withActionBar
  minDate={new Date(2026, 0, 1)}
  maxDate={new Date(2026, 11, 31)}
  isDateDisabled={day => day.getDay() === 0}
/>;
```
