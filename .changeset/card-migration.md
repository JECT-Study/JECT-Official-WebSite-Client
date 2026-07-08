---
"@jects/jds": minor
---

**Card**: Figma 디자인 변형 table에 맞춰 API를 정리하고, 내부 이미지를 `Thumbnail`로 일원화.

**추가**

- `Card.Preset.Plate` / `Card.Preset.Post`: title + body 기반 단일 preset (Plate는 optional `caption`), `.Link`(`href` 필수) / `.Button` 분기 — props 타입 `PlateLinkProps`·`PlateButtonProps` / `PostLinkProps`·`PostButtonProps`
- `Card.Thumbnail` (`CardThumbnailProps` / `CardThumbnailImage`): `layout`×`variant` 자동 사이징, public 노출
- `Card.ContentGroup` (`CardContentGroupProps`): title·body를 묶는 그룹 컨테이너
- `CardOverlayProps` export — `Card.Overlay`의 `a` / `button` discriminated union 타입
- `Card.Root` / preset이 native `div` 속성(`className`·`style`·`data-*` 등) 상속

**소비자 영향 (코드 수정 필요)**

| 항목              | AS-IS                                                                                 | TO-BE                                       |
| ----------------- | ------------------------------------------------------------------------------------- | ------------------------------------------- |
| 이미지            | `Card.Image` / `CardImageProps`                                                       | `Card.Thumbnail` 또는 `Thumbnail`           |
| Plate preset      | `Card.Preset.PlateWithTitle` / `PlateWithLabel` / `PlateCompact`                      | `Card.Preset.Plate`                         |
| Plate preset 타입 | `PlateWithTitlePresetProps` / `PlateWithLabelPresetProps` / `PlateCompactPresetProps` | `PlateLinkProps` / `PlateButtonProps`       |
| Post preset 타입  | `PostPresetProps`                                                                     | `PostLinkProps` / `PostButtonProps`         |
| Plate label       | `Card.Label` / `CardLabelProps`                                                       | 제거 — 미지원                               |
| Card 스타일       | `cardStyle` prop (`Card.Root`·Post) / `CardStyle` 타입                                | 제거 — Post는 항상 empty 렌더링             |
| Overlay `as`      | 임의 element 허용 / `href` 미강제                                                     | `"a"`·`"button"`만, `as="a"` 시 `href` 필수 |
| Overlay DOM 마커  | `data-overlay` 속성                                                                   | `data-part="overlay"`                       |
| Caption           | `standalone` prop                                                                     | 제거                                        |
| Root props 타입   | `CardRootOwnProps`                                                                    | `CardRootProps`                             |

preset은 `.Link` / `.Button`으로 호출합니다 (이름만 변경, props 동일):

```diff
- <Card.Preset.PlateWithTitle.Link href={url} title={title} body={body} />
+ <Card.Preset.Plate.Link href={url} title={title} body={body} />
```

compound로 직접 조합하던 경우 이미지 교체:

```diff
- <Card.Image src={src} alt={alt} />
+ <Card.Thumbnail image={{ src, alt }} />
```

**동작 변경 (코드 수정 불필요)**

- Post: `Card.Meta`(author·date) 가로 정렬, 항상 empty 스타일로 렌더링
- Plate: horizontal 높이 고정(caption 유무 `7.5rem` / `9.5rem`), `Card.Title` 1줄 말줄임
- horizontal에서 긴 텍스트 overflow 수정 (`Card.MetaItem` 말줄임 포함)
- `Card.Overlay` disabled가 키보드·보조기술까지 차단됨 (`as="button"`=native `disabled`, `as="a"`=`aria-disabled` + `href` 제거; 기존엔 `pointer-events: none`만)
- Card 루트 공통 `height: 100%` 제거 — 카드가 컨테이너 높이에 맞춰 늘어나던 동작이 사라지고 콘텐츠 높이 기준으로 렌더링
