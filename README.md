# JECT-Design-System

젝트 메이커스 2팀에서 관리하는 젝트 디자인 시스템(JDS) 모노레포입니다. 디자인 시스템 패키지는 npm에 `@jects/jds`로 배포됩니다.

## 구성

| 워크스페이스                | 패키지                    | 설명                                         |
| --------------------------- | ------------------------- | -------------------------------------------- |
| `packages/jds`              | `@jects/jds`              | 디자인 시스템                                |
| `packages/vrt`              | `@jects/vrt`              | JDS 시각 회귀 테스트 (BackstopJS)            |
| `packages/figma-token-sync` | `@jects/figma-token-sync` | Figma 변수를 토큰 파일로 동기화하는 플러그인 |
| `config/eslint`             | `@ject/eslint-config`     | 공유 ESLint 설정                             |

## 기술 스택

| 영역       | 도구                             |
| ---------- | -------------------------------- |
| 런타임     | Node 24 (`.nvmrc`), npm          |
| 모노레포   | npm workspaces, Turborepo        |
| 스타일링   | vanilla-extract                  |
| 동작       | Radix UI (`radix-ui`)            |
| 문서       | Storybook 10, Chromatic          |
| 버전, 배포 | Changesets                       |
| 린트, 포맷 | ESLint (flat config), Prettier 3 |
| Git 훅     | lefthook                         |

## 설치와 실행

```bash
nvm use
npm install
npm run storybook
```

Storybook은 6006번 포트를 사용합니다. `pnpm`, `yarn`, `bun`은 사용하지 않습니다.

## 스크립트

루트에서 실행하면 Turborepo가 각 워크스페이스로 전달합니다.

| 명령                   | 설명                              |
| ---------------------- | --------------------------------- |
| `npm run dev`          | 감시 모드 빌드                    |
| `npm run build`        | 프로덕션 빌드                     |
| `npm run storybook`    | Storybook 실행                    |
| `npm run lint`         | ESLint 검사 (경고도 실패)         |
| `npm run lint:fix`     | ESLint 자동 수정                  |
| `npm run type-check`   | 타입 검사                         |
| `npm run format`       | Prettier 적용                     |
| `npm run format:check` | Prettier 검사 (수정 없음)         |
| `npm run changeset`    | 체인지셋 추가                     |
| `npm run clean`        | 빌드 산출물과 `node_modules` 제거 |

시각 회귀 테스트를 로컬에서 실행하려면 Docker가 필요합니다. 자세한 내용은 [packages/vrt/README.md](./packages/vrt/README.md)를 참고합니다.

```bash
npm run vrt --workspace=@jects/vrt
```

## 코드 스타일과 커밋 훅

Prettier는 저장소 루트에서 한 번만 실행되며, 제외 대상은 루트 `.prettierignore`가 관리합니다. 여기에는 `build:tokens`, `build:icons`의 생성물이 들어 있습니다. 생성물을 포맷하면 다음 생성 때 되돌아가므로 제외 목록에서 빼지 않습니다.

lefthook이 커밋 직전에 스테이지된 파일에만 Prettier와 ESLint를 적용하고, 수정된 결과를 다시 스테이징합니다. 훅은 `npm install` 시 자동으로 설치되며, 동작하지 않으면 `npx lefthook install`로 직접 설치합니다. 일시적으로 건너뛰려면 `git commit --no-verify` 또는 `LEFTHOOK=0 git commit`을 사용합니다.

훅은 우회할 수 있으므로 모든 PR에서 `.github/workflows/verify.yml`이 `format:check`, `lint`, `type-check`를 다시 실행합니다. base 브랜치를 가리지 않으므로 스택 PR도 검증 대상입니다.

## 문서

- [AGENTS.md](./AGENTS.md): 공통 컨벤션
- [docs/changeset-guide.md](./docs/changeset-guide.md): 체인지셋 작성 규약
- [docs/type-convention.md](./docs/type-convention.md): 타입 선언 규약
- [docs/jds-tree-shaking-verification.md](./docs/jds-tree-shaking-verification.md): JS 모듈 분리 검증
- [packages/vrt/README.md](./packages/vrt/README.md): 시각 회귀 테스트

## 배포

체인지셋이 포함된 변경이 `dev`에 병합되면 Changesets가 `Version Packages` PR을 열고, 이 PR이 병합되면 npm에 배포됩니다.

| 대상                    | 시점                               | 방식                        |
| ----------------------- | ---------------------------------- | --------------------------- |
| npm `@jects/jds`        | `Version Packages` PR의 `dev` 병합 | Changesets                  |
| Storybook (dev)         | `packages/jds` 변경의 `dev` 병합   | Chromatic                   |
| Storybook (PR 미리보기) | PR에 `alpha-storybook` 레이블 부착 | Chromatic, PR 코멘트로 링크 |
