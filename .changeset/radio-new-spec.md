---
"@jects/jds": minor
---

**Radio**

신규 디자인 스펙에 맞춰 `Radio`의 prop 이름과 값, 서브 컴포넌트를 변경하고 `radioAlign`을 제거합니다. 아래 API를 쓰던 코드는 수정이 필요합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                               | TO-BE                              |
| ----------------------------------- | ---------------------------------- |
| `radioSize` / `radioStyle`          | `size` / `variant`                 |
| `radioStyle = "empty" \| "outline"` | `variant = "hollow" \| "outlined"` |
| `radioAlign`                        | 제거 — 대체재 없음                 |
| `Radio.SubLabel`                    | `Radio.Helper`                     |

```diff
- <Radio.Root
-   radioSize='md'
-   radioStyle='empty'
-   radioAlign='left'
-   value={selected}
-   onChange={setSelected}
-   name='group'
- >
-   <Radio.Item>
-     <Radio.Basic value='1' />
-     <Radio.Label>옵션 1</Radio.Label>
-     <Radio.SubLabel>헬퍼 텍스트</Radio.SubLabel>
-   </Radio.Item>
- </Radio.Root>
+ <Radio.Root size='md' variant='hollow' value={selected} onChange={setSelected} name='group'>
+   <Radio.Item>
+     <Radio.Basic value='1' />
+     <Radio.Label>옵션 1</Radio.Label>
+     <Radio.Helper>헬퍼 텍스트</Radio.Helper>
+   </Radio.Item>
+ </Radio.Root>
```

**동작 변경 (코드 수정 불필요)**

- `Radio.Item`이 `<label>` 요소로 렌더되어 인디케이터뿐 아니라 라벨과 헬퍼 텍스트를 클릭해도 해당 라디오가 선택됩니다.
- disabled 상태의 색상과 커서 등 시각적 표현이 신규 디자인 스펙에 맞게 변경됩니다.
