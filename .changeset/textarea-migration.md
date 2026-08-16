---
"@jects/jds": minor
---

**Textarea**

내부 `Field` primitive를 기반으로 공개 compound 컴포넌트 `Textarea`를 추가하고, 기존 단일 컴포넌트 `Input.InputArea`를 제거합니다. `Input` 네임스페이스에서 `InputArea`가 빠지므로 소비처는 최상위 `Textarea`로 마이그레이션해야 합니다.

`Textarea.Label`, `Textarea.Control`, `Textarea.Footer`, `Textarea.Helper`, `Textarea.Counter`를 조합해 구성하며 루트에서 `status`(`default`/`success`/`error`), `disabled`, `readonly`, `required` 상태를 관리합니다. native `div` props와 `ref` 전달도 지원합니다.

`Textarea.Control`은 필드 context를 기반으로 `disabled`, `readOnly`, `required` 상태를 적용하며 입력 요소에서 직접 전달한 값으로 덮어쓸 수 있습니다. 덮어쓰면 필드 박스의 테두리 색상과 배경 색상, 인터랙션에도 함께 반영되고 `disabled`는 `Textarea.Label`과 `Textarea.Helper`의 색상까지 반영합니다. `required`는 native `required` 대신 `aria-required`로 노출하므로 브라우저 기본 검증은 동작하지 않습니다.

`id`는 루트에서 관리합니다. `<Textarea id="bio">`처럼 전달하면 입력 요소의 `id`, `Textarea.Label`의 `htmlFor`, `Textarea.Helper`의 `id`가 자동으로 연결되고, 생략하면 `useId`로 생성합니다. 접근 이름은 `Textarea.Label`이 렌더되면 그 id를 참조하고, 레이블 없이 쓰면 입력 요소에 전달한 `aria-labelledby`나 `aria-label`을 사용합니다. `status`가 `error`면 입력 요소에 `aria-invalid`를 적용하고 그 외에는 외부에서 전달한 값을 그대로 씁니다. `aria-describedby`는 `Textarea.Helper`와 `Textarea.Counter`가 렌더될 때만 연결하며, 외부에서 전달한 값이 있으면 그 id들과 병합합니다.

박스의 테두리 안쪽 패딩을 클릭하면 입력 요소로 포커스가 이동합니다. 값은 controlled(`value` / `onChange`)와 uncontrolled(`defaultValue`)를 모두 지원합니다. `maxLength`를 지정하고 `Textarea.Counter`를 `Textarea.Footer` 안에 두면 현재 글자 수와 최대 글자 수를 함께 표시합니다. uncontrolled에서는 `onChange`로만 길이를 추적하므로 `<form>` reset이나 ref로 `.value`를 직접 바꾸면 카운터가 실제 내용과 어긋납니다.

타입 `TextareaProps`, `TextareaControlProps`, `TextareaLabelProps`, `TextareaHelperProps`, `TextareaFooterProps`를 함께 내보냅니다.

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

| AS-IS `Input.InputArea`                                                                         | TO-BE `Textarea`                                                                                            |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 단일 컴포넌트 (prop 기반)                                                                       | compound                                                                                                    |
| `label`                                                                                         | `<Textarea.Label>`                                                                                          |
| `helperText`                                                                                    | `<Textarea.Helper>`                                                                                         |
| 루트의 `value` / `onChange` (필수)                                                              | `<Textarea.Control>`의 controlled(`value` + `onChange`) / uncontrolled(`defaultValue`)                      |
| `maxLength` (내장 카운터)                                                                       | `<Textarea.Control maxLength>`와 `<Textarea.Counter>`                                                       |
| `labelIcon`                                                                                     | `<Textarea.Label suffix={<Icon … />}>`                                                                      |
| `style="outlined" \| "empty"`                                                                   | 제거 — `outlined` 표현으로 고정                                                                             |
| `validation="none" \| "error"`                                                                  | `status="default" \| "success" \| "error"`                                                                  |
| `interaction="enabled" \| "disabled" \| "readOnly"`                                             | `disabled` / `readonly` (+ `required`) boolean prop                                                         |
| `height` / `minHeight`                                                                          | `Textarea.Control`에 CSS로 지정                                                                             |
| `InputAreaProps`, `InputAreaStyle`, `InputAreaLayout`, `InputAreaValidation`, `InputAreaStatus` | `TextareaProps`, `TextareaControlProps`, `TextareaLabelProps`, `TextareaHelperProps`, `TextareaFooterProps` |

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
