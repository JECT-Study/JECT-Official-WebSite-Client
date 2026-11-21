# packages/jds 작업 지침

루트 [AGENTS.md](../../AGENTS.md)의 명령어·경계를 보완한다. 여기는 JDS 코드를 쓰는 방식만 다룬다. 요구사항 조사·설계·검증 절차는 [ject-jds-workflow](../../.claude/skills/ject-jds-workflow/SKILL.md)에 있다.

## 컴포넌트 파일 구조

`src/components/<Name>/` 안에서 이 이름을 쓴다.

```
<Name>.tsx            루트. compound 조립
<Name>.stories.tsx    스토리
<name>.css.ts         스타일
<name>.types.ts       공개 props 타입 (필요할 때만)
<name>.context.ts     컨텍스트 (필요할 때만)
compound/<Part>.tsx   하위 파트
index.ts              배럴
```

React 컴포넌트와 스토리 파일은 PascalCase, `.css.ts`·`.types.ts`·`.context.ts`는 컴포넌트 이름을 camelCase로 쓴다. 타입을 어느 파일에 둘지는 [타입 선언 규약](../../docs/type-convention.md)을 따른다.

## compound 컴포넌트와 배럴

구조는 `src/components/TextField/`의 `TextField.tsx`와 `index.ts`를 기준으로 맞춘다. 비슷해 보이는 다른 컴포넌트를 기준으로 삼지 않는다. 컴포넌트마다 정리된 시점이 달라 구조가 섞여 있다.

코드만 봐서는 알 수 없는 규칙은 두 가지다.

- 공개 compound 컴포넌트는 점 표기(`TextField.Input`)와 함께 루트 이름을 붙인 개별 export(`TextFieldInput`)도 배럴에 둔다. 서버 컴포넌트에서는 `"use client"` 경계 때문에 점 표기로 파트에 접근할 수 없다. 두 export는 같은 값이어야 한다. 사용법은 Storybook `Guides/Server Components`에 있다.
- 공개 배럴(`src/components/index.ts`)에 없는 내부 컴포넌트는 파트를 개별 export하지 않는다. `Listbox`가 그 예다.

배럴은 `components/<Name>/index.ts` → `components/index.ts` → `src/index.ts` 순으로 올린다. 여기 없으면 소비처가 쓸 수 없다. `as` prop을 받는 다형 컴포넌트는 `src/utils/forwardRef.ts`의 `PolymorphicForwardRef`를, 컨텍스트는 `src/hooks/createCtxProvider.tsx`를 쓴다.

## 스타일 (vanilla-extract)

- 색·간격·타이포는 `vars`를 쓴다. hex·px를 하드코딩하지 않는다.
  ```ts
  import { vars } from "tokens";
  color: vars.color.semantic.object.bolder;
  ```
- `colorPrimitive`가 아니라 `color.semantic.*`을 쓴다. primitive는 semantic 정의용이다.
- variant가 있으면 `recipe()`, 없으면 `style()`.
- 상태별 색 전환은 `createVar()` + `fallbackVar()`로 하고 `selectors`의 `vars`에서 덮는다. 셀렉터마다 `color`를 다시 쓰지 않는다.
- 타이포는 직접 쓰지 않고 `src/utils/typography.ts`의 `getLabelClassName`·`getTitleClassName`·`getBodyClassName`·`getSyntaxClassName`을 쓴다.

### pseudo-element 정책

상호작용을 받는 요소에서 `::before`는 focus ring, `::after`는 hover/pressed overlay 전용이다. 각각 `src/utils/focusRing.css.ts`, `src/utils/overlay.css.ts`가 담당한다. divider는 `hr`/`border`, 아이콘·badge·check는 별도 자식 요소로 만든다. 전문은 [PSEUDO_ELEMENT_POLICY.md](src/utils/PSEUDO_ELEMENT_POLICY.md).

## 생성물 — 직접 수정 금지

| 생성물                                                                                                | 재생성                                                                       |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `src/tokens/` 의 `tokens.ts`, `vars.css.ts`, `globalTokens.css.ts`, `textStyles.ts`, `breakpoints.ts` | `npm run build:tokens --workspace=@jects/jds` (입력: `src/tokens/input/`)    |
| `src/components/Icon/generated/`                                                                      | `npm run build:icons --workspace=@jects/jds` (입력: `src/assets/icons/`)     |
| `src/assets/icons/*.svg`, `IconMap.ts`의 `iconMap` 블록                                               | `npm run sync:icons --workspace=@jects/jds` (입력: Figma Iconography 페이지) |

토큰 입력이 바뀐 PR에서는 CI가 토큰 생성물과 체인지셋(`figma-token-sync-<PR번호>.md`)을 브랜치에 커밋한다. 토큰 체인지셋은 직접 쓰지 않는다. 입력 형식과 CI 동작은 [토큰 파이프라인](../../.claude/skills/ject-jds-tokens/references/pipeline.md)에 있다.

## 아이콘

Lucide 기준이다. 이름은 `src/components/Icon/IconMap.ts`의 `iconMap` 키가 유일한 근거이고 `IconName` 타입이 여기서 파생된다. remixicon 시절 이름(`-line`, `-fill` 접미사)은 쓰지 않는다.

아이콘은 손으로 export하지 않고 `sync:icons`로 가져온다. `packages/jds/.env`에 `FIGMA_TOKEN`(File content 읽기 권한)이 필요하다. 스크립트는 Figma REST API로 SVG를 받아 `src/assets/icons`에 쓰고, `build:icons`를 돌리고, `iconMap` 블록을 알파벳 순으로 다시 만든다.

- `iconMap` 블록은 손으로 고치지 않는다. `sizeMap`과 타입은 손으로 관리한다.
- 이름이 kebab-case가 아니거나, 24×24가 아니거나, 색이 `#1B1C21`/`#191B24`가 아니면 아무것도 쓰지 않고 멈춘다. `Iconography/Colored graphic` 세트는 제외한다.
- 피그마에 없는 아이콘은 지우지 않고 목록만 출력한다. 이름 변경·삭제는 소비처가 깨지므로 사람이 판단한다.
- **피그마 MCP로 아이콘 SVG를 받지 않는다.** 컴포넌트 export에는 페이지 배경이 딸려 나오고, 벡터만 받으면 20×20으로 나온다. REST API는 처음부터 24×24로 준다.

`build:icons`는 SVGR의 포맷을 끄고 저장소의 Prettier로 `Icon/generated`를 포맷한다. `build:icons` 후 기존 생성 파일이 무더기로 바뀌면 이 체인이 깨진 것이다. `Icon/generated`는 `.prettierignore`에 있어 `format:check`가 잡아주지 않는다.

## 스토리

컴포넌트를 바꾸면 스토리도 같이 고친다. `@storybook-utils` 별칭(`.storybook/utils/`)의 공용 유틸을 쓴다.

```tsx
import { FIELD_PLAYGROUND_ARGS, FIELD_WIDTH, fieldArgTypes } from "@storybook-utils/field";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
```

Field 계열은 `fieldArgTypes` + `FIELD_WIDTH`를 쓰고, 상태 나열은 `FlexRow` + `map` 패턴으로 만든다. 스토리마다 레이아웃을 새로 짜지 않는다.

## VRT 베이스라인은 로컬에서 만들지 않는다

`npm run vrt:baseline --workspace=@jects/vrt`를 로컬에서 돌려 커밋하지 않는다. 로컬 Docker와 CI가 컴포넌트 상태를 다르게 캡처한다. 실제로 `Menu/Default`가 로컬에선 열린 상태, CI에선 닫힌 상태로 찍혀 크기 비교가 실패했다.

베이스라인이 필요하면 PR에 `vrt-baseline` 레이블을 붙인다. `.github/workflows/vrt-baseline.yml`이 CI에서 재생성해 브랜치에 커밋한다. 로컬 비교 실행(`npm run vrt --workspace=@jects/vrt`)은 커밋하지 않으니 괜찮다.

## Field 계열

`src/components/Field/`가 내부 primitive다. 입력 필드 컴포넌트들이 이 위에 얹혀 `Field.Label`, `Field.Helper` 등을 공유하고 `compound/Input.tsx`만 각자 만든다.

공통 동작을 바꿀 땐 `Field/useFieldControl.ts`와 `Field/field.context.ts`를 먼저 보고, `Field`를 가져다 쓰는 컴포넌트를 검색해 영향 범위를 모두 확인한다. 한 필드만 고치고 나머지에 반영을 빠뜨리기 쉽다. 필드 컴포넌트는 계속 늘어나므로 목록을 외워 두지 않는다.

## 소비처

- 저장소에는 JDS를 쓰는 앱이 없다. 저장소 안에서 사용처를 찾을 때는 `packages/jds`의 다른 컴포넌트와 스토리를 본다.
- 실제 소비처는 저장소 밖에 있고, Next에서 SSR로 쓰는 곳이 있다. `window`나 `document` 접근, `useLayoutEffect`, 하이드레이션 불일치는 SSR 환경을 기준으로 판단한다.
