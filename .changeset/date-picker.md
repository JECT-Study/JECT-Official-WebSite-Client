---
"@jects/jds": minor
---

**DatePicker**

날짜 하나를 고르는 달력 패널 `DatePicker`를 추가했습니다. 헤더의 연도와 월 버튼으로 연월 목록을 열 수 있고, 표시 중인 달에 속하지 않는 날짜는 표시만 되고 선택되지 않습니다.

| prop            | 기본값    | 용도                                                           |
| --------------- | --------- | -------------------------------------------------------------- |
| `value`         | -         | 선택된 날짜, 넘기면 제어 모드이고 표시 중인 달이 함께 이동     |
| `defaultValue`  | `null`    | 비제어 모드의 시작 선택값                                      |
| `onChange`      | -         | 선택이 확정될 때 호출                                          |
| `defaultMonth`  | 선택된 달 | 처음 표시할 달, 선택이 없으면 오늘이 속한 달                   |
| `weekStartsOn`  | `1`       | 한 주의 시작 요일, 0은 일요일                                  |
| `withActionBar` | `false`   | 오늘, 지우기, 적용 버튼 표시, 켜면 적용 시에만 `onChange` 호출 |
| `fixedWeeks`    | `false`   | 모든 달을 6주로 표시, 끄면 달에 필요한 주 수만 표시            |
| `minYear`       | -         | 연도 목록과 달 이동의 하한                                     |
| `maxYear`       | -         | 연도 목록과 달 이동의 상한                                     |

```tsx
const [date, setDate] = useState<Date | null>(null);

<DatePicker value={date} onChange={setDate} withActionBar minYear={2020} maxYear={2030} />;
```
