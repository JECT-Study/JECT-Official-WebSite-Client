---
"@jects/jds": minor
---

**hooks**

인터랙션 레이어가 CSS 기반으로 전환되면서 `@jects/jds/hooks`에서 `usePressable`과 `useContainerPressable`을 제거합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                   | TO-BE                                                          |
| ----------------------- | -------------------------------------------------------------- |
| `usePressable`          | 제거 — `@jects/jds/utils`의 `focusRing`, `overlay` recipe 사용 |
| `useContainerPressable` | 제거 — 같음                                                    |

**추가**

- `useControllableState` — 제어와 비제어 상태를 함께 다루는 훅, `@jects/jds/hooks`에서 가져옴
