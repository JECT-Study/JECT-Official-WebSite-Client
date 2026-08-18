---
"@jects/jds": minor
---

**SelectField**

`Input.SelectField`를 내부 `Field` primitive 기반의 compound 컴포넌트 `SelectField`로 재작성합니다. 필드 공통 동작은 `Field` 항목에서 다룹니다.

`SelectField.Label`, `SelectField.Input`, `SelectField.Helper`로 구성합니다. 선택지는 `SelectOption[]`으로 전달하며 값과 표시명, 캡션, 부가 요소, 비활성 여부를 지정할 수 있습니다. `value`와 `defaultValue`, `onChange`는 모두 `options[].value`를 주고받습니다.

`variant`로 선택 표시 방식을, `suffix`로 입력 오른쪽에 놓을 읽기 전용 요소를 지정할 수 있습니다. `name`을 지정하면 선택값이 hidden input으로 렌더되어 폼 제출에 포함됩니다.

`searchable`의 기본값은 `false`입니다. `true`이면 검색어로 항목을 필터링할 수 있으며, 목록이 닫히거나 포커스가 제거되면 선택한 값의 표시명으로 돌아갑니다.

타입 `SelectFieldProps`, `SelectFieldInputProps`, `SelectFieldLabelProps`, `SelectFieldHelperProps`를 함께 내보냅니다.

```tsx
<SelectField status='error' required>
  <SelectField.Label suffix={<Icon name='information-line' size='2xs' />}>지역</SelectField.Label>
  <SelectField.Input
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

| AS-IS `Input.SelectField`                           | TO-BE `SelectField`                                                                     |
| --------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 단일 컴포넌트 (prop 기반)                           | compound                                                                                |
| `label`                                             | `<SelectField.Label>`                                                                   |
| `helperText`                                        | `<SelectField.Helper>`                                                                  |
| 루트 `value` (표시할 문자열)                        | `<SelectField.Input>`의 controlled(`value` + `onChange`) / uncontrolled(`defaultValue`) |
| 소비처가 `Select`를 직접 배치                       | `<SelectField.Input options={…}>`                                                       |
| `isOpen` / `onClick`으로 소비처가 열림 상태 관리    | 컴포넌트가 소유                                                                         |
| `isWithInfoIcon`                                    | `<SelectField.Label suffix={<Icon … />}>`                                               |
| `style="outlined" \| "empty"`                       | 제거 — `outlined` 표현으로 고정                                                         |
| `validation="none" \| "error" \| "success"`         | `status="default" \| "success" \| "error"`                                              |
| `interaction="enabled" \| "disabled" \| "readOnly"` | `disabled` / `readonly` (+ `required`) boolean prop                                     |
| `labelIcon` / `button` (SelectFieldButton)          | 제거 — 대체재 없음                                                                      |
| `SelectFieldProps` (단일 컴포넌트 props)            | `SelectFieldProps` (compound 루트 props)                                                |

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
+   <SelectField.Input
+     placeholder='지역을 선택하세요'
+     value={value}
+     onChange={setValue}
+     options={options}
+   />
+   <SelectField.Helper>지역을 선택해주세요</SelectField.Helper>
+ </SelectField>
```
