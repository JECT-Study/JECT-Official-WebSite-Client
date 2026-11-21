# 동작·접근성·시각 실행 행렬

검사 대상의 관련 행만 선택하고 제외 이유를 남긴다. WCAG 수치·예외는 기존 accessibility reference와 현재 W3C 원문을 확인한다.

| 대상           | 실행할 장면                                 | 관찰할 결과                                             |
| -------------- | ------------------------------------------- | ------------------------------------------------------- |
| 기본 인터랙션  | Tab/Shift+Tab·Enter/Space·클릭/터치         | 올바른 활성화, 중복 callback 없음, 보이는 포커스        |
| 복합 위젯      | 해당 패턴의 방향키/Home/End/Escape          | 선택·active item·포커스 이동과 ARIA 상태 일치           |
| 오버레이       | 키보드/포인터로 열기·선택·바깥 클릭·닫기    | 진입·필요한 trap·dismiss·원래 흐름에 맞는 복귀          |
| 중첩/Portal    | 중첩 팝업·scroll·비활성 전환                | 처리할 Escape 범위, clipping·스타일/상태 전달           |
| 제어값         | 외부 교체·비우기·부모 거절                  | 확정값과 draft/표시의 계약, 중복 통지 없음              |
| 입력           | 부분 입력·붙여넣기·IME·모바일 입력          | 파싱·selection·확정 정책과 허용 범위                    |
| 폼             | submit·reset·reset 취소·name/form 연결 변경 | 실제 FormData·제어 방식별 값·disabled/readOnly/required |
| ReactNode      | null/false/0/빈 문자열·접두/접미 제거       | 공개 prop이 약속한 렌더 결과와 빈 래퍼 간격             |
| 수명           | callback 교체·늦은 타이머·unmount           | 오래된 값/포커스 쓰기와 중복 구독 방지                  |
| 이름과 오류    | 레이블·설명·오류 전환·레이블 없는 지원 API  | 유효한 참조 ID·이름·상태와 색 외 정보                   |
| 보조 기술      | 실제 지원할 screen reader+browser           | 이름·값·상태·포커스·상태 메시지의 실제 낭독             |
| 대비           | light/dark·투명색·오류·readonly             | 실제 배경과 합성한 텍스트/비텍스트 기준 측정            |
| 포인터         | 실제 hit area와 이웃 요소                   | 크기·간격·해당 예외. SVG 크기와 구분                    |
| 확대·좁은 화면 | 텍스트 확대·320 CSS px reflow·text spacing  | 정보/조작 손실·겹침·잘림·스크롤                         |
| 표시 조건      | forced colors·reduced motion 중 관련 조건   | 포커스·상태 식별과 필수 정보 전달                       |

## 실행 기록 예시

```text
검증 ID / 연결된 요구사항:
repository / HEAD / 변경 파일과 확인 시점:
story URL / browser / OS / viewport / theme:
입력·이전 상태 / 실행 단계:
기대 결과 / 실제 결과:
관련 WCAG 번호·수준 또는 APG 권고 / 적용 이유:
코드 위치 / 스크린샷·DOM·관찰 로그:
판정: 통과 / 결함 / 미검증 / 명세 질문
사용하지 못한 도구·보조 기술 및 남은 확인:
```

VRT 지연시간은 play assertion 완료의 증거가 아니다. DOM 크기 하나는 target spacing 예외의 검토를 대신하지 않는다. 브라우저 viewport 축소나 CSS transform은 실제 텍스트 확대 검증과 다르다. 자동 검사 통과와 스크린 리더 낭독 확인을 같은 항목으로 기록하지 않는다.
