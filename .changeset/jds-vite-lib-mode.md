---
"@jects/jds": minor
---

**@jects/jds**

번들러를 tsup에서 Vite 라이브러리 모드로 교체합니다. 스타일이 진입점별 CSS 파일 대신 `dist/styles.css` 하나로 나가고, 선언만 있고 대상 파일이 없던 `@jects/jds/styles` 진입점이 동작합니다. 공개 API와 클래스 이름은 그대로이므로 코드 수정은 필요하지 않습니다.

**동작 변경 (코드 수정 불필요)**

- `@jects/jds/styles` import가 스타일시트를 가져옴, 이전에는 대상 파일이 없어 해석 실패
- `index.css`, `theme.css`, `tokens.css`, `utils.css`가 `styles.css` 하나로 통합
- 통합과 압축으로 CSS 전체 크기가 316KB에서 212KB로, JS가 3954KB에서 3279KB로 감소
- CSS 소스맵 제거, devtools에서 규칙의 원본 `.css.ts` 추적 불가
- `*.d.cts` 제거, `exports`의 `types`가 이전에도 `.d.ts`만 가리켰으므로 타입 해석 결과는 동일
- `@vanilla-extract/recipes` 타입이 선언 파일에 포함되어 소비처에 별도 설치가 필요하지 않음
- 일부 타입이 `csstype`을 참조, `dependencies`에 추가되어 함께 설치됨
