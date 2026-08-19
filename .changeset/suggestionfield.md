---
"@jects/jds": minor
---

**SuggestionField**

사용자가 입력한 문자열을 값으로 받는 `SuggestionField`를 추가합니다. `SuggestionField.Label`, `SuggestionField.Input`, `SuggestionField.Footer`, `SuggestionField.Helper`, `SuggestionField.Counter`를 조합해 구성하며 루트에서 `status`(`default`/`success`/`error`), `disabled`, `readonly`, `required` 상태를 관리합니다.

`suggestions`는 입력을 보조하는 제안 목록이며 값의 범위를 제한하지 않습니다. 목록에서 선택된 항목은 입력한 값과 동일하게 처리되어 목록에서 제외되고, 목록에 없는 값도 입력할 수 있습니다. 값을 옵션으로 제한해야 한다면 `MultiSelectField`를 사용합니다.

`SuggestionField.Input` prop

| prop                | 기본값 | 설명                                                |
| ------------------- | ------ | --------------------------------------------------- |
| `value`             | -      | controlled 값, `string[]`                           |
| `onChange`          | -      | 값 변경 핸들러, `value`와 함께 사용                 |
| `defaultValue`      | `[]`   | uncontrolled 초기 값, `value`와 함께 사용 불가      |
| `suggestions`       | `[]`   | 입력을 보조하는 목록, `string[]`                    |
| `maxValues`         | -      | 추가할 수 있는 최대 개수                            |
| `name`              | -      | 폼 제출에 사용할 이름                               |
| `acceptValueOnBlur` | `true` | 포커스가 해제될 때 입력 중인 값을 선택값으로 확정   |
| `placeholder`       | -      | 값이 없을 때 표시할 문구                            |
| `suffix`            | -      | 입력 오른쪽에 배치할 읽기 전용 요소                 |
| `readOnly`          | -      | 읽기 전용 상태, 지정하면 루트의 `readonly`를 덮어씀 |
| `required`          | -      | 필수 입력 여부, 지정하면 루트의 `required`를 덮어씀 |

`maxValues`를 지정하면 해당 개수에 도달한 이후에는 값을 추가할 수 없고, `SuggestionField.Counter`를 `SuggestionField.Footer` 안에 두면 현재 개수와 최대 개수를 함께 표시합니다. `name`을 지정하면 값이 폼 제출에 포함되며, 값이 여러 개이므로 `FormData.getAll(name)`으로 받습니다.

제안 목록은 Radix Popover로 표시합니다. 입력값으로 목록을 좁히고 한글은 조합 중에도 결과가 유지됩니다. 방향키로 항목을 이동하고 Enter로 확정하며, 검색어가 비어 있을 때 Backspace는 마지막 태그를 제거합니다. Escape는 목록을 닫고 입력 중인 값을 지웁니다. `disabled`와 `readonly`에서는 목록을 열 수 없고 태그도 제거할 수 없습니다.

입력 요소는 `role="combobox"`로 native 시맨틱을 덮어쓰므로 읽기 전용과 필수 상태를 `aria-readonly`, `aria-required`로 함께 노출합니다. `required`는 native `required`를 붙이지 않아 브라우저 기본 검증은 동작하지 않습니다. 접근 이름은 `SuggestionField.Label`이 렌더되면 그 id를 참조하고, 레이블 없이 쓰면 입력 요소에 전달한 `aria-labelledby`나 `aria-label`을 사용합니다. 목록은 Portal로 분리되므로 입력 요소와 같은 이름을 함께 연결합니다.

타입 `SuggestionFieldProps`, `SuggestionFieldInputProps`, `SuggestionFieldLabelProps`, `SuggestionFieldHelperProps`, `SuggestionFieldFooterProps`를 함께 내보냅니다.

```tsx
<SuggestionField>
  <SuggestionField.Label>관심 기술 스택</SuggestionField.Label>
  <SuggestionField.Input
    suggestions={["React", "TypeScript", "Next.js"]}
    defaultValue={["React"]}
    maxValues={5}
    name='stacks'
    placeholder='기술 스택을 입력하세요'
  />
  <SuggestionField.Footer>
    <SuggestionField.Helper>최대 5개까지 고를 수 있어요</SuggestionField.Helper>
    <SuggestionField.Counter />
  </SuggestionField.Footer>
</SuggestionField>
```
