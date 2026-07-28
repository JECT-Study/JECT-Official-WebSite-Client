---
"@jects/jds": patch
---

**Field (internal)**: `Field.Content`가 안쪽 입력 요소의 상태를 함께 반영합니다.

`disabled`·`readonly`는 `Field` 루트의 context뿐 아니라 안쪽 input에서도 덮어쓸 수 있는데, 지금까지 `Field.Content`는 context만 보고 있었습니다. 그래서 `<Field><Field.Content><input disabled /></Field.Content></Field>`처럼 입력 요소 쪽에서만 상태를 지정하면 입력은 비활성인데 컨테이너는 테두리·hover overlay·focus ring이 살아 있는, 상태가 어긋난 필드가 됐습니다.

이제 `Field.Content`가 `:has(input:disabled)`로 네이티브 disabled 상태를, `:has(input[data-readonly])`로 입력 요소가 내려준 readonly 상태를 함께 읽어 테두리색·배경색·`pointer-events`를 맞춥니다. context 기반 스타일은 그대로 유지되므로 루트에서 상태를 주는 경우의 동작은 달라지지 않습니다.

readonly에 네이티브 `:read-only` 대신 `data-readonly`를 쓰는 이유는, `:read-only`가 readonly 속성이 적용되지 않는 input type(`checkbox`·`radio`·`range`·`color`·`file` 등)에서도 항상 매칭되기 때문입니다. `Field`를 확장하는 입력 요소는 해석된 readonly 상태를 `data-readonly`로 내려주면 됩니다.
