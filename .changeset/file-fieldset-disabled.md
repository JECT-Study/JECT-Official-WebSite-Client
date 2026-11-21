---
"@jects/jds": patch
---

**File**

`<fieldset disabled>` 안에서 `disabled`를 지정하지 않아도 비활성 색과 `not-allowed` 커서가 적용되고, hover 오버레이와 파일명 밑줄이 나타나지 않습니다. 이전에는 클릭과 포커스만 막히고 활성 상태의 스타일이 유지되었습니다. fieldset 안에서는 `readonly`여도 비활성 스타일이 적용됩니다. 호출부 수정은 필요하지 않습니다.
