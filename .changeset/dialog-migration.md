---
"@jects/jds": minor
---

**Dialog**

Emotion에서 vanilla-extract로 Dialog 컴포넌트의 스타일링을 마이그레이션합니다. 함께 `tertiaryAction`, `isButtonStretched` prop이 제거되어 breaking change입니다.

**소비자 영향 (코드 수정 필요)**

| 항목                | AS-IS                       | TO-BE                                      |
| ------------------- | --------------------------- | ------------------------------------------ |
| `tertiaryAction`    | 세 번째 버튼 렌더링         | 제거 (primary/secondary 두 위계만 지원)    |
| `isButtonStretched` | 버튼을 늘리거나 세로로 스택 | 제거 (버튼은 항상 우측 정렬 가로 행, `md`) |

**마이그레이션 예시**

```diff
  <Dialog
    primaryAction={{ children: "확인" }}
    secondaryAction={{ children: "취소" }}
-   tertiaryAction={{ children: "더보기" }}
-   isButtonStretched
  />
```

**추가 사항 (non-breaking)**

- `closeOnClickOutside?: boolean` prop 추가 (기본 `true`, 배경 클릭 닫힘 제어)
- `container?: HTMLElement | null` prop 추가 (Portal 렌더 대상 지정)
- `className?: string` prop 추가 (다이얼로그 표면 스타일 확장)
- 너비 정책 변경: 고정 너비 제거, `min-width` 400 / `max-width` 560 및 모바일 뷰포트 대응
- 접근성: 제목/본문을 Radix `Title`/`Description`으로 위임해 레이블 자동 연결
