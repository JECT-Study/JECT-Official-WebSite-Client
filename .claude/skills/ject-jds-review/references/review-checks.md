# JDS 검토 축

모든 항목을 형식적으로 지적하지 않는다. 실제 변경의 책임과 소비처 시나리오에 해당하는 항목을 적용한다.

## 공개 API와 타입

공개 배럴, package export, props/defaults, controlled/uncontrolled union, ref 대상, native prop forwarding, 합성 제약을 확인한다. 타입 규약은 현재 문서를 읽는다. 받지만 적용되지 않는 prop과 실제 state 의미가 혼동되는 이름을 찾는다.

## React와 행동

- 외부 값의 교체·비우기·거절과 draft 보존, derived state의 소유권, callback 교체, effect dependency와 teardown.
- disabled/readOnly/error/loading 전환, 열린 overlay의 상태 변경, 오래된 timer/listener, unmount 후 callback.
- 키와 modifier, IME, pointer/keyboard/touch, paste/drop의 대체 경로. preventDefault가 사용자 기능을 없애는지 같은 기능을 재구현하는지 확인한다.
- 상태 가드를 제거하면 무엇이 보호되지 않는지 검증한다. 비활성 화면이 unmount된다는 추정만으로 callback 수명까지 단정하지 않는다.
- `useEffect`, input 동기화 등 논쟁점은 React 공식 문서와 프로젝트 버전을 대조한다. useMemo/useCallback은 근거 없는 성능 필수 규칙이 아니다.

## 폼과 값

표시 값, 접근성 값, 달력/목록 선택 값, hidden input과 FormData를 비교한다. parse 실패, 부분 입력, 잘못된 날짜, reset과 defaultValue, reset 취소, `form` prop 재연결을 확인한다. props 정상화가 소비처 callback을 의도치 않게 호출하는지 확인한다.

## 접근성과 디자인

- native/primitive의 이름·설명·ARIA·focus를 wrapper까지 추적한다. 별도 textbox+dialog button을 combobox로 일괄 판정하지 않는다.
- WCAG AA 성공 기준과 예외, APG 권고, 제품 사용성의 근거를 분리한다. focus 복원은 열기 출처와 내부 selection도 확인한다.
- 실제 theme/state의 contrast, hit area/간격, 확대/reflow를 측정한다. token 이름, outline 제거, 아이콘 크기 하나만으로 결론 내리지 않는다.
- 디자이너 명세와 semantic token을 유지하면서 문제 원인이 컴포넌트 선택인지 전역 토큰인지 구분한다.

## 스토리·테스트·CI

- 사용법을 보여주는 안정된 스토리와 회귀 assertion의 역할을 구분한다. 테스트 제거 대신 docs 노출, `skip-vrt`, 안정된 fixture, play 완료 대기 등의 대안을 비교한다.
- Docs의 play autoplay는 설정으로 확인한다. Canvas 실행과 Docs 기본 동작은 같지 않다.
- source에 play가 있음, build 성공, browser에서 assertion 통과, CI interaction 실행, VRT 성공은 각각 다른 증거다.
- VRT capture가 play 완료를 기다리는지 실제 설정·onReady를 읽는다. 고정 delay와 baseline 재생성은 완료 신호가 아니다.
- 현재 PR head의 checks와 skip 조건을 확인한다. 소비처·배포 build 검사는 변경의 영향에 맞춰 수행한다.

## 배포와 소유권

[체인지셋 규약 확인](../../ject-jds-context/SKILL.md#체인지셋-규약-확인)을 적용해 대상 저장소/head의 `docs/changeset-guide.md` 전체를 먼저 읽고 체인지셋과 대조한다. 분리·통합, 신규 컴포넌트, 소비처 영향, bump는 원문의 조건과 예외로 판단한다. 리뷰 댓글의 요약을 규약 자체로 취급하지 않는다.

연동 버그가 이미 머지된 다른 컴포넌트에서 발생하면 원인과 소유권을 따로 기록한다. 요청한 컴포넌트만 수정하라는 경계를 넘어 고치지 않는다. 생성물은 input/generator까지 추적한다.
