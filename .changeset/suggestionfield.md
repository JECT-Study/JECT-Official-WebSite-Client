---
"@jects/jds": minor
---

**SuggestionField**

`Input.TagField`를 내부 `Field` primitive 기반의 compound 컴포넌트 `SuggestionField`로 재작성합니다.

`SuggestionField.Label`, `SuggestionField.Input`, `SuggestionField.Footer`, `SuggestionField.Helper`, `SuggestionField.Counter`로 구성합니다. 값은 `string[]`이며 입력한 문자열이 그대로 값이 됩니다. `suggestions`는 입력을 보조하는 목록일 뿐 값의 범위를 제한하지 않으며, 선택한 항목은 입력한 값과 동일하게 처리되어 목록에서 제외됩니다. `suffix`로 입력 오른쪽의 읽기 전용 요소를 지정합니다. 값을 옵션으로 제한하는 경우 `MultiSelectField`를 사용합니다.

`maxValues`를 지정하면 그 개수까지만 추가할 수 있으며, `SuggestionField.Counter`를 `SuggestionField.Footer` 안에 두면 현재 개수와 최대 개수를 표시합니다. `name`을 지정하면 값마다 hidden input이 렌더되므로 `FormData.getAll(name)`으로 받습니다. `acceptValueOnBlur`의 기본값은 `true`이며, 포커스가 제거될 때 입력 중인 값을 확정할지 결정합니다.

입력값으로 목록을 좁힐 수 있고, 한글은 조합 중에도 결과가 유지됩니다. 방향키로 항목을 이동하고 Enter로 확정하며, 검색어가 비어 있을 때 Backspace는 마지막 태그를 제거하고 Escape와 `alt`+방향키는 목록을 닫으며 입력 중인 값을 지웁니다. 목록은 Portal로 분리됩니다.

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
