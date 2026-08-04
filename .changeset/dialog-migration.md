---
"@jects/jds": minor
---

**Dialog**

Emotion에서 vanilla-extract로 Dialog 컴포넌트의 스타일링을 마이그레이션합니다. 함께 `tertiaryAction`, `isButtonStretched` prop과 action의 `hierarchy`가 제거되어 breaking change입니다.

**소비자 영향 (코드 수정 필요)**

| 항목                                     | AS-IS                       | TO-BE                                                  |
| ---------------------------------------- | --------------------------- | ------------------------------------------------------ |
| `tertiaryAction`                         | 세 번째 버튼 렌더링         | 제거 (primary/secondary 두 위계만 지원)                |
| `isButtonStretched`                      | 버튼을 늘리거나 세로로 스택 | `buttonLayout="vertical"`로 대체                       |
| `primaryAction.hierarchy` 등 `hierarchy` | 사용처가 버튼 위계를 지정   | 제거 (슬롯이 위계를 결정하므로 primary/secondary 고정) |

**마이그레이션 예시**

```diff
  <Dialog
-   primaryAction={{ children: "확인", hierarchy: "accent" }}
+   primaryAction={{ children: "확인" }}
    secondaryAction={{ children: "취소" }}
-   tertiaryAction={{ children: "더보기" }}
-   isButtonStretched
+   buttonLayout="vertical"
  />
```

**추가된 prop (non-breaking)**

| prop                     | 타입                         | 기본값          | 용도                                                            |
| ------------------------ | ---------------------------- | --------------- | --------------------------------------------------------------- |
| `buttonLayout`           | `"horizontal" \| "vertical"` | `"horizontal"`  | 버튼 배치. `vertical`은 primary를 위에 두고 전체 너비로 스택    |
| `closeOnInteractOutside` | `boolean`                    | `true`          | 바깥 클릭과 바깥으로의 포커스 이동에 의한 닫힘 여부. Esc는 별개 |
| `container`              | `HTMLElement \| null`        | `document.body` | Portal 렌더 대상                                                |
| `width`                  | `number`                     | -               | px 단위 패널 너비 고정                                          |

패널 너비는 기본적으로 400~560px 사이에서 내용에 맞춰 정해집니다. 이 범위는 권장값이라 서비스 요구에 따라 `width`로 고정할 수 있고, 지정하면 내용 길이와 무관하게 그 너비를 유지합니다. 어느 경우든 뷰포트를 넘지 않도록 좌우 16px을 남기고 줄어듭니다.

```tsx
<Dialog width={720} />
```

Portal로 렌더되고 포지셔닝과 애니메이션은 컴포넌트가 소유하므로 `className`과 `style`은 받지 않습니다. 사용처가 조정할 축은 `width`처럼 prop으로 명시합니다.

**동작 변경 (코드 수정 불필요)**

- 너비가 고정값에서 400~560px 범위로 바뀌고, 좁은 뷰포트에서는 화면 안쪽으로 줄어듭니다.
- 본문이 길면 본문 영역만 스크롤되고 제목과 버튼은 고정됩니다. 패널 높이는 `100dvh` 기준으로 제한됩니다.
- 제목과 본문이 Radix `Title`/`Description`으로 연결되어 레이블이 자동 지정되고, 스크롤이 생긴 본문은 키보드로 포커스해 탐색할 수 있습니다.
