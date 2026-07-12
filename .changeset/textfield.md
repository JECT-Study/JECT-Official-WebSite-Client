---
"@jects/jds": minor
---

**TextField**

내부 `Field` primitive 위에 얹은 공개 compound `TextField`를 추가합니다. `TextField.Input`이 필드 컨텍스트(`fieldId`·`disabled`·`readonly`)를 소비해 라벨과 실제 입력을 자동으로 연결하며, `TextField.Label` / `TextField.Content` / `TextField.HelperText`로 라벨·입력 영역·헬퍼텍스트를 조합합니다. 루트에서 `status`(default/success/error)·`fieldStyle`(outline/hollow)·`disabled`·`readonly`·`required`를 지원하고, native `div` 속성과 `ref`를 함께 전달할 수 있습니다.

`TextField.Content`는 입력 좌우에 아이콘·버튼 등 부가 요소를 자유롭게 배치할 수 있습니다. 입력은 controlled(`value`+`onChange`) / uncontrolled(`defaultValue`) 를 모두 지원합니다.

`TextField.Label`은 `leftSlot` / `rightSlot`으로 라벨 텍스트 좌우(및 `required` 별표 오른쪽)에 도움말 아이콘 등 부가 요소를 배치할 수 있습니다.

**export**

- `TextField`
- 타입: `TextFieldProps`, `TextFieldInputProps`, `TextFieldContentProps`, `TextFieldLabelProps`, `TextFieldHelperTextProps`

```tsx
<TextField status='error' required>
  <TextField.Label rightSlot={<Icon name='information-line' size='sm' />}>이메일</TextField.Label>
  <TextField.Content>
    <TextField.Input placeholder='이메일을 입력하세요' value={value} onChange={onChange} />
  </TextField.Content>
  <TextField.HelperText>유효한 이메일 주소를 입력해주세요</TextField.HelperText>
</TextField>
```
