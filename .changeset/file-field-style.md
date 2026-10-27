---
"@jects/jds": patch
---

**FileField**

입력 박스의 크기, 테두리, 상태별 색을 변경했습니다. disabled, readonly에서 삭제 버튼을 렌더링하지 않으므로, 이 버튼을 찾던 테스트나 스타일은 확인이 필요합니다.

**동작 변경 (코드 수정 불필요)**

- `FileField.Input` hover 시 테두리 색 — 상태별 강조 색으로 바뀌지 않도록 변경
- `FileField.Input` 안쪽 여백 — 상하 8px에서 6px로, 좌우 12px에서 10px로 변경
- `FileField.Input` 테두리 — `border`에서 박스 안쪽 `box-shadow`로 변경, 높이 42px에서 36px로 감소, `border`로 테두리를 덮어쓰던 스타일은 확인 필요
- `FileField.Input` 왼쪽 영역(파일명, 아이콘 위치)의 기본 커서 — 화살표로 표시되던 것을 `pointer`로 수정
- disabled 커서 — 화살표에서 `not-allowed`로 변경
- disabled 파일명 글자 색 — `object.assistive`에서 `object.subtle`로 변경
- disabled, readonly에서 삭제 버튼 — 비활성 버튼으로 표시하던 것을 렌더링하지 않음
- readonly 포커스 시 테두리 색 — 바뀌지 않고 포커스 링만 표시
- readonly 배경 — 부모 배경색이 비치지 않도록 변경
- `FileField.Size` 글자 굵기 — `label.sm.normal`(480)에서 `label.sm.subtle`(440)로 변경
- `suffix` 색 — `object.alternative`, disabled에서 `object.subtler`로 지정
- `FileField.Label`의 `suffix` — `span` 요소로 감싸서 렌더링, 색은 `object.alternative`, disabled에서 `object.subtle`로 지정
- disabled 필수 표시(`*`) — `feedback.notifying.alpha.inverse.assistive`에서 `feedback.notifying.static.inverse.bold`에 불투명도 44%로 변경
