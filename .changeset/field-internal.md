---
"@jects/jds": patch
---

**Field (internal)**

필드류 컴포넌트를 조립하기 위한 내부 컴포넌트 `Field`를 추가합니다. 레이블과 입력 영역, 헬퍼텍스트, 카운터를 하나의 필드 문맥으로 묶어 `status`, `disabled`, `readonly`, `required` 상태를 context로 내려주며, `Field.Label`과 `Field.Helper`, `Field.Counter`는 루트 context뿐 아니라 내부 컨트롤의 상태도 반영합니다. 헬퍼텍스트와 카운터를 한 줄에 놓는 `Field.Footer`도 함께 제공합니다.

필드 박스는 각 컨트롤이 `FieldContent`로 직접 렌더하며, 컨트롤은 `data-field-control` 마커로 자신을 표시합니다.

공개 API가 아니므로 소비처 영향은 없습니다. 이 위에 올라가는 `TextField`, `SelectField`, `MultiSelectField`의 변경점은 각 체인지셋에서 다룹니다.
