# JDS Figma 탐색 지도

2026-10-20에 정리한 대표 명세의 탐색 시작점이다. 최신 명세나 전 컴포넌트 감사 결과를 뜻하지 않는다. 실제 작업에서는 대상 문구·상태와 현재 코드를 다시 확인한다.

파일: [JDS Figma](https://www.figma.com/design/VGdi9AdcpTxkzK1Kqxcd3D/?node-id=0-1), key `VGdi9AdcpTxkzK1Kqxcd3D`.

| 페이지             | node-id      | 확인할 내용                                                              |
| ------------------ | ------------ | ------------------------------------------------------------------------ |
| Overview           | 0:1          | 목표, Principles/Foundations/Components/Patterns, 핸드오프 제외 범위     |
| Design conventions | 12993:52935  | 이름·variant·with/visible 의미, 작업 상태 표시와 장식 레이어             |
| Design tokens      | 12776:268265 | raw/primitive/semantic과 예외, 컴포넌트 토큰 미사용 결정                 |
| Scheme             | 12776:230172 | spacing과 padding 차이, 320–767 / 768–1199 / 1200+ 구간                  |
| Environment        | 12776:232409 | shadow·duration·motion·level의 의미와 구현 해석                          |
| Voice and tone     | 12776:267434 | JDS 고유 보이스·톤. 외부 문구 스킬을 적용하기 전 확인                    |
| Feedback messages  | 12993:52936  | 상황·영향·다음 행동, 오류 안내의 책임                                    |
| Button             | 228:59754    | 브라우저 state, hierarchy/size/style/feedback, 세트 기본값과 권장 사용값 |
| Date field         | 27034:229231 | 직접 입력·달력 동기화·레이블·폼·포커스                                   |
| Focus ring         | 21432:138991 | 실제 focus-visible, interaction layer와 공존, clipping                   |
| Patterns           | 10531:486566 | Form/Fieldset 등 조합의 사용 맥락과 공개 API 필요성                      |

표시 의미: 🔩는 Figma 문서 전용이며 개발 핸드오프 제외, 🧪는 PoC로 논의·검증 필요, 🔨는 개발 미완료, 🚧는 디자인 변경 중/예정, ❌는 지원 중단/삭제 검토다. 표시와 실제 source·스토리·릴리스 상태를 별도로 기록한다.

확인한 주요 해석: Figma 상호작용 variant는 공개 React prop과 일대일이 아니다. with/visible의 의미와 Figma 구현 방식은 다를 수 있으므로 원문 의도를 확인한다. Figma의 layer 계층을 DOM 계층으로 그대로 복제하지 않는다. 문서용 부품과 패턴을 자동으로 패키지 export하지 않는다.
