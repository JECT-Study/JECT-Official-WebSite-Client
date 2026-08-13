---
"@jects/jds": minor
---

**Code**

Code의 스타일링을 Emotion에서 vanilla-extract로 마이그레이션하고 내부 스타일 타입 `CodeStyleProps`를 제거합니다. 이 타입을 가져오던 코드는 수정이 필요합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS            | TO-BE                                |
| ---------------- | ------------------------------------ |
| `CodeStyleProps` | 제거 — 내부 스타일 타입, 대체재 없음 |

```diff
- import type { CodeStyleProps } from "@jects/jds";
```

**추가**

- `ref` 포워딩 지원
