---
"@jects/jds": minor
---

**TextField**

내부 `Field` primitive를 기반으로 공개 compound 컴포넌트인 `TextField`를 추가합니다.

`TextField.Label`·`TextField.Content`·`TextField.HelperText`를 조합해 레이블, 입력 영역, 헬퍼텍스트를 구성하며, 루트에서 `status`(`default`/`success`/`error`), `fieldStyle`(`outline`/`hollow`), `disabled`, `readonly`, `required` 상태를 관리합니다. native `div` props와 `ref` 전달도 지원합니다.

`TextField.Input`은 필드 context를 기반으로 `disabled`·`readOnly`·`required` 상태를 적용하며, 필요한 경우 입력 요소에서 직접 전달한 값으로 덮어쓸 수 있습니다.

`id`는 `TextField` 루트에서 관리합니다. `<TextField id="email">`처럼 전달하면 입력 요소의 `id`, `TextField.Label`의 `htmlFor`, `TextField.HelperText`의 `id`가 자동으로 연결되며, 생략 시 `useId`로 생성합니다.

`status`가 `error`이면 입력 요소에 `aria-invalid`를 적용하고, 그 외의 상태에서는 외부에서 전달한 값을 그대로 사용합니다. `aria-describedby`는 `TextField.HelperText`가 렌더될 때만 헬퍼텍스트 id로 연결하며, 외부에서 전달한 값이 있으면 헬퍼텍스트 id와 병합해 상위 컴포넌트에서 주입한 접근성 속성도 유지합니다.

`TextField.Input`에서 `disabled`·`readonly`를 덮어쓰면 `TextField.Content`가 테두리 색상·배경 색상·인터랙션을 함께 반영하고, `disabled`는 `TextField.Label`과 `TextField.HelperText`의 색상까지 반영해 필드 전체의 상태가 일치하도록 처리합니다.

`TextField.Content`는 입력 좌우에 아이콘·버튼 등 부가 요소를 배치할 수 있으며, 입력은 controlled(`value`/`onChange`)와 uncontrolled(`defaultValue`) 방식을 모두 지원합니다.

`TextField.Label`은 `prefixSlot`·`suffixSlot`을 통해 레이블 앞뒤에 도움말 아이콘 등의 부가 요소를 배치할 수 있습니다.

**export**

- `TextField`
- 타입: `TextFieldProps`, `TextFieldInputProps`, `TextFieldContentProps`, `TextFieldLabelProps`, `TextFieldHelperTextProps`

```tsx
<TextField status='error' required>
  <TextField.Label suffixSlot={<Icon name='information-line' size='2xs' />}>이메일</TextField.Label>
  <TextField.Content>
    <TextField.Input placeholder='이메일을 입력하세요' value={value} onChange={onChange} />
  </TextField.Content>
  <TextField.HelperText>유효한 이메일 주소를 입력해주세요</TextField.HelperText>
</TextField>
```

**마이그레이션 (구 `Input.TextField` → `TextField`)**

기존 단일 컴포넌트 `Input.TextField`(및 `Input.TextField` 버튼형)를 제거하고 compound `TextField`로 대체했습니다. `Input` 네임스페이스에서 `TextField`가 빠지므로 소비처는 최상위 `TextField`로 마이그레이션이 필요합니다. (breaking change)

| 항목        | AS-IS `Input.TextField`                             | TO-BE `TextField`                                                                                                   |
| ----------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 형태        | 단일 컴포넌트 (prop 기반)                           | compound                                                                                                            |
| 레이블      | `label` prop                                        | `<TextField.Label>`                                                                                                 |
| 헬퍼텍스트  | `helperText` prop                                   | `<TextField.HelperText>`                                                                                            |
| 입력        | 루트에 `value` / `onChange` (필수)                  | `<TextField.Input>` — controlled(`value`+`onChange`) / uncontrolled(`defaultValue`)                                 |
| 인포 아이콘 | `isWithInfoIcon` prop                               | `<TextField.Label suffixSlot={<Icon … />}>`                                                                         |
| 스타일      | `style="outlined" \| "empty"`                       | `fieldStyle="outline" \| "hollow"`                                                                                  |
| 유효성      | `validation="none" \| "error" \| "success"`         | `status="default" \| "success" \| "error"`                                                                          |
| 상호작용    | `interaction="enabled" \| "disabled" \| "readOnly"` | `disabled` / `readonly` (+ `required`) boolean prop                                                                 |
| 버튼형      | `labelIcon` / `button` (TextFieldButton)            | `TextField.Content` / `TextField.Label` 슬롯에 직접 배치                                                            |
| 입력 타이포 | `body-sm`                                           | `body-md` (시각 변경)                                                                                               |
| 타입        | `TextFieldPublicProps`, `TextFieldButtonProps`      | `TextFieldProps`, `TextFieldInputProps`, `TextFieldContentProps`, `TextFieldLabelProps`, `TextFieldHelperTextProps` |

**AS-IS**

```tsx
<Input.TextField
  label='이메일'
  helperText='유효한 이메일 주소를 입력해주세요'
  validation='error'
  interaction='disabled'
  isWithInfoIcon
  value={value}
  onChange={onChange}
/>
```

**TO-BE**

```tsx
<TextField status='error' disabled>
  <TextField.Label suffixSlot={<Icon name='information-line' size='2xs' />}>이메일</TextField.Label>
  <TextField.Content>
    <TextField.Input placeholder='이메일을 입력하세요' value={value} onChange={onChange} />
  </TextField.Content>
  <TextField.HelperText>유효한 이메일 주소를 입력해주세요</TextField.HelperText>
</TextField>
```
