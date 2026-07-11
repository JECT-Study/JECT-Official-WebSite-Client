---
"@jects/jds": minor
---

**Chip**

선택된 필터, 태그, 입력된 값처럼 현재 화면에 적용된 조건을 짧게 보여주고 제거할 수 있는 `Chip` 컴포넌트를 추가합니다.

- `label`: Chip의 기본 레이블입니다.
- `valueLabel`: `label` 뒤에 구분선과 함께 표시되는 값 레이블입니다.
- `activated`: 선택되었거나 적용된 상태를 시각적으로 표시합니다.
- `disabled`: Chip의 선택 동작과 삭제 동작을 모두 비활성화합니다.
- `onClick`: Chip 본문을 눌렀을 때 호출됩니다.
- `onRemove`: 오른쪽 삭제 버튼을 눌렀을 때 호출됩니다.

```tsx
// 기본 사용
<Chip label="레이블" onClick={handleClick} onRemove={handleRemove} />

// 필터 이름과 선택된 값을 함께 표시
<Chip
  label="레이블"
  valueLabel="값 레이블"
  activated
  onClick={handleClick}
  onRemove={handleRemove}
/>

// 비활성 상태
<Chip
  label="모집 상태"
  valueLabel="값 레이블"
  disabled
  onClick={handleClick}
  onRemove={handleRemove}
/>
```
