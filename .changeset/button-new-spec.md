---
"@jects/jds": minor
---

**Button (BlockButton / LabelButton)**

신규 디자인 스펙에 맞춰 두 버튼의 외형과 `BlockButton`의 옵션을 변경합니다. 별칭을 두지 않으므로 아래 값을 쓰던 호출부는 수정이 필요합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                  | TO-BE              |
| -------------------------------------- | ------------------ |
| `BlockButton`의 `variant="empty"`      | `variant="hollow"` |
| `BlockButton`의 `hierarchy="tertiary"` | 제거 — 대체재 없음 |

```diff
- <BlockButton variant='empty'>더보기</BlockButton>
+ <BlockButton variant='hollow'>더보기</BlockButton>
```

**동작 변경 (코드 수정 불필요)**

- `BlockButton`, `LabelButton`의 외형이 신규 디자인 스펙에 맞게 변경됩니다.
