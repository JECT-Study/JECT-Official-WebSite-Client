---
"@jects/jds": patch
---

**Card**

한 줄을 넘는 제목과 메타 항목이 말줄임(...)으로 끊깁니다. 두 요소가 `display: flex`여서 `text-overflow`가 무시되고 글자 중간에서 잘리던 것을 `display: block`으로 바꿨습니다. 카드의 테두리, 여백, 간격도 디자인 값에 맞췄습니다. 소비처가 고칠 것은 없습니다.

**동작 변경 (코드 수정 불필요)**

- `Card.Title`, `Card.MetaItem`의 넘치는 텍스트 — 글자 중간에서 잘림에서 말줄임(...)으로 변경
- `variant='plate'` 카드의 테두리 — `border`에서 `outline`으로 변경, 안쪽 높이를 차지하지 않음
- `variant='plate'` 카드의 구분선 — `border`에서 `inset box-shadow`로 변경, 안쪽 높이를 차지하지 않음
- `variant='plate'`, `layout='vertical'` 카드의 전체 높이 — 테두리와 구분선이 차지하던 3px만큼 낮아짐
- `variant='plate'`, `layout='horizontal'` 카드의 캡션 — 아래 2px이 잘리던 것이 온전히 표시
- `variant='plate'`, `layout='horizontal'` 카드에서 `Card.ContentGroup` 없이 제목과 요약을 `Card.Content`에 직접 넣은 경우의 제목 — 위아래로 나뉘어 잘리던 것이 아래쪽으로 잘림, `Card.ContentGroup`으로 감싸면 잘리지 않음
- `variant='plate'` 카드의 안쪽 여백 — 항상 20px에서 `margin.sm`으로 변경, 데스크톱 20px, 태블릿 16px, 모바일 12px
- `Card.ContentGroup`의 `variant='post'` 간격 — 8px에서 10px로 변경
- `Card.Meta`의 항목 간격 — 8px에서 12px로 변경
