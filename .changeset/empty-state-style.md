---
"@jects/jds": patch
---

**EmptyState**

버튼, 제목 색, 가로 배치 간격, `variant='dashed'` 테두리를 변경했습니다. `variant='dashed'`의 `border`를 덮어쓰던 스타일이 아니면 호출부 수정은 필요하지 않습니다.

**동작 변경 (코드 수정 불필요)**

- 버튼 크기 — `size='sm'`(30px)에서 `size='md'`(36px)로 변경
- `secondaryAction` 버튼 — `variant='outlined'`에서 `variant='solid'`로 변경
- 제목 색 — `object.neutral`에서 `object.normal`로 변경
- `layout='horizontal'`의 내용과 버튼 사이 간격 — 24px에서 28px로 변경, `layout='vertical'`은 24px 유지
- `variant='dashed'` 테두리 — CSS `dashed` 기본 점선에서 선 6px, 간격 4px 점선으로 변경, 박스 안쪽에 그려 크기가 2px 줄어 다른 `variant`와 같아짐, `border`로 테두리를 덮어쓰던 스타일은 확인 필요
