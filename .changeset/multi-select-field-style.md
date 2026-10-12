---
"@jects/jds": patch
---

**MultiSelectField**

입력 박스의 크기, 테두리, 상태별 색을 변경했습니다. `suffix`나 `MultiSelectField.Label`의 `suffix`를 직계 자식 셀렉터로 스타일링한 경우가 아니면 호출부 수정은 필요하지 않습니다.

**동작 변경 (코드 수정 불필요)**

- `MultiSelectField.Input` hover 시 테두리 색 — 상태별 강조 색으로 바뀌지 않도록 변경
- `MultiSelectField.Input` 안쪽 여백 — 상하 8px에서 6px로, 좌우 12px에서 10px로 변경
- `MultiSelectField.Input` 테두리 — `border`에서 박스 안쪽 `box-shadow`로 변경, 한 줄 높이 42px에서 36px로 감소, `border`로 테두리를 덮어쓰던 스타일은 확인 필요
- 태그 줄 사이 간격 — 8px에서 6px로 변경
- disabled, readonly에서 입력칸 — 선택값이 있으면 자리를 차지하지 않음
- 기본 커서 — 화살표에서 `pointer`로 변경, `searchable`일 때 입력 위치는 텍스트 커서 유지
- disabled 커서 — 화살표에서 `not-allowed`로 변경
- disabled 입력값 글자 색 — `object.assistive`에서 `object.subtle`로 변경
- readonly 포커스 시 테두리 색 — 바뀌지 않고 포커스 링만 표시
- readonly 배경 — 부모 배경색이 비치지 않도록 변경
- `suffix` 색 — `object.alternative`, disabled에서 `object.subtler`로 지정
- `MultiSelectField.Label`의 `suffix` — `span` 요소로 감싸서 렌더링, 색은 `object.alternative`, disabled에서 `object.subtle`로 지정
- disabled 필수 표시(`*`) — `feedback.notifying.alpha.inverse.assistive`에서 `feedback.notifying.static.inverse.bold`에 불투명도 44%로 변경
