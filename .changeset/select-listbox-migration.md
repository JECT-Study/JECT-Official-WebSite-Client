---
"@jects/jds": minor
---

**Select**

Select를 W3C Listbox 패턴 기반으로 재작성하고, 컨테이너의 variant로 항목 종류를 결정하던 구조를 선택 개수에 따른 `Select`와 `MultiSelect`로 분리합니다. 배치가 고정되어 `Select.List`, `Select.Radio`, `Select.Checkbox` 컴파운드를 더 이상 공개하지 않고 선택지를 `options`로 전달합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                                                                                                                 | TO-BE                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `<Select variant="list">` + `Select.List`                                                                                             | `<Select variant="label" options={...} />`                                            |
| `<Select variant="radio">` + `Select.Radio`                                                                                           | `<Select variant="control" options={...} />`                                          |
| `<Select variant="checkbox">` + `Select.Checkbox`                                                                                     | `<MultiSelect options={...} />`                                                       |
| 컨테이너 `size` (`md` / `sm`)                                                                                                         | 제거 — `md` 고정, 크기는 `width` / `height`로 조절                                    |
| 항목 `badge` (`Select.List` 전용)                                                                                                     | `SelectOption.suffix`                                                                 |
| 항목 `isDisabled`                                                                                                                     | `SelectOption.disabled`                                                               |
| `SelectVariant` / `SelectSize` / `SelectValue` / `SelectContextType` / `SelectListProps` / `SelectRadioProps` / `SelectCheckboxProps` | 제거 — `MultiSelectProps` / `SelectOption` / `OptionVariant` / `SelectDimension` 추가 |

값 타입이 컴포넌트별로 고정됩니다. `Select`는 `string`, `MultiSelect`는 `string[]`를 씁니다. `badge`는 전달한 내용을 컴포넌트가 `ContentBadge`로 감쌌지만 `suffix`는 전달받은 노드를 그대로 배치합니다.

```diff
- <Select variant='radio' value={value} onChange={setValue}>
-   <Select.Radio value='seoul'>서울특별시</Select.Radio>
-   <Select.Radio value='busan'>부산광역시</Select.Radio>
- </Select>
+ <Select
+   variant='control'
+   value={value}
+   onChange={setValue}
+   options={[
+     { value: "seoul", label: "서울특별시" },
+     { value: "busan", label: "부산광역시" },
+   ]}
+ />
```

```diff
- <Select variant='checkbox' value={values} onChange={setValues}>
-   <Select.Checkbox value='seoul'>서울특별시</Select.Checkbox>
-   <Select.Checkbox value='busan'>부산광역시</Select.Checkbox>
- </Select>
+ <MultiSelect
+   value={values}
+   onChange={setValues}
+   options={[
+     { value: "seoul", label: "서울특별시" },
+     { value: "busan", label: "부산광역시" },
+   ]}
+ />
```

**동작 변경 (코드 수정 불필요)**

- 컨테이너 역할이 `role="listbox"`로 통일, 항목 역할이 `role="checkbox"`, `role="radio"`에서 `role="option"`으로 변경 — 체크박스와 라디오는 선택 상태를 나타내는 시각적 요소로만 동작
- `ref`가 가리키는 요소가 `role`을 가진 항목 래퍼에서 최상위 컨테이너로 변경 — 항목은 데이터 객체가 되어 개별 `ref`를 받지 않음
