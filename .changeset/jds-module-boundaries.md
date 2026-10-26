---
"@jects/jds": patch
---

ESM 배포 JavaScript를 모듈별 파일로 분리했습니다. Rolldown ESM과 Next.js Webpack에서 `Divider`만 가져올 때 미사용 컴포넌트와 PNG가 번들에서 제외됩니다. CJS 배포 방식, 기존 import 경로와 컴포넌트 사용법은 유지됩니다.

- 스타일 JavaScript 파일명 — `*.styles.js`로 출력, vanilla-extract Vite 플러그인의 스타일 원본 재처리 대상에서 제외
