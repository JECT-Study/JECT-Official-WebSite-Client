---
"@jects/jds": minor
---

**Link**

앱 내의 다른 페이지나 외부 웹사이트로 이동시키는 `Link` 컴포넌트를 추가합니다. 자체 크기를 갖지 않고 부모 요소의 텍스트 스타일을 상속받습니다.

- `external` — 외부 리소스로 이동함을 표시, 외부 링크 아이콘과 스크린리더 레이블 노출
- `disabled` — 이동을 차단하고 흐리게 표시, `asChild`와 함께 사용 불가
- `asChild` — `<a>` 대신 전달한 자식 요소에 스타일 합성, Next.js나 React Router의 `Link` 등 라우팅 컴포넌트와 결합할 때 사용

타입 `LinkProps`를 함께 내보냅니다.

```tsx
<p className={getBodyClassName({ size: "md" })}>
  자세한 내용은 <Link href='/docs'>문서</Link>를 참고하세요.
</p>

<Link href='https://example.com' target='_blank' rel='noopener noreferrer' external>
  외부 문서
</Link>

<Link asChild>
  <NextLink href='/about'>소개</NextLink>
</Link>
```
