# JDS 토큰 파이프라인

2026-10-12 실제 코드 확인 기준. 경로와 입력 구조는 변경 전 다시 읽는다.

## 입력과 생성

- `packages/jds/src/tokens/input/token.json`: JSON 문자열 안에 토큰 객체를 담는 현재 입력. `tokensBuilder.ts`가 두 번 JSON.parse한다. 단일 객체 JSON으로 가정해 덮어쓰지 않는다.
- 입력 최상위는 `color-primitive`, `color-semantic`, `scheme`, `typography`, `environment`다.
- `color-semantic`은 light/dark, scheme·typography는 desktop/tablet/mobile 축을 갖는다. 테마와 viewport 축은 별도로 확인한다.
- `input/textStyles.json`: 폰트·행간 등 속성과 토큰 참조를 담는다. builder가 텍스트 스타일을 정규화한다.
- `schema.ts`: Zod 스키마와 값·단위/반응형·theme 변환. 값 형식을 바꾸기 전 실제 validation과 unit 변환을 읽는다.
- `tokensBuilder.ts`: 위 입력 → `tokens.ts`, `vars.css.ts`, `globalTokens.css.ts`, `textStyles.ts`, `breakpoints.ts` 등의 출력. 생성물 이름은 builder의 현재 writeFile 경로로 확인한다.
- 실행: `npm run build:tokens --workspace=@jects/jds`. 권한 있는 source 변경에서만 실행하고 전체 generated diff를 검토한다.

현재 schema는 DTCG `$value`/`$type` 입력을 받는 구조가 아니다. DTCG 지원 또는 Figma Variables의 자동 동기화를 입증하는 코드 없이 지원한다고 쓰지 않는다. [DTCG 공식 자료](https://www.designtokens.org/)는 포맷 상호 운용성 검토용이다.

## 소비

`vars`의 semantic color/scheme/environment 등을 vanilla-extract CSS와 recipe에서 사용한다. `createVar`, `fallbackVar`, assignInlineVars의 용도를 추적한다. `Field`의 컨테이너와 `focusRing`/`overlay`도 함께 해석한다.

한 컴포넌트의 `outline: none`이나 alpha 토큰 이름만으로 접근성 결과를 판단하지 않는다. 실제 배경 위의 합성 색과 상태별 computed style을 확인한다. 포커스 링의 애니메이션이 끝나기 전 값을 확정 결과로 기록하지 않는다.

## 변경 평가

- 입력 타입·단위·변환, 참조 누락, theme/device 누락, 공개 토큰 이름과 generated export를 확인한다.
- 기본값·placeholder·readonly·disabled·error·focus와 실제 소비처를 대표 사례로 비교한다.
- 디자인 자료의 위치/버전과 code source를 기록하고 일치하지 않는 값을 임의 보정하지 않는다.
- 같은 source를 재생성했을 때 의미 있는 출력이 안정적인지 확인한다. 현재 builder의 `new Date().toLocaleString()` 생성 시간 주석은 실행마다 달라질 수 있으므로 해당 주석과 실제 값·타입·export·스타일 차이를 구분한다. 임의의 다른 차이를 시간 차이로 무시하지 않는다. 생성물만의 수정이나 의도하지 않은 대규모 diff는 원인부터 확인한다.
- 토큰 변경이 컴포넌트의 상태 DOM·공개 prop·행동도 바꾸는지 확인하고 current changeset 규약으로 분류한다.
