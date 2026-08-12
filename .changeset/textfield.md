---
"@jects/jds": minor
---

**TextField**

내부 `Field` primitive를 기반으로 공개 compound 컴포넌트 `TextField`를 추가하고, 기존 단일 컴포넌트 `Input.TextField`를 제거합니다. `Input` 네임스페이스에서 `TextField`가 빠지므로 소비처는 최상위 `TextField`로 마이그레이션해야 합니다.

`TextField.Label`, `TextField.Content`, `TextField.HelperText`를 조합해 레이블, 입력 영역, 헬퍼텍스트를 구성하며 루트에서 `status`(`default`/`success`/`error`), `fieldStyle`(`outline`/`hollow`), `disabled`, `readonly`, `required` 상태를 관리합니다. native `div` props와 `ref` 전달도 지원합니다.

`TextField.Input`은 필드 context를 기반으로 `disabled`, `readOnly`, `required` 상태를 적용하며 입력 요소에서 직접 전달한 값으로 덮어쓸 수 있습니다. 덮어쓰면 `TextField.Content`가 테두리 색상과 배경 색상, 인터랙션을 함께 반영하고 `disabled`는 `TextField.Label`과 `TextField.HelperText`의 색상까지 반영합니다.

`id`는 루트에서 관리합니다. `<TextField id="email">`처럼 전달하면 입력 요소의 `id`, `TextField.Label`의 `htmlFor`, `TextField.HelperText`의 `id`가 자동으로 연결되고, 생략하면 `useId`로 생성합니다. `status`가 `error`면 입력 요소에 `aria-invalid`를 적용하고 그 외에는 외부에서 전달한 값을 그대로 씁니다. `aria-describedby`는 `TextField.HelperText`가 렌더될 때만 연결하며, 외부에서 전달한 값이 있으면 헬퍼텍스트 id와 병합합니다.

`TextField.Content`는 입력 좌우에 아이콘이나 버튼 등 부가 요소를 배치할 수 있고, 입력은 controlled(`value` / `onChange`)와 uncontrolled(`defaultValue`)를 모두 지원합니다. `TextField.Label`은 `prefixSlot`, `suffixSlot`으로 레이블 앞뒤에 도움말 아이콘 등을 배치합니다.

타입 `TextFieldProps`, `TextFieldInputProps`, `TextFieldContentProps`, `TextFieldLabelProps`, `TextFieldHelperTextProps`를 함께 내보냅니다.

```tsx
<TextField status='error' required>
  <TextField.Label suffixSlot={<Icon name='information-line' size='2xs' />}>이메일</TextField.Label>
  <TextField.Content>
    <TextField.Input placeholder='이메일을 입력하세요' value={value} onChange={onChange} />
  </TextField.Content>
  <TextField.HelperText>유효한 이메일 주소를 입력해주세요</TextField.HelperText>
</TextField>
```

**소비처 영향 (코드 수정 필요)**

| AS-IS `Input.TextField`                             | TO-BE `TextField`                                                                                                   |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 단일 컴포넌트 (prop 기반)                           | compound                                                                                                            |
| `label`                                             | `<TextField.Label>`                                                                                                 |
| `helperText`                                        | `<TextField.HelperText>`                                                                                            |
| 루트의 `value` / `onChange` (필수)                  | `<TextField.Input>`의 controlled(`value` + `onChange`) / uncontrolled(`defaultValue`)                               |
| `isWithInfoIcon`                                    | `<TextField.Label suffixSlot={<Icon … />}>`                                                                         |
| `style="outlined" \| "empty"`                       | `fieldStyle="outline" \| "hollow"`                                                                                  |
| `validation="none" \| "error" \| "success"`         | `status="default" \| "success" \| "error"`                                                                          |
| `interaction="enabled" \| "disabled" \| "readOnly"` | `disabled` / `readonly` (+ `required`) boolean prop                                                                 |
| `labelIcon` / `button` (TextFieldButton)            | `TextField.Content` / `TextField.Label` 슬롯에 직접 배치                                                            |
| `TextFieldPublicProps`, `TextFieldButtonProps`      | `TextFieldProps`, `TextFieldInputProps`, `TextFieldContentProps`, `TextFieldLabelProps`, `TextFieldHelperTextProps` |

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
+   <TextField.Label suffixSlot={<Icon name='information-line' size='2xs' />}>이메일</TextField.Label>
+   <TextField.Content>
+     <TextField.Input placeholder='이메일을 입력하세요' value={value} onChange={onChange} />
+   </TextField.Content>
+   <TextField.HelperText>유효한 이메일 주소를 입력해주세요</TextField.HelperText>
+ </TextField>
```

**동작 변경 (코드 수정 불필요)**

- 입력 타이포가 `body-sm`에서 `body-md`로 커집니다.
