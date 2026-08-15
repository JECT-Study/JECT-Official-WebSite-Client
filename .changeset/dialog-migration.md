---
"@jects/jds": minor
---

**Dialog**

Dialog의 스타일링을 Emotion에서 vanilla-extract로 마이그레이션하고 `tertiaryAction`, `isButtonStretched` prop과 action의 `hierarchy`를 제거합니다. 세 API를 쓰던 코드는 수정이 필요합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                    | TO-BE                                    |
| ---------------------------------------- | ---------------------------------------- |
| `tertiaryAction`                         | 제거 — primary, secondary 두 위계만 지원 |
| `isButtonStretched`                      | `buttonLayout="vertical"`                |
| `primaryAction.hierarchy` 등 `hierarchy` | 제거 — 슬롯이 위계를 결정                |

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

**추가**

| prop                     | 타입                         | 기본값          | 용도                                                            |
| ------------------------ | ---------------------------- | --------------- | --------------------------------------------------------------- |
| `buttonLayout`           | `"horizontal" \| "vertical"` | `"horizontal"`  | 버튼 배치. `vertical`은 primary를 위에 두고 전체 너비로 스택    |
| `closeOnInteractOutside` | `boolean`                    | `true`          | 바깥 클릭과 바깥으로의 포커스 이동에 의한 닫힘 여부. Esc는 별개 |
| `container`              | `HTMLElement \| null`        | `document.body` | Portal 렌더 대상                                                |
| `width`                  | `number`                     | -               | px 단위 패널 너비 고정                                          |

- `DialogButtonLayout` (`@jects/jds`) — `buttonLayout` prop의 값 타입
- `useVerticalOverflow` (`@jects/jds/hooks`) — 스크롤 컨테이너의 세로 오버플로 감지

패널 너비는 기본적으로 400~560px 사이에서 내용에 맞춰 정해지며, `width`를 지정하면 내용 길이와 무관하게 그 너비를 유지합니다. 어느 경우든 뷰포트를 넘지 않도록 좌우 16px을 남기고 줄어듭니다. Portal로 렌더되고 포지셔닝과 애니메이션을 컴포넌트가 소유하므로 `className`과 `style`은 받지 않습니다.

```tsx
<Dialog width={720} />
```

**동작 변경 (코드 수정 불필요)**

- 너비가 고정값에서 400~560px 범위로 변경, 좁은 뷰포트에서는 화면 안쪽으로 축소
- 본문이 길면 본문 영역만 스크롤되고 제목, 체크박스, 버튼은 고정 — 체크박스는 본문이 아니라 푸터에서 버튼과 함께 배치, 패널 높이는 `100dvh` 기준으로 제한
- 제목과 본문이 Radix `Title`, `Description`으로 연결되어 레이블 자동 지정, 스크롤이 생긴 본문은 키보드로 포커스해 탐색 가능
- 패널 border가 `stroke.alpha.subtle`에서 `stroke.subtle`로 변경 — light `#10101721` → `#e0e0e1`, dark `#f6f7fc19` → `#313237`
- 등장 애니메이션 200ms → 250ms, 퇴장 300ms → 200ms
