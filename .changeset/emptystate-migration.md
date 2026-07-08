---
"@jects/jds": minor
---

**EmptyState**

EmptyState 컴포넌트의 스타일링을 Emotion에서 vanilla-extract로 마이그레이션하고, 신규 디자인 스펙을 반영했습니다. `variant` 이름 변경과 `icon` → `image` prop 교체로 breaking change가 포함됩니다.

**소비자 영향 (코드 수정 필요)**

| 항목      | AS-IS                              | TO-BE                                    |
| --------- | ---------------------------------- | ---------------------------------------- |
| `variant` | `"empty" \| "outlined" \| "alpha"` | `"hollow" \| "dashed" \| "alpha"`        |
| 이미지    | `icon?: IconName`                  | `image?: ThumbnailProps` (Thumbnail 재사용) |

`empty` → `hollow`, `outlined` → `dashed`로 이름이 바뀌었고 별칭을 두지 않으므로 해당 값을 쓰던 호출부는 마이그레이션이 필요합니다. `icon` prop은 제거되고, `Thumbnail`을 재사용하는 `image` 슬롯(`ThumbnailProps`)으로 대체됩니다. `src`를 주지 않으면 Thumbnail의 fallback이 표시됩니다.

**디자인 변경 (non-breaking)**

- 타이틀 타이포를 `label` bold → `title/1`(20px)로, 본문을 `body-xs` → `body-md`(15px)로 확대
- 타이틀 색상 `object.neutral`, 본문 색상 `object.alternative` 적용

**마이그레이션 예시**

```diff
- <EmptyState variant="outlined" icon="vector" header="제목" body="설명" />
+ <EmptyState variant="dashed" image={{ src: "/empty.png", alt: "빈 상태" }} header="제목" body="설명" />
```
