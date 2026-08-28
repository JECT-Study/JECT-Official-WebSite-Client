---
"@jects/jds": minor
---

**Textarea**

`Input.InputArea`를 내부 `Field` primitive 기반의 compound 컴포넌트 `Textarea`로 재작성합니다. 필드 공통 동작은 `Field` 항목에서 다룹니다.

`Textarea.Label`, `Textarea.Control`, `Textarea.Footer`, `Textarea.Helper`, `Textarea.Counter`로 구성합니다. 값은 controlled(`value` + `onChange`)와 uncontrolled(`defaultValue`)를 모두 지원합니다.

`maxLength`를 지정하고 `Textarea.Counter`를 `Textarea.Footer` 안에 두면 현재 글자 수와 최대 글자 수를 표시합니다. uncontrolled에서는 `onChange`로만 길이를 추적하므로, `<form>` reset이나 ref로 값을 직접 변경하면 카운터가 실제 내용과 어긋납니다.

타입 `TextareaProps`, `TextareaControlProps`, `TextareaLabelProps`, `TextareaHelperProps`, `TextareaFooterProps`, `TextareaCounterProps`를 함께 내보냅니다.

```tsx
<Textarea status='error' required>
  <Textarea.Label suffix={<Icon name='information-line' size='2xs' />}>자기소개</Textarea.Label>
  <Textarea.Control
    maxLength={200}
    placeholder='내용을 입력하세요'
    value={value}
    onChange={onChange}
  />
  <Textarea.Footer>
    <Textarea.Helper>200자 이내로 입력해주세요</Textarea.Helper>
    <Textarea.Counter />
  </Textarea.Footer>
</Textarea>
```

**소비처 영향 (코드 수정 필요)**

| AS-IS `Input.InputArea`                                                                         | TO-BE `Textarea`                                                                                                                    |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 단일 컴포넌트 (prop 기반)                                                                       | compound                                                                                                                            |
| `label`                                                                                         | `<Textarea.Label>`                                                                                                                  |
| `helperText`                                                                                    | `<Textarea.Helper>`                                                                                                                 |
| 루트의 `value` / `onChange` (필수)                                                              | `<Textarea.Control>`의 controlled(`value` + `onChange`) / uncontrolled(`defaultValue`)                                              |
| `maxLength` (내장 카운터)                                                                       | `<Textarea.Control maxLength>`와 `<Textarea.Counter>`                                                                               |
| `labelIcon`                                                                                     | `<Textarea.Label suffix={<Icon … />}>`                                                                                              |
| `style="outlined" \| "empty"`                                                                   | 제거 — `outlined` 표현으로 고정                                                                                                     |
| `validation="none" \| "error"`                                                                  | `status="default" \| "success" \| "error"`                                                                                          |
| `interaction="enabled" \| "disabled" \| "readOnly"`                                             | `disabled` / `readonly` (+ `required`) boolean prop                                                                                 |
| `height` / `minHeight`                                                                          | `Textarea.Control`에 CSS로 지정                                                                                                     |
| `InputAreaProps`, `InputAreaStyle`, `InputAreaLayout`, `InputAreaValidation`, `InputAreaStatus` | `TextareaProps`, `TextareaControlProps`, `TextareaLabelProps`, `TextareaHelperProps`, `TextareaFooterProps`, `TextareaCounterProps` |

```diff
- <Input.InputArea
-   label='자기소개'
-   helperText='200자 이내로 입력해주세요'
-   validation='error'
-   maxLength={200}
-   value={value}
-   onChange={onChange}
- />
+ <Textarea status='error'>
+   <Textarea.Label>자기소개</Textarea.Label>
+   <Textarea.Control
+     maxLength={200}
+     placeholder='내용을 입력하세요'
+     value={value}
+     onChange={onChange}
+   />
+   <Textarea.Footer>
+     <Textarea.Helper>200자 이내로 입력해주세요</Textarea.Helper>
+     <Textarea.Counter />
+   </Textarea.Footer>
+ </Textarea>
```

**동작 변경 (코드 수정 불필요)**

- 최소 높이가 112px에서 48px로 축소
- 세로 방향 `resize` 지원, `disabled`와 `readonly`에서는 불가
