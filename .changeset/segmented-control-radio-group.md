---
"@jects/jds": minor
---

**SegmentedControls**

`SegmentedControl`을 `SegmentedControls`로 이름을 바꾸고, 내부 동작을 Radix `ToggleGroup`에서 `RadioGroup`으로, 스타일을 Emotion에서 vanilla-extract로 재작성합니다. `Root`, `Item` 구조는 유지됩니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                        | TO-BE                                       |
| -------------------------------------------- | ------------------------------------------- |
| `SegmentedControl`                           | `SegmentedControls` (import과 JSX 모두)     |
| `SegmentedControl{Size,RootProps,ItemProps}` | `SegmentedControls*`                        |
| props 기준이 `ToggleGroup`                   | `RadioGroup` — ToggleGroup 전용 props 제거  |
| `asChild`                                    | 제거 — Item은 `asChild?: never`로 타입 차단 |
| `data-state="on" \| "off"`                   | `data-state="checked" \| "unchecked"`       |

```diff
- import { SegmentedControl } from "@jects/jds";
- <SegmentedControl.Root defaultValue="list">
-   <SegmentedControl.Item value="list" asChild>
-     <button type="button">목록</button>
-   </SegmentedControl.Item>
- </SegmentedControl.Root>
+ import { SegmentedControls } from "@jects/jds";
+ <SegmentedControls.Root defaultValue="list">
+   <SegmentedControls.Item value="list">목록</SegmentedControls.Item>
+ </SegmentedControls.Root>
```

상태 attribute로 스타일링했다면 값을 교체합니다.

```diff
- [data-state="on"] { font-weight: 600; }
+ [data-state="checked"] { font-weight: 600; }
```
