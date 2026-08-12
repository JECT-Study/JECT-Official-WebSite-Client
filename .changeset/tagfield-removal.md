---
"@jects/jds": minor
---

**TagField**

`Input.TagField`를 제거하고 `MultiSelectField`로 대체합니다. 선택지를 `options`로 전달하며, 입력한 값을 그대로 태그로 만들려면 `allowCustomValue`를 켭니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                               | TO-BE                                                        |
| --------------------------------------------------- | ------------------------------------------------------------ |
| `Input.TagField`                                    | `MultiSelectField`                                           |
| `label`                                             | `MultiSelectField.Label`                                     |
| `helperText`                                        | `MultiSelectField.Footer` 안의 `MultiSelectField.HelperText` |
| `tags`, `onTagsChange` (`Tag[]`)                    | `value`, `onChange` 또는 `defaultValue` (`string[]`)         |
| `maxTags`                                           | `maxValues`                                                  |
| `allowDuplicates`                                   | 제거 — 선택값은 항상 고유합니다                              |
| `isWithInfoIcon`                                    | `MultiSelectField.Label`의 `suffixSlot`                      |
| `style="outlined" \| "empty"`                       | `fieldStyle="outline" \| "hollow"`                           |
| `validation="none" \| "error" \| "success"`         | `status="default" \| "success" \| "error"`                   |
| `interaction="enabled" \| "disabled" \| "readOnly"` | `disabled`, `readonly` boolean prop                          |
| `TagFieldButton` (`labelIcon`, `button`)            | 제거 — 대체재 없음                                           |
| `TagFieldProps`, `TagFieldPublicProps`, `Tag`       | `MultiSelectFieldProps`, `MultiSelectFieldInputProps`        |

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
+ <MultiSelectField defaultValue={["React"]} maxValues={5}>
+   <MultiSelectField.Label>관심 기술 스택</MultiSelectField.Label>
+   <MultiSelectField.Content>
+     <MultiSelectField.Input
+       options={["React", "TypeScript", "Next.js"]}
+       allowCustomValue
+       placeholder='기술 스택을 선택하세요'
+     />
+   </MultiSelectField.Content>
+   <MultiSelectField.Footer>
+     <MultiSelectField.HelperText>최대 5개까지 고를 수 있어요</MultiSelectField.HelperText>
+     <MultiSelectField.Counter />
+   </MultiSelectField.Footer>
+ </MultiSelectField>
```
