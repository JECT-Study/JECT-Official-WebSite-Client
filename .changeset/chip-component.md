---
"@jects/jds": minor
---

**Chip**

선택된 필터, 태그, 입력된 값처럼 현재 화면에 적용된 조건을 짧게 보여주고 제거할 수 있는 `Chip` 컴포넌트를 추가합니다.

| prop             | 기본값  | 설명                                                                                  |
| ---------------- | ------- | ------------------------------------------------------------------------------------- |
| `label`          | -       | 기본 레이블. 줄바꿈이나 말줄임 없이 전체 내용을 표시합니다                            |
| `valueLabel`     | -       | `string[]` 값 레이블. 표시할 값이 있으면 활성 상태가 되고 여러 값은 쉼표로 구분합니다 |
| `valueLabelOnly` | `false` | 활성 상태에서 `label`을 시각적으로 숨기고 `valueLabel`만 표시합니다                   |
| `disabled`       | `false` | 선택 동작과 제거 동작을 모두 비활성화합니다                                           |
| `onClick`        | -       | Chip 본문을 눌렀을 때 호출됩니다                                                      |
| `onRemove`       | -       | 오른쪽 제거 버튼을 눌렀을 때 호출됩니다                                               |

`valueLabel` 표시 영역이 160px을 넘으면 말줄임표로 처리합니다. `valueLabelOnly`로 숨긴 `label`은 접근성 트리에 유지됩니다. `valueLabel`이 빈 배열이거나 빈 문자열로만 구성된 경우 기본 상태로 표시하며, 이때 `valueLabelOnly`를 함께 전달해도 적용되지 않고 `label`이 화면에 유지됩니다.

```tsx
<Chip label='레이블' onClick={handleClick} onRemove={handleRemove} />

<Chip
  label='레이블'
  valueLabel={["값 레이블 1", "값 레이블 2", "값 레이블 3"]}
  onClick={handleClick}
  onRemove={handleRemove}
/>

<Chip
  label='레이블'
  valueLabel={["값 레이블 1", "값 레이블 2", "값 레이블 3"]}
  valueLabelOnly
  onClick={handleClick}
  onRemove={handleRemove}
/>

<Chip label='레이블' valueLabel={["값 레이블"]} disabled onClick={handleClick} onRemove={handleRemove} />
```
