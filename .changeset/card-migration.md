---
"@jects/jds": minor
---

**Card**

Figma 디자인 변형 table에 맞춰 API를 정리하고 내부 이미지를 `Thumbnail`로 일원화합니다. preset 이름과 이미지 슬롯, Overlay의 타입이 바뀌므로 호출부 수정이 필요합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                                                                 | TO-BE                                       |
| ------------------------------------------------------------------------------------- | ------------------------------------------- |
| `Card.Image` / `CardImageProps`                                                       | `Card.Thumbnail` 또는 `Thumbnail`           |
| `Card.Preset.PlateWithTitle` / `PlateWithLabel` / `PlateCompact`                      | `Card.Preset.Plate`                         |
| `PlateWithTitlePresetProps` / `PlateWithLabelPresetProps` / `PlateCompactPresetProps` | `PlateLinkProps` / `PlateButtonProps`       |
| `PostPresetProps`                                                                     | `PostLinkProps` / `PostButtonProps`         |
| `Card.Label` / `CardLabelProps`                                                       | 제거 — 대체재 없음                          |
| `cardStyle` prop (`Card.Root`, Post) / `CardStyle` 타입                               | 제거 — Post는 항상 empty로 렌더링           |
| Overlay `as`에 임의 element 허용, `href` 미강제                                       | `"a"`, `"button"`만, `as="a"`면 `href` 필수 |
| Overlay DOM 마커 `data-overlay`                                                       | `data-part="overlay"`                       |
| Caption의 `standalone` prop                                                           | 제거 — 대체재 없음                          |
| `CardRootOwnProps`                                                                    | `CardRootProps`                             |

preset은 이름만 바뀌고 props는 동일합니다.

```diff
- <Card.Preset.PlateWithTitle.Link href={url} title={title} body={body} />
+ <Card.Preset.Plate.Link href={url} title={title} body={body} />
```

compound로 직접 조합한 경우 이미지를 교체합니다.

```diff
- <Card.Image src={src} alt={alt} />
+ <Card.Thumbnail image={{ src, alt }} />
```

**추가**

- `Card.Preset.Plate` / `Card.Preset.Post` — title과 body 기반 단일 preset, Plate는 `caption` 선택 가능, 둘 다 `.Link`(`href` 필수)와 `.Button`으로 분기
- `Card.Thumbnail` (`CardThumbnailProps` / `CardThumbnailImage`) — `layout`과 `variant`에 따라 자동 사이징
- `Card.ContentGroup` (`CardContentGroupProps`) — title과 body를 묶는 그룹 컨테이너
- `CardOverlayProps` — `Card.Overlay`의 `a` / `button` discriminated union 타입
- `Card.Root`와 preset이 native `div` 속성(`className`, `style`, `data-*` 등) 상속

**동작 변경 (코드 수정 불필요)**

- Post의 `Card.Meta`(author, date) 가로 정렬, 항상 empty 스타일로 렌더링
- Plate의 horizontal 높이 고정 — caption 없으면 `7.5rem`, 있으면 `9.5rem`, `Card.Title`은 1줄 말줄임
- horizontal에서 긴 텍스트가 넘치던 문제 수정, `Card.MetaItem` 말줄임 포함
- `Card.Overlay`의 disabled가 키보드와 보조기술까지 차단 — `as="button"`은 native `disabled`, `as="a"`는 `aria-disabled`와 `href` 제거, 기존에는 `pointer-events: none`만 적용
- Card 루트의 공통 `height: 100%` 제거 — 컨테이너 높이에 맞춰 늘어나지 않고 콘텐츠 높이 기준으로 렌더링
