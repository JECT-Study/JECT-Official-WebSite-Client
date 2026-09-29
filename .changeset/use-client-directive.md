---
"@jects/jds": patch
---

`@jects/jds`와 `@jects/jds/hooks` 진입점 산출물 맨 위에 `"use client"` 지시어가 붙습니다. Next.js App Router의 서버 컴포넌트에서 `Button`, `Badge`처럼 이름 하나로 쓰는 컴포넌트를 직접 import해 렌더할 수 있습니다.

서버 컴포넌트에서 점으로 파트에 접근하는 compound 컴포넌트(`Tabs.Root`, `TextField.Input` 등)와 컴포넌트가 아닌 값(`dividerColorVar`, `formatFileSize`, `toastController`, `snackbarController`)은 쓸 수 없습니다. 이 경우 소비처의 `"use client"` 파일 안에서 사용합니다.

- `@jects/jds/tokens`, `@jects/jds/utils`, `@jects/jds/theme`은 지시어 없음, 서버 컴포넌트에서 그대로 사용 가능
- `formatFileSize`는 `@jects/jds/utils`에서 import하면 서버 컴포넌트에서 사용 가능
- Next.js가 아닌 환경은 지시어를 무시하므로 동작 변경 없음
