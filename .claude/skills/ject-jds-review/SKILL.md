---
name: ject-jds-review
description: JDS 코드·PR·게시된 리뷰를 실제 대상 head에서 검토하고 재현 가능한 결함과 개선 의견을 구분한다. 공개 API, React 상태·이벤트·폼, 접근성, 토큰, 스토리·검증·배포 영향을 확인하며 리뷰 요청만으로 수정·게시하지 않는다.
---

# JDS 코드와 PR 리뷰

실제 결함을 찾는 검토가 목적이다. 코드 스타일이나 추상화 취향을 기능 결함처럼 보고하지 않는다.

## 대상과 근거

1. `ject-jds-context`로 작업 트리를 보존하고 대상 branch/PR base/head를 확인한다. 스택 PR과 이미 머지된 변경을 구분한다. 체인지셋 검토와 관련 리뷰 판단에는 [체인지셋 규약 확인](../ject-jds-context/SKILL.md#체인지셋-규약-확인)을 적용해 대상 head의 `docs/changeset-guide.md` 원문 전체를 읽는다.
2. PR이 대상일 때 설명, 변경 파일, 현재 checks, review 본문·inline 댓글·답글 및 해결 상태를 읽는다. 파일 경로가 대상이면 요청한 파일 전체와 필요한 사용처를 검토하고 관련 없는 PR 전체 조회로 확대하지 않는다. 브랜치/diff 리뷰는 요청한 비교 범위를 따른다. 리뷰 작성자의 판단을 그대로 사실로 취급하지 않는다.
3. 로컬과 PR head가 다르면 read-only remote source/diff 또는 안전한 별도 작업 공간에서 실제 head를 읽는다. 로컬 재현이 PR에도 적용되는지 source를 비교한다.
4. [검토 축](references/review-checks.md) 중 변경에 해당하는 계약을 전체 경로로 추적한다. 접근성은 `ject-jds-accessibility`, 토큰은 `ject-jds-tokens`, 설계 대안은 `ject-jds-component-design`의 해당 부분만 사용한다.
5. 유지보수성·설계 품질 또는 FF 기준을 요청했다면 [ject-jds-ff-review](../ject-jds-ff-review/SKILL.md)와 criteria 전체를 적용한다. 실제 PR/경로를 대상으로 사용하고 FF 판단과 기능 결함을 분리한다. 버그만 요청한 검토에는 FF 전수 평가를 강제하지 않는다.
6. 기존 assertion과 primitive가 문제를 막는지 확인하고 필요한 동작을 재현한다. PR 리뷰에서도 동적 prop 변경과 폼 제출을 확인한다. 미실행 검사는 성공으로 기록하지 않는다.

## 결과

- 확정 결함은 우선순위, 작은 코드 위치, 입력/상태 조건, 실제·기대 결과, 소비처 영향과 증거를 포함한다. 원격 PR 코드는 검증한 위치 또는 리뷰 permalink로 연결한다.
- 게시된 리뷰는 항목마다 수용/부분 수용/보류와 근거를 설명한다. 규약 예외와 native/primitive 동작을 확인하고 잘못된 전제도 명확하게 짚는다.
- 유지보수/사용성 권고, 미검증 위험, 팀 선택은 결함과 구분한다. FF 관점은 변경하기 쉬운지에 대한 보조 평가이며 런타임 결함·접근성 검증을 대신하지 않는다.
- 현재 PR 미반영 로컬 수정과 이미 해결된 문제를 구분한다. CI green, baseline 생성, review 승인 상태도 서로 다르다.
- 수정이 요청되지 않았다면 코드 변경, 커밋, push, PR 답글·review 제출·thread resolve를 하지 않는다.
