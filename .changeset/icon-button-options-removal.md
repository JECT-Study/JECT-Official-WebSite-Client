---
"@jects/jds": minor
---

**IconButton**

`ICON_BUTTON_HIERARCHY_OPTIONS`, `ICON_BUTTON_SIZE_OPTIONS` 상수를 공개 API에서 제거합니다. 값 목록이 필요하면 타입으로 대체합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                           | TO-BE                 |
| ------------------------------- | --------------------- |
| `ICON_BUTTON_HIERARCHY_OPTIONS` | `IconButtonHierarchy` |
| `ICON_BUTTON_SIZE_OPTIONS`      | `IconButtonSize`      |

```diff
- import { ICON_BUTTON_SIZE_OPTIONS } from "@jects/jds";
- const sizes = [...ICON_BUTTON_SIZE_OPTIONS];
+ import type { IconButtonSize } from "@jects/jds";
+ const sizes: IconButtonSize[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"];
```
