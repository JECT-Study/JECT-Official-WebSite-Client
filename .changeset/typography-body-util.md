---
"@jects/jds": minor
---

**typography**

본문 텍스트 스타일을 클래스명으로 얻는 `getBodyClassName`을 추가합니다. 기존 `getLabelClassName`, `getTitleClassName`과 같은 방식으로 씁니다.

**추가**

- `getBodyClassName({ size, weight })` — 본문 타이포 클래스명 반환
- 타입 `BodySize`(`"lg" | "md" | "sm" | "xs" | "2xs"`), `BodyWeight`(`"bold" | "normal"`), `BodyStyleOptions`

```tsx
<p className={getBodyClassName({ size: "md" })}>본문 텍스트</p>
```
