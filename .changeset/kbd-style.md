---
"@jects/jds": patch
---

**Kbd**

테두리 처리와 `function` 키의 너비를 변경했습니다. `border`로 테두리를 덮어쓰던 스타일이 아니면 호출부 수정은 필요하지 않습니다.

- 테두리 — `border`에서 박스 안쪽 `box-shadow`로 변경, `key`, `text`의 너비 2px 감소, `border`나 `border-color`로 테두리를 덮어쓰던 스타일은 확인 필요
- `type='function'` 너비 — 높이와 같은 값으로 고정, `lg` 26px, `md` 24px, `sm` 22px
