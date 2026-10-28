# JDS 저장소 탐색 지도

이 지도는 탐색 시작점이다. 버전, 경로와 실행 가능 여부는 현재 checkout의 manifest·설정·소스로 다시 확인한다.

| 경로                        | 확인할 책임                                                                   |
| --------------------------- | ----------------------------------------------------------------------------- |
| `packages/jds`              | `@jects/jds`, 공개 API·타입·CSS·컴포넌트·훅·토큰                              |
| `packages/jds/AGENTS.md`    | JDS 파일 구조·compound·배럴·스타일·아이콘·스토리 규칙                         |
| `packages/vrt`              | Storybook 빌드, Docker 기반 시각 회귀와 캡처 조건                             |
| `packages/figma-token-sync` | Figma 변수를 DTCG 파일로 내보내 토큰 입력 PR을 만드는 플러그인                |
| `apps/web`                  | 실제 웹사이트 소비처. 퍼블리시된 `@jects/jds`를 쓰며 테스트 설정은 JDS와 별개 |
| `config/eslint`             | 공통 lint 규칙                                                                |
| `docs/type-convention.md`   | JDS 타입 선언·배치 규약                                                       |
| `docs/changeset-guide.md`   | 배포 코드 변경의 체인지셋 규약                                                |

npm workspaces와 Turborepo를 사용한다. React/React DOM 지원 범위와 설치 버전은 JDS package.json·lockfile에서 확인한다. 최신 React 문서의 예제가 현재 소비처에서 지원되는지 대조한다. JDS는 vanilla-extract와 `radix-ui` 기반이며 별도 스타일 시스템을 도입하지 않는다.

## 구현을 찾는 순서

- 대상 컴포넌트 → 공개 배럴·타입 → 사용처·스토리 → 기존 native/Radix/JDS primitive를 읽는다.
- `Field`, `TextField`, `SelectField`, `Listbox`와 state/focus 관련 훅은 존재와 실제 책임을 확인한 뒤 참고한다. 아직 없는 컴포넌트를 이미 구현된 것으로 가정하지 않는다.
- 몇 사례의 공통점만으로 모든 컴포넌트를 compound나 Context로 통일하지 않는다.

## 검증 경로

- 현재 AGENTS의 `npm run type-check`, `npm run lint`, 커밋 전 format 규칙을 따른다.
- JDS Storybook은 `npm run storybook --workspace=@jects/jds`, 빌드는 `npm run build-storybook --workspace=@jects/jds`에서 확인한다.
- JDS `.storybook` 설정과 package scripts를 읽는다. play 코드·빌드·실제 assertion 실행·자동 접근성 검사는 각각 별도 근거다. apps/web의 애드온을 JDS 검사로 대신하지 않는다.
- VRT 명령과 Docker 사용 가능 여부를 확인한다. 태그·viewport·캡처 범위·play 완료 대기 조건은 `packages/vrt`의 현재 소스로 확인한다. baseline 생성은 비교 통과가 아니다.
- 패키지 빌드의 check-dts/check-package와 실제 export·CSS 산출물은 배포 코드 변경 때 확인한다. 지원을 주장하는 소비 환경은 따로 실행한다.
- 토큰 생성은 [토큰 파이프라인](../../ject-jds-tokens/references/pipeline.md)을 필요할 때 읽는다. 생성물은 직접 수정하지 않는다.
