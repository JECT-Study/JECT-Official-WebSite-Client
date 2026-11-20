---
"@jects/jds": patch
---

**SegmentedControls**

항목 테두리를 박스 안쪽에 그리도록 변경했습니다. 항목의 `border`를 덮어쓰던 스타일이 아니면 호출부 수정은 필요하지 않습니다.

- 항목 테두리 — 모든 항목에 있던 1px `border`를 없애고, 선택된 항목만 박스 안쪽 `box-shadow`로 그리도록 변경, 항목 높이 2px 감소(`lg` 42px, `md` 36px, `sm` 30px, `xs` 24px), `border`로 테두리를 덮어쓰던 스타일은 확인 필요
