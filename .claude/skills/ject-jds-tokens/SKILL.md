---
name: ject-jds-tokens
description: JDS의 실제 입력·생성기·vanilla-extract 토큰 소비 경로를 추적해 토큰, 테마, variant와 스타일 일관성을 검토하거나 수정한다. Figma 명세와 코드 값의 연결, 생성물 및 토큰 변경 영향에 사용한다.
---

# JDS 토큰과 스타일 계약

`ject-jds-context`와 [현재 파이프라인](references/pipeline.md)을 읽고 해당 source → generator → output → component 경로를 확인한다. 토큰이 아닌 단순 layout 수정에 토큰 체계 재설계를 강제하지 않는다.

- 명세와 코드의 같은 개념을 먼저 연결한다. Figma 자료가 없으면 동기화·디자인 일치 여부는 미검증이다.
- semantic intent에 맞는 기존 토큰을 찾고 theme/state/variant의 결과를 확인한다. 같은 raw 값이라고 같은 의미의 토큰은 아니다.
- primitive/semantic/component 층을 무조건 추가하지 않는다. 컴포넌트 내부 CSS 변수는 override나 상태 조합의 로컬 수단일 수 있다.
- 명도 대비 부족은 `ject-jds-accessibility`로 측정한다. 개별 컴포넌트의 토큰 선택 오류와 전역 palette 변경을 구분하고 소비처 범위가 가장 작은 해결책을 비교한다. 디자이너 명세와 충돌하면 근거와 대안을 제시한다.
- 생성물은 직접 편집하지 않는다. 입력·generator만 권한 범위에서 변경하고 재생성 diff를 확인한다. 토큰 이름·타입·단위·출력 계약의 호환성을 평가한다.
- 성능이나 최신 표준을 이유로 스타일 시스템 또는 입력 포맷을 임의로 전환하지 않는다. DTCG는 호환성 기준으로 검토하며 현재 지원을 코드로 입증한다.

## 결과

현재 경로와 문제, source 수정안, theme/state별 영향, 공개 토큰 소비처와 migration, 재생성·검증 결과를 설명한다. 제품 코드 변경이 없다면 체인지셋을 만들지 않는다. 토큰 명세만 바꾼 것을 실제 스타일·대비 검증 완료로 보고하지 않는다.
