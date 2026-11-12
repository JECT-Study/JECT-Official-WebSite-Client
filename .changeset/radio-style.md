---
"@jects/jds": patch
---

**RadioGroup**

항목의 간격, 테두리, 상호작용 오버레이를 변경했습니다. `variant='outlined'` 항목의 `border`를 덮어쓰던 스타일이 아니면 호출부 수정은 필요하지 않습니다.

**동작 변경 (코드 수정 불필요)**

- 레이블과 헬퍼 사이 간격 — 6px에서 4px로 변경
- `size='lg'` 컨트롤과 레이블 사이 간격 — 12px에서 10px로 변경
- `variant='outlined'` 항목 테두리 — `border`에서 박스 안쪽 `box-shadow`로 변경, 항목 높이와 너비 2px 감소, `border`로 테두리를 덮어쓰던 스타일은 확인 필요
- hover, pressed 오버레이 — 색 `fill.boldest`에서 `fill.bold`로, 불투명도 hover 8%에서 5%로, pressed 12%에서 8%로 변경
- `size='sm'` `variant='hollow'` 오버레이 위치 — 위아래 4px에서 3px로 변경
