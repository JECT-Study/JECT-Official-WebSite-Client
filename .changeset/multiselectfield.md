---
"@jects/jds": minor
---

**MultiSelectField**

여러 값을 태그로 선택하는 `MultiSelectField`를 추가합니다. `MultiSelectField.Label`, `MultiSelectField.Content`, `MultiSelectField.Input`, `MultiSelectField.Footer`, `MultiSelectField.HelperText`, `MultiSelectField.Counter`를 조합해 구성합니다.

루트 prop

| prop           | 기본값      | 설명                                                        |
| -------------- | ----------- | ----------------------------------------------------------- |
| `value`        | -           | controlled 선택값, `string[]`                               |
| `onChange`     | -           | 선택값 변경 핸들러, `value`와 함께 사용                     |
| `defaultValue` | `[]`        | uncontrolled 초기 선택값, `value`와 함께 사용 불가          |
| `maxValues`    | -           | 선택할 수 있는 최대 개수                                    |
| `name`         | -           | 폼 제출에 사용할 이름                                       |
| `status`       | `'default'` | `'default'`, `'success'`, `'error'`                         |
| `fieldStyle`   | `'outline'` | `'outline'`, `'hollow'`                                     |
| `disabled`     | `false`     | 비활성 상태                                                 |
| `readonly`     | `false`     | 읽기 전용 상태                                              |
| `required`     | `false`     | 필수 입력 여부, 레이블 옆 `*` 표시와 `aria-required`로 노출 |

`MultiSelectField.Input` prop

| prop               | 기본값      | 설명                                        |
| ------------------ | ----------- | ------------------------------------------- |
| `options`          | -           | 선택지, `string[]`                          |
| `allowCustomValue` | `false`     | 목록에 없는 입력값을 새 값으로 추가 허용    |
| `placeholder`      | -           | 선택값이 없을 때 표시할 문구                |
| `variant`          | `'control'` | 선택 마크 표시 여부, `'control'`, `'label'` |
| `suffix`           | -           | 입력 오른쪽에 배치할 읽기 전용 요소         |

`maxValues`를 지정하면 최대 개수만큼 고른 뒤 나머지 항목을 고를 수 없습니다. `MultiSelectField.Counter`를 `MultiSelectField.Footer` 안에 두면 현재 개수와 최대 개수를 함께 표시합니다. `name`을 지정하면 선택값이 폼 제출에 포함되며, 값이 여러 개이므로 `FormData.getAll(name)`으로 받습니다.

선택 목록은 Radix Popover로 표시하며 열림 상태와 위치 계산, 바깥 클릭과 Escape 처리를 컴포넌트가 담당합니다. 검색 결과가 없으면 목록이 열리지 않고, 한글은 조합 중에도 검색 결과가 유지됩니다. 방향키로 항목을 이동하고 Enter로 선택하며, 검색어가 비어 있을 때 Backspace는 마지막 태그를 제거합니다. `disabled`와 `readonly`에서는 목록을 열 수 없고 태그도 제거할 수 없습니다.

`es-hangul`이 런타임 의존성으로 추가됩니다. gzip 기준 약 1.8KB이며 `MultiSelectField`를 사용하는 소비처 번들에만 포함됩니다.

타입 `MultiSelectFieldProps`, `MultiSelectFieldInputProps`, `MultiSelectFieldContentProps`, `MultiSelectFieldFooterProps`, `MultiSelectFieldLabelProps`, `MultiSelectFieldHelperTextProps`를 함께 내보냅니다.

```tsx
<MultiSelectField defaultValue={["React"]} maxValues={5} name='stacks'>
  <MultiSelectField.Label>관심 기술 스택</MultiSelectField.Label>
  <MultiSelectField.Content>
    <MultiSelectField.Input
      options={["React", "TypeScript", "Next.js"]}
      allowCustomValue
      placeholder='기술 스택을 선택하세요'
    />
  </MultiSelectField.Content>
  <MultiSelectField.Footer>
    <MultiSelectField.HelperText>최대 5개까지 고를 수 있어요</MultiSelectField.HelperText>
    <MultiSelectField.Counter />
  </MultiSelectField.Footer>
</MultiSelectField>
```
