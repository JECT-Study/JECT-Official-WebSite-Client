---
"@jects/jds": minor
---

**SelectField**

`SelectField`를 내부 `Field` primitive 기반의 compound 컴포넌트로 재작성합니다. `SelectField.Label`, `SelectField.Trigger`, `SelectField.Helper`를 조합해 구성하며 루트에서 `status`(`default`/`success`/`error`), `disabled`, `readonly`, `required` 상태를 관리합니다.

`SelectField.Trigger`는 필드 박스와 트리거 버튼, 선택 목록을 함께 관리합니다. 박스의 테두리 안쪽 패딩을 클릭하면 트리거로 포커스가 이동하고 목록이 열립니다. 선택지는 `options`로 전달하고 값은 controlled(`value` + `onChange`)와 uncontrolled(`defaultValue`)를 모두 지원합니다. `value`와 `defaultValue`는 `options[].value`를 받고 `onChange`도 선택된 `options[].value`를 넘겨줍니다. `options[].label`은 화면 표시 전용이라 값으로 쓰이지 않습니다. 단일 선택만 지원하며 선택 마크 표시 여부는 `variant`(`control`/`label`)로 제어합니다. 값과 화살표 사이에는 `suffix`로 배지나 단축키 같은 읽기 전용 요소를 배치하며, 트리거 버튼 안에 중첩되므로 상호작용하는 요소는 전달하면 안 됩니다. `readonly`와 `required`는 루트와 트리거 중 어느 쪽에 지정해도 되고, 트리거에 준 값이 루트를 덮어씁니다.

선택 목록은 Radix Popover로 표시하고 열림 상태와 위치 계산, 바깥 클릭과 Escape 처리를 컴포넌트가 담당합니다. 목록 높이는 트리거 아래에 남은 화면 공간으로 제한하고 초과하면 내부에서 스크롤하며, 열릴 때는 선택된 항목이 보이도록 스크롤 위치를 맞춥니다.

접근성은 W3C 콤보박스 패턴을 따릅니다. 트리거는 `role="combobox"`와 `aria-haspopup="listbox"`, `aria-expanded`, `aria-activedescendant`를 가지며 포커스는 항상 트리거에 유지됩니다. `aria-controls`는 목록이 열려 DOM에 존재할 때만 연결하고, `aria-labelledby`는 `SelectField.Label`이 렌더될 때만 연결합니다. 닫힌 상태에서는 방향키, `Home`, `End`, `Enter`, `Space`로 목록을 열고, 열린 상태에서는 방향키와 `Home`, `End`로 이동한 뒤 `Enter`나 `Space`로 선택합니다. `status`가 `error`면 트리거에 `aria-invalid`를 적용하고, `aria-describedby`는 `SelectField.Helper`가 렌더될 때만 연결합니다. 버튼에는 native `readonly`와 `required`가 없으므로 두 상태는 `aria-readonly`와 `aria-required`로 노출하며, `disabled`와 `readonly`에서는 클릭과 키보드 모두 목록을 열 수 없습니다.

타입 `SelectFieldProps`, `SelectFieldTriggerProps`, `SelectFieldLabelProps`, `SelectFieldHelperProps`를 함께 내보냅니다.

```tsx
<SelectField status='error' required>
  <SelectField.Label suffix={<Icon name='information-line' size='2xs' />}>지역</SelectField.Label>
  <SelectField.Trigger
    placeholder='지역을 선택하세요'
    value={value}
    onChange={setValue}
    options={[
      { value: "seoul", label: "서울특별시" },
      { value: "busan", label: "부산광역시" },
    ]}
  />
  <SelectField.Helper>지역을 선택해주세요</SelectField.Helper>
</SelectField>
```

**소비처 영향 (코드 수정 필요)**

| AS-IS `Input.SelectField`                           | TO-BE `SelectField`                                                                       |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 단일 컴포넌트 (prop 기반)                           | compound                                                                                  |
| `label`                                             | `<SelectField.Label>`                                                                     |
| `helperText`                                        | `<SelectField.Helper>`                                                                    |
| 루트 `value` (표시할 문자열)                        | `<SelectField.Trigger>`의 controlled(`value` + `onChange`) / uncontrolled(`defaultValue`) |
| 소비처가 `Select`를 직접 배치                       | `<SelectField.Trigger options={…}>`                                                       |
| `isOpen` / `onClick`으로 소비처가 열림 상태 관리    | 컴포넌트가 소유                                                                           |
| `isWithInfoIcon`                                    | `<SelectField.Label suffix={<Icon … />}>`                                                 |
| `style="outlined" \| "empty"`                       | 제거 — `outlined` 표현으로 고정                                                           |
| `validation="none" \| "error" \| "success"`         | `status="default" \| "success" \| "error"`                                                |
| `interaction="enabled" \| "disabled" \| "readOnly"` | `disabled` / `readonly` (+ `required`) boolean prop                                       |
| `labelIcon` / `button` (SelectFieldButton)          | 제거 — 대체재 없음                                                                        |
| `SelectFieldProps` (단일 컴포넌트 props)            | `SelectFieldProps` (compound 루트 props)                                                  |

`SelectFieldProps`는 이름이 그대로라 타입 검사를 통과할 수 있습니다. 이 타입을 직접 참조하던 코드는 필드가 달라졌으므로 확인이 필요합니다.

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
+   <SelectField.Trigger
+     placeholder='지역을 선택하세요'
+     value={value}
+     onChange={setValue}
+     options={options}
+   />
+   <SelectField.Helper>지역을 선택해주세요</SelectField.Helper>
+ </SelectField>
```
