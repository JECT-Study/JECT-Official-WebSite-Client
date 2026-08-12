---
"@jects/jds": minor
---

**Callout**

Callout의 스타일링을 Emotion에서 vanilla-extract로 마이그레이션하고 `hierarchy`, `labelButtonProps` prop을 제거합니다. 두 prop을 쓰던 코드는 수정이 필요합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                | TO-BE                                        |
| ------------------------------------ | -------------------------------------------- |
| `hierarchy="primary" \| "secondary"` | 제거 — 스타일은 `feedback`으로만 결정합니다  |
| `labelButtonProps`                   | 제거 — 버튼은 `children`에 직접 렌더링합니다 |

버튼 정렬이 필요하면 flex 컨테이너로 감쌉니다.

```diff
- <Callout hierarchy="secondary" labelButtonProps={{ children: "확인", onClick: handleClick }}>
-   본문 내용
- </Callout>
+ <Callout>
+   <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
+     본문 내용
+     <LabelButton hierarchy="secondary" onClick={handleClick}>확인</LabelButton>
+   </div>
+ </Callout>
```

**추가**

- `icon?: IconName` — `title`이 있을 때만 지정할 수 있는 아이콘
- `feedback`에 `"none"` 추가, 기본값입니다
- 네이티브 `div` 속성 전달과 `ref` 포워딩 지원
- 타입 `CalloutProps`, `CalloutFeedback`, `CalloutSize`를 새로 내보냅니다

**동작 변경 (코드 수정 불필요)**

- title 타이포가 size별 bold로 변경됩니다.
- `notifying`의 색상이 `static.inverse`로 변경됩니다.
- title과 body 사이 gap을 size별로 조정합니다. sm, xs는 8입니다.
