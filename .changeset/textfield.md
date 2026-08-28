---
"@jects/jds": minor
---

**TextField**

`Input.TextField`를 내부 `Field` primitive 기반의 compound 컴포넌트 `TextField`로 재작성합니다. 필드 공통 동작은 `Field` 항목에서 다룹니다.

`TextField.Label`, `TextField.Input`, `TextField.Footer`, `TextField.Helper`, `TextField.Counter`로 구성합니다. 값은 controlled(`value` + `onChange`)와 uncontrolled(`defaultValue`)를 모두 지원합니다.

`maxLength`를 지정하고 `TextField.Counter`를 `TextField.Footer` 안에 두면 현재 글자 수와 최대 글자 수를 표시합니다. uncontrolled에서는 `onChange`로만 길이를 추적하므로, `<form>` reset이나 ref로 값을 직접 변경하면 카운터가 실제 내용과 어긋납니다.

`prefix`와 `suffix`로 입력 좌우에 부가 요소를 배치할 수 있습니다. `TextField.Label`도 같은 prop을 받습니다.

타입 `TextFieldProps`, `TextFieldInputProps`, `TextFieldLabelProps`, `TextFieldHelperProps`, `TextFieldFooterProps`를 함께 내보냅니다.

```tsx
<TextField status='error' required>
  <TextField.Label suffix={<Icon name='information-line' size='2xs' />}>닉네임</TextField.Label>
  <TextField.Input
    maxLength={10}
    placeholder='닉네임을 입력하세요'
    value={value}
    onChange={onChange}
  />
  <TextField.Footer>
    <TextField.Helper>10자 이내로 입력해주세요</TextField.Helper>
    <TextField.Counter />
  </TextField.Footer>
</TextField>
```

**소비처 영향 (코드 수정 필요)**

| AS-IS `Input.TextField`                             | TO-BE `TextField`                                                                            |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 단일 컴포넌트 (prop 기반)                           | compound                                                                                     |
| `label`                                             | `<TextField.Label>`                                                                          |
| `helperText`                                        | `<TextField.Helper>`                                                                         |
| 루트의 `value` / `onChange` (필수)                  | `<TextField.Input>`의 controlled(`value` + `onChange`) / uncontrolled(`defaultValue`)        |
| `isWithInfoIcon`                                    | `<TextField.Label suffix={<Icon … />}>`                                                      |
| `style="outlined" \| "empty"`                       | 제거 — `outlined` 표현으로 고정                                                              |
| `validation="none" \| "error" \| "success"`         | `status="default" \| "success" \| "error"`                                                   |
| `interaction="enabled" \| "disabled" \| "readOnly"` | `disabled` / `readonly` (+ `required`) boolean prop                                          |
| `labelIcon` / `button` (TextFieldButton)            | `<TextField.Input prefix suffix>` / `<TextField.Label prefix suffix>`                        |
| `TextFieldPublicProps`, `TextFieldButtonProps`      | `TextFieldInputProps`, `TextFieldLabelProps`, `TextFieldHelperProps`, `TextFieldFooterProps` |
| `TextFieldProps` (단일 컴포넌트 props)              | `TextFieldProps` (compound 루트 props)                                                       |

`TextFieldProps`는 이름이 그대로라 타입 검사를 통과할 수 있습니다. 이 타입을 직접 참조하던 코드는 필드가 달라졌으므로 확인이 필요합니다.

```diff
- <Input.TextField
-   label='이메일'
-   helperText='유효한 이메일 주소를 입력해주세요'
-   validation='error'
-   interaction='disabled'
-   isWithInfoIcon
-   value={value}
-   onChange={onChange}
- />
+ <TextField status='error' disabled>
+   <TextField.Label suffix={<Icon name='information-line' size='2xs' />}>이메일</TextField.Label>
+   <TextField.Input placeholder='이메일을 입력하세요' value={value} onChange={onChange} />
+   <TextField.Helper>유효한 이메일 주소를 입력해주세요</TextField.Helper>
+ </TextField>
```

**동작 변경 (코드 수정 불필요)**

- 입력 타이포가 `body-sm`에서 `body-md`로 확대
