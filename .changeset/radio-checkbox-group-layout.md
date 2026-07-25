---
"@jects/jds": minor
---

**Radio / Checkbox**

`RadioGroup` / `CheckboxGroup`이 레이아웃을 직접 관리합니다. 기존처럼 사용처에서 배치하지 않고, `layout` prop으로 세로(`vertical`) 또는 그리드(`grid`) 레이아웃을 지정합니다. `grid` 사용 시에는 `columns`를 함께 지정해야 합니다.

아이템이 전체 너비를 채우는 `stretched` prop이 추가됩니다. `size` / `variant`처럼 그룹에서 전파되며, 각 아이템에서 개별 지정할 수도 있습니다. 또한 레이블 / 헬퍼의 `white-space: nowrap`이 제거되어 폭이 부족하면 텍스트가 개행됩니다.

`CheckboxGroup`이 `RadioGroup`과 동일하게 방향키, Home, End 키를 이용한 포커스 이동을 지원합니다. 그룹에 Tab으로 진입한 뒤 방향키로 항목을 이동하고, Space로 선택을 토글할 수 있습니다.

**AS-IS**

```tsx
<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
  <CheckboxGroup value={value} onChange={setValue} options={options} />
</div>
```

**TO-BE**

```tsx
<CheckboxGroup layout='grid' columns={3} value={value} onChange={setValue} options={options} />
```
