---
"@jects/jds": minor
---

**Checkbox**

Checkbox를 radix Checkbox 기반으로 재작성하고 API를 조립된 props 형태로 바꿉니다. compound(`Checkbox.Basic`, `Checkbox.Content`)를 더 이상 공개하지 않으며, 단독 체크박스는 `Checkbox`, 다중 선택은 `CheckboxGroup`으로 나뉩니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                                            | TO-BE                                                   |
| ---------------------------------------------------------------- | ------------------------------------------------------- |
| `Checkbox.Basic`                                                 | `Checkbox`                                              |
| `Checkbox.Content`의 `label` / `subLabel`                        | `Checkbox`의 `label` / `helper` props                   |
| 여러 개를 소비처에서 직접 배치                                   | `CheckboxGroup`의 `options`                             |
| `variant = "empty" \| "outlined"`                                | `variant = "hollow" \| "outlined"`                      |
| `align = "left" \| "right"`                                      | 제거 — 대체재 없음                                      |
| `CheckboxBasicProps`, `CheckboxBoxProps`, `CheckboxContentProps` | `CheckboxProps`, `CheckboxGroupProps`, `CheckboxOption` |
| `CheckboxAlign`                                                  | 제거 — 대체재 없음                                      |

`helper`와 `stretched`는 `label`이 있을 때만 지정할 수 있습니다. `indeterminate`는 제어 모드(`checked="indeterminate"`)에서만 지원하며, `defaultChecked`는 `boolean`만 받습니다.

```diff
- <Checkbox.Basic size='md' checked={checked} onCheckedChange={setChecked} />
+ <Checkbox size='md' checked={checked} onCheckedChange={setChecked} aria-label='선택' />
```

```diff
- <Checkbox.Content
-   size='md'
-   variant='empty'
-   align='left'
-   label='레이블'
-   subLabel='헬퍼 텍스트'
-   checked={checked}
-   onCheckedChange={setChecked}
- />
+ <Checkbox
+   size='md'
+   variant='hollow'
+   label='레이블'
+   helper='헬퍼 텍스트'
+   checked={checked}
+   onCheckedChange={setChecked}
+ />
```

```diff
- <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
-   <Checkbox.Content label='옵션 1' checked={a} onCheckedChange={setA} />
-   <Checkbox.Content label='옵션 2' checked={b} onCheckedChange={setB} />
- </div>
+ <CheckboxGroup
+   layout='grid'
+   columns={3}
+   value={value}
+   onChange={setValue}
+   options={[
+     { value: "1", label: "옵션 1" },
+     { value: "2", label: "옵션 2" },
+   ]}
+ />
```

**추가**

- `CheckboxGroup` (`CheckboxGroupProps`) — 다중 선택 그룹. 선택값은 `string[]`이고 controlled(`value` + `onChange`)와 uncontrolled(`defaultValue`)를 모두 지원합니다
- `layout` — `"vertical"`(기본) 또는 `"grid"`. `grid`는 `columns`를 함께 지정해야 합니다
- `stretched` — 아이템이 전체 너비를 채웁니다. 그룹에 지정하면 모든 아이템에 전파되고, 단독 `Checkbox`에도 지정할 수 있습니다
- `isInvalid`, `name` — 유효성 표시와 폼 제출 이름
- `defaultChecked`를 통한 비제어 방식. 기존 제어 방식(`checked`)도 그대로 씁니다

**동작 변경 (코드 수정 불필요)**

- 체크박스 컨트롤이 `<input type="checkbox">`에서 `<button role="checkbox">`로 바뀝니다. 체크박스 DOM을 직접 조회하거나 폼 값에 의존하던 코드는 확인이 필요합니다.
- `CheckboxGroup`이 레이아웃을 직접 관리합니다. 소비처가 감싸 배치하던 컨테이너는 필요 없습니다.
- `CheckboxGroup`이 방향키, Home, End로 포커스를 이동합니다. 그룹에 Tab으로 진입한 뒤 방향키로 항목을 옮기고 Space로 선택을 토글합니다.
- 레이블과 헬퍼의 `white-space: nowrap`이 제거되어 폭이 부족하면 텍스트가 개행됩니다.
- `invalid` 스타일이 unchecked 상태에서만 적용됩니다. checked, indeterminate 상태에서는 적용되지 않습니다.
