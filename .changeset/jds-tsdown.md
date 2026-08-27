---
"@jects/jds": minor
---

**@jects/jds**

번들러를 tsup에서 tsdown으로 교체합니다. 스타일이 진입점별 CSS 파일 대신 `dist/styles.css` 하나로 나가고, 선언만 있고 대상 파일이 없던 `@jects/jds/styles` 진입점이 동작합니다. 공개 API와 클래스 이름은 그대로이므로 코드 수정은 필요하지 않습니다.

**동작 변경 (코드 수정 불필요)**

- `@jects/jds/styles` import가 스타일시트를 가져옴, 이전에는 대상 파일이 없어 해석 실패
- `index.css`, `theme.css`, `tokens.css`, `utils.css`가 `styles.css` 하나로 통합
- 통합으로 CSS 전체 크기가 325.6 kB에서 243.1 kB로, gzip 기준 78.6 kB에서 28.4 kB로 감소
- JS 전체 크기가 4,084 kB에서 3,759 kB로 감소
- CSS 소스맵 제거, devtools에서 규칙의 원본 `.css.ts` 추적 불가
- `@radix-ui/*`와 `@vanilla-extract/*` 타입이 선언 파일에 포함되어 소비처에 별도 설치가 필요하지 않음
- 일부 타입이 `csstype`을 참조, `dependencies`에 추가되어 함께 설치됨
