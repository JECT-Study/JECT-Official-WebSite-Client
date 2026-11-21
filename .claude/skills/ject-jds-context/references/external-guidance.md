# 외부 지침 적용 범위

2026-10-12 공식 원문을 확인했다. Vercel agent-skills 확인 revision: `063bee94c3f4df8453406c830b0a7df0f2860278`. 필요할 때 최신 원문과 지원 React 버전을 다시 확인한다. 아래는 원문을 그대로 설치한 스킬이 아니라 JDS에 맞게 선별한 참고 기준이다.

| 자료                                                                                                                                                                                                                     | 활용                                             | 그대로 적용하지 않을 부분                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Vercel Composition Patterns](https://github.com/vercel-labs/agent-skills/tree/main/skills/composition-patterns)                                                                                                         | 합성, 상태 소유권, 복잡한 모드의 API 비교        | React 19 전용 ref/use 지침, 모든 컴포넌트의 context화, 네이티브 boolean까지 일괄 제거                                                                       |
| [Vercel Web Design Guidelines](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) / [원문 규칙](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md) | 이름, HTML 의미론, 실제 포커스, 입력과 표시 품질 | 모든 인터랙션에 custom key handler, 모든 async 변경에 live region, 모든 preventDefault를 결함으로 보는 기계적 적용. 대체 붙여넣기 동작과 native 동작을 추적 |
| [Vercel React Best Practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices)                                                                                                         | 렌더 원인, effect 책임, 비용이 확인된 최적화     | Next.js/RSC 전제, React 19 API, 근거 없는 memo/cache. 공개 배럴을 없애라는 일괄 지침                                                                        |

## 우선순위와 판단

사용자의 최신 요청과 현재 프로젝트 규약을 먼저 따른다. 접근성 요구사항은 W3C 성공 기준과 적용 조건을 확인한다. React 동작은 [공식 input 문서](https://react.dev/reference/react-dom/components/input), [effect 문서](https://react.dev/reference/react/useEffect) 등 원문과 설치 버전을 대조한다. 외부 스킬은 설계 대안이며 규격이나 팀 합의가 아니다.

외부 원문의 권장 코드라도 재현 가능한 문제와 변경 효과가 없으면 리팩터링하지 않는다. 렌더링 병목은 Profiler/측정 또는 명확한 계산 비용으로 확인하고, effect를 이벤트로 옮길 때 외부 변경·구독 동기화가 필요한지 확인한다. 공개 소비처 API와 내부 import 최적화는 별도로 판단한다.

이 스킬은 외부 도구 실행·패키지 설치·PR 게시 권한을 부여하지 않는다.
