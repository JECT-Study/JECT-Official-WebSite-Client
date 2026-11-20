---
"@jects/jds": patch
---

**Divider**

기본 선 색과 `thickness='boldest'` 두께를 변경했습니다. 호출부 수정은 필요하지 않으며, 렌더 결과만 달라집니다.

- 기본 선 색 — `stroke.alpha.assistive`에서 `stroke.alpha.subtle`로 변경, `dividerColorVar`로 색을 지정한 경우는 그대로
- 두께 — `strokeWeight` 토큰 1, 2, 4, 6을 사용하도록 변경, `thickness='boldest'`는 8px에서 6px로 감소
