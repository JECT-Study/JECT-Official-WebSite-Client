---
"@jects/jds": minor
---

**tokens**

textStyle을 전역 CSS 클래스 대신 중첩 스타일 객체로 제공합니다. `globalStyle(".semantic-textStyle-*")` 선언과 `textStyleClassNames`가 사라지고, 토큰명을 세그먼트로 쪼갠 `textStyles` 객체가 그 자리를 대신합니다. 클래스명으로 스타일링하던 코드는 객체 참조로 바꿔야 합니다. JDS 컴포넌트의 렌더 결과는 그대로입니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                               | TO-BE                                    |
| ----------------------------------- | ---------------------------------------- |
| `textStyleClassNames`               | 제거 — `textStyles`의 키로 대체          |
| 전역 클래스 `.semantic-textStyle-*` | 제거 — `textStyles`의 값을 스타일에 전개 |

```diff
-// Component.tsx
-import { textStyleClassNames } from "@jects/jds/tokens";
-
-<span className='semantic-textStyle-body-md-normal'>본문</span>
+// styles.css.ts
+import { style } from "@vanilla-extract/css";
+import { textStyles } from "@jects/jds/tokens";
+
+export const bodyMd = style(textStyles.body.md.normal);
+
+// Component.tsx
+import { bodyMd } from "./styles.css";
+
+<span className={bodyMd}>본문</span>
```

**추가**

- `textStyles` — `title["6"]`, `label.md.bold`, `body["2xs"].normal`, `syntax.lg`처럼 토큰명 세그먼트로 접근하는 스타일 객체
