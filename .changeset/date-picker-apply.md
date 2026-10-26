---
"@jects/jds": patch
---

**DatePicker**

`withActionBar`에서 적용 버튼으로 확정한 날짜 또는 `null`을 받는 `onApply` 콜백을 추가합니다. `onApply`를 지정하면 선택값이 이미 비어 있어도 지우기를 누른 뒤 적용할 수 있습니다. 기존 사용 코드는 변경할 필요가 없습니다.

- `onApply`, 기본값 미지정, 적용 버튼으로 확정한 값 전달
- `onChange`와 함께 지정하면 값 변경 알림 뒤 `onApply` 호출, 값이 바뀌지 않은 지우기 적용에서는 `onApply`만 호출
