---
"@jects/jds": patch
---

**Tabs**

`Tabs.Trigger`의 크기, 테두리, focus ring, 상호작용 오버레이를 변경했습니다. `Tabs.Trigger`의 `border`나 `border-bottom`을 덮어쓰던 스타일이 아니면 호출부 수정은 필요하지 않습니다.

**동작 변경 (코드 수정 불필요)**

- `variant='header'` 선택 밑줄 — `border-bottom`에서 박스 안쪽 `box-shadow`로 변경, 높이 38px에서 36px로 감소, `border-bottom`으로 밑줄을 덮어쓰던 스타일은 확인 필요
- `variant='content'` 테두리 — `border`에서 박스 안쪽 `box-shadow`로 변경, 높이 34px에서 32px로 감소하고 너비도 2px 감소, `border`나 `border-color`로 테두리를 덮어쓰던 스타일은 확인 필요
- focus ring — 바깥쪽에서 안쪽으로 변경, `header`에서는 ring 아래쪽이 선택 밑줄과 겹침
- hover, pressed 오버레이 불투명도 — hover 5%에서 8%로, pressed 8%에서 12%로 변경
- 레이블과 `badge` 사이 간격 — 4px에서 2px로 변경
