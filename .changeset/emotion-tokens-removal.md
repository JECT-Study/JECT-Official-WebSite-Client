---
"@jects/jds": minor
---

**tokens**

`@jects/jds/tokens`에서 Emotion theme 객체인 `theme`과 전역 스타일 객체인 `globalStyles`를 제거합니다. 토큰 참조는 `vars`로, 텍스트 스타일은 `textStyles`로 대체합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                                                                    | TO-BE                                                                               |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `theme.colorPrimitive`, `theme.color`, `theme.scheme`, `theme.environment`, `theme.typo` | `vars.colorPrimitive`, `vars.color`, `vars.scheme`, `vars.environment`, `vars.typo` |
| `theme.textStyle`                                                                        | `textStyles`                                                                        |
| `theme.breakPoint`                                                                       | 제거 — 대체재 없음                                                                  |
| `globalStyles`                                                                           | 제거 — `@jects/jds/theme`를 import하면 전역 토큰 CSS가 적용됨                       |

`theme`은 `var(--primitive-*)`, `var(--semantic-*)` 문자열을 담은 객체였고 해당 CSS 변수는 `globalStyles`가 주입했습니다. `vars`는 `--color-semantic-*`, `--scheme-semantic-*` 등 Vanilla Extract 계약을 가리키므로 변수 이름이 달라집니다. `theme.textStyle`과 `textStyles`는 둘 다 CSS 속성 객체를 담지만, 키가 `semantic-textStyle-title-6` 같은 단일 문자열에서 `title["6"]`처럼 세그먼트로 나뉜 형태로 바뀝니다.

`vars`는 `var(--...)` 문자열을, `textStyles`는 CSS 속성 객체를 담고 있으므로 특정 스타일링 도구를 요구하지 않습니다. 인라인 `style`, CSS-in-JS, vanilla-extract의 `style()` 어디에나 그대로 넘길 수 있습니다.

토큰 참조입니다.

```diff
- import { theme } from "@jects/jds/tokens";
+ import { vars } from "@jects/jds/tokens";

- theme.color.semantic.surface.standard
+ vars.color.semantic.surface.standard

- theme.scheme.semantic.radius[8]
+ vars.scheme.semantic.radius["8"]
```

텍스트 스타일을 인라인 `style`로 옮기는 경우입니다.

```diff
- <h2 css={theme.textStyle["semantic-textStyle-title-6"]}>제목</h2>
+ <h2 style={textStyles.title["6"]}>제목</h2>
```
