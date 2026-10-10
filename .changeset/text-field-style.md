---
"@jects/jds": patch
---

**TextField**

디자인 스펙과 어긋나 있던 스타일 값을 맞췄습니다. `prefix`, `suffix`를 직계 자식 셀렉터로 스타일링한 경우가 아니면 호출부 수정은 필요하지 않습니다.

**동작 변경 (코드 수정 불필요)**

- `TextField.Input` hover 시 테두리 색 — 상태별 강조 색으로 바뀌지 않도록 변경
- `TextField.Input` hover 오버레이 — 제거
- `TextField.Input` 안쪽 여백 — 상하 8px에서 6px로, 좌우 12px에서 10px로 변경
- disabled 커서 — 화살표에서 `not-allowed`로 변경
- `prefix`, `suffix` — `span` 요소로 감싸서 렌더링, 직계 자식으로 가정한 스타일은 확인 필요
