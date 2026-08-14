---
"@jects/jds": minor
---

**Kbd**

Kbd의 타입별 타이포그래피 스타일을 공통 유틸과 연동하고 크기 규격을 변경합니다. `xs` 크기를 제거하고 `muted` prop을 `isMuted`로 변경했으므로 해당 API를 쓰던 코드는 수정이 필요합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                               | TO-BE                       |
| ----------------------------------- | --------------------------- |
| `size="lg" \| "md" \| "sm" \| "xs"` | `size="lg" \| "md" \| "sm"` |
| `muted?: boolean`                   | `isMuted?: boolean`         |

`xs`를 사용하던 경우 가장 가까운 크기인 `sm`으로 변경합니다.

```diff
- <Kbd size="xs" muted>Esc</Kbd>
+ <Kbd size="sm" isMuted>Esc</Kbd>
```

**동작 변경 (코드 수정 불필요)**

- 크기별 `min-width` 변경 — `lg` 16px에서 20px, `md` 14px에서 19px, `sm` 11px에서 19px
- 기본 상하 패딩 제거 — 2px에서 0
- `key`, `text` 타입은 `getSyntaxClassName`, `function` 타입은 `getLabelClassName`으로 타이포그래피 스타일 적용
- 테두리 두께를 `semantic.strokeWeight["1"]` 토큰과 연동
