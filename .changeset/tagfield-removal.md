---
"@jects/jds": minor
---

**TagField**

`Input.TagField`를 제거하고 `SuggestionField`로 대체합니다. 사용자가 입력한 문자열이 값이 되며, `suggestions`로 입력을 보조하는 목록을 함께 전달할 수 있습니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                               | TO-BE                                                                          |
| --------------------------------------------------- | ------------------------------------------------------------------------------ |
| `Input.TagField`                                    | `SuggestionField`                                                              |
| `label`                                             | `SuggestionField.Label`                                                        |
| `helperText`                                        | `SuggestionField.Footer` 안의 `SuggestionField.Helper`                         |
| `tags`, `onTagsChange` (`Tag[]`)                    | `SuggestionField.Input`의 `value`, `onChange` 또는 `defaultValue` (`string[]`) |
| `maxTags`                                           | `SuggestionField.Input`의 `maxValues`                                          |
| `allowDuplicates`                                   | 제거 — 선택값은 항상 고유                                                      |
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
