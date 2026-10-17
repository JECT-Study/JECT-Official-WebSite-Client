---
"@jects/jds": patch
---

**NumericBadge**

일부 색과 크기별 최소 너비를 변경했습니다. 호출부 수정은 필요하지 않으며, 렌더 결과만 달라집니다.

**동작 변경 (코드 수정 불필요)**

- `hierarchy='primary'` `badgeStyle='solid'` 배경 — `fill.boldest`에서 `fill.bolder`로 변경
- `badgeStyle='hollow'` 숫자 색 — `accent`는 `accent.bold`에서 `accent.normal`로, `primary`는 `object.bolder`에서 `object.bold`로 변경
- `solid`, `alpha` 최소 너비 — `md`만 23px에서 22px로 변경
- `hollow` 최소 너비 — `lg` 22px, `md` 20px, `sm` 18px, `xs` 16px로 변경, 이전에는 `solid`와 같은 값
