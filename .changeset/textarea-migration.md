---
"@jects/jds": minor
---

**Textarea**

내부 `Field` primitive 위에 얹은 공개 compound `Textarea`(여러 줄 텍스트 입력)를 추가합니다. `Textarea.Control`이 필드 컨텍스트(`fieldId`·`status`·`disabled`·`readonly`·`required`)를 소비해 라벨과 실제 입력을 자동으로 연결하고, `status`가 `error`면 `aria-invalid`를, `Textarea.HelperText`가 실제로 렌더될 때만 `aria-describedby`를 전달합니다. `id`는 `Field.Label`의 `htmlFor`와 짝을 이뤄야 하므로 컨텍스트의 `fieldId`로 고정되며 `TextareaControlProps`에서 제외됩니다. `disabled`·`readOnly`·`required`는 컨텍스트 값을 기본으로 쓰되 control 단위로 덮어쓸 수 있게 열려 있습니다. `Textarea.Label` / `Textarea.Content` / `Textarea.HelperText`로 라벨·입력 영역·헬퍼텍스트를 조합합니다. 루트에서 `status`(default/success/error)·`disabled`·`readonly`·`required`를 지원하고, native `div` 속성과 `ref`를 함께 전달할 수 있습니다. 스타일은 outline(테두리)로 고정됩니다.

입력은 controlled(`value`+`onChange`) / uncontrolled(`defaultValue`) 를 모두 지원합니다. `Textarea.Control`에 `maxLength`를 지정하면 박스 내부 우측 하단의 `Textarea.Counter`가 별도 prop 없이 `현재/최대` 형태로 글자 수를 표시합니다(길이는 컨텍스트로 자동 추적). 단, uncontrolled 경로의 길이는 `onChange`를 거치는 변경만 추적하므로 `<form>` reset이나 ref로 `.value`를 직접 바꾸는 경우 카운터가 실제 내용과 어긋날 수 있습니다. `Textarea.Control`은 렌더된 `Textarea.HelperText`가 있을 때만 `aria-describedby`로 헬퍼텍스트를 참조합니다.

**export**

- `Textarea`
- 타입: `TextareaProps`, `TextareaControlProps`, `TextareaContentProps`, `TextareaLabelProps`, `TextareaHelperTextProps`

```tsx
<Textarea status='error' required>
  <Textarea.Label suffixSlot={<Icon name='information-line' size='2xs' />}>자기소개</Textarea.Label>
  <Textarea.Content>
    <Textarea.Control
      maxLength={200}
      placeholder='내용을 입력하세요'
      value={value}
      onChange={onChange}
    />
    <Textarea.Counter />
  </Textarea.Content>
  <Textarea.HelperText>200자 이내로 입력해주세요</Textarea.HelperText>
</Textarea>
```

**마이그레이션 (구 `Input.InputArea` → `Textarea`)**

기존 단일 컴포넌트 `Input.InputArea`를 제거하고 compound `Textarea`로 대체했습니다. `Input` 네임스페이스에서 `InputArea`가 빠지므로 소비처는 최상위 `Textarea`로 마이그레이션이 필요합니다. (breaking change)

| 항목        | AS-IS `Input.InputArea`                               | TO-BE `Textarea`                                                                       |
| ----------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 형태        | 단일 컴포넌트 (prop 기반)                             | compound                                                                               |
| 라벨        | `label` prop                                          | `<Textarea.Label>`                                                                     |
| 헬퍼텍스트  | `helperText` prop                                     | `<Textarea.HelperText>` (박스 아래)                                                    |
| 입력        | 루트에 `value` / `onChange` (필수)                    | `<Textarea.Control>` — controlled(`value`+`onChange`) / uncontrolled(`defaultValue`)   |
| 글자 수     | `maxLength` prop (내장 카운터)                        | `<Textarea.Control maxLength>` + `<Textarea.Counter>` (박스 내부 우측 하단, 자동 추적) |
| 인포 아이콘 | `labelIcon` prop                                      | `<Textarea.Label suffixSlot={<Icon … />}>`                                             |
| 스타일      | `style="outlined" \| "empty"`                         | outline(테두리) 고정 (`fieldStyle` 미노출)                                             |
| 유효성      | `validation="none" \| "error"`                        | `status="default" \| "success" \| "error"`                                             |
| 상호작용    | `interaction="enabled" \| "disabled" \| "readOnly"`   | `disabled` / `readonly` (+ `required`) boolean prop                                    |
| 높이        | `height` / `minHeight` prop (기본 `min-height` 112px) | `Textarea.Control` 에 CSS (기본 `min-height` 48px, `resize: vertical`)                 |
| 타입        | `InputAreaProps`, `InputAreaStyle` 등                 | `TextareaProps`, `TextareaControlProps`, `TextareaContentProps` 등                     |

**AS-IS**

```tsx
<Input.InputArea
  label='자기소개'
  helperText='200자 이내로 입력해주세요'
  validation='error'
  maxLength={200}
  value={value}
  onChange={onChange}
/>
```

**TO-BE**

```tsx
<Textarea status='error'>
  <Textarea.Label>자기소개</Textarea.Label>
  <Textarea.Content>
    <Textarea.Control
      maxLength={200}
      placeholder='내용을 입력하세요'
      value={value}
      onChange={onChange}
    />
    <Textarea.Counter />
  </Textarea.Content>
  <Textarea.HelperText>200자 이내로 입력해주세요</Textarea.HelperText>
</Textarea>
```

**전역 reset 변경 (breaking)**

`textarea:not([rows]) { min-height: 10em }` 전역 규칙을 제거했습니다.
`rows` 없이 쓰던 모든 `<textarea>`의 최소 높이가 사라지므로, 필요하면 `rows`를 지정하거나 직접 `min-height`를 주세요.
JDS `Textarea`는 자체 스타일(`min-height: 3rem`)로 높이를 잡습니다.

이 규칙은 `Textarea` 소비처만이 아니라 JDS reset을 적용한 앱의 `rows` 없는 raw `<textarea>` 전부에 걸려 있었으므로, 영향 범위가 이 컴포넌트보다 넓습니다.
