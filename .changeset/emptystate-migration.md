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

- `primaryAction`과 `secondaryAction`을 독립적으로 지정할 수 있습니다. 기존에는 `secondaryAction`이 `primaryAction`을 요구했습니다
- 루트에 native `div` 속성(`className`, `id`, `aria-*`, `onClick` 등)을 전달할 수 있습니다
- `header`가 optional로 바뀝니다. 값이 없으면 타이틀을 렌더하지 않으며 `body`는 계속 필수입니다

**동작 변경 (코드 수정 불필요)**

- 타이틀 타이포가 `label` bold에서 `title/1`(20px)로, 본문이 `body-xs`에서 `body-md`(15px)로 커집니다.
- 타이틀 색상에 `object.neutral`, 본문 색상에 `object.alternative`를 적용합니다.
