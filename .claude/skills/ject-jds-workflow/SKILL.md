---
name: ject-jds-workflow
description: JDS 컴포넌트의 요구사항 조사·역제안·질문·설계·구현·검증과 PR 설명 작성을 연결한다. 짧은 구현 요청, 직접 구현을 위한 설계 지원, 종합 검토와 이전 결과의 부분 재실행에 사용한다. 단순 경로 탐색·문서 오타·체인지셋만 다루는 작업에는 전체 절차를 적용하지 않는다.
---

# JDS 컴포넌트 개발

사용자의 최신 요청과 현재 AGENTS.md를 따른다. 요청한 범위만 수행한다.

- 구현 요청: 확정된 범위의 코드, 스토리, 검증까지 진행한다.
- 사용자가 직접 구현: 명세, API, 시나리오를 지원하고 구현 후 요청된 검토를 한다.
- 리뷰만 요청: 수정하거나 게시하지 않는다. [코드 리뷰](../ject-jds-review/SKILL.md)의 관련 범위만 적용한다.
- 단순 탐색, 문서, 체인지셋만 요청: 그 범위의 규약만 적용한다.

시작할 때 [저장소 맥락](../ject-jds-context/SKILL.md)을 한 번 확인하고 같은 작업 안에서 재사용한다. 개인 스킬을 이름만으로 부르지 말고 이 저장소의 SKILL.md를 읽는다.

## 1. 요구사항

짧은 요청에 기능을 추측해 구현하거나 긴 설문부터 보내지 않는다. [명세 조사와 질문](../ject-jds-figma-handoff/SKILL.md)으로 Figma, 사용처, 코드를 먼저 읽고, 확인된 요구사항과 AI 제안과 미결정을 나눠 짧게 보여준다. 명세가 충분하면 승인을 기다리지 않고 진행한다. 답변에 의존하는 변경만 보류하고 나머지는 계속한다.

## 2. 설계와 구현

[컴포넌트 설계](../ject-jds-component-design/SKILL.md)의 순서로 API와 상태 소유권을 정하고, [구현 절차](references/implementation.md)로 코드와 스토리를 작성한다. 토큰을 바꾸면 [토큰 스킬](../ject-jds-tokens/SKILL.md)을 읽는다. 요청 밖의 공통 primitive, 토큰, 의존성, 설정 변경이 필요하면 영향과 대안을 먼저 제시한다.

## 3. 검증

[검증 선택과 판정](references/quality-gates.md)으로 필요한 검사를 정한다.

- 접근성: [접근성 기준](../ject-jds-accessibility/SKILL.md), 실제 동작은 [브라우저 검증](../ject-jds-browser-check/SKILL.md)
- 배포 코드와 공개 계약: [패키지 검사](../ject-jds-package-check/SKILL.md)
- FF 17개 항목 전수 검토: 메인이 하지 않고 `ject-jds-ff` 역할에 맡긴다. 역할을 쓸 수 없는 도구에서만 메인이 [FF 검토](../ject-jds-ff-review/SKILL.md)를 직접 적용하고 그 사실을 보고한다.
- 복합 상태, 폼, Portal, 포커스 변경: 도구가 있으면 `ject-jds-browser` 역할도 쓴다.

역할에 넘기는 입력과 받는 결과는 [역할과 반환 계약](references/roles.md)을 따른다.

## 4. 기록, 재개, PR

긴 작업이나 도구 간 인계는 [작업 기록](references/record-contract.md)을 쓴다. 재개할 때는 HEAD와 커밋하지 않은 변경을 다시 비교해 영향받은 판단만 갱신한다. PR 설명은 [PR 작성](references/pull-request.md)을 따른다. 초안 작성과 커밋, 푸시, PR 게시는 각각 별개의 권한이며 이미 받은 권한은 다시 묻지 않는다.

## 최종 보고

먼저 결과, 소비처 영향, 열린 질문, 확인하지 못한 검사를 쓴다. 핵심 지적은 세 개까지만 앞에 두고 나머지 근거는 뒤에 둔다. 동료가 읽는 질문, 보고, PR 설명은 [문체 기준](../../../docs/ai/README.md#문체와-개선)대로 해요체로 쓴다.

호출 경계와 기대 행동의 예시는 [평가 사례](../../../docs/ai/evals/behavior-cases.md)에 있다.
