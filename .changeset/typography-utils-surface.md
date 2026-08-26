---
"@jects/jds": minor
---

**typography 유틸**

`@jects/jds/utils`가 노출하는 타이포 표면이 `getLabelClassName`, `getTitleClassName`, `getBodyClassName` 세 함수와 그 옵션 타입으로 좁혀집니다. recipe를 그대로 내보내던 `typography` 객체, 내부 전용 헬퍼, 제거된 `Label` 컴포넌트에서 남아 있던 타입이 사라집니다. 이 변경으로 JDS 컴포넌트의 렌더 결과가 달라지지는 않습니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                                     | TO-BE                                                        |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| `typography.label`, `typography.title`, `typography.body` | `getLabelClassName`, `getTitleClassName`, `getBodyClassName` |
| `typography.inheritColor`                                 | 제거 — 해당 요소에 `color: inherit` 직접 선언                |
| `shouldForwardTypographyProp`                             | 제거 — 내부 전용                                             |
| `LabelOwnProps`                                           | 제거 — `Menu.Category`의 prop 타입은 `MenuCategoryProps`     |
| `LabelTextAlign`, `LabelCursor`                           | 제거 — `Menu.Category`의 `textAlign`, `cursor` prop도 제거   |
| `TEXT_ALIGN_MAPPING`                                      | 제거                                                         |

```diff
-import { typography } from "@jects/jds/utils";
+import { getLabelClassName } from "@jects/jds/utils";

-<span className={clsx(typography.label({ size: "sm" }), typography.inheritColor)}>레이블</span>
+<span className={getLabelClassName({ size: "sm" })} style={{ color: "inherit" }}>
+  레이블
+</span>
```
