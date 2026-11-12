---
"@jects/jds": patch
---

**IconButton**

상호작용 오버레이와 모서리를 변경했습니다. 호출부 수정은 필요하지 않으며, 렌더 결과만 달라집니다. IconButton을 쓰는 Chip, ContentBadge의 삭제 버튼도 같은 결과가 적용됩니다.

**동작 변경 (코드 수정 불필요)**

- 오버레이 불투명도 — 모든 `hierarchy`에서 hover 8%에서 5%로, pressed 12%에서 8%로 변경
- `primary`, `secondary`, `tertiary` 오버레이 색 — `object.neutral`에서 `fill.boldest`로 변경
- 오버레이와 focus ring 모서리 — 크기별로 한 단계 커짐, 기본 `2xs`~`md` 4px에서 6px로, `lg` 4px에서 8px로, `xl`~`3xl` 6px에서 8px로, `condensed` `2xs`~`md` 2px에서 4px로, `lg`~`3xl` 4px에서 6px로 변경
