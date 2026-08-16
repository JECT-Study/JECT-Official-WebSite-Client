---
"@jects/jds": minor
---

**MultiSelectField**

제공된 옵션에서 여러 값을 선택할 수 있는 `MultiSelectField`를 추가합니다. `MultiSelectField.Label`, `MultiSelectField.Input`, `MultiSelectField.Footer`, `MultiSelectField.Helper`, `MultiSelectField.Counter`를 조합해 구성합니다.

루트 prop

| prop       | 기본값      | 설명                                                        |
| ---------- | ----------- | ----------------------------------------------------------- |
| `status`   | `'default'` | `'default'`, `'success'`, `'error'`                         |
| `disabled` | `false`     | 비활성 상태                                                 |
| `readonly` | `false`     | 읽기 전용 상태                                              |
| `required` | `false`     | 필수 입력 여부, 레이블 옆 `*` 표시와 `aria-required`로 노출 |

`MultiSelectField.Input` prop

| prop           | 기본값      | 설명                                                |
| -------------- | ----------- | --------------------------------------------------- |
| `value`        | -           | controlled 선택값, `string[]`                       |
| `onChange`     | -           | 선택값 변경 핸들러, `value`와 함께 사용             |
| `defaultValue` | `[]`        | uncontrolled 초기 선택값, `value`와 함께 사용 불가  |
| `options`      | -           | 선택지, `SelectOption[]`                            |
| `maxValues`    | -           | 선택할 수 있는 최대 개수                            |
| `name`         | -           | 폼 제출에 사용할 이름                               |
| `placeholder`  | -           | 선택값이 없을 때 표시할 문구                        |
| `searchable`   | `false`     | 항목 검색 가능 여부                                 |
| `variant`      | `'control'` | 선택 마크 표시 여부, `'control'`, `'label'`         |
| `suffix`       | -           | 입력 오른쪽에 배치할 읽기 전용 요소                 |
| `readOnly`     | -           | 읽기 전용 상태, 지정하면 루트의 `readonly`를 덮어씀 |
| `required`     | -           | 필수 입력 여부, 지정하면 루트의 `required`를 덮어씀 |

선택지는 `Select`, `SelectField`와 같은 `SelectOption` 형식이므로 값과 표시명을 따로 지정하고 캡션, 부가 요소, 옵션별 비활성도 함께 지정할 수 있습니다. 태그에는 선택한 값의 표시명이 나타납니다. 값을 옵션으로 제한하지 않아야 한다면 `SuggestionField`를 사용합니다.

값과 선택지, 폼 관련 prop은 `MultiSelectField.Input`이 받습니다. `maxValues`를 지정하면 최대 개수만큼 고른 뒤 나머지 항목을 고를 수 없고, `MultiSelectField.Counter`를 `MultiSelectField.Footer` 안에 두면 현재 개수와 최대 개수를 함께 표시합니다. `name`을 지정하면 선택값이 폼 제출에 포함되며, 값이 여러 개이므로 `FormData.getAll(name)`으로 받습니다.

선택 목록은 Radix Popover로 표시하며 열림 상태와 위치 계산, 바깥 클릭과 Escape 처리를 컴포넌트가 담당합니다. `searchable`을 끄면 검색어를 입력할 수 없습니다. 이때 입력 요소에는 native `readOnly`만 적용되고 필드는 읽기 전용이 아닙니다. 검색 결과가 없으면 목록이 열리지 않고, 한글은 조합 중에도 검색 결과가 유지됩니다. 방향키로 항목을 이동하고 Enter로 선택하며, 검색어가 비어 있을 때 Backspace는 마지막 태그를 제거합니다. `disabled`와 `readonly`에서는 목록을 열 수 없고 태그도 제거할 수 없습니다.

접근 이름은 `MultiSelectField.Label`이 렌더되면 그 id를 참조하고, 레이블 없이 쓰면 입력 요소에 전달한 `aria-labelledby`나 `aria-label`을 사용합니다. 목록은 Portal로 분리되므로 입력 요소와 같은 이름을 함께 연결합니다.

입력 요소는 `role="combobox"`로 native 시맨틱을 덮어쓰므로 읽기 전용과 필수 상태를 `aria-readonly`, `aria-required`로 함께 노출합니다. `required`는 native `required`를 붙이지 않아 브라우저 기본 검증은 동작하지 않습니다.

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
