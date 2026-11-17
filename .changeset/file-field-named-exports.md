---
"@jects/jds": patch
---

**FileField**

`FileFieldInput` 등 기존 파트의 개별 export를 추가합니다. 서버 컴포넌트에서 직렬화 가능한 props로 개별 파트를 조합할 수 있습니다. 기존 점 표기 API를 사용하는 코드는 수정할 필요가 없습니다.

**추가**

| 추가 API          | 대상                      |
| ----------------- | ------------------------- |
| `FileFieldInput`  | `FileField.Input`의 별칭  |
| `FileFieldSize`   | `FileField.Size`의 별칭   |
| `FileFieldLabel`  | `FileField.Label`의 별칭  |
| `FileFieldFooter` | `FileField.Footer`의 별칭 |
| `FileFieldHelper` | `FileField.Helper`의 별칭 |
