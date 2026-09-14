---
"@jects/jds": patch
---

**Menu**

디자인 스펙과 어긋나 있던 스타일 값을 맞췄습니다. 호출부 수정은 필요하지 않으며, 렌더 결과만 달라집니다.

**동작 변경 (코드 수정 불필요)**

- 항목 세로 여백 — `sm`은 6px에서 4px로, `lg`는 4px에서 6px로 변경
- 항목 모서리 반경 — `sm`만 8px에서 6px로 변경
- 항목의 아이콘과 라벨 사이 간격 — 6px에서 8px로 변경
- 항목 기본 글자색 — `object.bold`에서 `object.neutral`로 변경
- `Menu.Content` 위쪽 여백 — `sm`만 12px에서 10px로 변경
- `Menu.Content` 테두리 색상 — `stroke.subtler`에서 `stroke.alpha.subtler`로 변경

항목은 `Menu.Button`, `Menu.Anchor`, `Menu.Tree`가 해당합니다.
