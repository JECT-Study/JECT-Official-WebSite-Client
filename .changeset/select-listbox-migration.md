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

컨테이너 역할을 `role="listbox"`로 통일했습니다. 이에 따라 항목 역할도 `role="checkbox"` / `role="radio"`에서 `role="option"`으로 변경되었으며, 체크박스와 라디오는 선택 상태를 나타내는 시각적 요소로만 동작합니다.

값 타입이 컴포넌트별로 고정되었습니다. `Select`는 `string`, `MultiSelect`는 `string[]`를 사용합니다.

**제거된 API**

| 제거                              | 대체                    |
| --------------------------------- | ----------------------- |
| 컨테이너 `size` (`md` / `sm`)     | 없음 (`md` 고정)        |
| 항목 `badge` (`Select.List` 전용) | `SelectOption.suffix`   |
| 항목 `isDisabled`                 | `SelectOption.disabled` |

기존 `size`는 항목 레이블 및 캡션과 체크박스/라디오의 크기를 결정했습니다. 이제 `md`로 고정되며, 컨테이너 크기는 `width` / `height`로 조절합니다.

`badge`는 전달한 내용을 컴포넌트가 `ContentBadge`로 감쌌지만 `suffix`는 전달받은 노드를 그대로 배치합니다.

`ref`가 가리키는 요소가 `role`을 가진 항목 래퍼에서 최상위 컨테이너로 변경되었습니다. 항목은 컴포넌트가 아닌 데이터 객체가 되어 개별 `ref`를 받지 않습니다.

타입 export가 함께 정리되었습니다. `SelectVariant` / `SelectSize` / `SelectValue` / `SelectContextType` / `SelectListProps` / `SelectRadioProps` / `SelectCheckboxProps`가 제거되고, `MultiSelectProps` / `SelectOption` / `OptionVariant` / `SelectDimension`이 추가되었습니다.

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
