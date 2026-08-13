---
"@jects/jds": minor
---

**Kbd**

Kbd의 스타일링을 Emotion에서 vanilla-extract로 마이그레이션하고 크기 규격을 변경합니다. `xs` 크기를 제거하고 `muted` prop을 `isMuted`로 변경했으므로 해당 API를 쓰던 코드는 수정이 필요합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                               | TO-BE                                |
| ----------------------------------- | ------------------------------------ |
| `size="lg" \| "md" \| "sm" \| "xs"` | `size="lg" \| "md" \| "sm"`          |
| `muted?: boolean`                   | `isMuted?: boolean`                  |
| `KbdStyleProps`                     | 제거 — 내부 스타일 타입, 대체재 없음 |

`xs`를 사용하던 경우 가장 가까운 크기인 `sm`으로 변경합니다.

```diff
- import type { KbdStyleProps } from "@jects/jds";
- <Kbd size="xs" muted>Esc</Kbd>
+ <Kbd size="sm" isMuted>Esc</Kbd>
```

**추가**

- `ref` 포워딩 지원

**동작 변경 (코드 수정 불필요)**

- 크기별 `min-width` 변경 — `lg` 16px에서 20px, `md` 14px에서 19px, `sm` 11px에서 19px
- `box-sizing`을 `content-box`에서 `border-box`로 변경 — 크기별 높이 26px, 24px, 22px에 padding과 border 포함
- 위쪽 1px, 아래쪽 0px이던 padding을 상하 2px로 변경
- `function` 타입의 좌우 padding 6px에서 4px로 변경, `key`와 `text`는 6px 유지
- 기본 배경색 `semantic.fill.subtlest` 제거
- 기본 텍스트 색상 `semantic.object.alternative`에서 `semantic.object.neutral`로 변경
