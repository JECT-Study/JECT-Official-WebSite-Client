---
"@jects/jds": patch
---

**DropdownMenu**

항목의 숫자 배지, 상호작용 오버레이, `DropdownMenu.Tree` 펼침 버튼 색을 변경했습니다. 호출부 수정은 필요하지 않으며, 렌더 결과만 달라집니다.

**동작 변경 (코드 수정 불필요)**

- `suffixBadge` 배지 스타일 — `hierarchy='secondary'` `badgeStyle='solid'`에서 `hierarchy='tertiary'` `badgeStyle='hollow'`로 변경
- `suffixBadge` 배지 크기 — 메뉴 크기보다 한 단계 작게 변경, 메뉴 `lg`, `md`, `sm`에서 배지 `md`, `sm`, `xs`
- hover, pressed 오버레이 — 색 `object.assistive`에서 `fill.normal`로, 불투명도 hover 8%에서 5%로, pressed 12%에서 8%로 변경
- `DropdownMenu.Tree` 펼침 버튼 아이콘 색 — `object.boldest`에서 `object.neutral`로 변경
