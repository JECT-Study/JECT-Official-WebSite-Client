---
"@jects/jds": minor
---

**SegmentedControls**

`SegmentedControl`이 `SegmentedControls`로 변경되고, 내부 동작이 Radix `ToggleGroup` → `RadioGroup`으로, 스타일이 Emotion → vanilla-extract로 재작성되었습니다. `Root` / `Item` 구조는 유지됩니다.

**소비자 영향 (코드 수정 필요)**

| 항목             | AS-IS                                                      | TO-BE                                           |
| ---------------- | ---------------------------------------------------------- | ----------------------------------------------- |
| export 이름      | `SegmentedControl`                                         | `SegmentedControls` (import + JSX 모두)         |
| 타입 이름        | `SegmentedControl{Size,RootProps,ItemProps}`               | `SegmentedControls*`                            |
| props 기준       | `ToggleGroup`                                              | `RadioGroup` (ToggleGroup 전용 props 제거 필요) |
| `asChild`        | 사용 가능                                                  | 제거 (Item은 `asChild?: never`로 타입 차단)     |
| 상태 attribute   | `data-state="on" \| "off"`                                 | `data-state="checked" \| "unchecked"`           |
| 내부 스타일 타입 | `StyledRootProps`, `StyledContentProps`, `StyledItemProps` | 제거                                            |

**마이그레이션 예시**

```diff
- import { SegmentedControl } from "@jects/jds";
+ import { SegmentedControls } from "@jects/jds";

- <SegmentedControl.Root defaultValue="list">
- <SegmentedControl.Item value="list" asChild>
-     <button type="button">목록</button>
- </SegmentedControl.Item>
- </SegmentedControl.Root>
+ <SegmentedControls.Root defaultValue="list">
+ <SegmentedControls.Item value="list">목록</SegmentedControls.Item>
+ </SegmentedControls.Root>
```

```diff
- [data-state="on"] { font-weight: 600; }
+ [data-state="checked"] { font-weight: 600; }
```
