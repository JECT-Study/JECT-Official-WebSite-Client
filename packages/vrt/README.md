# @jects/vrt

`@jects/jds`의 시각 회귀 테스트를 위한 패키지입니다. BackstopJS를 기반으로 하며, 디자인 시스템 패키지에는 어떠한 의존성도 추가하지 않는 독립 패키지입니다.

## 사전 요구사항

브라우저 렌더링(`backstop`)은 **Docker**에서 실행합니다. 로컬과 CI 모두 동일한 `backstopjs/backstopjs:6.3.25` 이미지를 사용해 baseline이 OS나 브라우저 버전에 관계없이 동일하게 재현되도록 하기 위함입니다. **Docker가 실행 중이어야 합니다.**

Storybook 빌드·서빙과 시나리오 생성은 호스트(Node)에서 실행되며, 컨테이너는 `host.docker.internal`을 통해 호스트에서 실행 중인 `http-server`(6007)에 접근합니다.

## 구조

- `scripts/generate-scenarios.mjs` — Storybook `index.json`을 읽어 스토리별 Backstop 시나리오를 자동 생성합니다.
- `backstop.json` — 위 스크립트가 생성하는 파일입니다. (git 미추적)
- `backstop_data/bitmaps_reference/` — baseline 이미지입니다. (git 추적, 커밋 대상)
- `storybook-static/` — `@jects/jds` Storybook 정적 빌드 결과입니다. (git 미추적)

## 사용법

```bash
# 1. jds Storybook 정적 빌드
npm --workspace @jects/vrt run sb:build

# 2. baseline 최초 생성 또는 의도된 변경 반영
npm --workspace @jects/vrt run vrt:reference

# 3. 회귀 검사
npm --workspace @jects/vrt run vrt:test

# 4. 변경이 의도된 경우 test 결과를 baseline으로 승격
npm --workspace @jects/vrt run vrt:approve
```

`npm --workspace @jects/vrt run vrt:baseline`은 **빌드 + baseline 생성**을, `npm --workspace @jects/vrt run vrt`는 **빌드 + 회귀 검사**를 한 번에 수행합니다.

HTML diff 리포트는 `backstop_data/html_report/index.html`에 생성됩니다. 컨테이너 내부에서는 브라우저를 자동으로 열 수 없으므로 직접 열어 확인해야 합니다.

```bash
npm --workspace @jects/vrt run report:open
```

> **Baseline은 반드시 Docker(`vrt:reference`)에서 생성한 뒤 커밋해야 합니다.** CI(Ubuntu)와 동일한 렌더링 결과를 사용해 불필요한 오탐을 방지할 수 있습니다. Git에는 `backstop_data/bitmaps_reference/`만 커밋합니다.

`vrt:reference`(및 `vrt:baseline`)는 baseline을 만들기 전에 `bitmaps_reference/`를 먼저 비우고 현재 스토리 기준으로 새로 채웁니다. 스토리가 삭제되면 해당 스냅샷도 함께 사라지므로 더 이상 쓰이지 않는 컴포넌트의 baseline이 쌓이지 않습니다.

## CI에서 baseline 갱신 (Docker 없이)

로컬에서 Docker로 VRT를 돌리지 않는 경우, PR에 **`vrt-baseline` 레이블**을 붙이면 `vrt-baseline.yml` 워크플로가 CI에서 baseline을 재생성해 PR 브랜치에 커밋합니다. 로컬과 동일한 `backstopjs/backstopjs:6.3.25` 이미지를 사용하므로 렌더링 결과가 일치합니다. 실행이 끝나면 결과를 PR 코멘트로 남기고 레이블을 자동으로 제거합니다.

> GitHub Actions의 기본 토큰으로 푸시한 커밋은 다른 워크플로를 다시 트리거하지 않으므로, baseline 커밋 후 회귀 검사를 다시 돌리려면 워크플로를 수동으로 재실행해야 합니다.

## 특정 스토리 제외

스토리 메타 또는 개별 스토리에 `tags: ["skip-vrt"]`를 추가하면 VRT 대상에서 제외됩니다.

## 뷰포트 / 임계값 조정

`scripts/generate-scenarios.mjs` 상단의 `viewports`와 각 시나리오의 `misMatchThreshold`, `delay`를 조정하면 됩니다.
