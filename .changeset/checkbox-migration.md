---
"@jects/jds": minor
---

**Checkbox**

Checkbox를 vanilla-extract 기반의 Compound Component로 재작성합니다. `Checkbox.Basic`, `Checkbox.Content` 단일 컴포넌트 구조가 사라지고 일부 prop의 이름과 값, public 타입이 변경됩니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                                            | TO-BE                                                                                                       |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `Checkbox.Basic`, `Checkbox.Content`                             | `Checkbox.Root`, `Checkbox.Item`, `Checkbox.Basic`, `Checkbox.Label`, `Checkbox.Helper`                     |
| `Checkbox.Content`의 `label` / `subLabel` 프리셋                 | `Checkbox.Item` + `Basic` + `Label` + `Helper` 조합                                                         |
| `subLabel`                                                       | `Checkbox.Helper`                                                                                           |
| `variant = "empty" \| "outlined"`                                | `variant = "hollow" \| "outlined"`                                                                          |
| `align = "left" \| "right"`                                      | 제거 — 대체재 없음                                                                                          |
| `CheckboxBasicProps`, `CheckboxBoxProps`, `CheckboxContentProps` | `CheckboxRootProps`, `CheckboxItemProps`, `CheckboxBasicProps`, `CheckboxLabelProps`, `CheckboxHelperProps` |
| `CheckboxAlign`                                                  | 제거 — 대체재 없음                                                                                          |

그룹 안에서 쓰는 `Checkbox.Basic`에는 항목을 식별할 `value`가 필수이고, 누락하면 런타임 에러가 발생합니다. 단독으로 쓸 때는 `value` 없이 `checked` 또는 `defaultChecked`로 상태를 제어합니다. `indeterminate`는 제어 모드(`checked="indeterminate"`)에서만 지원하며, `defaultChecked`는 `boolean`만 받습니다.

```diff
- <Checkbox.Basic size='md' checked={checked} onCheckedChange={setChecked} />
- <Checkbox.Content
-   size='md'
-   variant='empty'
-   align='left'
-   label='레이블'
-   subLabel='헬퍼 텍스트'
-   checked={checked}
-   onCheckedChange={setChecked}
- />
+ <Checkbox.Item size='md' variant='hollow'>
+   <Checkbox.Basic checked={checked} onCheckedChange={setChecked} />
+   <Checkbox.Label>레이블</Checkbox.Label>
+   <Checkbox.Helper>헬퍼 텍스트</Checkbox.Helper>
+ </Checkbox.Item>
```

**추가**

- `Checkbox.Root` (`CheckboxRootProps`) — 여러 Checkbox를 그룹으로 묶는 컨테이너. 선택 항목을 `string[]`로 관리합니다
- `defaultChecked`를 통한 비제어 방식. 기존 제어 방식(`checked`)도 그대로 씁니다

```tsx
<Checkbox.Root value={selected} onChange={setSelected} variant='outlined'>
  <Checkbox.Item>
    <Checkbox.Basic value='1' />
    <Checkbox.Label>옵션 1</Checkbox.Label>
  </Checkbox.Item>
  <Checkbox.Item>
    <Checkbox.Basic value='2' />
    <Checkbox.Label>옵션 2</Checkbox.Label>
  </Checkbox.Item>
</Checkbox.Root>
```

**동작 변경 (코드 수정 불필요)**

- `invalid` 스타일이 unchecked 상태에서만 적용됩니다. checked, indeterminate 상태에서는 적용되지 않습니다.
