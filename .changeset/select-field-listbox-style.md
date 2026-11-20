---
"@jects/jds": patch
---

**SelectField**

옵션 목록의 여백, 테두리, 글자 색, 상호작용 오버레이를 변경했습니다. 목록 패널의 `border`를 덮어쓰던 스타일이 아니면 호출부 수정은 필요하지 않습니다.

**동작 변경 (코드 수정 불필요)**

- 목록 패널 여백 — 상하 10px, 좌우 4px에서 사방 10px로 변경
- 목록 패널 테두리 — `border`에서 박스 안쪽 `box-shadow`로 변경, `border`로 테두리를 덮어쓰던 스타일은 확인 필요
- 그룹 레이블과 옵션 좌우 여백 — 12px에서 10px로 변경, 글자 시작 위치가 패널 가장자리에서 20px
- 옵션 글자 색 — `object.bold`에서 `object.bolder`로 변경
- 옵션 캡션 — 색 `object.assistive`에서 `object.alternative`로, 레이블과의 간격 2px에서 4px로 변경, 캡션이 있는 옵션 높이 56px에서 58px
- 옵션 hover, pressed 오버레이 — 색 `fill.boldest`에서 `fill.bold`로, 불투명도 hover 8%에서 5%로, pressed 12%에서 8%로 변경
- 목록 패널 그림자 — `shadow.floated` 토큰 참조로 변경, 보이는 값은 같음
