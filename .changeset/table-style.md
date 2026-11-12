---
"@jects/jds": patch
---

**Table**

`Table.RowItem`의 배지와 앞쪽 아이콘 색을 변경했습니다. 호출부 수정은 필요하지 않으며, 렌더 결과만 달라집니다.

**동작 변경 (코드 수정 불필요)**

- `variant='badge'` 배지 — `hierarchy='primary'`에서 `hierarchy='secondary'`로 변경, 배경 `fill.subtle`에서 `fill.subtler`로, 글자 `object.bold`에서 `object.neutral`로 변경
- `variant='label'`의 `prefixIcon` 색 — 상위 요소의 글자 색을 물려받던 것에서 `object.boldest`로 고정
