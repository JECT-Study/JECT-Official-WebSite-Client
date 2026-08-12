---
"@jects/jds": minor
---

**EmptyState**

EmptyState를 Emotion에서 vanilla-extract로 마이그레이션하고 신규 디자인 스펙을 반영합니다. `variant` 값 이름이 바뀌고 `icon`이 `image`로 교체되므로 호출부 수정이 필요합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                        | TO-BE                                       |
| -------------------------------------------- | ------------------------------------------- |
| `variant = "empty" \| "outlined" \| "alpha"` | `variant = "hollow" \| "dashed" \| "alpha"` |
| `icon?: IconName`                            | `image?: ThumbnailProps`                    |

`empty`는 `hollow`로, `outlined`는 `dashed`로 이름이 바뀌었고 별칭을 두지 않습니다. `image`는 `Thumbnail`을 재사용하므로 `{ src, alt }` 형태로 지정하며, 고정 폭 4rem에 기본 1:1 정사각형으로 렌더되고 `src`가 없으면 Thumbnail fallback이 표시됩니다.

```diff
- <EmptyState variant="outlined" icon="vector" header="제목" body="설명" />
+ <EmptyState variant="dashed" image={{ src: "/empty.png", alt: "빈 상태" }} header="제목" body="설명" />
```

**추가**

- `primaryAction`과 `secondaryAction`을 독립적으로 지정 가능 — 기존에는 `secondaryAction`이 `primaryAction`을 요구
- 루트에 native `div` 속성(`className`, `id`, `aria-*`, `onClick` 등) 전달 가능
- `header`가 optional로 변경 — 값이 없으면 타이틀 미렌더, `body`는 계속 필수

**동작 변경 (코드 수정 불필요)**

- 타이틀 타이포 `label` bold → `title/1`(20px), 본문 `body-xs` → `body-md`(15px)로 확대
- 타이틀 색상 `object.neutral`, 본문 색상 `object.alternative` 적용
