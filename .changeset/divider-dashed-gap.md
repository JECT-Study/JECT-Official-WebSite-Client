---
"@jects/jds": minor
---

**Divider**

`variant="dashed"`의 대시가 6px 선, 6px 간격으로 그려집니다. 이전에는 브라우저가 대시 길이를 정했습니다. `DividerProps`가 `variant` 값에 따라 갈리는 유니온 타입이 되었고, 선이 `border`가 아닌 `background`로 그려집니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                      | TO-BE                                      |
| ------------------------------------------ | ------------------------------------------ |
| `interface X extends DividerProps { ... }` | `type X = DividerProps & { ... }`          |
| `border`로 선 두께나 색을 덮어쓰기         | `thickness` prop, `dividerColorVar`로 지정 |

`DividerProps`를 확장하던 타입은 교차 타입으로 바꿉니다.

```diff
-interface MyDividerProps extends DividerProps {
-  spacing?: number;
-}
+type MyDividerProps = DividerProps & {
+  spacing?: number;
+};
```

`border`로 선을 덮어쓰던 스타일은 제거합니다. 기본 선을 대체하지 않고 겹쳐 그려지며, 요소 높이가 `thickness`만큼 늘어납니다.

```diff
-<Divider className='border-t-2 border-red-500' />
+<Divider thickness='bold' />
```

`dashLength`와 `dashGap`은 `variant="dashed"`를 함께 지정해야 쓸 수 있습니다.

**추가**

- `dashLength` — 점선 한 칸의 길이(px), 기본값 `6`, 최솟값 `1`
- `dashGap` — 점선 사이 간격(px), 지정하지 않으면 `dashLength`를 따라감, 최솟값 `0`

```tsx
<Divider variant='dashed' />                             // 6 / 6
<Divider variant='dashed' dashLength={2} />              // 2 / 2
<Divider variant='dashed' dashLength={2} dashGap={6} />  // 2 / 6
```

**동작 변경 (코드 수정 불필요)**

- 강제 색상 모드(`forced-colors: active`)에서 `dashLength`와 `dashGap`이 반영되지 않음, 브라우저가 정한 대시가 적용됨
- `dividerColorVar`로 색을 덮어쓰는 방식은 그대로 동작
- `orientation`, `thickness`, `variant`와 렌더 엘리먼트, `role`은 변경 없음
