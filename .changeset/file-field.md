---
"@jects/jds": minor
---

**FileField**

파일 하나를 첨부하는 `FileField`를 추가합니다. 필드 공통 동작은 `Field` 항목에서 다룹니다.

`FileField.Label`, `FileField.Input`, `FileField.Footer`, `FileField.Helper`, `FileField.Size`로 구성합니다. 박스 전체가 파일 선택창을 여는 트리거이고, 파일이 선택되면 클립 아이콘과 파일명을 표시하며 삭제 버튼이 표시됩니다. 박스를 다시 누르면 다른 파일로 교체할 수 있습니다.

`FileField.Size`는 `Footer`의 카운터 자리에서 선택된 파일의 용량을 표시하고, 파일이 없으면 렌더하지 않습니다. 용량은 1024 단위로 계산해 소수점 한 자리까지 내림한 값을 표시합니다.

`value`와 `defaultValue`는 `name`과 `size`를 가진 `FileFieldValue`를 받습니다. `File`이 구조적으로 이 타입에 해당하므로 그대로 전달할 수 있고, 서버에 이미 있는 파일처럼 실제 바이트가 없으면 이름과 용량만 전달합니다. 이 경우 native 폼 전송에는 포함되지 않으므로 필요하면 소비처가 따로 전송해야 합니다. `onChange`가 주는 값은 선택창에서 고른 `File` 또는 `null`입니다.

`accept`는 native 속성으로도 함께 전달하며 확장자, MIME 타입, `image/*`와 `*/*` 형태의 와일드카드를 받습니다. `maxSize`는 바이트로 지정합니다. 두 조건을 만족하지 않는 파일을 고르면 값에 반영하지 않고 `onError`를 호출하며, 전달되는 값의 타입은 `FileFieldError`이고 `type`은 `INVALID_TYPE` 또는 `FILE_TOO_LARGE`입니다.

`placeholder`로 파일이 없을 때 표시할 문구를, `suffix`로 삭제 버튼 오른쪽에 놓을 부가 요소를 지정할 수 있습니다.

`disabled`와 `readonly`에서는 클릭과 드래그 앤 드롭 모두 값을 바꾸지 않습니다. 읽기 전용 여부는 `data-readonly`로 판단해야 합니다.

폼이 초기화되면 표시 값도 `defaultValue`로 초기화됩니다.

입력 요소가 `input[type="file"]`이라 `aria-required`, `aria-readonly`, `aria-invalid`가 적용되지 않습니다. 세 속성을 붙이지 않는 대신 필수와 읽기 전용, 오류 상태를 시각적으로는 표시되지 않는 별도 요소로 노출하고 표시 중인 파일명, `placeholder`와 함께 `aria-describedby`로 연결합니다. `aria-invalid`는 prop으로도 받지 않습니다.

타입 `FileFieldProps`, `FileFieldInputProps`, `FileFieldSizeProps`, `FileFieldValue`, `FileFieldError`, `FileFieldErrorType`, `FileFieldLabelProps`, `FileFieldHelperProps`, `FileFieldFooterProps`를 함께 내보냅니다.

```tsx
<FileField required>
  <FileField.Label>포트폴리오</FileField.Label>
  <FileField.Input
    name='portfolio'
    accept='.pdf'
    maxSize={10 * 1024 * 1024}
    placeholder='파일을 첨부해주세요'
    value={file}
    onChange={setFile}
    onError={handleError}
  />
  <FileField.Footer>
    <FileField.Helper>10MB 이하의 PDF 파일을 첨부해주세요</FileField.Helper>
    <FileField.Size />
  </FileField.Footer>
</FileField>
```
