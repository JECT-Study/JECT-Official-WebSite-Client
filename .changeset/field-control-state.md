---
"@jects/jds": patch
---

**Field (internal)**: `Field.Content`, `Field.Label`, `Field.HelperText`가 내부 입력 요소의 상태를 함께 반영합니다.

기존에는 하위 컴포넌트가 `Field` 루트 context의 `disabled`·`readonly` 값만 기준으로 스타일을 적용했습니다. 따라서 `<Field><Field.Content><input disabled /></Field.Content></Field>`처럼 입력 요소에서만 상태를 지정하는 경우, 입력은 비활성화되지만 컨테이너와 레이블, 헬퍼텍스트는 기존 상태를 유지하는 문제가 있었습니다.

이제 `Field.Content`는 입력 요소의 상태를 함께 감지합니다. `:has(input:disabled)`로 네이티브 `disabled` 상태를, `:has(input[data-readonly])`로 입력 요소에서 전달한 `readonly` 상태를 확인해 테두리 색상·배경 색상·`pointer-events`를 동일하게 적용합니다.

레이블과 `required` 별표, 헬퍼텍스트는 입력 요소와 직접적인 형제 관계가 아니므로 `Field.Content`의 셀렉터만으로 상태를 반영할 수 없습니다. 대신 루트 컨테이너에서 `:has(input:disabled)`를 기준으로 disabled 상태를 적용합니다. 헬퍼텍스트는 `status`에 따라 disabled 색상이 달라 각 상태별로 대응하며, `readonly`는 색상 변경 대상이 아니므로 제외합니다.

루트 context 기반 스타일은 그대로 유지되므로 기존처럼 `Field`에서 상태를 지정하는 경우의 동작은 변경되지 않습니다.

`readonly` 감지에 네이티브 `:read-only` 대신 `data-readonly`를 사용하는 이유는, `:read-only`가 readonly 속성을 지원하지 않는 input type(`checkbox`, `radio`, `range`, `color`, `file` 등)에서도 매칭되기 때문입니다. `Field`를 확장하는 입력 요소는 최종 readonly 상태를 `data-readonly`로 전달합니다.
