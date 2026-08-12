---
"@jects/jds": minor
---

**Radio / Checkbox**

`RadioGroup`과 `CheckboxGroup`이 레이아웃을 직접 관리합니다. 사용처에서 감싸 배치하지 않고 `layout` prop으로 세로(`vertical`) 또는 그리드(`grid`) 레이아웃을 지정하며, `grid`는 `columns`를 함께 지정해야 합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                           | TO-BE                                     |
| ------------------------------- | ----------------------------------------- |
| 사용처의 컨테이너로 아이템 배치 | `layout="vertical" \| "grid"` + `columns` |

```diff
- <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
-   <CheckboxGroup value={value} onChange={setValue} options={options} />
- </div>
+ <CheckboxGroup layout='grid' columns={3} value={value} onChange={setValue} options={options} />
```

**추가**

- `stretched` — 아이템이 전체 너비를 채웁니다. `size`, `variant`처럼 그룹에 지정하면 모든 아이템에 전파되고, `CheckboxGroup` 없이 단독으로 쓰는 `Checkbox`에도 지정할 수 있습니다

**동작 변경 (코드 수정 불필요)**

- 레이블과 헬퍼의 `white-space: nowrap`이 제거되어 폭이 부족하면 텍스트가 개행됩니다.
- `CheckboxGroup`이 `RadioGroup`과 동일하게 방향키, Home, End로 포커스를 이동합니다. 그룹에 Tab으로 진입한 뒤 방향키로 항목을 이동하고 Space로 선택을 토글합니다.
