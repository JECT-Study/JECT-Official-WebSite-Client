---
"@jects/jds": minor
---

**Card**

Card를 Figma 디자인 변형 table에 맞춰 정리하고, 내부 이미지를 `Thumbnail`로 일원화합니다.

**이미지**

- **(breaking)** `Card.Image`(`CardImage`) 컴포넌트와 `CardImageProps` 타입 제거. Card 내부 이미지는 `Card.Thumbnail`(layout×variant 기반 자동 사이징) 또는 `Thumbnail`을 직접 사용합니다. `Card.Preset.Plate` / `Card.Preset.Post`는 내부적으로 이미 `Thumbnail`로 전환되어 동작 변화가 없습니다.
- `CardImage`에만 존재하던 `badgeVisible` / `badgeLabel` / `fallback` / `orientation` 등 미사용 prop도 함께 제거됩니다.

**Plate**

- **(breaking)** `PlateWithTitle` / `PlateWithLabel` preset을 단일 `Card.Preset.Plate`(title + body + optional caption)로 통합. 기존 두 preset과 `PlateWithTitlePresetProps` / `PlateWithLabelPresetProps` 타입 제거, `PlatePresetProps` 추가.
- **(breaking)** `Card.Preset.PlateCompact` 및 `PlateCompactPresetProps` 제거 (title 없는 variant는 디자인에 존재하지 않음).
- **(breaking)** `Card.Label`(`CardLabel`, `CardLabelProps`) 제거. Plate Card는 Card.Label 위계 요소를 지원하지 않습니다.
- overlay의 인터랙션 스타일을 공용 `focusRing` / `overlay` 유틸로 정합.
  - focus ring을 인라인 `box-shadow`에서 `focusRing` 유틸(`::before`)로 교체 — 폭/색을 토큰값(`strokeWeight[2]`, `accent.alpha.alternative`)으로 통일.
  - hover / pressed dim을 `overlay` 유틸(`::after`)로 교체 (`object.assistive`, native hover opt-in).
  - `CardOverlay`의 `data-disabled`를 presence 기반으로 변경해 overlay 유틸의 disabled 차단과 정합.
- Figma 변형 table(layout × withCaption × disabled)을 재현하는 `PlateVariantMatrix` 스토리 추가.
- horizontal layout에서 이미지 컨테이너가 fallback/이미지의 intrinsic 폭만큼 늘어나 content를 0폭으로 밀어내던 버그 수정 (`aspectRatio` 고정으로 이미지 폭 = 높이).

**Post**

- **(breaking)** `cardStyle` prop과 `CardStyle` 타입 제거 — Post는 항상 empty 스타일로 렌더링됩니다. (기존 `outlined` 스타일 제거)
- `CardRoot`·`CardOverlay`·`Card.Preset.Post`에서 `cardStyle` 인자 제거.
- `Card.Meta`(author·date)를 세로(column)에서 가로(row)로 변경 — 디자인 일치.
- Figma 변형 table(layout × disabled)을 재현하는 `PostVariantMatrix` 스토리 추가.

**Card.Overlay**

- **(breaking)** `as`별 props를 타입으로 강제 — `as="a"`일 때 `href`가 필수입니다. `CardOverlayOwnProps` 제거, `CardOverlayProps`(`a`/`button` discriminated union) 추가 및 export.
- disabled 상태를 키보드·보조기술까지 차단하도록 보완 — `as="button"`은 네이티브 `disabled`, `as="a"`는 `aria-disabled` + `href` 제거를 적용합니다. (기존에는 `pointer-events: none`만 적용돼 키보드로 활성화가 가능했습니다.)

**Card.Caption**

- **(breaking)** 미사용 `standalone` prop 제거 (`CardCaptionProps.standalone`). caption은 항상 단일 스타일(`label-xs-subtle`)로 렌더링됩니다.

**Compound 공통**

- `Card.Thumbnail`을 public 배럴(`Card.*`)에 노출 — compound 직접 조합 시 `layout`×`variant` 기반 이미지 사이징을 그대로 사용할 수 있습니다. `CardThumbnailProps` / `CardThumbnailImage` 타입 export. 외부 `style`(크기) 주입을 제거하고 이미지 영역 크기는 내부에서 결정하며, `className`·native `div` 속성 상속을 지원합니다.
- 가로(horizontal) 레이아웃에서 긴 텍스트가 컨테이너를 넘치거나 형제를 밀어내던 문제 수정 (`flex` 항목에 `min-width: 0` 적용). `Card.MetaItem`도 말줄임 처리.
- 이미지 데이터 타입을 `CardThumbnailImage`로 통합·export (기존 4곳 중복 정의 제거).
- 내부 정리: 스타일 파일명 `compound.css` → `card.css`, `Card.Content`의 children introspection 제거 및 명시적 그룹 구조 전환, line-clamp 중복을 헬퍼로 통합, 미사용 `badge` 스타일 제거, 토큰/매직값 정리. (공개 API 영향 없음)
