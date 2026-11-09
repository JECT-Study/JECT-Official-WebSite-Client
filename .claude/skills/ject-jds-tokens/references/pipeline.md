# JDS 토큰 파이프라인

2026-10-28 `dev` 코드 확인 기준(#743 DTCG 입력 전환, #744 동기화 플러그인 이후). 경로와 입력 구조는 변경 전 다시 읽는다.

## 입력과 생성

- `packages/jds/src/tokens/input/<컬렉션>/<모드>.tokens.json`: Figma 변수 컬렉션마다 폴더 하나, 모드마다 DTCG(`$type`/`$value`) 파일 하나. 폴더는 `colorPrimitive`, `colorSemantic`(light/dark), `scheme`·`typography`(320-767/768-1199/1200+), `environment`다. 모드는 파일명이 아니라 파일 안의 `$extensions["com.figma.modeName"]`으로 구분한다.
- `figmaTokens.ts`: 폴더명과 `tokenSchema` 키의 대응(`COLLECTION_DIRECTORIES`), alias(`{a.b}`) 해석, 값 변환. 대응표에 없는 폴더가 `input/`에 있으면 빌드가 실패하므로 컬렉션을 추가·변경하면 이 표와 `tokenSchema`를 함께 고친다.
- `normalizeFigmaTokenFiles`는 빌드할 때마다 입력 파일을 저장소 표준 형식(Figma 기본 export에서 토큰별 `$extensions`를 뺀 형식)으로 **다시 쓴다**. `build:tokens` 후 입력 파일 diff가 생길 수 있으며, 이는 생성물 수정이 아니라 입력 정리다.
- `input/textStyles.json`: 폰트·행간 등 속성과 토큰 참조를 담는다. DTCG가 아닌 별도 형식이며 builder가 정규화한다.
- `schema.ts`: Zod 스키마(`tokenSchema`, `textStyleSchema`)와 값·단위/반응형·theme 변환. 값 형식을 바꾸기 전 실제 validation과 unit 변환을 읽는다.
- `tokensBuilder.ts`: 위 입력 → `tokens.ts`, `vars.css.ts`, `globalTokens.css.ts`, `textStyles.ts`, `breakpoints.ts`. 생성물 이름은 builder의 현재 `writeGeneratedFile` 호출로 확인한다.
- 실행: `npm run build:tokens --workspace=@jects/jds`. 권한 있는 source 변경에서만 실행하고 입력·생성물 diff를 모두 검토한다.

## Figma에서 들어오는 경로

`packages/figma-token-sync`는 Figma 변수를 위 형식(`<컬렉션>/<모드>.tokens.json`)으로 내보내 GitHub에 동기화 브랜치와 PR을 만드는 Figma 플러그인이다. Figma 기본 export 파일을 `input/`에 직접 넣어도 빌드 시 같은 표준 형식으로 정리된다. 토큰 값 변경은 이 두 경로 중 하나로 들어오며, 생성물을 손으로 맞추지 않는다.

DTCG는 입력 형식으로 쓰지만 사양 전체를 지원한다는 뜻은 아니다. 현재 `figmaTokens.ts`가 처리하는 `$type`·alias·색 값 범위를 코드로 확인한 뒤에만 지원을 주장한다. [DTCG 공식 자료](https://www.designtokens.org/)는 형식 해석의 참고용이다.

## 소비

`vars`의 semantic color/scheme/environment 등을 vanilla-extract CSS와 recipe에서 사용한다. `createVar`, `fallbackVar`, assignInlineVars의 용도를 추적한다. `Field`의 컨테이너와 `focusRing`/`overlay`도 함께 해석한다.

한 컴포넌트의 `outline: none`이나 alpha 토큰 이름만으로 접근성 결과를 판단하지 않는다. 실제 배경 위의 합성 색과 상태별 computed style을 확인한다. 포커스 링의 애니메이션이 끝나기 전 값을 확정 결과로 기록하지 않는다.

## 변경 평가

- 입력 타입·단위·변환, 참조 누락, theme/device 누락, 공개 토큰 이름과 generated export를 확인한다.
- 기본값·placeholder·readonly·disabled·error·focus와 실제 소비처를 대표 사례로 비교한다.
- 디자인 자료의 위치/버전과 code source를 기록하고 일치하지 않는 값을 임의 보정하지 않는다.
- 같은 source를 재생성했을 때 출력이 안정적인지 확인한다. builder는 생성 시간 줄을 뺀 내용이 같으면 파일을 다시 쓰지 않으므로, 입력이 그대로인데 생성물 diff가 생기면 원인부터 확인한다. 생성물만의 수정이나 의도하지 않은 대규모 diff를 시간 차이로 넘기지 않는다.
- 토큰 변경이 컴포넌트의 상태 DOM·공개 prop·행동도 바꾸는지 확인하고 current changeset 규약으로 분류한다.
