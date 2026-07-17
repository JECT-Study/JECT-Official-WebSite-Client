---
"@jects/jds": minor
---

**Select**

Select가 W3C Listbox 패턴 기반으로 재작성되었습니다. 기존에는 컨테이너의 variant로 항목 종류를 결정했지만, 이제는 선택 개수에 따라 Select와 MultiSelect로 분리됩니다.
이에 따라 배치가 고정되어 더 이상 Select.List / Select.Radio / Select.Checkbox 컴파운드를 공개하지 않으며, 선택지를 `options` prop으로 전달합니다.

| AS-IS                                             | TO-BE                                        |
| ------------------------------------------------- | -------------------------------------------- |
| `<Select variant="list">` + `Select.List`         | `<Select variant="label" options={...} />`   |
| `<Select variant="radio">` + `Select.Radio`       | `<Select variant="control" options={...} />` |
| `<Select variant="checkbox">` + `Select.Checkbox` | `<MultiSelect options={...} />`              |

- 항목의 역할이 `role="listbox"` 내부의 `role="checkbox"` / `role="radio"`에서 `role="option"`으로 변경되었습니다. 체크박스와 라디오는 선택 상태를 나타내는 시각적 요소로만 동작합니다.
- 값 타입이 컴포넌트별로 고정되었습니다. `Select`는 `string`, `MultiSelect`는 `string[]`를 사용합니다.

**AS-IS**

```tsx
// 단일 선택
<Select variant='radio' value={value} onChange={setValue}>
  <Select.Radio value='seoul'>서울특별시</Select.Radio>
  <Select.Radio value='busan'>부산광역시</Select.Radio>
</Select>

// 다중 선택
<Select variant='checkbox' value={values} onChange={setValues}>
  <Select.Checkbox value='seoul'>서울특별시</Select.Checkbox>
  <Select.Checkbox value='busan'>부산광역시</Select.Checkbox>
</Select>
```

**TO-BE**

```tsx
// 단일 선택
<Select
  variant='control'
  value={value}
  onChange={setValue}
  options={[
    { value: "seoul", label: "서울특별시" },
    { value: "busan", label: "부산광역시" },
  ]}
/>

// 다중 선택
<MultiSelect
  value={values}
  onChange={setValues}
  options={[
    { value: "seoul", label: "서울특별시" },
    { value: "busan", label: "부산광역시" },
  ]}
/>
```
