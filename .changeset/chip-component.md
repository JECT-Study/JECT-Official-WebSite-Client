---
"@jects/jds": minor
---

**Chip**

선택된 필터, 태그, 입력된 값처럼 현재 화면에 적용된 조건을 짧게 보여주고 제거할 수 있는 `Chip` 컴포넌트를 추가합니다.

- `label`: Chip의 기본 레이블입니다. 줄바꿈이나 말줄임 없이 전체 내용을 표시합니다.
- `valueLabel`: `string[]` 형태의 값 레이블입니다. 여러 값은 쉼표로 구분하며, 표시 영역이 160px을 초과하면 말줄임표로 처리합니다.
- `disabled`: Chip의 선택 동작과 제거 동작을 모두 비활성화합니다.
- `onClick`: Chip 본문을 눌렀을 때 호출됩니다.
- `onRemove`: 오른쪽 제거 버튼을 눌렀을 때 호출됩니다.

```tsx
// 기본 사용
<Chip label="레이블" onClick={handleClick} onRemove={handleRemove} />

// 필터 이름과 선택된 값을 함께 표시
<Chip
  label="레이블"
  valueLabel={["값 레이블 1", "값 레이블 2", "값 레이블 3"]}
  onClick={handleClick}
  onRemove={handleRemove}
/>

// 빈 배열은 기본 상태로 표시
<Chip
  label="레이블"
  valueLabel={[]}
  onClick={handleClick}
  onRemove={handleRemove}
/>

// 비활성 상태
<Chip
  label="레이블"
  valueLabel={["값 레이블"]}
  disabled
  onClick={handleClick}
  onRemove={handleRemove}
/>
```
