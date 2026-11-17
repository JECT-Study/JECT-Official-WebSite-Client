---
"@jects/jds": patch
---

**Card (Overlay / Preset.Post.Link / Preset.Plate.Link)**

링크로 렌더링할 컴포넌트를 지정하는 `linkAs`를 추가합니다. next/link 같은 라우팅 컴포넌트를 넘기면 해당 컴포넌트로 렌더링합니다. 기존 코드는 수정할 필요가 없습니다.

- `linkAs` — 기본값 `a` 요소, `href`를 받는 컴포넌트

```tsx
import Link from "next/link";

<Card.Preset.Post.Link href='/posts/1' linkAs={Link} {...postProps} />;
```

react-router의 `Link`처럼 `to`를 받는 컴포넌트는 `href`를 `to`로 넘기는 래퍼로 감싸서 전달합니다. 비활성 상태에서는 `linkAs`와 관계없이 기본 `a` 요소로 렌더링합니다. `Card.Overlay`에 ref를 전달하는 경우 `linkAs` 컴포넌트가 ref를 `a` 요소까지 전달해야 합니다.
