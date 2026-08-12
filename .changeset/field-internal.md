---
"@jects/jds": patch
---

**Field (internal)**

다른 필드류 컴포넌트(Input, Select, Textarea 등)를 조립하기 위한 내부 컴포넌트를 추가합니다. 라벨, 입력 영역, 헬퍼텍스트를 하나의 필드 문맥으로 묶어 `status`(default/success/error), `fieldStyle`(outline/hollow), `disabled`, `readonly`, `required` 상태를 context로 내려줍니다. `fieldId`와 상태는 `useFieldContext`로 어느 깊이에서든 꺼내 라벨과 입력 요소를 연결하거나 네이티브 컨트롤 속성에 전달할 수 있습니다.

**추가**

- `Field` — `useId`로 필드 문맥을 만들고 상태를 context로 제공하는 루트 컨테이너, native `div` 속성과 `ref` 포워딩 지원
- `Field.Label` — `htmlFor`를 필드 문맥의 id에 연결, `required`일 때 asterisk 표시, `prefixSlot`과 `suffixSlot`으로 라벨 앞뒤와 asterisk 오른쪽에 부가 요소 배치
- `Field.Content` — 입력 영역 래퍼, outline에서는 테두리와 배경에 hover, press overlay와 `:focus-within` 기반 focus ring 표시, hollow에서는 인터랙션 레이어 없이 입력만 노출, 좌우 addon 배치 가능
- `Field.Content`의 인터랙션 레이어는 readonly에서 그대로 동작 — readonly 입력은 포커스를 유지하므로 focus ring이 뜨고, disabled는 `pointer-events: none`이라 hover와 press가 발생하지 않음
- `Field.HelperText` — `status`와 `disabled`에 따라 색상이 연동되는 보조 텍스트, 렌더될 때만 context에 mount를 알려 `helperTextId`를 노출하므로 확장 컴포넌트가 HelperText가 있을 때만 `aria-describedby`로 연결 가능
