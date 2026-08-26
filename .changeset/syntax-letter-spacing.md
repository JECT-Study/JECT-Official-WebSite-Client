---
"@jects/jds": patch
---

**tokens**

syntax 계열 textStyle의 `letter-spacing`이 `0%`에서 `0em`으로 바뀝니다. 소비처가 고칠 것은 없습니다.

**동작 변경 (코드 수정 불필요)**

- `letter-spacing`의 백분율을 지원하는 브라우저(Firefox 45 이상, Safari 7 이상, Chrome, Edge 145 이상)에서는 `0%`와 `0em`이 모두 `0`이라 결과가 같음
- 지원하지 않는 브라우저에서는 syntax 타이포의 자간이 조상에서 상속된 값에서 `0`으로 변경 — 이전에는 `0%` 선언이 버려져 상속 값이 적용
