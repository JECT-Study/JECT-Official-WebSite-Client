---
"@jects/jds": minor
---

**SuggestionField**

`Input.TagField`를 내부 `Field` primitive 기반의 compound 컴포넌트 `SuggestionField`로 재작성합니다. 필드 공통 동작은 `Field` 항목에서 다룹니다.

`SuggestionField.Label`, `SuggestionField.Input`, `SuggestionField.Footer`, `SuggestionField.Helper`, `SuggestionField.Counter`로 구성합니다. 값은 `string[]`이고 입력한 문자열이 값이 됩니다. `suggestions`는 입력을 보조하는 목록이며 값의 범위를 제한하지 않습니다. 목록에서 선택한 항목은 입력한 값과 동일하게 처리되어 목록에서 제외됩니다.

`suffix`로 입력 오른쪽에 놓을 읽기 전용 요소를 지정할 수 있습니다. `maxValues`로 추가 개수를 제한할 수 있고, `SuggestionField.Counter`를 `SuggestionField.Footer` 안에 두면 현재 개수와 최대 개수를 표시합니다. `name`을 지정하면 값마다 hidden input이 렌더되므로 `FormData.getAll(name)`으로 받습니다.

`acceptValueOnBlur`의 기본값은 `true`이며, 포커스가 제거될 때 입력 중인 값을 확정할지 결정할 수 있습니다.

입력 요소는 `role="combobox"`로 native 시맨틱을 덮어쓰며 `aria-haspopup`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, `aria-readonly`를 함께 노출합니다.

값을 옵션으로 제한해야 하는 경우 `MultiSelectField`를 사용합니다.

타입 `SuggestionFieldProps`, `SuggestionFieldInputProps`, `SuggestionFieldLabelProps`, `SuggestionFieldHelperProps`, `SuggestionFieldFooterProps`, `SuggestionFieldCounterProps`를 함께 내보냅니다.

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

**소비처 영향 (코드 수정 필요)**

| AS-IS `Input.TagField`                              | TO-BE `SuggestionField`                                                        |
| --------------------------------------------------- | ------------------------------------------------------------------------------ |
| 단일 컴포넌트 (prop 기반)                           | compound                                                                       |
| `label`                                             | `SuggestionField.Label`                                                        |
| `helperText`                                        | `SuggestionField.Footer` 안의 `SuggestionField.Helper`                         |
| `tags`, `onTagsChange` (`Tag[]`)                    | `SuggestionField.Input`의 `value`, `onChange` 또는 `defaultValue` (`string[]`) |
| `maxTags`                                           | `SuggestionField.Input`의 `maxValues`                                          |
| `allowDuplicates`                                   | 제거 — 값은 항상 고유                                                          |
| `isWithInfoIcon`                                    | `SuggestionField.Label`의 `suffix`                                             |
| `style="outlined" \| "empty"`                       | 제거 — `outlined` 표현으로 고정                                                |
| `validation="none" \| "error" \| "success"`         | `status="default" \| "success" \| "error"`                                     |
| `interaction="enabled" \| "disabled" \| "readOnly"` | `disabled`, `readonly` boolean prop                                            |
| `TagFieldButton` (`labelIcon`, `button`)            | 제거 — 대체재 없음                                                             |
| `TagFieldProps`, `TagFieldPublicProps`, `Tag`       | `SuggestionFieldProps`, `SuggestionFieldInputProps`                            |

```diff
- const [tags, setTags] = useState<Tag[]>([{ id: "1", label: "React" }]);
-
- <Input.TagField
-   label='관심 기술 스택'
-   helperText='최대 5개까지 고를 수 있어요'
-   placeholder='태그를 입력하고 Enter를 누르세요'
-   tags={tags}
-   onTagsChange={setTags}
-   maxTags={5}
- />;
+ <SuggestionField>
+   <SuggestionField.Label>관심 기술 스택</SuggestionField.Label>
+   <SuggestionField.Input
+     suggestions={["React", "TypeScript", "Next.js"]}
+     defaultValue={["React"]}
+     maxValues={5}
+     placeholder='기술 스택을 입력하세요'
+   />
+   <SuggestionField.Footer>
+     <SuggestionField.Helper>최대 5개까지 고를 수 있어요</SuggestionField.Helper>
+     <SuggestionField.Counter />
+   </SuggestionField.Footer>
+ </SuggestionField>
```
