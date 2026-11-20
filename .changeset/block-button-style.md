---
"@jects/jds": patch
---

**BlockButton**

`variant='outlined'` 테두리와 상호작용 오버레이 불투명도를 변경했습니다. `variant='outlined'`의 `border`를 덮어쓰던 스타일이 아니면 호출부 수정은 필요하지 않습니다.

**동작 변경 (코드 수정 불필요)**

- `variant='outlined'` 테두리 — `border`에서 박스 안쪽 `box-shadow`로 변경, 높이와 너비 2px 감소해 다른 `variant`와 같아짐, `border`나 `border-color`로 테두리를 덮어쓰던 스타일은 확인 필요
- `variant='outlined'`, `variant='hollow'`, `hierarchy='secondary'` `variant='solid'` 오버레이 불투명도 — hover 8%에서 5%로, pressed 12%에서 8%로 변경, `accent`와 `primary`의 `solid`는 그대로
