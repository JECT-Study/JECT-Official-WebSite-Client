---
"@jects/jds": minor
---

**Skeleton**

데이터를 불러오는 동안 콘텐츠 자리를 표시하는 `Skeleton`을 추가합니다. 로딩 상태와 표시 영역의 구성은 소비처에서 관리합니다. 기존 코드 수정은 필요하지 않습니다.

- `width`, `height` — 기본값 없음, 숫자는 px, 문자열은 CSS 크기
- `radius` — 기본값 `"8"`, JDS radius 토큰 키
- `className`, `style` — 반응형 크기와 스타일 지정, 같은 속성은 `style` 우선

1500ms shimmer 애니메이션을 제공하며 `prefers-reduced-motion: reduce`에서는 이동광 없이 배경만 표시합니다. 장식 요소로 접근성 트리에서 제외되므로 로딩 안내는 소비처 영역에 제공합니다.

```tsx
<Skeleton width='100%' height={16} radius='8' />
```
