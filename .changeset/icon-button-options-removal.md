---
"@jects/jds": minor
---

**IconButton**

`ICON_BUTTON_HIERARCHY_OPTIONS`, `ICON_BUTTON_SIZE_OPTIONS` 상수를 공개 API에서 제거합니다.

두 상수는 런타임 배열이었고 대체재인 `IconButtonSize`, `IconButtonHierarchy`는 타입입니다. 타입 위치에서 참조하던 코드는 이름만 바꾸면 되지만, 값 목록을 순회하거나 길이를 재는 등 런타임에서 쓰던 코드는 소비처가 배열을 직접 정의해야 합니다.

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
