---
"@jects/jds": minor
---

**TextField**

내부 `Field` primitive 위에 얹은 공개 compound `TextField`를 추가합니다. `TextField.Label` / `TextField.Content` / `TextField.HelperText`로 라벨·입력 영역·헬퍼텍스트를 조합하며, 루트에서 `status`(default/success/error)·`fieldStyle`(outline/hollow)·`disabled`·`readonly`·`required`를 지원하고 native `div` 속성과 `ref`를 함께 전달할 수 있습니다.

`TextField.Input`은 필드 컨텍스트를 소비해 `disabled`·`readOnly`·`required`를 루트 상태에서 가져오며, 필요하면 `TextField.Input`에 직접 넘겨 덮어쓸 수 있습니다. `id`는 컨텍스트의 `fieldId`를 기본값으로 쓰되 직접 넘겨 덮어쓸 수 있으며, 이때는 `TextField.Label`에도 같은 `id`를 넘겨 `htmlFor`를 맞춰야 라벨과 입력의 연결이 유지됩니다. `status`가 `error`면 `aria-invalid`가 함께 전달되고, `TextField.HelperText`가 실제로 렌더될 때만 `aria-describedby`로 연결합니다. 외부에서 `aria-describedby`를 함께 넘기면 헬퍼텍스트 id와 공백으로 병합하므로, `Tooltip.Trigger asChild`처럼 래퍼가 값을 주입하는 경우에도 헬퍼텍스트 연결이 유지됩니다.

`disabled`·`readonly`를 `TextField.Input`에서 덮어쓰면 `TextField.Content`도 그 상태를 함께 반영해 컨테이너와 입력의 상태가 어긋나지 않습니다.

`TextField.Content`는 입력 좌우에 아이콘·버튼 등 부가 요소를 자유롭게 배치할 수 있습니다. 입력은 controlled(`value`+`onChange`) / uncontrolled(`defaultValue`) 를 모두 지원합니다.

`TextField.Label`은 `prefixSlot` / `suffixSlot`으로 라벨 텍스트 앞뒤(및 `required` 별표 뒤)에 도움말 아이콘 등 부가 요소를 배치할 수 있습니다.

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

| 항목             | AS-IS `Input.TextField`                              | TO-BE `TextField`                                                                    |
| ---------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 형태             | 단일 컴포넌트 (prop 기반)                           | compound                                                                             |
| 라벨             | `label` prop                                        | `<TextField.Label>`                                                                  |
| 헬퍼텍스트       | `helperText` prop                                   | `<TextField.HelperText>`                                                             |
| 입력             | 루트에 `value` / `onChange` (필수)                  | `<TextField.Input>` — controlled(`value`+`onChange`) / uncontrolled(`defaultValue`) |
| 인포 아이콘      | `isWithInfoIcon` prop                               | `<TextField.Label suffixSlot={<Icon … />}>`                                           |
| 스타일           | `style="outlined" \| "empty"`                       | `fieldStyle="outline" \| "hollow"`                                                   |
| 유효성           | `validation="none" \| "error" \| "success"`         | `status="default" \| "success" \| "error"`                                           |
| 상호작용         | `interaction="enabled" \| "disabled" \| "readOnly"` | `disabled` / `readonly` (+ `required`) boolean prop                                  |
| 버튼형           | `labelIcon` / `button` (TextFieldButton)            | `TextField.Content` / `TextField.Label` 슬롯에 직접 배치                             |
| 입력 타이포      | `body-sm`                                           | `body-md` (시각 변경)                                                                |
| 타입             | `TextFieldPublicProps`, `TextFieldButtonProps`      | `TextFieldProps`, `TextFieldInputProps`, `TextFieldContentProps`, `TextFieldLabelProps`, `TextFieldHelperTextProps` |

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
