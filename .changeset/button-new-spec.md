---
"@jects/jds": minor
---

**Button (BlockButton / LabelButton)**

신규 디자인 스펙을 반영해 두 버튼의 외형 및 `BlockButton`의 옵션이 변경되었습니다.

| 이전                                   | 이후                 |
| -------------------------------------- | -------------------- |
| `BlockButton` `variant = "empty"`      | `variant = "hollow"` |
| `BlockButton` `hierarchy = "tertiary"` | 제거                 |

`BlockButton`의 `variant="empty"`는 `"hollow"`로 이름이 바뀌었고, `hierarchy="tertiary"`는 제거되었습니다. 별칭을 두지 않으므로 해당 값을 사용하던 호출부는 마이그레이션이 필요합니다.

**AS-IS**

```tsx
<BlockButton variant='empty'>더보기</BlockButton>
```

**TO-BE**

```tsx
<BlockButton variant='hollow'>더보기</BlockButton>
```
