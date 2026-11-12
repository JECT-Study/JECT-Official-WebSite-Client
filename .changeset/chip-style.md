---
"@jects/jds": patch
---

**Chip**

테두리 처리와 선택된 비활성 Chip의 테두리 색을 변경했습니다. `border`로 테두리를 덮어쓰던 스타일이 아니면 호출부 수정은 필요하지 않습니다.

- 테두리 — `border`에서 박스 안쪽 `box-shadow`로 변경, 높이 30px에서 28px로 감소하고 너비도 2px 감소, `border`나 `border-color`로 테두리를 덮어쓰던 스타일은 확인 필요
- `valueLabel`이 있는 `disabled` Chip의 테두리 색 — `accent.alpha.subtler`에서 `stroke.alpha.subtler`로 변경, `valueLabel`이 없는 `disabled` Chip과 같은 색
