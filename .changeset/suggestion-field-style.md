---
"@jects/jds": patch
---

**SuggestionField**

디자인 스펙과 어긋나 있던 스타일 값을 맞췄습니다. 호출부 수정은 필요하지 않으며, 렌더 결과만 달라집니다.

**동작 변경 (코드 수정 불필요)**

- `SuggestionField.Input` hover 시 테두리 색 — 상태별 강조 색으로 바뀌지 않도록 변경
- `SuggestionField.Input` hover 오버레이 — 제거
- `SuggestionField.Input` 안쪽 여백 — 상하 8px에서 6px로, 좌우 12px에서 10px로 변경
- disabled 커서 — 화살표에서 `not-allowed`로 변경
