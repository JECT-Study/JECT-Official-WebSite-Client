---
"@jects/jds": patch
---

**LabelButton**

`asChild`를 추가합니다. 전달한 자식 요소를 루트로 렌더링하므로 라우터의 `Link`에 LabelButton 스타일을 적용할 수 있습니다. 기존 코드는 수정 없이 동작합니다.

- `asChild` — 기본값 `false`, `true`면 자식 요소에 스타일과 props를 병합하고 `prefixIcon`, `suffixIcon`을 자식 안에 렌더링, `type`, `disabled` 속성은 렌더링하지 않음
- `asChild`와 `disabled`는 함께 사용 불가, 자식은 요소 하나만 전달

```tsx
<LabelButton asChild suffixIcon='arrow-right'>
  <Link href='/apply'>지원하기</Link>
</LabelButton>
```
