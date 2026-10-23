# 상태·이벤트 계약

## 편집 상태와 외부 값

- `value`는 소비처가 소유한다. 제어 모드에서 변경 요청과 실제 승인된 값을 구분한다. 내부 draft, 선택 범위, 열림 상태가 외부 값과 어떤 관계인지 정한다.
- `defaultValue`는 초기값인지 reset 기준도 되는지 명시한다. controlled/uncontrolled 전환을 우연히 지원한다고 가정하지 않는다.
- 부분 입력, 임시로 유효하지 않은 입력, 완성된 값, 제출 값을 구분한다. onChange의 호출 시점과 payload, blur/Enter/세그먼트 이동 시 확정 정책을 정한다.
- draft를 보존하는 방식과 부모가 값을 거절했을 때 복구하는 방식이 충돌하는지 확인한다. derived state를 지우거나 effect dependency만 바꾸는 단일 처방을 강제하지 않는다.
- 이 판단은 날짜뿐 아니라 검색어/선택값, 숫자/형식 문자열, 업로드 목록/진행 상태에도 적용하되 실제 기능에 필요한 상태만 만든다.

## 사건과 생명주기

- 소비처 handler와 내부 handler의 순서, `defaultPrevented` 존중, 중복 callback과 stale closure를 확인한다.
- modifier와 기본 키를 함께 정의한다. native 단축키, IME, 전체 선택, 붙여넣기, drop과 모바일 입력 경로가 keyboard handler 밖에서도 계약을 지키는지 확인한다.
- 이벤트 구독의 대상이 바뀌면 이전 구독을 해제하고 새 대상에 연결한다. 타이머와 listener는 teardown을 정의하고 오래된 작업이 값이나 포커스를 바꾸지 않는지 재현한다.
- effect는 외부 시스템과의 동기화에 사용한다. dependencies를 줄여 최신 대상이나 콜백을 잃지 않는다. 비동기 작업의 취소와 오래된 결과 무시는 구분한다.

## 폼과 팝오버

- 표시 형식이 달라도 화면·접근성 트리·hidden input·FormData가 같은 날짜·빈값의 의미를 나타내야 한다. 표시 문자열과 제출 문자열을 억지로 동일하게 만들지 않는다. 해석 실패, 빈 값, readOnly, disabled, required, form 재연결, reset 취소를 확인한다.
- 제한이 달력/목록에만 적용되는지 직접 입력에도 적용되는지 구분한다. 받지만 적용하지 않는 native prop은 타입에서 제외하거나 동작을 명시한다.
- focus/open/dismiss는 lower primitive의 구현을 읽는다. 열기 출처와 선택 범위, disabled 전환 후 포커스의 대안을 정의한다.
- 보이지 않는다고 해서 예약된 callback까지 없어졌다고 단정하지 않는다. 쓰기 가드를 제거할 때는 실제 수명과 이벤트 순서를 확인한다.

## 합성과 타입

- `Field`는 공통 이름·설명·상태 연결을, 입력은 값/폼 계약을, popup은 표시와 포커스를 소유할 수 있다. 같은 사용자 동작의 상태가 여러 곳에서 독립적으로 바뀌지 않도록 한다.
- options 편의 API와 compound 구성 API는 서로 다른 소비처 요구를 지원할 수 있다. 기존 조합 가능성과 required semantics를 보존한다.
- props union으로 불가능한 조합을 제한하되 통상적인 사용을 복잡하게 만들지 않는다. 객체 interface, public types 위치, context/hook/style 타입 위치는 현재 타입 규약을 따른다.
- 공개 배럴은 필수 계약이다. ref 대상, DOM/role, native attribute, onChange payload가 바뀌면 호환성을 확인한다.

## 검증

초기값 한 번으로 검증을 끝내지 않는다. 외부 값 교체·비우기·거절, 열린 상태에서 disabled/readOnly 전환, 새 callback, form 연결 변경, unmount를 필요한 경우 실행한다. 내부 함수 실행은 React·브라우저 동작 검증과 구분한다.
