---
"@jects/jds": patch
---

**Menu (Menu.Anchor / DropdownMenu.Anchor)**

`Menu.Anchor`와 `DropdownMenu.Anchor`에 `asChild` prop을 추가했습니다. `asChild`를 사용하면 Next.js의 `Link`나 React Router의 `Link` 같은 라우팅 컴포넌트를 메뉴 항목의 루트 요소로 사용할 수 있습니다. 기존 `href` 사용 방식은 동일합니다.

**추가**

- `asChild` (`false`) — 자식 라우팅 컴포넌트를 메뉴 앵커의 루트 요소로 합성
- `asChild` 사용 시 단일 React 요소를 `children`으로 전달, `disabled`와 동시 사용 불가

```tsx
import NextLink from "next/link";

<Menu.Anchor asChild>
  <NextLink href='/mypage'>마이페이지</NextLink>
</Menu.Anchor>;
```
