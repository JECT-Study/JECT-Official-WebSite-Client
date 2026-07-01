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

`npm --workspace @jects/vrt run vrt`를 실행하면 **1 → 3** 과정을 한 번에 수행합니다.

HTML diff 리포트는 `backstop_data/html_report/index.html`에 생성됩니다. 컨테이너 내부에서는 브라우저를 자동으로 열 수 없으므로 직접 열어 확인해야 합니다.

```bash
npm --workspace @jects/vrt run report:open
```

> **Baseline은 반드시 Docker(`vrt:reference`)에서 생성한 뒤 커밋해야 합니다.** CI(Ubuntu)와 동일한 렌더링 결과를 사용해 불필요한 오탐을 방지할 수 있습니다. Git에는 `backstop_data/bitmaps_reference/`만 커밋합니다.

## 특정 스토리 제외

스토리 메타 또는 개별 스토리에 `tags: ["skip-vrt"]`를 추가하면 VRT 대상에서 제외됩니다.

## 뷰포트 / 임계값 조정

`scripts/generate-scenarios.mjs` 상단의 `viewports`와 각 시나리오의 `misMatchThreshold`, `delay`를 조정하면 됩니다.
