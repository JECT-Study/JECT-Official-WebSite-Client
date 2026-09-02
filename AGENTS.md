# AGENTS.md

AI 코딩 에이전트가 이 저장소에서 작업할 때 참고하는 가이드.

## 프로젝트 개요

JECT 공식 웹사이트와 디자인 시스템(JDS)을 담은 npm workspaces + Turborepo 모노레포.

| 경로            | 패키지                         | 역할                 |
| --------------- | ------------------------------ | -------------------- |
| `apps/web`      | `ject-official-website-client` | 공식 웹사이트        |
| `packages/jds`  | `@jects/jds`                   | 디자인 시스템        |
| `packages/vrt`  | `@jects/vrt`                   | JDS 시각 회귀 테스트 |
| `config/eslint` | `@ject/eslint-config`          | 공유 ESLint 설정     |

JDS는 vanilla-extract로 스타일링하고 `radix-ui`를 기반으로 동작을 만든다. Emotion은 제거 예정이다.

## Common Commands

```bash
# 전체 워크스페이스 (turbo가 전파)
npm run dev
npm run build
npm run type-check
npm run lint          # 검사만, --max-warnings 0으로 경고도 실패
npm run lint:fix      # 검사 후 자동 수정

# 포맷은 turbo를 거치지 않고 루트에서 한 번만 실행한다
npm run format
npm run format:check  # 검증만, 수정하지 않음

# 특정 워크스페이스만
npm run build --workspace=@jects/jds

# 시각 회귀 테스트 (Docker 필요). 단위 테스트 러너는 없다
npm run vrt --workspace=@jects/vrt
npm run vrt:baseline --workspace=@jects/vrt

# 생성물 재생성
npm run build:icons --workspace=@jects/jds    # src/assets/icons → Icon/generated
npm run build:tokens --workspace=@jects/jds   # src/tokens/input → src/tokens/*

# 체인지셋 추가
npm run changeset
```

## References

- [체인지셋 작성 규약](docs/changeset-guide.md) — `.changeset/*.md`를 작성하거나 수정하기 전에 읽는다.

## Boundaries

- **항상**
  - branch와 PR의 기준은 `dev`
  - 변경을 마치기 전에 `npm run type-check`와 `npm run lint` 통과
  - 커밋 전 `npm run format` 실행. 훅을 우회했다면 CI의 `format:check`가 방어
  - `packages/jds`에서 배포되는 코드가 바뀌면 체인지셋 추가. 테스트, 스토리, 문서, CI만 바뀌었다면 만들지 않는다.
  - JDS 컴포넌트를 바꾸면 Storybook 스토리도 함께 갱신
  - 공개 API는 배럴(`index.ts`)에 export. 여기 없으면 소비처가 쓸 수 없다

- **먼저 묻기**
  - 새 패키지 추가, 외부 의존성 추가
  - tsconfig, ESLint, Prettier 설정 변경
  - `.github/workflows` 수정
  - 커밋과 푸시

- **금지**
  - `.changeset/`에 체인지셋이 아닌 `.md` 추가 (`README.md` 제외)
  - 생성물 직접 수정
  - 버전 직접 수정, 태그 생성
  - `.env`, API 키, 시크릿 커밋
  - `dist/`, `node_modules/` 수정
  - `pnpm`, `yarn`, `bun` 사용
