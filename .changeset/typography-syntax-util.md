---
"@jects/jds": minor
---

**typography**

구문 텍스트 스타일을 클래스명으로 얻는 `getSyntaxClassName`을 추가합니다. 기존 `getLabelClassName`, `getTitleClassName`, `getBodyClassName`과 같은 방식으로 씁니다.

**추가**

- `getSyntaxClassName({ size })` — 구문 타이포 클래스명 반환
- 타입 `SyntaxSize`(`"lg" | "md" | "sm" | "xs"`), `SyntaxStyleOptions`

```tsx
<code className={getSyntaxClassName({ size: "md" })}>inline code</code>
```
