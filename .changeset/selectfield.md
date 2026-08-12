---
"@jects/jds": minor
---

**SelectField**

`SelectField`를 내부 `Field` primitive 기반의 compound 컴포넌트로 재작성합니다. `SelectField.Label`, `SelectField.Content`, `SelectField.Trigger`, `SelectField.HelperText`를 조합해 구성하며 루트에서 `status`(`default`/`success`/`error`), `fieldStyle`(`outline`/`hollow`), `disabled`, `readonly`, `required` 상태를 관리합니다.

`SelectField.Trigger`는 트리거 버튼과 선택 목록을 함께 관리합니다. 선택지는 `options`로 전달하고 값은 controlled(`value` + `onChange`)와 uncontrolled(`defaultValue`)를 모두 지원합니다. 단일 선택만 지원하며 선택 마크 표시 여부는 `variant`(`control`/`label`)로 제어합니다. 값과 화살표 사이에는 `suffix`로 배지나 단축키 같은 읽기 전용 요소를 배치하며, 트리거 버튼 안에 중첩되므로 상호작용하는 요소는 전달하면 안 됩니다.

선택 목록은 Radix Popover로 표시하고 열림 상태와 위치 계산, 바깥 클릭과 Escape 처리를 컴포넌트가 담당합니다. 목록 높이는 트리거 아래에 남은 화면 공간으로 제한하고 초과하면 내부에서 스크롤하며, 열릴 때는 선택된 항목이 보이도록 스크롤 위치를 맞춥니다.

접근성은 W3C 콤보박스 패턴을 따릅니다. 트리거는 `role="combobox"`와 `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`를 가지며 포커스는 항상 트리거에 유지됩니다. 닫힌 상태에서는 방향키, `Home`, `End`, `Enter`, `Space`로 목록을 열고, 열린 상태에서는 방향키와 `Home`, `End`로 이동한 뒤 `Enter`나 `Space`로 선택합니다. `status`가 `error`면 트리거에 `aria-invalid`를 적용하고, `aria-describedby`는 `SelectField.HelperText`가 렌더될 때만 연결합니다. 버튼에는 native `readonly`가 없으므로 읽기 전용 상태는 `aria-readonly`로 노출하며, `disabled`와 `readonly`에서는 클릭과 키보드 모두 목록을 열 수 없습니다.

타입 `SelectFieldProps`, `SelectFieldTriggerProps`, `SelectFieldContentProps`, `SelectFieldLabelProps`, `SelectFieldHelperTextProps`를 함께 내보냅니다.

```tsx
<SelectField status='error' required>
  <SelectField.Label suffixSlot={<Icon name='information-line' size='2xs' />}>
    지역
  </SelectField.Label>
  <SelectField.Content>
    <SelectField.Trigger
      placeholder='지역을 선택하세요'
      value={value}
      onChange={setValue}
      options={[
        { value: "seoul", label: "서울특별시" },
        { value: "busan", label: "부산광역시" },
      ]}
    />
  </SelectField.Content>
  <SelectField.HelperText>지역을 선택해주세요</SelectField.HelperText>
</SelectField>
```

**소비처 영향 (코드 수정 필요)**

| AS-IS `Input.SelectField`                           | TO-BE `SelectField`                                                                                                             |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 단일 컴포넌트 (prop 기반)                           | compound                                                                                                                        |
| `label`                                             | `<SelectField.Label>`                                                                                                           |
| `helperText`                                        | `<SelectField.HelperText>`                                                                                                      |
| 루트 `value` (표시할 문자열)                        | `<SelectField.Trigger>`의 controlled(`value` + `onChange`) / uncontrolled(`defaultValue`)                                       |
| 소비처가 `Select`를 직접 배치                       | `<SelectField.Trigger options={…}>`                                                                                             |
| `isOpen` / `onClick`으로 소비처가 열림 상태 관리    | 컴포넌트가 소유                                                                                                                 |
| `isWithInfoIcon`                                    | `<SelectField.Label suffixSlot={<Icon … />}>`                                                                                   |
| `style="outlined" \| "empty"`                       | `fieldStyle="outline" \| "hollow"`                                                                                              |
| `validation="none" \| "error" \| "success"`         | `status="default" \| "success" \| "error"`                                                                                      |
| `interaction="enabled" \| "disabled" \| "readOnly"` | `disabled` / `readonly` (+ `required`) boolean prop                                                                             |
| `labelIcon` / `button` (SelectFieldButton)          | 제거 — 대체재 없음                                                                                                              |
| `SelectFieldPublicProps`, `SelectFieldButtonProps`  | `SelectFieldProps`, `SelectFieldTriggerProps`, `SelectFieldContentProps`, `SelectFieldLabelProps`, `SelectFieldHelperTextProps` |

```diff
- const [isOpen, setIsOpen] = useState(false);
-
- <Input.SelectField
-   label='지역'
-   helperText='지역을 선택해주세요'
-   value={findLabelByValue(options, value)}
-   placeholder='지역을 선택하세요'
-   isOpen={isOpen}
-   onClick={() => setIsOpen(!isOpen)}
- />;
-
- {isOpen && (
-   <Select
-     value={value}
-     onChange={next => {
-       setValue(next);
-       setIsOpen(false);
-     }}
-     options={options}
-   />
- )}
+ <SelectField>
+   <SelectField.Label>지역</SelectField.Label>
+   <SelectField.Content>
+     <SelectField.Trigger
+       placeholder='지역을 선택하세요'
+       value={value}
+       onChange={setValue}
+       options={options}
+     />
+   </SelectField.Content>
+   <SelectField.HelperText>지역을 선택해주세요</SelectField.HelperText>
+ </SelectField>
```
