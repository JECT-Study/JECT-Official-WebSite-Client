---
"@jects/jds": patch
---

**ContentBadge**

`outlined` 테두리 처리와 크기별 최소 너비, 삭제 버튼 간격을 변경했습니다. `border`로 테두리를 덮어쓰던 스타일이 아니면 호출부 수정은 필요하지 않습니다.

**동작 변경 (코드 수정 불필요)**

- `badgeStyle='outlined'` 테두리 — `border`에서 박스 안쪽 `box-shadow`로 변경, 높이와 너비가 2px 감소해 `solid`, `alpha`와 같은 크기, `border`로 테두리를 덮어쓰던 스타일은 확인 필요
- 최소 너비 — `lg` 28px에서 26px, `md` 27px에서 24px, `sm` 24px에서 22px, `xs` 20px에서 18px로 변경
- `withIconButton` 레이블과 삭제 버튼 사이 간격 — `sm`, `xs`에서 4px에서 2px로 변경, `lg`, `md`는 4px 유지
