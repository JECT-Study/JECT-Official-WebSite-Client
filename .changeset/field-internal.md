---
"@jects/jds": patch
---

**Field (internal)**

필드류 컴포넌트를 조립하기 위한 내부 컴포넌트 `Field`를 추가합니다. 레이블, 입력 영역, 헬퍼텍스트를 하나의 필드 문맥으로 묶어 `status`, `fieldStyle`, `disabled`, `readonly`, `required` 상태를 context로 내려주며, `Field.Content`와 `Field.Label`, `Field.HelperText`는 루트 context뿐 아니라 내부 입력 요소의 상태도 반영합니다.

공개 API가 아니므로 소비처 영향은 없습니다. 이 위에 올라가는 `TextField`, `SelectField`, `MultiSelectField`의 변경점은 각 체인지셋에서 다룹니다.
