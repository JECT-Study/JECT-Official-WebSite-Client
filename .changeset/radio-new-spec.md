---
"@jects/jds": minor
---

**Radio**

신규 디자인 스펙을 반영하면서 `Radio` 컴포넌트의 prop 이름·값과 서브 컴포넌트가 변경되고, `radioAlign` prop은 제거되었습니다.

| AS-IS                                                | TO-BE                              |
| ---------------------------------------------------- | ---------------------------------- |
| `radioSize` / `radioStyle`                           | `size` / `variant`                 |
| `variant` (구 `radioStyle`) = `"empty" \| "outline"` | `variant = "hollow" \| "outlined"` |
| `radioAlign`                                         | 제거                               |
| `Radio.SubLabel`                                     | `Radio.Helper`                     |

`Radio.Item`은 `<label>` 요소로 렌더되도록 변경되었습니다. 이에 따라 인디케이터뿐 아니라 라벨 및 헬퍼 텍스트를 클릭해도 해당 라디오를 선택할 수 있습니다.

아울러 disabled 상태의 색상, 커서 등 시각적 표현이 신규 디자인 스펙에 맞게 업데이트되었습니다.

**AS-IS**

```tsx
import { Radio } from "@jects/jds";

<Radio.Root
  radioSize='md'
  radioStyle='empty'
  radioAlign='left'
  value={selected}
  onChange={setSelected}
  name='group'
>
  <Radio.Item>
    <Radio.Basic value='1' />
    <Radio.Label>옵션 1</Radio.Label>
    <Radio.SubLabel>헬퍼 텍스트</Radio.SubLabel>
  </Radio.Item>
</Radio.Root>;
```

**TO-BE**

```tsx
import { Radio } from "@jects/jds";

<Radio.Root size='md' variant='hollow' value={selected} onChange={setSelected} name='group'>
  <Radio.Item>
    <Radio.Basic value='1' />
    <Radio.Label>옵션 1</Radio.Label>
    <Radio.Helper>헬퍼 텍스트</Radio.Helper>
  </Radio.Item>
</Radio.Root>;
```
