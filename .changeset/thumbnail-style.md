---
"@jects/jds": patch
---

**Thumbnail**

`appearance='outlined'` 테두리를 이미지 위에 그리도록 변경했습니다. `border`나 `outline`으로 테두리를 덮어쓰던 스타일이 아니면 호출부 수정은 필요하지 않습니다.

- `appearance='outlined'` 테두리 — `border`에서 안쪽으로 당긴 `outline`으로 변경, 상자 크기는 그대로, 테두리 안쪽으로 1px씩 줄어들던 이미지가 상자 전체를 채우고 테두리가 이미지 위에 그려짐, `border`나 `outline`을 덮어쓰던 스타일은 확인 필요
- 기본값이 `appearance='outlined'`라 `Card`의 `variant='post'` 썸네일과 `Menu`, `DropdownMenu`의 썸네일 항목에도 같은 결과 적용
