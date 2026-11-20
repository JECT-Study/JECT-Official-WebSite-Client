---
"@jects/jds": patch
---

**LabelButton**

상호작용 오버레이를 변경했습니다. 호출부 수정은 필요하지 않으며, 렌더 결과만 달라집니다.

**동작 변경 (코드 수정 불필요)**

- `hierarchy` 오버레이 불투명도 — hover 8%에서 5%로, pressed 12%에서 8%로 변경, `feedback`은 그대로
- `secondary`, `tertiary` 오버레이 색 — `object.boldest`에서 `fill.boldest`로 변경
