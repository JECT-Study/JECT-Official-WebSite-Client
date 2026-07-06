---
"@jects/jds": patch
---

**Divider**

Divider의 기본 색상을 `semantic.stroke.alpha.assistive`로 변경합니다. 또한 소비처에서 Divider 색상을 오버라이드할 수 있도록 `dividerColorVar` CSS variable을 export합니다.

**추가 사항**

- Divider 기본 색상 변경: `semantic.stroke.alpha.subtle` → `semantic.stroke.alpha.assistive`
- `dividerColorVar` export 추가
- 색상을 별도로 주입하지 않으면 변경된 기본 색상으로 fallback되도록 `fallbackVar` 적용
