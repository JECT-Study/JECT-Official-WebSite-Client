---
"@jects/jds": minor
---

**TextField**

남은 시간을 표시하는 `TextField.Timer`를 추가합니다. `Footer`의 카운터 자리에 `seconds`로 받은 남은 시간을 `m:ss` 형식으로 표시합니다. 10분 이상은 `10:00`처럼 분 자릿수가 늘어납니다. 카운트다운 진행과 만료 처리는 소비처가 담당합니다.

`TextField.Counter`와 같은 자리를 사용하므로 한 필드에는 둘 중 하나만 배치합니다. 시간이 바뀔 때마다 스크린 리더가 읽어주지는 않습니다.

- `seconds` — 필수, 남은 시간(초)
- `timeFormatter` — 기본값 `formatTimer`, 초를 표시 문자열로 변환

초를 `m:ss` 문자열로 변환하는 `formatTimer`를 함께 추가합니다. 소수는 올림하고, 음수와 유한하지 않은 값은 `0:00`으로 표시합니다. `@jects/jds/utils`에서 import하면 서버 컴포넌트에서 사용할 수 있습니다.

서버 컴포넌트용 개별 export `TextFieldTimer`와 타입 `TextFieldTimerProps`를 함께 내보냅니다.

```tsx
<TextField status={isExpired ? "error" : "default"}>
  <TextField.Label>인증번호</TextField.Label>
  <TextField.Input placeholder='인증번호 6자리를 입력해주세요' />
  <TextField.Footer>
    <TextField.Helper>인증번호를 입력해주세요</TextField.Helper>
    <TextField.Timer seconds={remainingSeconds} />
  </TextField.Footer>
</TextField>
```
