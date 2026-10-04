---
"@jects/jds": minor
---

**DateField**

특정 날짜를 입력하는 `DateField` 컴포넌트를 추가합니다. 연, 월, 일을 세그먼트 단위로 편집하며 화면에는 `YYYY.MM.DD`로 표시하고 값은 `"YYYY-MM-DD"` 형식의 문자열입니다.

- `DateField` — `status`, `disabled`, `readonly`, `required`, 다른 Field 계열과 동일
- `DateField.Label`, `DateField.Helper` — Field 레이블, 헬퍼
- `DateField.Input` — `value`, `defaultValue`, `onChange(value: string)`, 입력이 완성되지 않으면 빈 문자열
- `DateField.Input`의 `name` — `"YYYY-MM-DD"` 값을 hidden input으로 폼에 전송
- `DateField.Input`의 `suffix` — 입력 오른쪽 부가 요소

일이 그 달의 마지막 날을 넘으면 마지막 날로 맞춥니다. `2026.02.30`을 입력하면 `2026.02.28`이 됩니다.

좌우 방향키로 세그먼트를 옮기고 위아래 방향키로 값을 바꿉니다. 전체 선택 후 Backspace를 누르면 값을 모두 지웁니다.

```tsx
<DateField required>
  <DateField.Label>시작일</DateField.Label>
  <DateField.Input name='startDate' value={date} onChange={setDate} />
  <DateField.Helper>오늘 이후 날짜를 입력해주세요</DateField.Helper>
</DateField>
```
