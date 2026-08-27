---
"@jects/jds": minor
---

**IconButton**

`hierarchy="accent"`의 색상 오버라이드를 CSS 변수 직접 노출 방식에서 `accentColor` prop으로 변경합니다. `iconButtonAccentColor`와 `iconButtonAccentDisabledColor`는 더 이상 export되지 않으므로, 두 변수를 `assignInlineVars`로 주입하던 호출부는 수정이 필요합니다. 렌더링되는 색상은 동일합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                                    | TO-BE              |
| -------------------------------------------------------- | ------------------ |
| `iconButtonAccentColor`, `iconButtonAccentDisabledColor` | `accentColor` prop |

```diff
- import { assignInlineVars } from "@vanilla-extract/dynamic";
- import { IconButton, iconButtonAccentColor, iconButtonAccentDisabledColor, vars } from "@jects/jds";
-
- <IconButton
-   icon='x'
-   hierarchy='accent'
-   aria-label='삭제'
-   style={assignInlineVars({
-     [iconButtonAccentColor]: vars.color.semantic.feedback.destructive.normal,
-     [iconButtonAccentDisabledColor]: vars.color.semantic.feedback.destructive.normal,
-   })}
- />
+ import { IconButton, vars } from "@jects/jds";
+
+ <IconButton
+   icon='x'
+   hierarchy='accent'
+   aria-label='삭제'
+   accentColor={{ normal: vars.color.semantic.feedback.destructive.normal }}
+ />
```

**추가**

- `accentColor` (`{ normal: string; disabled?: string }`) — `hierarchy="accent"`의 색 지정, `disabled`를 생략하면 `normal`이 적용
