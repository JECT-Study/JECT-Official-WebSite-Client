---
"@jects/jds": patch
---

**Field (internal)**

`Field.Content`, `Field.Label`, `Field.HelperText`가 루트 context뿐 아니라 내부 입력 요소의 상태도 반영합니다. 입력 요소에서만 `disabled`, `readonly`를 지정한 경우에도 컨테이너와 레이블, 헬퍼텍스트의 스타일이 함께 바뀝니다.

`Field`를 확장하는 입력 요소는 최종 readonly 상태를 `data-readonly` 속성으로 전달합니다.

**동작 변경 (코드 수정 불필요)**

- `Field.Content`가 `:has(input:disabled)`로 disabled 상태를, `:has(input[data-readonly])`로 readonly 상태를 감지해 테두리 색상, 배경 색상, `pointer-events`를 적용합니다.
- 루트 컨테이너가 `:has(input:disabled)`를 기준으로 레이블, `required` 별표, 헬퍼텍스트에 disabled 색상을 적용합니다. 헬퍼텍스트는 `status`별 색상에 각각 대응하며 `readonly`는 색상 변경 대상이 아닙니다.
- 루트 context 기반 스타일은 그대로이므로 `Field`에서 상태를 지정하던 경우의 동작은 바뀌지 않습니다.
