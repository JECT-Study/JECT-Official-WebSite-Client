---
"@jects/jds": minor
---

**tokens**

`@jects/jds/tokens`에서 Emotion theme 객체인 `theme`과 전역 스타일 객체인 `globalStyles`를 제거합니다. 토큰은 `vars` 하나로 통일됩니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                                                                    | TO-BE                                                                               |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `theme.colorPrimitive`, `theme.color`, `theme.scheme`, `theme.environment`, `theme.typo` | `vars.colorPrimitive`, `vars.color`, `vars.scheme`, `vars.environment`, `vars.typo` |
| `theme.textStyle`                                                                        | `@jects/jds/utils`의 `getTitleClassName`, `getBodyClassName`, `getLabelClassName`   |
| `theme.breakPoint`                                                                       | 제거 — 대체재 없음                                                                  |
| `globalStyles`                                                                           | 제거 — `@jects/jds/theme`를 import하면 전역 토큰 CSS가 적용됨                       |

`theme`은 `var(--primitive-*)`, `var(--semantic-*)` 문자열을 담은 객체였고 해당 CSS 변수는 `globalStyles`가 주입했습니다. `vars`는 `--color-semantic-*`, `--scheme-semantic-*` 등 Vanilla Extract 계약을 가리키므로 변수 이름이 달라집니다. `theme.textStyle`은 CSS 속성 객체였지만 대체 유틸은 클래스명을 반환합니다.

토큰 참조입니다.

```diff
- import { theme } from "@jects/jds/tokens";
-
- const card = css`
-   background-color: ${theme.color.semantic.surface.standard};
-   border-radius: ${theme.scheme.semantic.radius[8]};
- `;
+ import { vars } from "@jects/jds/tokens";
+
+ export const card = style({
+   backgroundColor: vars.color.semantic.surface.standard,
+   borderRadius: vars.scheme.semantic.radius["8"],
+ });
```

텍스트 스타일입니다. 제목은 `title-6`부터 `title-1`이 각각 `2xl`, `xl`, `lg`, `md`, `sm`, `xs`에 대응합니다.

```diff
- <h2 css={theme.textStyle["semantic-textStyle-title-6"]}>제목</h2>
+ <h2 className={getTitleClassName({ size: "2xl" })}>제목</h2>
```
