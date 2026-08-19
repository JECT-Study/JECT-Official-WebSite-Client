---
"@jects/jds": minor
---

**getLabelClassName / getTitleClassName / getBodyClassName**

세 함수가 돌려주는 클래스에 글자 속성만 남습니다. 이전에는 `display: flex`, `align-items: center`, `color`, `cursor`와 정렬까지 함께 적용됐습니다. 정렬과 커서 옵션은 제거됐고, 레이아웃과 색은 클래스를 붙이는 쪽에서 선언해야 합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                                                         | TO-BE                                          |
| ----------------------------------------------------------------------------- | ---------------------------------------------- |
| `getLabelClassName({ textAlign })`                                            | 제거 — 해당 요소에 `justify-content` 직접 선언 |
| `getLabelClassName({ cursor })`                                               | 제거 — 해당 요소에 `cursor` 직접 선언          |
| `getTitleClassName({ textAlign })`                                            | 제거 — 해당 요소에 `justify-content` 직접 선언 |
| `getBodyClassName({ textAlign })`                                             | 제거 — 해당 요소에 `text-align` 직접 선언      |
| `TitleStyleOptions.textAlign`                                                 | 제거                                           |
| `TitleTextAlign`                                                              | 제거                                           |
| `BodyStyleOptions.textAlign`                                                  | 제거                                           |
| `BodyTextAlign`                                                               | 제거                                           |
| 세 함수가 함께 주던 `display: flex`, `align-items: center`, `color`, `cursor` | 제거 — 해당 요소에서 직접 선언                 |

`getLabelClassName`의 옵션 타입은 `LabelOwnProps`에서 `LabelStyleOptions`로 바뀝니다. `Menu.Category`의 `textAlign`, `cursor` prop은 동작이 같습니다.

```diff
-<span className={getLabelClassName({ size: "sm", textAlign: "center", cursor: "pointer" })}>
+<span
+  className={getLabelClassName({ size: "sm" })}
+  style={{
+    display: "flex",
+    alignItems: "center",
+    justifyContent: "center",
+    color: vars.color.semantic.object.bold,
+    cursor: "pointer",
+  }}
+>
   레이블
 </span>
```

**추가**

- `LabelStyleOptions` — `getLabelClassName`이 받는 `size`, `weight`만 담은 타입

**동작 변경 (코드 수정 불필요)**

- 클래스를 붙인 요소 안에서 텍스트와 인라인 요소 사이의 공백이 유지됩니다. 이전에는 flex 컨테이너라 공백이 사라졌습니다.
