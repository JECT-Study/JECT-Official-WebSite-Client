---
"@jects/jds": patch
---

**Field (internal)**: 다른 필드류 컴포넌트(Input, Select, Textarea 등)를 조립하기 위한 내부 인터널 컴포넌트를 추가했습니다.

라벨·입력 영역·헬퍼텍스트를 하나의 필드 문맥으로 묶어, `status`(default/success/error)·`fieldStyle`(outline/hollow)·`disabled`·`readonly`·`required` 상태를 context로 하위에 내려줍니다. `fieldId`와 상태는 `useFieldContext`로 어느 깊이에서든 꺼내 라벨과 실제 입력 요소를 연결하고, `required` 등 네이티브 컨트롤 속성에 전달할 수 있습니다.

**구성**

- `Field`: `useId`로 필드 문맥을 생성하고 상태를 context로 제공하는 루트 컨테이너 (native `div` 속성 및 `ref` 포워딩 지원)
- `Field.Label`: `htmlFor`를 필드 문맥의 id에 연결, `required`일 때 asterisk 표시. `prefixSlot`/`suffixSlot`으로 라벨 앞뒤(및 asterisk 오른쪽)에 도움말 아이콘 등 부가 요소 배치 가능
- `Field.Content`: 입력 영역 래퍼. outline에서는 테두리/배경과 함께 hover/press overlay·focus ring을 표시하고(readonly 포함), hollow에서는 인터랙션 레이어 없이 입력만 노출합니다. 좌우 addon(아이콘·버튼) 배치 가능.
- `Field.HelperText`: status/disabled에 따라 색상이 연동되는 보조 텍스트. 렌더될 때만 context에 mount를 알려 `helperTextId`를 노출하므로, Field를 확장하는 입력 요소가 HelperText가 존재할 때만 `aria-describedby`로 연결할 수 있습니다.
