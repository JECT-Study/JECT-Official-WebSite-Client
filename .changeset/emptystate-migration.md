---
"@jects/jds": minor
---

**EmptyState**

EmptyState를 Emotion에서 vanilla-extract로 마이그레이션하고 신규 디자인 스펙을 반영했습니다. `variant` 이름 변경과 `icon` → `image` prop 교체로 breaking change가 포함됩니다.

**Breaking (호출부 수정 필요)**

| 항목      | AS-IS                              | TO-BE                                       |
| --------- | ---------------------------------- | ------------------------------------------- |
| `variant` | `"empty" \| "outlined" \| "alpha"` | `"hollow" \| "dashed" \| "alpha"`           |
| 이미지    | `icon?: IconName`                  | `image?: ThumbnailProps` (Thumbnail 재사용) |

- `empty` → `hollow`, `outlined` → `dashed`로 이름이 바뀌었고 별칭을 두지 않습니다.
- `icon` prop이 제거되고, `Thumbnail`을 재사용하는 `image` 슬롯(`ThumbnailProps`)으로 대체됩니다. `{ src, alt }` 형태로 지정하며 고정 폭 4rem(기본 1:1 정사각형)으로 렌더되고, `src`가 없으면 Thumbnail fallback이 표시됩니다.

**추가 / 개선 (non-breaking)**

- `primaryAction` / `secondaryAction`을 독립적으로 지정할 수 있습니다. 기존엔 `secondaryAction`이 `primaryAction`을 요구했으나, 이제 secondary 버튼 단독 사용도 가능합니다.
- 루트에 native `div` 속성(`className`, `id`, `aria-*`, `onClick` 등)을 전달할 수 있습니다.
- `header`가 optional로 변경되었습니다. 값이 없으면 타이틀을 렌더하지 않습니다. `body`는 계속 필수입니다.

**디자인 변경**

- 타이틀 타이포 `label` bold → `title/1`(20px), 본문 `body-xs` → `body-md`(15px)로 확대
- 타이틀 색상 `object.neutral`, 본문 색상 `object.alternative` 적용

**마이그레이션 예시**

```diff
- <EmptyState variant="outlined" icon="vector" header="제목" body="설명" />
+ <EmptyState variant="dashed" image={{ src: "/empty.png", alt: "빈 상태" }} header="제목" body="설명" />
```
