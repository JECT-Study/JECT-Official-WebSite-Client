---
"@jects/jds": minor
---

**IconButton**

`asChild`를 추가합니다. `asChild` 없이 `children`을 전달하면 타입 에러가 발생합니다. `children`을 넘기던 코드는 제거가 필요합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                 | TO-BE                        |
| ------------------------------------- | ---------------------------- |
| `children` 전달 가능, 렌더링되지 않음 | `children` 전달 시 타입 에러 |

```diff
- <IconButton icon='x' aria-label='닫기'>닫기</IconButton>
+ <IconButton icon='x' aria-label='닫기' />
```

**추가**

- `asChild` — 기본값 `false`, `true`면 자식 요소에 스타일과 props를 병합하고 `icon`을 자식 안에 렌더링, `type`, `disabled` 속성은 렌더링하지 않음
- `asChild`와 `disabled`는 함께 사용 불가
- 자식 요소의 `children`은 렌더링하지 않음 — 개발 환경에서 `children`을 전달하면 경고 출력, 자식은 비워서 전달하고 접근 이름은 `aria-label`로 지정

```tsx
<IconButton asChild icon='arrow-left' aria-label='이전 페이지'>
  <Link href='/' />
</IconButton>
```
