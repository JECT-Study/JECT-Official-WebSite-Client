---
"@jects/jds": patch
---

**Field (internal)**

`Field.Content`, `Field.Label`, `Field.HelperText`가 루트 context뿐 아니라 내부 입력 요소의 상태도 반영합니다. 입력 요소에서만 `disabled`를 지정해도 컨테이너와 레이블, 헬퍼텍스트가 함께 바뀌고, `readonly`는 컨테이너의 배경 색상만 바뀝니다.

readonly에 대한 Field 수준 스타일은 `data-readonly` 속성으로만 걸립니다.

- `Field`를 확장하는 입력 요소가 context 값과 자신의 prop을 합친 최종 readonly 상태를 이 속성으로 전달
- `TextField.Input`에 직접 `readOnly`를 준 경우도 이 속성으로 내려가므로 컨테이너 스타일이 함께 변경
- `data-readonly` 없이 네이티브 `readOnly`만 붙인 요소에는 Field 스타일 미반응

**동작 변경 (코드 수정 불필요)**

- `Field.Content`가 `:has(:is(input, [data-interaction-target]):disabled)`로 컨트롤의 disabled를 감지해 `pointer-events: none` 적용
- outline에서 `:has(:is(input, [data-interaction-target])[data-readonly])`로 컨트롤의 readonly를 감지해 배경 색상만 변경 — `pointer-events`는 그대로라 포커스와 텍스트 선택 가능
- 루트 컨테이너가 `:has(:is(input, [data-interaction-target]):disabled)`를 기준으로 레이블, `required` 별표, 헬퍼텍스트에 disabled 색상 적용 — 헬퍼텍스트는 `status`별 색상에 각각 대응, `readonly`는 색상 변경 대상 아님
- 루트 context 기반 스타일은 그대로이므로 `Field`에서 상태를 지정하던 경우의 동작은 변화 없음
