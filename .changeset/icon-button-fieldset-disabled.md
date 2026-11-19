---
"@jects/jds": patch
---

**IconButton**

`<fieldset disabled>` 안에서 `disabled`를 지정하지 않아도 비활성 색과 `not-allowed` 커서가 적용됩니다. 이전에는 클릭과 포커스만 막히고 활성 상태의 스타일이 유지되었습니다. 호출부 수정은 필요하지 않습니다. Field 레이블의 도움말 버튼, Chip과 File의 삭제 버튼처럼 IconButton을 쓰는 다른 컴포넌트의 버튼도 같은 결과가 적용됩니다.
