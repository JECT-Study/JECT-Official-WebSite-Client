---
"@jects/jds": patch
---

**Field (internal)**: 다른 필드류 컴포넌트(Input, Select, Textarea 등)를 조립하기 위한 내부 인터널 컴포넌트를 추가했습니다.

라벨·입력 영역·헬퍼텍스트를 하나의 필드 문맥으로 묶어, `status`(default/success/error)·`fieldStyle`(outline/hollow)·`disabled`·`readonly`·`required` 상태를 context로 하위에 내려줍니다. `fieldId`는 `useFieldContext`로 어느 깊이에서든 꺼내 라벨과 실제 입력 요소를 연결할 수 있습니다.

**구성**

- `Field`: `useId`로 필드 문맥을 생성하고 상태를 context로 제공하는 루트 컨테이너 (native `div` 속성 및 `ref` 포워딩 지원)
- `Field.Label`: `htmlFor`를 필드 문맥의 id에 연결, `required`일 때 asterisk 표시. `leftSlot`/`rightSlot`으로 라벨 좌우(및 asterisk 오른쪽)에 도움말 아이콘 등 부가 요소 배치 가능
- `Field.Content`: 입력 영역 래퍼 — outline 스타일에서 테두리/배경/focus ring 담당(readonly 포함, Input 기본 스타일과 동일), 좌우 addon(아이콘·버튼) 배치 가능. hover/press overlay 레이어는 fieldStyle과 무관하게 `hasOverlay` prop으로 opt-in(기본 off)하며 Select/File처럼 필요한 필드에서만 켭니다.
- `Field.HelperText`: status/disabled에 따라 색상이 연동되는 보조 텍스트. 렌더될 때만 context에 mount를 알려 `helperTextId`를 노출하므로, Field를 확장하는 입력 요소가 HelperText가 존재할 때만 `aria-describedby`로 연결할 수 있습니다.
