---
"@jects/jds": patch
---

**Menu**

Menu, MenuItem, MegaMenu 컴포넌트의 스타일링을 emotion에서 vanilla-extract로 마이그레이션합니다. 컴포넌트 public API(컴포넌트 구조, props, type export)는 변경되지 않으므로 사용처 수정 없이 그대로 사용할 수 있습니다. MenuItem의 인터랙션 스타일은 공용 `overlay` / `focusRing` 유틸 기반으로 전환되어 hover/active 동작은 동일하며, 포커스 링은 디자인 시스템 표준 스펙을 따릅니다.
