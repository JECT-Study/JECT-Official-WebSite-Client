---
"@jects/jds": minor
---

**TimePicker**

오전/오후, 시, 분, 초 열에서 시각 하나를 고르는 `TimePicker` 패널을 추가합니다. 트리거와 팝오버는 포함하지 않습니다. 값은 날짜 없는 `{ hour, minute, second }` 객체이고 `hour`는 0~23입니다.

| prop                       | 기본값    | 용도                                                             |
| -------------------------- | --------- | ---------------------------------------------------------------- |
| `format`                   | `"hh:mm"` | 열 구성, `hh`, `hh:mm`, `hh:mm:ss`, `HH:mm`, `mm`, `mm:ss`, `ss` |
| `value`, `defaultValue`    | `null`    | 선택 시각, `value`를 넘기면 제어 모드                            |
| `onChange`                 |           | 선택 확정 시 새 시각으로 호출                                    |
| `minuteStep`, `secondStep` | `5`       | 분, 초 목록 간격, `1`, `5`, `10`, `15`, `30`                     |
| `minTime`, `maxTime`       |           | 선택 가능 범위, 범위 밖 항목은 비활성                            |
| `withActionBar`            | `false`   | 적용 버튼 표시, 켜면 적용을 눌러야 확정                          |
| `disabled`, `readOnly`     | `false`   | 조작 차단, 읽기 전용                                             |

```tsx
import { TimePicker, type TimeValue } from "@jects/jds";

const [time, setTime] = useState<TimeValue | null>(null);

<TimePicker format='hh:mm' value={time} onChange={setTime} withActionBar />;
```
