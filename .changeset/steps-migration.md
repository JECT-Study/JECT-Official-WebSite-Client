---
"@jects/jds": minor
---

**Steps**: 수직 레이아웃 연결선에 활성 상태 색상을 적용하고, 활성 여부 결정 규칙을 정리.

**소비자 영향 (코드 수정 필요)**

| 항목                             | AS-IS                               | TO-BE                                 |
| -------------------------------- | ----------------------------------- | ------------------------------------- |
| 활성 상태 DOM 속성               | `data-activated`                    | `data-steps-activated`                |
| `activated` / `current` 우선순위 | `current`가 있으면 `activated` 무시 | `activated`가 `current` 계산을 덮어씀 |

`Steps.Item`의 활성 상태를 소비처에서 스타일링했다면 속성 이름을 교체합니다:

```diff
- [data-activated="true"] { ... }
+ [data-steps-activated="true"] { ... }
```

`current`와 `activated`를 함께 넘기던 경우 동작이 바뀝니다. 이전에는 `activated`가 무시됐지만 이제 반영됩니다. 건너뛴 선택 단계처럼 `current`만으로 표현할 수 없는 상태에 사용합니다:

```tsx
<Steps.Root current={2}>
  <Steps.Item index={0}>계정 생성</Steps.Item>
  <Steps.Item index={1} activated={false}>
    선택 단계
  </Steps.Item>
  <Steps.Item index={2}>완료</Steps.Item>
</Steps.Root>
```

두 prop 중 하나만 쓰던 코드는 동작이 동일합니다.

**동작 변경 (코드 수정 불필요)**

- 수직 연결선 색상의 활성 여부 분기 — 뒤에 오는 단계가 활성이면 `semantic.accent.neutral`, 아니면 `semantic.stroke.alpha.subtle` 적용
- 수직 연결선 비활성 색상 변경 — `semantic.stroke.alpha.assistive`(색상 미주입 시 `Divider` 기본값) → `semantic.stroke.alpha.subtle`
- 수직 연결선 활성 판정을 `:has()`로 처리 — `Steps.Item`을 다른 컴포넌트로 감싼 경우에도 활성 상태 유지
- 수평 separator 아이콘 크기 축소 — lg 16px → 14px, md 14px → 12px
- 수직 연결선 `Divider`에 `decorative` 적용 — 내부 `aria-hidden`이 `false`에서 `true`로 변경. 상위 래퍼가 이미 `aria-hidden`이라 보조기술 노출 여부는 동일하고 마크업 정합성만 개선
- 수평 layout 화살표 아이콘의 단일 색상 유지 — 디자인 명세대로 활성 여부와 무관

**변경 없음**

- 공개 API 표면 전체 동일 — `Steps` (`Root` / `Item`), `StepsSize` / `StepsLayout` / `StepsRootProps` / `StepsItemProps`. props와 ref 대상(`HTMLOListElement` / `HTMLDivElement`) 모두 유지
- 수평 배치 간격의 값과 렌더 결과 동일 — `Steps.Root`와 내부 `li`가 같은 CSS variable을 참조하도록 내부 구조만 정리. 한쪽만 어긋나 화살표 좌우가 비대칭이 되던 여지 제거
- Steps에서 공개하는 CSS variable 없음 — 내부 `stepsGapVar`는 export 대상 아님
