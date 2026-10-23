# 접근성 검증 절차

## 지금 사용할 수 있는 경로

현재 JDS는 Storybook 10.1 계열의 `storybook/test` play를 사용하고 a11y/Vitest 애드온은 설정되어 있지 않다. apps/web 설정을 JDS 검사 완료로 대신하지 않는다. 설치된 의존성·설정·실행 스크립트를 다시 확인한다.

- 정적 추적: 레이블/설명 ID, 실제 HTML과 prop 전달, public API, 필수·오류·disabled/readOnly 의미.
- 브라우저: 렌더된 DOM/접근성 트리, computed style, focus와 selection, 상태 변경과 실제 FormData. 도구가 지원하는 API를 사용하고 성공한 조작과 실패한 시도를 구분한다.
- Storybook play: userEvent와 assertion으로 값·키보드·포커스 계약을 실행 검증할 수 있다. 실행 및 통과 여부를 확인한다. 빌드, VRT, 소스에 assertion이 있다는 사실은 별개의 증거다.
- 보조 기술: custom 입력과 overlay의 이름·값·상태·포커스 안내는 실제 VoiceOver/Safari 또는 NVDA/해당 브라우저 등 사용 가능한 조합에서 검증한다. 사용자 대신 실행할 수 없으면 조합과 확인 절차를 제공하고 미검증으로 남긴다.

## 실행 시나리오

1. 사용 예시의 레이블, 도움말과 오류가 올바른 control ID를 가리키는지 확인한다. 색만으로 오류를 전달하지 않는지 확인하고 오류 검증의 소비처 책임을 구분한다.
2. Tab/Shift+Tab 진입·이탈, Enter/Space 활성화, 해당 패턴의 방향키/Home/End, Escape, modifier 키를 기록한다. 포인터와 키보드가 같은 결과를 만드는지 확인한다.
3. overlay의 진입 포커스, trap이 필요한 범위, nested view의 Escape, dismiss, 열기 출처별 복귀를 실행한다. ref focus 복원 후 segment/active item도 확인한다.
4. 열린 상태와 편집 상태를 변경한다. expanded/selected/checked/invalid/required 등 표시와 ARIA가 일치하는지 확인한다. aria-required는 native validation을 실행하지 않는다.
5. contrast는 텍스트·placeholder·아이콘/경계·포커스의 해당 기준을 구분한다. 라이트/다크, alpha 합성과 실제 배경, 활성/오류/readonly 상태를 측정한다. disabled 예외를 활성 필드에 적용하지 않는다.
6. target은 아이콘의 시각 크기 대신 실제 hit area, pseudo-element의 pointer-events, 인접 대상과 간격 예외를 확인한다. bounding box 하나만으로 위반을 단정하지 않는다.
7. 200% 텍스트 확대, 320 CSS px reflow, text spacing, overlay clipping/scroll, forced colors와 reduced motion을 해당 범위에서 확인한다. viewport 축소나 CSS transform만으로 텍스트 확대를 검증했다고 말하지 않는다.

## 도구 선택과 단계

| 도구                           | 기대 효과                                   | 한계 및 적용 판단                                                                         |
| ------------------------------ | ------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 기존 브라우저 + Storybook play | 추가 의존성 없이 실제 조작과 상태 계약 확인 | 복잡한 낭독, 전체 WCAG 검증을 대신하지 않음                                               |
| axe-core / 브라우저 axe 검사   | 렌더된 이름·ARIA·대비 등 규칙 검증          | incomplete 결과를 수동 확인. 상태/포털 범위와 설치 버전의 WCAG tags 확인                  |
| Storybook addon-a11y           | 스토리 안에서 axe 결과를 반복 확인          | JDS의 Storybook 버전과 맞춰야 함. 애드온 추가만으로 CI 검사가 생기지 않음                 |
| eslint-plugin-jsx-a11y         | JSX 의미론 오류의 빠른 피드백               | custom 컴포넌트와 polymorphism 매핑이 필요. 실제 focus/contrast/상태 전환은 검증하지 못함 |
| CI interaction/axe runner      | 실행 가능한 회귀 검증을 지속 수행           | runner와 기존 Storybook/VRT 실행의 역할·비용·capture 완료 조건을 먼저 설계                |

[Storybook 공식 접근성 안내](https://storybook.js.org/docs/writing-tests/accessibility-testing), [axe-core 공식 저장소](https://github.com/dequelabs/axe-core)를 확인한다. 자동 검사 규칙의 WCAG 2.2 지원/설정을 확인하고 자동 통과를 AA 준수 인증으로 표현하지 않는다.

검증은 기존 실행 경로와 브라우저/보조 기술 점검부터 사용한다. 도구 도입을 요청받으면 addon-a11y와 axe의 기존 설치 가능성을 먼저 검토하고 중복 엔진 설치를 피한다. 자동 회귀를 팀 CI에 연결하는 일은 별도 변경으로 제안한다. package.json, lockfile, config, workflow를 스킬 작업 중에 수정하지 않는다.

## 결과 기록 예

`대상 / checkout 또는 PR head / 상태·테마 / 입력 방법 / 재현 / 실제·기대 / 영향 / WCAG 또는 APG 링크 / 증거 / 판정 / 미검증 범위`를 필요한 만큼 기록한다. 날짜 함수 재현, DOM 측정, 스크린 리더 테스트를 같은 검증으로 묶지 않는다.
