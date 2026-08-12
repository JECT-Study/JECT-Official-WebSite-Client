---
"@jects/jds": patch
---

**Divider**

Divider의 기본 색상을 `semantic.stroke.alpha.subtle`에서 `semantic.stroke.alpha.assistive`로 변경하고, 소비처에서 색상을 오버라이드할 수 있도록 `dividerColorVar`를 export합니다. 색상을 주입하지 않으면 변경된 기본 색상으로 fallback됩니다.

**추가**

- `dividerColorVar` — Divider 색상을 오버라이드하는 CSS variable

**동작 변경 (코드 수정 불필요)**

- Divider 기본 색상이 `semantic.stroke.alpha.subtle`에서 `semantic.stroke.alpha.assistive`로 바뀝니다.
