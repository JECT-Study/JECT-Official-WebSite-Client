---
"@jects/jds": minor
---

**utils**

`@jects/jds/utils`에서 Emotion `Theme` 객체를 인자로 받던 스타일 함수를 제거합니다. 인터랙션 레이어는 `overlay` recipe로, 환경 토큰은 `vars`로 대체합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                        | TO-BE                                                                      |
| -------------------------------------------- | -------------------------------------------------------------------------- |
| `Interaction`                                | `overlay` recipe                                                           |
| `InteractionLayer`, `InteractionLayerParams` | `overlay` recipe                                                           |
| `depth`                                      | `vars.color.semantic.surface.*`                                            |
| `level`                                      | `vars.environment.semantic.zIndex.*`, `vars.environment.semantic.shadow.*` |
| `shadow`                                     | `vars.environment.semantic.shadow.*`                                       |

`Interaction`은 `(theme, variant, density, fillColor, state, borderRadius)`를 순서대로 받았지만 `overlay`는 `hierarchy`, `density`, `interaction`을 옵션 객체로 받습니다. `overlay`는 `::after`에 hover, pressed 오버레이를 그리며, 요소의 `position: relative`와 `::after`의 `inset`, `borderRadius`는 호출부가 지정합니다. `disabled` 상태는 `data-disabled` 속성으로 표시합니다. `interaction`은 press를 어느 요소에서 읽을지 정하는 값으로, 기본값 `self`는 자신의 `:active`를, `delegated`는 직계 자식 `[data-interaction-target]`의 `:active`를 읽습니다.

인터랙션 레이어입니다.

```diff
- const trigger = (theme: Theme) => css`
-   ${Interaction(theme, "normal", "normal", "default")}
- `;
+ export const trigger = style([
+   overlay({ hierarchy: "primary", density: "normal" }),
+   {
+     position: "relative",
+     borderRadius: vars.scheme.semantic.radius["6"],
+     selectors: {
+       "&::after": { inset: 0, borderRadius: "inherit" },
+     },
+   },
+ ]);
```

환경 토큰입니다. `level`은 `zIndex`와 `shadow`를 함께 반환했으므로 두 토큰을 각각 지정합니다.

```diff
- const surface = (theme: Theme) => css`
-   ${depth(theme, "shallow")}
-   ${level(theme, "floated")}
- `;
+ export const surface = style({
+   backgroundColor: vars.color.semantic.surface.shallow,
+   zIndex: vars.environment.semantic.zIndex.floated,
+   boxShadow: vars.environment.semantic.shadow.floated,
+ });
```
