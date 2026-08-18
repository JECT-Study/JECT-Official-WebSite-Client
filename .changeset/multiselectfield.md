---
"@jects/jds": minor
---

**MultiSelectField**

제공된 옵션에서 여러 값을 선택하는 `MultiSelectField`를 추가합니다. 필드 공통 동작은 `Field` 항목에서 다룹니다.

`MultiSelectField.Label`, `MultiSelectField.Input`, `MultiSelectField.Footer`, `MultiSelectField.Helper`, `MultiSelectField.Counter`로 구성합니다. 선택지는 `SelectOption[]`으로 전달하며 값과 표시명, 캡션, 부가 요소, 비활성 여부를 지정할 수 있습니다. 선택한 값은 표시명이 붙은 태그로 표시됩니다.

`variant`로 선택 표시 방식을, `suffix`로 입력 오른쪽에 놓을 읽기 전용 요소를 지정할 수 있습니다. `maxValues`로 선택 개수를 제한할 수 있고, `MultiSelectField.Counter`를 `MultiSelectField.Footer` 안에 두면 현재 개수와 최대 개수를 표시합니다. `name`을 지정하면 선택값마다 hidden input이 렌더되므로 `FormData.getAll(name)`으로 받습니다.

`searchable`의 기본값은 `false`입니다. `true`이면 검색어로 항목을 필터링할 수 있으며, 한글은 조합 중에도 결과가 유지됩니다.

값을 옵션으로 제한하지 않아야 하는 경우 `SuggestionField`를 사용합니다.

타입 `MultiSelectFieldProps`, `MultiSelectFieldInputProps`, `MultiSelectFieldFooterProps`, `MultiSelectFieldLabelProps`, `MultiSelectFieldHelperProps`를 함께 내보냅니다.

```tsx
<MultiSelectField>
  <MultiSelectField.Label>관심 기술 스택</MultiSelectField.Label>
  <MultiSelectField.Input
    options={[
      { value: "react", label: "React" },
      { value: "typescript", label: "TypeScript" },
    ]}
    defaultValue={["react"]}
    maxValues={5}
    name='stacks'
    placeholder='기술 스택을 선택하세요'
  />
  <MultiSelectField.Footer>
    <MultiSelectField.Helper>최대 5개까지 고를 수 있어요</MultiSelectField.Helper>
    <MultiSelectField.Counter />
  </MultiSelectField.Footer>
</MultiSelectField>
```
