# @jects/jds

## 0.5.0

### Minor Changes

- 6519701: **Badge (ContentBadge / DotBadge / NumericBadge)**

  세 배지를 prop 기반의 단일 컴포넌트 API로 통합합니다. `.Basic`, `.Feedback`, `.Theme` 하위 컴포넌트와 관련 props 타입을 제거했으므로 해당 API를 쓰던 코드는 단일 컴포넌트 호출로 바꿔야 합니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                                                                           | TO-BE                                  |
  | ------------------------------------------------------------------------------- | -------------------------------------- |
  | `<ContentBadge.Basic hierarchy="secondary">`                                    | `<ContentBadge hierarchy="secondary">` |
  | `<ContentBadge.Feedback variant="positive">`                                    | `<ContentBadge feedback="positive">`   |
  | `<ContentBadge.Theme variant="red">`                                            | `<ContentBadge variant="red">`         |
  | `<DotBadge.Feedback variant="positive" />`                                      | `<DotBadge feedback="positive" />`     |
  | `<NumericBadge.Basic hierarchy="secondary">`                                    | `<NumericBadge hierarchy="secondary">` |
  | `<NumericBadge.Feedback variant="positive">`                                    | `<NumericBadge feedback="positive">`   |
  | `ContentBadgeBasicProps`, `ContentBadgeFeedbackProps`, `ContentBadgeThemeProps` | `ContentBadgeProps`                    |
  | `DotBadgeFeedbackProps`                                                         | `DotBadgeProps`                        |
  | `NumericBadgeBasicProps`, `NumericBadgeFeedbackProps`                           | `NumericBadgeProps`                    |

  ```diff
  - <ContentBadge.Basic hierarchy='primary'>레이블</ContentBadge.Basic>
  - <ContentBadge.Feedback variant='positive'>레이블</ContentBadge.Feedback>
  - <ContentBadge.Theme variant='red'>레이블</ContentBadge.Theme>
  - <DotBadge.Feedback variant='positive' />
  - <NumericBadge.Basic hierarchy='accent'>99</NumericBadge.Basic>
  - <NumericBadge.Feedback variant='positive'>99</NumericBadge.Feedback>
  + <ContentBadge hierarchy='primary'>레이블</ContentBadge>
  + <ContentBadge feedback='positive'>레이블</ContentBadge>
  + <ContentBadge variant='red'>레이블</ContentBadge>
  + <DotBadge feedback='positive' />
  + <NumericBadge hierarchy='accent'>99</NumericBadge>
  + <NumericBadge feedback='positive'>99</NumericBadge>
  ```

  **동작 변경 (코드 수정 불필요)**
  - `ContentBadge` 제거 버튼의 접근성 이름에 배지 내용과 동작을 함께 포함

- e4dc243: **Button (BlockButton / LabelButton)**

  `BlockButton`과 `LabelButton`의 `.Basic`, `.Feedback` 컴파운드를 단일 컴포넌트 API로 통합합니다. 하위 컴포넌트와 이전 prop, 타입 이름을 제거했으므로 해당 API를 쓰던 코드는 단일 컴포넌트 호출로 바꿔야 합니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                                                     | TO-BE                                               |
  | --------------------------------------------------------- | --------------------------------------------------- |
  | `<BlockButton.Basic hierarchy="primary" variant="solid">` | `<BlockButton hierarchy="primary" variant="solid">` |
  | `<BlockButton.Feedback intent="destructive">`             | `<BlockButton feedback="destructive">`              |
  | `<LabelButton.Basic hierarchy="secondary">`               | `<LabelButton hierarchy="secondary">`               |
  | `<LabelButton.Feedback intent="positive">`                | `<LabelButton feedback="positive">`                 |
  | `.Feedback`의 `intent` prop                               | `feedback`                                          |
  | `BlockButtonStyle`                                        | `BlockButtonVariant`                                |
  | `FeedbackIntent`                                          | `BlockButtonFeedback`                               |
  | `LabelButtonIntent`                                       | `LabelButtonFeedback`                               |
  | `BlockButtonBasicProps`, `BlockButtonFeedbackProps`       | `BlockButtonProps`                                  |
  | `LabelButtonBasicProps`, `LabelButtonFeedbackProps`       | `LabelButtonProps`                                  |

  `hierarchy`와 `feedback`은 상호 배타입니다. `feedback`을 지정하면 `hierarchy`와 `BlockButton`의 `variant`는 함께 지정할 수 없습니다.

  ```diff
  - <BlockButton.Basic hierarchy='primary' variant='solid'>저장</BlockButton.Basic>
  - <BlockButton.Feedback intent='destructive'>삭제</BlockButton.Feedback>
  - <LabelButton.Basic hierarchy='secondary'>더보기</LabelButton.Basic>
  - <LabelButton.Feedback intent='positive'>확인</LabelButton.Feedback>
  + <BlockButton hierarchy='primary' variant='solid'>저장</BlockButton>
  + <BlockButton feedback='destructive'>삭제</BlockButton>
  + <LabelButton hierarchy='secondary'>더보기</LabelButton>
  + <LabelButton feedback='positive'>확인</LabelButton>
  ```

- c025d1a: **Button (BlockButton / LabelButton / IconButton)**

  세 버튼의 기본 `type`을 `button`으로 지정합니다. 폼 안에서 이 버튼을 눌러 제출되던 코드가 있다면 `type="submit"`을 명시해야 합니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                                   | TO-BE                                |
  | --------------------------------------- | ------------------------------------ |
  | `type` 미지정 시 native 기본값 `submit` | `button`, `type` prop으로 오버라이드 |

  ```diff
  - <BlockButton onClick={handleSubmit}>제출</BlockButton>
  + <BlockButton type='submit' onClick={handleSubmit}>제출</BlockButton>
  ```

- 4cbb84f: **Button (BlockButton / LabelButton)**

  신규 디자인 스펙에 맞춰 두 버튼의 외형과 `BlockButton`의 옵션을 변경합니다. 별칭을 두지 않으므로 아래 값을 쓰던 호출부는 수정이 필요합니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                                  | TO-BE              |
  | -------------------------------------- | ------------------ |
  | `BlockButton`의 `variant="empty"`      | `variant="hollow"` |
  | `BlockButton`의 `hierarchy="tertiary"` | 제거 — 대체재 없음 |

  ```diff
  - <BlockButton variant='empty'>더보기</BlockButton>
  + <BlockButton variant='hollow'>더보기</BlockButton>
  ```

  **동작 변경 (코드 수정 불필요)**
  - `BlockButton`, `LabelButton`의 외형을 신규 디자인 스펙에 맞게 변경

- c923641: **Callout**

  Callout의 스타일링을 Emotion에서 vanilla-extract로 마이그레이션하고 `hierarchy`, `labelButtonProps` prop을 제거합니다. 두 prop을 쓰던 코드는 수정이 필요합니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                                | TO-BE                                  |
  | ------------------------------------ | -------------------------------------- |
  | `hierarchy="primary" \| "secondary"` | 제거 — 스타일은 `feedback`으로만 결정  |
  | `labelButtonProps`                   | 제거 — 버튼은 `children`에 직접 렌더링 |

  버튼 정렬이 필요하면 flex 컨테이너로 감쌉니다.

  ```diff
  - <Callout hierarchy="secondary" labelButtonProps={{ children: "확인", onClick: handleClick }}>
  -   본문 내용
  - </Callout>
  + <Callout>
  +   <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
  +     본문 내용
  +     <LabelButton hierarchy="secondary" onClick={handleClick}>확인</LabelButton>
  +   </div>
  + </Callout>
  ```

  **추가**
  - `icon?: IconName` — `title`이 있을 때만 지정할 수 있는 아이콘
  - `feedback`에 `"none"` 추가, 기본값
  - 네이티브 `div` 속성 전달과 `ref` 포워딩 지원
  - 타입 `CalloutProps`, `CalloutFeedback`, `CalloutSize` 신규 export

  **동작 변경 (코드 수정 불필요)**
  - title 타이포를 size별 bold로 변경
  - `notifying` 색상을 `static.inverse`로 변경
  - title과 body 사이 gap을 size별로 조정 — sm, xs는 8

- be808ca: **Card**

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

  Plate preset 셋이 `Card.Preset.Plate` 하나로 합쳐지고, `title`은 필수입니다. `PlateWithTitle`은 이름만 바꾸면 됩니다.

  ```diff
  - <Card.Preset.PlateWithTitle.Link href={url} title={title} body={body} />
  + <Card.Preset.Plate.Link href={url} title={title} body={body} />
  ```

  `PlateWithLabel`의 `label`은 `title`로 넘깁니다. `Card.Label`이 제거되어 레이블 전용 스타일은 유지되지 않고 `Card.Title` 스타일로 렌더링됩니다.

  ```diff
  - <Card.Preset.PlateWithLabel.Link href={url} label={label} body={body} />
  + <Card.Preset.Plate.Link href={url} title={label} body={body} />
  ```

  `PlateCompact`에는 title이 없었으므로 `title`을 새로 정해 전달합니다. `caption`은 필수에서 선택으로 바뀝니다.

  ```diff
  - <Card.Preset.PlateCompact.Link href={url} caption={caption} body={body} />
  + <Card.Preset.Plate.Link href={url} title={title} caption={caption} body={body} />
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

- 97d5bf9: **Checkbox**

  Checkbox를 radix Checkbox 기반으로 재작성하고 API를 조립된 props 형태로 바꿉니다. compound(`Checkbox.Basic`, `Checkbox.Content`)를 더 이상 공개하지 않으며, 단독 체크박스는 `Checkbox`, 다중 선택은 `CheckboxGroup`으로 나뉩니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                                                            | TO-BE                                                   |
  | ---------------------------------------------------------------- | ------------------------------------------------------- |
  | `Checkbox.Basic`                                                 | `Checkbox`                                              |
  | `Checkbox.Content`의 `label` / `subLabel`                        | `Checkbox`의 `label` / `helper` props                   |
  | 여러 개를 소비처에서 직접 배치                                   | `CheckboxGroup`의 `options`                             |
  | `variant = "empty" \| "outlined"`                                | `variant = "hollow" \| "outlined"`                      |
  | `align = "left" \| "right"`                                      | 제거 — 대체재 없음                                      |
  | `checked` 단독 지정 (`onCheckedChange` 선택)                     | `checked`와 `onCheckedChange` 함께 필수                 |
  | `CheckboxBasicProps`, `CheckboxBoxProps`, `CheckboxContentProps` | `CheckboxProps`, `CheckboxGroupProps`, `CheckboxOption` |
  | `CheckboxAlign`                                                  | 제거 — 대체재 없음                                      |
  | 컨트롤 엘리먼트 `<input type="checkbox">`                        | `<button role="checkbox">`                              |

  컨트롤 엘리먼트가 바뀌었으므로 `input[type="checkbox"]`로 DOM을 조회하거나 스타일링하던 코드는 셀렉터 수정이 필요합니다. 폼 제출값은 `name`을 전달하면 그대로 유지됩니다.

  `helper`와 `stretched`는 `label`이 있을 때만 지정할 수 있습니다. `indeterminate`는 제어 모드(`checked="indeterminate"`)에서만 지원하며, `defaultChecked`는 `boolean`만 받습니다.

  ```diff
  - <Checkbox.Basic size='md' checked={checked} onCheckedChange={setChecked} />
  + <Checkbox size='md' checked={checked} onCheckedChange={setChecked} aria-label='선택' />
  ```

  ```diff
  - <Checkbox.Content
  -   size='md'
  -   variant='empty'
  -   align='left'
  -   label='레이블'
  -   subLabel='헬퍼 텍스트'
  -   checked={checked}
  -   onCheckedChange={setChecked}
  - />
  + <Checkbox
  +   size='md'
  +   variant='hollow'
  +   label='레이블'
  +   helper='헬퍼 텍스트'
  +   checked={checked}
  +   onCheckedChange={setChecked}
  + />
  ```

  ```diff
  - <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
  -   <Checkbox.Content label='옵션 1' checked={a} onCheckedChange={setA} />
  -   <Checkbox.Content label='옵션 2' checked={b} onCheckedChange={setB} />
  - </div>
  + <CheckboxGroup
  +   layout='grid'
  +   columns={3}
  +   value={value}
  +   onChange={setValue}
  +   options={[
  +     { value: "1", label: "옵션 1" },
  +     { value: "2", label: "옵션 2" },
  +   ]}
  + />
  ```

  **추가**
  - `CheckboxGroup` (`CheckboxGroupProps`) — 다중 선택 그룹, 선택값은 `string[]`, controlled(`value` + `onChange`)와 uncontrolled(`defaultValue`) 모두 지원
  - `layout` — `"vertical"`(기본) 또는 `"grid"`, `grid`는 `columns` 필수
  - `stretched` — 아이템이 전체 너비를 채움, 그룹에 지정하면 모든 아이템에 전파되고 단독 `Checkbox`에도 지정 가능
  - `isInvalid`, `name` — 유효성 표시와 폼 제출 이름
  - 단독 `Checkbox`의 uncontrolled(`defaultChecked`) — controlled는 `checked` + `onCheckedChange`

  **동작 변경 (코드 수정 불필요)**
  - `CheckboxGroup`이 레이아웃을 직접 관리 — 소비처가 감싸 배치하던 컨테이너 불필요
  - `CheckboxGroup`이 방향키, Home, End로 포커스 이동 — Tab으로 진입한 뒤 방향키로 항목 이동, Space로 선택 토글
  - 레이블과 헬퍼의 `white-space: nowrap` 제거 — 폭이 부족하면 텍스트 개행
  - `invalid` 스타일이 unchecked 상태에서만 적용 — checked, indeterminate 상태에서는 미적용

- 8bd05cb: **Chip**

  선택된 필터, 태그, 입력된 값처럼 현재 화면에 적용된 조건을 짧게 보여주고 제거할 수 있는 `Chip` 컴포넌트를 추가합니다.

  | prop             | 기본값  | 설명                                                                            |
  | ---------------- | ------- | ------------------------------------------------------------------------------- |
  | `label`          | -       | 기본 레이블, 줄바꿈이나 말줄임 없이 전체 내용 표시                              |
  | `valueLabel`     | -       | `string[]` 값 레이블, 표시할 값이 있으면 활성 상태가 되고 여러 값은 쉼표로 구분 |
  | `valueLabelOnly` | `false` | 활성 상태에서 `label`을 시각적으로 숨기고 `valueLabel`만 표시                   |
  | `disabled`       | `false` | 선택 동작과 제거 동작을 모두 비활성화                                           |
  | `onClick`        | -       | Chip 본문을 눌렀을 때 호출                                                      |
  | `onRemove`       | -       | 오른쪽 제거 버튼을 눌렀을 때 호출                                               |

  `valueLabel` 표시 영역이 160px을 넘으면 말줄임표로 처리합니다. `valueLabelOnly`로 숨긴 `label`은 접근성 트리에 유지됩니다. `valueLabel`이 빈 배열이거나 빈 문자열로만 구성된 경우 기본 상태로 표시하며, 이때 `valueLabelOnly`를 함께 전달해도 적용되지 않고 `label`이 화면에 유지됩니다.

  타입 `ChipProps`를 함께 내보냅니다.

  ```tsx
  <Chip label='레이블' onClick={handleClick} onRemove={handleRemove} />

  <Chip
    label='레이블'
    valueLabel={["값 레이블 1", "값 레이블 2", "값 레이블 3"]}
    onClick={handleClick}
    onRemove={handleRemove}
  />

  <Chip
    label='레이블'
    valueLabel={["값 레이블 1", "값 레이블 2", "값 레이블 3"]}
    valueLabelOnly
    onClick={handleClick}
    onRemove={handleRemove}
  />

  <Chip label='레이블' valueLabel={["값 레이블"]} disabled onClick={handleClick} onRemove={handleRemove} />
  ```

- 52e9417: **Dialog**

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

- d087f5d: **Banner / Footer / Image / Logo / MegaMenu / GlobalNavigation / Uploader**

  Emotion 기반으로 남아 있던 컴포넌트를 패키지에서 제거합니다. `Image`는 `Thumbnail`로 대체되며, 나머지는 대체 컴포넌트가 없으므로 소비처에서 직접 구현해야 합니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                                                                                                                                                                                                                                          | TO-BE                                    |
  | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
  | `Banner`, `BannerProps`, `BannerBarProps`, `BannerImageProps`, `BannerVariant`                                                                                                                                                                 | 제거 — 대체재 없음                       |
  | `Footer`, `FooterRootProps`, `FooterHeaderProps`, `FooterContentProps`, `FooterBottomProps`, `FooterNavProps`, `FooterSocialProps`, `FooterLogoLinkProps`, `FooterLogoDivProps`, `FooterSectionProps`, `FooterSection`, `FooterLink`           | 제거 — 대체재 없음                       |
  | `Logo`, `LogoProps`, `LogoHierarchy`                                                                                                                                                                                                           | 제거 — 대체재 없음                       |
  | `Uploader`, `UploaderOptions`, `UploaderFileProps`, `UploaderFileButtonProps`, `UploaderImageProps`, `UploaderImageButtonProps`, `UploadError`, `UploadErrorType`                                                                              | 제거 — 대체재 없음                       |
  | `GlobalNavigation`, `GlobalNavigationRootProps`, `GlobalNavigationListProps`, `GlobalNavigationToggleItemProps`, `GlobalNavigationBlockItemProps`, `GlobalNavigationLogoItemProps`, `GlobalNavigationLogoLinkProps`, `GlobalNavigationVariant` | 제거 — 대체재 없음                       |
  | `useGlobalNavigationVariant`                                                                                                                                                                                                                   | 제거 — 대체재 없음                       |
  | `MegaMenu`, `MegaMenuProps`, `MegaMenuSectionProps`, `MegaMenuGroupProps`, `MegaMenuGroupItemProps`                                                                                                                                            | 제거 — 대체재 없음                       |
  | `Image`, `ImageOwnProps`                                                                                                                                                                                                                       | `Thumbnail`, `ThumbnailProps`            |
  | `ImgRatio`, `ImgOrientation`                                                                                                                                                                                                                   | `ThumbnailRatio`, `ThumbnailOrientation` |
  | `Image`의 `fallbackSrc` (`string`)                                                                                                                                                                                                             | `Thumbnail`의 `fallback` (`ReactNode`)   |
  | `Image`의 `as`                                                                                                                                                                                                                                 | `Thumbnail`의 `asChild`                  |
  | `Image`의 `isReadonly`, `badgeVisible`, `badgeLabel`                                                                                                                                                                                           | 제거 — 대체 prop 없음                    |

  `ratio`와 `orientation`은 동일한 값을 받지만, `Thumbnail`은 `ratio`가 `1:1`일 때 `orientation`을 `portrait`으로 제한합니다. `1:1`에 `landscape`를 지정한 호출부는 `orientation`을 제거하면 됩니다.

  `Image`는 `as`에 요소 타입을 넘겨 렌더할 요소를 지정할 수 있었고, 기본값은 `button`이었습니다. `Thumbnail`은 `div`로 렌더하며 `asChild`를 지정하면 `div` 대신 전달한 자식 요소에 스타일을 합성합니다. 기본 루트가 `button`에서 `div`로 바뀌므로, `as` 없이 `Image`를 클릭 대상으로 사용하던 호출부는 `asChild`로 `button`을 전달해야 합니다. `fallback`을 생략하면 `ThumbnailFallback`이 기본으로 적용됩니다.

  ```diff
  - <Image
  -   src={src}
  -   alt='커버 이미지'
  -   fallbackSrc='/placeholder.png'
  -   ratio='4:5'
  -   orientation='landscape'
  - />
  + <Thumbnail
  +   src={src}
  +   alt='커버 이미지'
  +   fallback={<img src='/placeholder.png' alt='' />}
  +   ratio='4:5'
  +   orientation='landscape'
  + />
  ```

  **동작 변경 (코드 수정 불필요)**
  - `loading` 기본값이 `Image`는 `eager`였으나 `Thumbnail`은 `lazy` — 이전 동작이 필요하면 `loading='eager'` 명시

- d087f5d: **JDSThemeProvider**

  `JDSThemeProvider`가 Emotion `ThemeProvider`와 `<Global>` 없이 자식을 그대로 통과시킵니다. 전역 토큰과 reset CSS는 Vanilla Extract가 추출한 `@jects/jds/styles`로 분리되므로 소비처가 직접 import해야 합니다. `@emotion/react`, `@emotion/styled`는 더 이상 peerDependency가 아닙니다.

  **소비처 영향 (코드 수정 필요)**
  - 전역 토큰 CSS와 reset CSS가 `JDSThemeProvider` 렌더 시점에 주입되지 않음 — 애플리케이션 진입점에서 `@jects/jds/styles`를 import해야 적용

  ```diff
  + import "@jects/jds/styles";
    import { JDSThemeProvider } from "@jects/jds/theme";
  ```

  **동작 변경 (코드 수정 불필요)**
  - `JDSThemeProvider`가 Emotion 컨텍스트를 더 이상 제공하지 않음 — 소비처 코드가 `useTheme`이나 `styled`로 JDS theme을 읽고 있었다면 동작하지 않음
  - `@emotion/react`, `@emotion/styled`가 peerDependencies에서 제거 — JDS 때문에 설치했다면 제거 가능하고, 애플리케이션 코드에서 직접 쓰고 있다면 직접 의존성으로 남겨야 함

- d087f5d: **tokens**

  `@jects/jds/tokens`에서 Emotion theme 객체인 `theme`과 전역 스타일 객체인 `globalStyles`를 제거합니다. 토큰 참조는 `vars`로, 텍스트 스타일은 `textStyles`로 대체합니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                                                                                    | TO-BE                                                                               |
  | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
  | `theme.colorPrimitive`, `theme.color`, `theme.scheme`, `theme.environment`, `theme.typo` | `vars.colorPrimitive`, `vars.color`, `vars.scheme`, `vars.environment`, `vars.typo` |
  | `theme.textStyle`                                                                        | `textStyles`                                                                        |
  | `theme.breakPoint`                                                                       | 제거 — 대체재 없음                                                                  |
  | `globalStyles`                                                                           | 제거 — `@jects/jds/theme`를 import하면 전역 토큰 CSS가 적용됨                       |

  `theme`은 `var(--primitive-*)`, `var(--semantic-*)` 문자열을 담은 객체였고 해당 CSS 변수는 `globalStyles`가 주입했습니다. `vars`는 `--color-semantic-*`, `--scheme-semantic-*` 등 Vanilla Extract 계약을 가리키므로 변수 이름이 달라집니다. `theme.textStyle`과 `textStyles`는 둘 다 CSS 속성 객체를 담지만, 키가 `semantic-textStyle-title-6` 같은 단일 문자열에서 `title["6"]`처럼 세그먼트로 나뉜 형태로 바뀝니다.

  `vars`는 `var(--...)` 문자열을, `textStyles`는 CSS 속성 객체를 담고 있으므로 특정 스타일링 도구를 요구하지 않습니다. 인라인 `style`, CSS-in-JS, vanilla-extract의 `style()` 어디에나 그대로 넘길 수 있습니다.

  토큰 참조입니다.

  ```diff
  - import { theme } from "@jects/jds/tokens";
  + import { vars } from "@jects/jds/tokens";

  - theme.color.semantic.surface.standard
  + vars.color.semantic.surface.standard

  - theme.scheme.semantic.radius[8]
  + vars.scheme.semantic.radius["8"]
  ```

  텍스트 스타일을 인라인 `style`로 옮기는 경우입니다.

  ```diff
  - <h2 css={theme.textStyle["semantic-textStyle-title-6"]}>제목</h2>
  + <h2 style={textStyles.title["6"]}>제목</h2>
  ```

- d087f5d: **utils**

  `@jects/jds/utils`에서 Emotion `Theme` 객체를 인자로 받던 스타일 함수를 제거합니다. 인터랙션 레이어는 `overlay` recipe로, 환경 토큰은 `vars`로 대체합니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                                        | TO-BE                                                                      |
  | -------------------------------------------- | -------------------------------------------------------------------------- |
  | `Interaction`                                | `overlay` recipe                                                           |
  | `InteractionLayer`, `InteractionLayerParams` | `overlay` recipe                                                           |
  | `depth`                                      | `vars.color.semantic.surface.*`                                            |
  | `level`                                      | `vars.environment.semantic.zIndex.*`, `vars.environment.semantic.shadow.*` |
  | `shadow`                                     | `vars.environment.semantic.shadow.*`                                       |

  `Interaction`은 `(theme, variant, density, fillColor, state, borderRadius)`를 순서대로 받았지만 `overlay`는 `hierarchy`, `density`, `interaction`을 옵션 객체로 받습니다. `overlay`는 `::after`에 hover, pressed 오버레이를 그리며, 요소의 `position: relative`와 `::after`의 `inset`, `borderRadius`는 호출부가 지정합니다. `disabled` 상태는 `data-disabled` 속성으로 표시합니다. `interaction`은 press를 어느 요소에서 읽을지 정하는 값으로, 기본값 `self`는 자신의 `:active`를, `delegated`는 직계 자식 `[data-interaction-target]`의 `:active`를 읽습니다.

  인터랙션 레이어입니다.

  ```diff
  - const trigger = (theme: Theme) => css`
  -   ${Interaction(theme, "normal", "normal", "default")}
  - `;
  + export const trigger = style([
  +   overlay({ hierarchy: "primary", density: "normal" }),
  +   {
  +     position: "relative",
  +     borderRadius: vars.scheme.semantic.radius["6"],
  +     selectors: {
  +       "&::after": { inset: 0, borderRadius: "inherit" },
  +     },
  +   },
  + ]);
  ```

  환경 토큰입니다. `level`은 `zIndex`와 `shadow`를 함께 반환했으므로 두 토큰을 각각 지정합니다.

  ```diff
  - const surface = (theme: Theme) => css`
  -   ${depth(theme, "shallow")}
  -   ${level(theme, "floated")}
  - `;
  + export const surface = style({
  +   backgroundColor: vars.color.semantic.surface.shallow,
  +   zIndex: vars.environment.semantic.zIndex.floated,
  +   boxShadow: vars.environment.semantic.shadow.floated,
  + });
  ```

- 4f87d4b: **EmptyState**

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

- b0302de: **@jects/jds**

  요구하는 Node 버전을 `>=18.0.0`에서 `>=22.0.0`으로 올립니다. Node 22 미만에서 설치하면 `EBADENGINE` 경고가 나오고, `engine-strict`를 켠 환경에서는 설치가 실패합니다. 공개 API는 그대로이므로 코드는 수정하지 않고, 실행 환경을 Node 22 이상으로 올리면 됩니다.

- d7fcbdf: **FileField**

  파일 하나를 첨부하는 `FileField`를 추가합니다. 필드 공통 동작은 `Field` 항목에서 다룹니다.

  `FileField.Label`, `FileField.Input`, `FileField.Footer`, `FileField.Helper`, `FileField.Size`로 구성합니다. 박스 전체가 파일 선택창을 여는 트리거이고, 파일이 선택되면 클립 아이콘과 파일명을 표시하며 삭제 버튼이 표시됩니다. 박스를 다시 누르면 다른 파일로 교체할 수 있습니다.

  `FileField.Size`는 `Footer`의 카운터 자리에서 선택된 파일의 용량을 표시하고, 파일이 없으면 렌더하지 않습니다. 표시 문자열은 `formatFileSize`를 기본값으로 사용하며, `sizeFormatter`로 다른 포매터를 전달할 수 있습니다.

  `value`와 `defaultValue`는 `name`과 `size`를 가진 `FileFieldValue`를 받습니다. `File`이 구조적으로 이 타입에 해당하므로 그대로 전달할 수 있고, 서버에 이미 있는 파일처럼 실제 바이트가 없으면 이름과 용량만 전달합니다. 이 경우 native 폼 전송에는 포함되지 않으므로 필요하면 소비처가 따로 전송해야 합니다. `onChange`가 주는 값은 선택창에서 고른 `File` 또는 `null`입니다.

  `accept`는 native 속성으로도 함께 전달하며 확장자, MIME 타입, `image/*`와 `*/*` 형태의 와일드카드를 받습니다. `maxSize`는 바이트로 지정합니다. 두 조건을 만족하지 않는 파일을 고르면 값에 반영하지 않고 `onError`를 호출하며, 전달되는 값의 타입은 `FileFieldError`이고 `type`은 `INVALID_TYPE` 또는 `FILE_TOO_LARGE`입니다.

  `placeholder`로 파일이 없을 때 표시할 문구를, `suffix`로 삭제 버튼 오른쪽에 놓을 부가 요소를 지정할 수 있습니다.

  `disabled`와 `readonly`에서는 클릭과 드래그 앤 드롭 모두 값을 바꾸지 않습니다. 읽기 전용 여부는 `data-readonly`로 판단해야 합니다.

  폼이 초기화되면 표시 값도 `defaultValue`로 초기화됩니다.

  입력 요소가 `input[type="file"]`이라 `aria-required`, `aria-readonly`, `aria-invalid`가 적용되지 않습니다. 세 속성을 붙이지 않는 대신 필수와 읽기 전용, 오류 상태를 시각적으로는 표시되지 않는 별도 요소로 노출하고 표시 중인 파일명, `placeholder`와 함께 `aria-describedby`로 연결합니다. `aria-invalid`는 prop으로도 받지 않습니다.

  타입 `FileFieldProps`, `FileFieldInputProps`, `FileFieldSizeProps`, `FileFieldValue`, `FileFieldError`, `FileFieldErrorType`, `FileFieldLabelProps`, `FileFieldHelperProps`, `FileFieldFooterProps`를 함께 내보냅니다.

  ```tsx
  <FileField required>
    <FileField.Label>포트폴리오</FileField.Label>
    <FileField.Input
      name='portfolio'
      accept='.pdf'
      maxSize={10 * 1024 * 1024}
      placeholder='파일을 첨부해주세요'
      value={file}
      onChange={setFile}
      onError={handleError}
    />
    <FileField.Footer>
      <FileField.Helper>10MB 이하의 PDF 파일을 첨부해주세요</FileField.Helper>
      <FileField.Size />
    </FileField.Footer>
  </FileField>
  ```

- 484df23: **File**

  `FileItem`을 vanilla-extract 기반의 `File`로 교체합니다. 파일 영역의 메인 액션은 기존처럼 `onClick`, `type`, `aria-*` 같은 native button props로 전달하며, 삭제 버튼을 표시하려면 `removable`과 `onRemove`를 함께 전달해야 합니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                                                   | TO-BE                                 |
  | ------------------------------------------------------- | ------------------------------------- |
  | `FileItem`                                              | `File`                                |
  | `FileItemProps`                                         | `FileProps`                           |
  | `removeable`                                            | `removable`                           |
  | `hasError`, `errorMessage`                              | 제거 — 대체재 없음                    |
  | `fileName: ReactNode`                                   | `fileName: string`                    |
  | `fileSize?: ReactNode`                                  | `fileSize: number` (바이트)           |
  | `removeable`과 `onRemove`를 각각 선택적으로 전달        | `removable: true`이면 `onRemove` 필수 |
  | `readonly`와 `removeable` 조합 가능, 삭제 버튼은 미노출 | `readonly`와 `removable` 조합 불가    |

  `disabled`와 `removable` 조합은 허용합니다. 파일 열기 또는 다운로드는 비활성화하되 삭제 액션은 제공할 수 있습니다.

  `fileName`은 `ReactNode`에서 `string`으로 좁혀지고, `fileSize`는 바이트를 받는 필수 prop이 됩니다. 네이티브 `File`의 `size`를 그대로 전달할 수 있으며, 표시 문자열은 `formatFileSize`를 기본값으로 사용합니다.

  ```diff
  - <FileItem
  + <File
      fileName={file.name}
      fileSize={file.size}
      onClick={handleClick}
  -   removeable
  +   removable
      onRemove={handleRemove}
    />
  ```

  ```diff
  - <FileItem fileName={file.name} fileSize={file.size} hasError errorMessage="파일을 다시 확인해주세요." />
  + <File fileName={file.name} fileSize={file.size} />
  ```

  **추가**
  - `sizeFormatter` — 기본값 `formatFileSize`, 바이트를 표시 문자열로 변환

- 27ebaf8: **formatFileSize**

  바이트를 표시 문자열로 변환하는 `formatFileSize`를 배럴에서 export합니다. 단위별로 환산한 뒤 소수점 한 자리까지 내림하고 `B`, `KB`, `MB`, `GB`, `TB`를 붙입니다.

  두 번째 인자 `unitStep`은 1KB를 몇 바이트를 기준으로 사용할지 정하며 기본값은 `1024`입니다. `1000`을 전달하면 macOS와 iOS의 표기 기준을 사용할 수 있으며, 단위 레이블은 동일합니다.

  `File`의 `fileSize`와 `FileField.Size`에서 이 함수를 기본 포매터로 사용합니다.

  ```tsx
  formatFileSize(2726297); // "2.5MB"
  formatFileSize(2726297, 1000); // "2.7MB"
  ```

- 26e3786: **hooks**

  인터랙션 레이어가 CSS 기반으로 전환되면서 `@jects/jds/hooks`에서 `usePressable`과 `useContainerPressable`을 제거합니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                   | TO-BE                                                          |
  | ----------------------- | -------------------------------------------------------------- |
  | `usePressable`          | 제거 — `@jects/jds/utils`의 `focusRing`, `overlay` recipe 사용 |
  | `useContainerPressable` | 제거 — 같음                                                    |

  **추가**
  - `useControllableState` — 제어와 비제어 상태를 함께 다루는 훅, `@jects/jds/hooks`에서 가져옴

- 26e3786: **IconButton**

  `ICON_BUTTON_HIERARCHY_OPTIONS`, `ICON_BUTTON_SIZE_OPTIONS` 상수를 공개 API에서 제거합니다.

  두 상수는 런타임 배열이었고 대체재인 `IconButtonSize`, `IconButtonHierarchy`는 타입입니다. 타입 위치에서 참조하던 코드는 이름만 바꾸면 되지만, 값 목록을 순회하거나 길이를 재는 등 런타임에서 쓰던 코드는 소비처가 배열을 직접 정의해야 합니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                           | TO-BE                 |
  | ------------------------------- | --------------------- |
  | `ICON_BUTTON_HIERARCHY_OPTIONS` | `IconButtonHierarchy` |
  | `ICON_BUTTON_SIZE_OPTIONS`      | `IconButtonSize`      |

  ```diff
  - import { ICON_BUTTON_SIZE_OPTIONS } from "@jects/jds";
  - const sizes = [...ICON_BUTTON_SIZE_OPTIONS];
  + import type { IconButtonSize } from "@jects/jds";
  + const sizes: IconButtonSize[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"];
  ```

- d8879a8: **Icon**

  아이콘 SVG와 공개 `IconName`을 Lucide 기준으로 변경합니다. 기존 이름을 사용하는 코드는 아래 신규 이름으로 변경해야 하며, 동일한 이름을 유지하는 일부 아이콘도 Lucide 형태로 변경됩니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                                                            | TO-BE                    |
  | ---------------------------------------------------------------- | ------------------------ |
  | `account-circle-line`                                            | `circle-user-round`      |
  | `user-line`                                                      | `user-round`             |
  | `bookmark-fill`, `bookmark-line`                                 | `bookmark`               |
  | `flag-fill`, `flag-line`                                         | `flag`                   |
  | `notification-line`                                              | `bell`                   |
  | `question-line`                                                  | `circle-question-mark`   |
  | `information-fill`, `information-line`                           | `info`                   |
  | `sun-line`                                                       | `sun`                    |
  | `moon-line`                                                      | `moon`                   |
  | `eye-line`                                                       | `eye`                    |
  | `eye-off-line`                                                   | `eye-off`                |
  | `arrow-down-line`                                                | `arrow-down`             |
  | `arrow-left-line`                                                | `arrow-left`             |
  | `arrow-right-line`                                               | `arrow-right`            |
  | `arrow-up-line`                                                  | `arrow-up`               |
  | `arrow-left-down-line`                                           | `arrow-down-left`        |
  | `arrow-right-down-line`                                          | `arrow-down-right`       |
  | `arrow-left-up-line`                                             | `arrow-up-left`          |
  | `arrow-right-up-line`                                            | `arrow-up-right`         |
  | `arrow-down-s-fill`, `arrow-down-s-line`, `arrow-down-wide-line` | `chevron-down`           |
  | `arrow-left-s-line`                                              | `chevron-left`           |
  | `arrow-right-s-line`                                             | `chevron-right`          |
  | `arrow-up-s-fill`, `arrow-up-s-line`, `arrow-up-wide-line`       | `chevron-up`             |
  | `arrow-go-back-line`                                             | `undo-2`                 |
  | `arrow-go-forward-line`                                          | `redo-2`                 |
  | `corner-down-left-line`                                          | `corner-down-left`       |
  | `corner-down-right-line`                                         | `corner-down-right`      |
  | `reset-left-line`                                                | `rotate-ccw`             |
  | `restart-line`                                                   | `rotate-cw`              |
  | `download-2-line`                                                | `download`               |
  | `upload-2-line`                                                  | `upload`                 |
  | `external-link-line`                                             | `external-link`          |
  | `export-line`                                                    | `file-down`              |
  | `cursor-line`                                                    | `mouse-pointer`          |
  | `home-2-fill`, `home-2-line`                                     | `house`                  |
  | `computer-line`                                                  | `monitor`                |
  | `smartphone-line`                                                | `smartphone`             |
  | `tablet-line`                                                    | `tablet`                 |
  | `spinner`                                                        | `loader-circle`          |
  | `effect`                                                         | `zap`                    |
  | `layer`                                                          | `layers`                 |
  | `pencil-line`                                                    | `pencil`                 |
  | `flow-chart`                                                     | `workflow`               |
  | `robot-line`                                                     | `bot`                    |
  | `qr-code-line`                                                   | `qr-code`                |
  | `slash-command`                                                  | `square-slash`           |
  | `delete-bin-line`                                                | `trash`                  |
  | `file-3-line`                                                    | `file`                   |
  | `file-text-line`                                                 | `file-text`              |
  | `file-unknow-line`                                               | `file-question-mark`     |
  | `file-warning-line`                                              | `file-exclamation-point` |
  | `folder-4-line`                                                  | `folder`                 |
  | `coin-line`                                                      | `coins`                  |
  | `draggable`                                                      | `grip-vertical`          |
  | `more-horizontal`                                                | `ellipsis`               |
  | `more-vertical`                                                  | `ellipsis-vertical`      |
  | `menu-line`                                                      | `menu`                   |
  | `global-line`                                                    | `globe`                  |
  | `guide-line`                                                     | `route`                  |
  | `heart-3-fill`, `heart-3-line`                                   | `heart`                  |
  | `megaphone-line`                                                 | `megaphone`              |
  | `add-line`                                                       | `plus`                   |
  | `subtract-line`                                                  | `minus`                  |
  | `image-line`                                                     | `image`                  |
  | `circle-fill`, `circle-line`                                     | `circle`                 |
  | `square-fill`, `square-line`                                     | `square`                 |
  | `alert-fill`, `alert-line`                                       | `triangle-alert`         |
  | `error-warning-line`                                             | `circle-alert`           |
  | `error-warning-octagon-line`                                     | `octagon-alert`          |
  | `check-line`                                                     | `check`                  |
  | `close-line`                                                     | `x`                      |
  | `at-line`                                                        | `at-sign`                |
  | `attachment-line`, `link-diagonal-line`                          | `paperclip`              |
  | `chat-line`                                                      | `message-circle`         |
  | `code-s-slash-line`                                              | `code-xml`               |
  | `link-line`                                                      | `link`                   |
  | `mail-fill`, `mail-line`                                         | `mail`                   |
  | `message-2-line`                                                 | `message-square-more`    |
  | `save-line`                                                      | `save`                   |
  | `search-line`                                                    | `search`                 |
  | `sticky-note-line`                                               | `sticky-note`            |
  | `text`                                                           | `type`                   |
  | `calendar-line`                                                  | `calendar-days`          |
  | `cloud-fill`, `cloud-line`                                       | `cloud`                  |
  | `absolute`                                                       | `focus`                  |
  | `bar`                                                            | `separator-vertical`     |
  | `blank`                                                          | `square-dashed`          |
  | `function-line`, `style`                                         | `layout-grid`            |
  | `instance`                                                       | `diamond`                |
  | `line`                                                           | `slash`                  |
  | `property`                                                       | `toggle-right`           |
  | `radius-angled`, `radius-circle`, `radius-rounded`               | `square-round-corner`    |
  | `variable`                                                       | `hexagon`                |
  | `vector`                                                         | `vector-square`          |

  ```diff
  -<Icon name='information-line' />
  +<Icon name='info' />

  -<Icon name='arrow-right-s-line' />
  +<Icon name='chevron-right' />

  -<Icon name='delete-bin-line' />
  +<Icon name='trash' />
  ```

  **추가**
  - `arrow-down-left`, `arrow-down-right`, `arrow-up-left`, `arrow-up-right`
  - `case-sensitive`, `copy`, `hash`, `move-horizontal`, `table-of-contents`
  - `contrast`, `panel-left`, `square-plus`
  - `clock-3`, `maximize-2`, `minimize-2`, `ruler`, `toggle-left`
  - `frown`, `laugh`, `meh`, `zoom-in`, `zoom-out`

  **동작 변경 (코드 수정 불필요)**
  - `asterisk`, `component`, `frame`, `shapes` SVG를 Lucide 형태로 변경
  - SVG의 `#1B1C21` 색상을 `currentColor`로 변환하도록 SVGR 설정 변경

- 711c74d: **IconButton**

  `hierarchy="accent"`의 색상 오버라이드를 CSS 변수 직접 노출 방식에서 `accentColor` prop으로 변경합니다. `iconButtonAccentColor`와 `iconButtonAccentDisabledColor`는 더 이상 export되지 않으므로, 두 변수를 `assignInlineVars`로 주입하던 호출부는 수정이 필요합니다. 렌더링되는 색상은 동일합니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                                                    | TO-BE              |
  | -------------------------------------------------------- | ------------------ |
  | `iconButtonAccentColor`, `iconButtonAccentDisabledColor` | `accentColor` prop |

  ```diff
  - import { assignInlineVars } from "@vanilla-extract/dynamic";
  - import { IconButton, iconButtonAccentColor, iconButtonAccentDisabledColor, vars } from "@jects/jds";
  -
  - <IconButton
  -   icon='x'
  -   hierarchy='accent'
  -   aria-label='삭제'
  -   style={assignInlineVars({
  -     [iconButtonAccentColor]: vars.color.semantic.feedback.destructive.normal,
  -     [iconButtonAccentDisabledColor]: vars.color.semantic.feedback.destructive.normal,
  -   })}
  - />
  + import { IconButton, vars } from "@jects/jds";
  +
  + <IconButton
  +   icon='x'
  +   hierarchy='accent'
  +   aria-label='삭제'
  +   accentColor={{ normal: vars.color.semantic.feedback.destructive.normal }}
  + />
  ```

  **추가**
  - `accentColor` (`{ normal: string; disabled?: string }`) — `hierarchy="accent"`일 때 지정할 수 있는 색상, `disabled`를 생략하면 `normal`이 적용

- b4d4c50: **IconButton**

  `aria-label`과 `aria-labelledby`를 함께 지정할 수 없도록 타입을 좁힙니다. 둘 다 넘기던 호출부는 하나를 지워야 합니다. 둘 중 어느 것도 지정하지 않는 것은 그대로 허용됩니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                                      | TO-BE             |
  | ------------------------------------------ | ----------------- |
  | `aria-label`과 `aria-labelledby` 동시 지정 | 둘 중 하나만 지정 |

  ```diff
  - <IconButton icon='x' aria-label='삭제' aria-labelledby='delete-label' />
  + <IconButton icon='x' aria-labelledby='delete-label' />
  ```

- 6e79b45: **@jects/jds**

  번들러를 tsup에서 tsdown으로 교체합니다. 스타일이 진입점별 CSS 파일 대신 `dist/styles.css` 하나로 나가고, 선언만 있고 대상 파일이 없던 `@jects/jds/styles` 진입점이 동작합니다. 공개 API와 클래스 이름은 그대로이므로 코드 수정은 필요하지 않습니다.

  **동작 변경 (코드 수정 불필요)**
  - `@jects/jds/styles` import가 스타일시트를 가져옴, 이전에는 대상 파일이 없어 해석 실패
  - `index.css`, `theme.css`, `tokens.css`, `utils.css`가 `styles.css` 하나로 통합
  - 통합으로 CSS 전체 크기가 325.6 kB에서 243.1 kB로, gzip 기준 78.6 kB에서 28.4 kB로 감소
  - JS 전체 크기가 4,084 kB에서 3,759 kB로 감소
  - CSS 소스맵 제거, devtools에서 규칙의 원본 `.css.ts` 추적 불가
  - `@radix-ui/*`와 `@vanilla-extract/*` 타입이 선언 파일에 포함되어 소비처에 별도 설치가 필요하지 않음
  - 일부 타입이 `csstype`을 참조, `dependencies`에 추가되어 함께 설치됨

- 5611ff1: **JDS_VERSION**

  `JDS_VERSION` 상수를 제거합니다. `0.0.1`로 고정되어 있어 실제 패키지 버전과 일치하지 않았습니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS         | TO-BE                                 |
  | ------------- | ------------------------------------- |
  | `JDS_VERSION` | 제거 — 버전은 `package.json`에서 확인 |

- cf01955: **Kbd**

  Kbd의 타입별 타이포그래피 스타일을 공통 유틸과 연동하고 크기 규격을 변경합니다. `xs` 크기를 제거하고 `muted` prop을 `isMuted`로 변경했으므로 해당 API를 쓰던 코드는 수정이 필요합니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                               | TO-BE                       |
  | ----------------------------------- | --------------------------- |
  | `size="lg" \| "md" \| "sm" \| "xs"` | `size="lg" \| "md" \| "sm"` |
  | `muted?: boolean`                   | `isMuted?: boolean`         |

  `xs`를 사용하던 경우 가장 가까운 크기인 `sm`으로 변경합니다.

  ```diff
  - <Kbd size="xs" muted>Esc</Kbd>
  + <Kbd size="sm" isMuted>Esc</Kbd>
  ```

  **동작 변경 (코드 수정 불필요)**
  - 크기별 `min-width` 변경 — `lg` 16px에서 20px, `md` 14px에서 19px, `sm` 11px에서 19px
  - 기본 상하 패딩 제거 — 2px에서 0

- 5943db5: **Link**

  앱 내의 다른 페이지나 외부 웹사이트로 이동시키는 `Link` 컴포넌트를 추가합니다. 자체 크기를 갖지 않고 부모 요소의 텍스트 스타일을 상속받습니다.
  - `external` — 외부 리소스로 이동함을 표시, 외부 링크 아이콘과 스크린리더 레이블 노출
  - `disabled` — 이동을 차단하고 흐리게 표시, `asChild`와 함께 사용 불가
  - `asChild` — `<a>` 대신 전달한 자식 요소에 스타일 합성, Next.js나 React Router의 `Link` 등 라우팅 컴포넌트와 결합할 때 사용

  타입 `LinkProps`를 함께 내보냅니다.

  ```tsx
  <p className={getBodyClassName({ size: "md" })}>
    자세한 내용은 <Link href='/docs'>문서</Link>를 참고하세요.
  </p>

  <Link href='https://example.com' target='_blank' rel='noopener noreferrer' external>
    외부 문서
  </Link>

  <Link asChild>
    <NextLink href='/about'>소개</NextLink>
  </Link>
  ```

- a5bc8ef: **LocalNavigation**

  LocalNavigation을 vanilla-extract 기반으로 재작성하고 API를 단일 컴포넌트 props로 통합합니다. 기존 compound와 관련 public 타입을 제거했으므로 호출부 수정이 필요합니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                                                                                                                        | TO-BE                      |
  | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
  | `LocalNavigation.Root` + 자식 조립                                                                                           | 단일 `<LocalNavigation />` |
  | `LocalNavigation.Title` (`as`)                                                                                               | `title` + `titleAs`        |
  | `LocalNavigation.BackButton`의 `onClick`                                                                                     | `nested` + `onBackClick`   |
  | `LocalNavigation.ButtonGroup` (`extraButtonVisible`)                                                                         | `suffixAction`             |
  | `isStretched`                                                                                                                | `stretched`                |
  | `LocalNavigationRootProps`, `LocalNavigationTitleProps`, `LocalNavigationBackButtonProps`, `LocalNavigationButtonGroupProps` | `LocalNavigationProps`     |

  `nested`가 `true`면 좌측에 뒤로 가기 버튼이 노출되고 `onBackClick`으로 클릭 핸들러를 연결합니다. `false`(기본값)면 버튼을 렌더링하지 않습니다. `floated`와 `stretched`는 모두 생략 가능하고 기본값은 `false`이며, `floated`가 `true`면 `stretched`는 `false`만 허용합니다. 타이틀 요소는 기본적으로 `span`으로 렌더링되고 `titleAs`로 `h1`~`h6`을 지정할 수 있습니다.

  ```diff
  - <LocalNavigation.Root isStretched>
  -   <LocalNavigation.BackButton onClick={handleBack} />
  -   <LocalNavigation.Title>지원 안내</LocalNavigation.Title>
  -   <LocalNavigation.ButtonGroup extraButtonVisible>
  -     <IconButton icon='blank' />
  -   </LocalNavigation.ButtonGroup>
  - </LocalNavigation.Root>
  + <LocalNavigation
  +   title='지원 안내'
  +   nested
  +   stretched
  +   onBackClick={handleBack}
  +   suffixAction={<IconButton icon='blank' />}
  + />
  ```

  **동작 변경 (코드 수정 불필요)**
  - 뒤로 가기 아이콘 크기가 `xl`로 고정

- d74a3ac: **Menu (Menu.Category)**

  `Menu.Category`에서 `textAlign`, `cursor`, `htmlFor`를 제거합니다. 세 prop을 쓰던 코드는 해당 속성을 지워야 합니다. 기본값을 쓰던 코드는 렌더 결과가 같습니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS       | TO-BE                  |
  | ----------- | ---------------------- |
  | `textAlign` | 제거, 왼쪽 정렬로 고정 |
  | `cursor`    | 제거, `default`로 고정 |
  | `htmlFor`   | 제거, 대체 없음        |

  ```diff
  - <Menu.Category as='label' htmlFor='email' textAlign='center' cursor='pointer'>
  + <Menu.Category as='label'>
      카테고리
    </Menu.Category>
  ```

- 98b64c8: **Menu**

  계층형 아코디언 메뉴인 `Menu.Tree`를 추가하고 MenuItem의 표현 옵션을 확장합니다. 함께 `menuStyle` 값과 타입 이름, 항목 마크업이 바뀌므로 호출부 수정이 필요합니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                              | TO-BE                                                          |
  | ---------------------------------- | -------------------------------------------------------------- |
  | `menuStyle="empty"`                | `menuStyle="hollow"`                                           |
  | 타입 export `MenuTrigger`          | `MenuTriggerProps`                                             |
  | `isDestructive` / `MenuItemTone`   | 제거 — 대체재 없음                                             |
  | 항목을 `Menu.GroupItem`으로 감싸기 | 제거 — `Menu.Button`, `Menu.Anchor`를 `Menu.Group` 직속에 배치 |

  ```diff
    <Menu.Group>
  -   <Menu.GroupItem>
  -     <Menu.Button>메뉴 레이블</Menu.Button>
  -   </Menu.GroupItem>
  +   <Menu.Button>메뉴 레이블</Menu.Button>
    </Menu.Group>
  ```

  **추가**
  - `Menu.Tree` (`MenuTreeProps`) — chevron 또는 `→`, `←`로 펼치고 접음, 비제어(`defaultOpen`)와 제어(`open` + `onOpenChange`) 모두 지원, `withTreeButton={false}`로 말단 항목 표현
  - `MenuItem`의 `isSelected`로 selected 상태 시각화, `stretched`와 `fullWidthText` 옵션 지정 가능
  - `MenuItem.Anchor`의 후행 배지 — `suffixBadge`, `suffixBadgeVisible`, `suffixBadgeMuted`
  - `Menu.Button`, `Menu.Anchor`에 항목 레벨 `onSelect`와 `textValue` 노출

- 34f9582: **MultiSelectField**

  제공된 옵션에서 여러 값을 선택하는 `MultiSelectField`를 추가합니다. 필드 공통 동작은 `Field` 항목에서 다룹니다.

  `MultiSelectField.Label`, `MultiSelectField.Input`, `MultiSelectField.Footer`, `MultiSelectField.Helper`, `MultiSelectField.Counter`로 구성합니다. 선택지는 `SelectOption[]`으로 전달하며 값과 표시명, 캡션, 부가 요소, 비활성 여부를 지정할 수 있습니다. 선택한 값은 표시명이 붙은 태그로 표시됩니다.

  `variant`로 선택 표시 방식을, `suffix`로 입력 오른쪽에 놓을 읽기 전용 요소를 지정할 수 있습니다. `maxValues`로 선택 개수를 제한할 수 있고, `MultiSelectField.Counter`를 `MultiSelectField.Footer` 안에 두면 현재 개수와 최대 개수를 표시합니다. `name`을 지정하면 선택값마다 hidden input이 렌더되므로 `FormData.getAll(name)`으로 받습니다.

  `searchable`의 기본값은 `false`입니다. `true`이면 검색어로 항목을 필터링할 수 있습니다. `false`이면 타이핑을 막기 위해 입력 요소에 native `readOnly`가 적용되지만 필드가 읽기 전용이 되는 것은 아니라, 읽기 전용 여부는 `data-readonly`로 판단해야 합니다.

  입력 요소는 `role="combobox"`로 native 시맨틱을 덮어쓰며 `aria-haspopup`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, `aria-readonly`를 함께 노출합니다.

  값을 옵션으로 제한하지 않아야 하는 경우 `SuggestionField`를 사용합니다.

  타입 `MultiSelectFieldProps`, `MultiSelectFieldInputProps`, `MultiSelectFieldFooterProps`, `MultiSelectFieldLabelProps`, `MultiSelectFieldHelperProps`, `MultiSelectFieldCounterProps`를 함께 내보냅니다.

  ```tsx
  <MultiSelectField>
    <MultiSelectField.Label>관심 기술 스택</MultiSelectField.Label>
    <MultiSelectField.Input
      options={[
        { value: "react", label: "React" },
        { value: "typescript", label: "TypeScript" },
      ]}
      defaultValue={["react"]}
      maxValues={5}
      name='stacks'
      placeholder='기술 스택을 선택하세요'
    />
    <MultiSelectField.Footer>
      <MultiSelectField.Helper>최대 5개까지 고를 수 있어요</MultiSelectField.Helper>
      <MultiSelectField.Counter />
    </MultiSelectField.Footer>
  </MultiSelectField>
  ```

- 26e3786: **Radio**

  Radio를 radix RadioGroup 기반으로 재작성하고 API를 조립된 props 형태로 바꿉니다. compound(`Radio.Root`, `Radio.Item`, `Radio.Basic`, `Radio.Label`, `Radio.SubLabel`)를 더 이상 공개하지 않으며, `Radio` export가 사라지고 `RadioGroup`으로 대체됩니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                                                                                          | TO-BE                                  |
  | ---------------------------------------------------------------------------------------------- | -------------------------------------- |
  | `Radio` (compound)                                                                             | `RadioGroup`                           |
  | `Radio.Root` + `Radio.Item` + `Radio.Basic` 조합                                               | `RadioGroup`의 `options`               |
  | `Radio.Label` / `Radio.SubLabel`                                                               | `options[].label` / `options[].helper` |
  | `radioSize`                                                                                    | `size`                                 |
  | `radioStyle = "empty" \| "outline"`                                                            | `variant = "hollow" \| "outlined"`     |
  | `radioAlign`                                                                                   | 제거 — 대체재 없음                     |
  | `RadioRootProps`, `RadioItemProps`, `RadioBasicProps`, `RadioLabelProps`, `RadioSubLabelProps` | `RadioGroupProps`, `RadioOption`       |
  | `RadioStyle`                                                                                   | `RadioVariant`                         |
  | `RadioAlign`                                                                                   | 제거 — 대체재 없음                     |
  | 컨트롤 엘리먼트 `<input type="radio">`                                                         | `<button role="radio">`                |

  그룹에 속하지 않는 단독 라디오는 지원하지 않습니다. 라디오는 `RadioGroup`으로만 씁니다. 컨트롤 엘리먼트가 바뀌었으므로 `input[type="radio"]`로 DOM을 조회하거나 스타일링하던 코드는 셀렉터 수정이 필요합니다. 폼 제출값은 `name`을 전달하면 그대로 유지됩니다.

  ```diff
  - <Radio.Root
  -   radioSize='md'
  -   radioStyle='empty'
  -   radioAlign='left'
  -   value={selected}
  -   onChange={setSelected}
  -   name='group'
  - >
  -   <Radio.Item>
  -     <Radio.Basic value='1' />
  -     <Radio.Label>옵션 1</Radio.Label>
  -     <Radio.SubLabel>헬퍼 텍스트</Radio.SubLabel>
  -   </Radio.Item>
  -   <Radio.Item>
  -     <Radio.Basic value='2' />
  -     <Radio.Label>옵션 2</Radio.Label>
  -   </Radio.Item>
  - </Radio.Root>
  + <RadioGroup
  +   size='md'
  +   variant='hollow'
  +   value={selected}
  +   onChange={setSelected}
  +   name='group'
  +   options={[
  +     { value: "1", label: "옵션 1", helper: "헬퍼 텍스트" },
  +     { value: "2", label: "옵션 2" },
  +   ]}
  + />
  ```

  **추가**
  - `layout` — `"vertical"`(기본) 또는 `"grid"`, `grid`는 `columns` 필수
  - `stretched` — 아이템이 전체 너비를 채움

  **동작 변경 (코드 수정 불필요)**
  - `RadioGroup`이 레이아웃을 직접 관리 — 소비처가 감싸 배치하던 컨테이너 불필요
  - 레이블과 헬퍼의 `white-space: nowrap` 제거 — 폭이 부족하면 텍스트 개행
  - 레이블과 헬퍼 텍스트를 클릭해도 해당 라디오 선택
  - disabled 상태의 색상과 커서 등 시각적 표현을 신규 디자인 스펙에 맞게 변경

- 6ef4a7b: **reset**

  `textarea:not([rows]) { min-height: 10em }` 전역 규칙을 제거합니다. `rows` 없이 쓰던 모든 `<textarea>`의 최소 높이가 사라지므로 `rows`를 지정하거나 `min-height`를 직접 지정해야 합니다.

  JDS reset을 적용한 앱의 raw `<textarea>` 전부가 대상이라 영향 범위가 `Textarea` 소비처보다 넓습니다. `Textarea`는 자체 스타일로 최소 높이를 잡으므로 영향받지 않습니다.

- 277b9ca: **SegmentedControls**

  `SegmentedControl`을 `SegmentedControls`로 이름을 바꾸고, 내부 동작을 Radix `ToggleGroup`에서 `RadioGroup`으로, 스타일을 Emotion에서 vanilla-extract로 재작성합니다. `Root`, `Item` 구조는 유지됩니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                                        | TO-BE                                       |
  | -------------------------------------------- | ------------------------------------------- |
  | `SegmentedControl`                           | `SegmentedControls` (import과 JSX 모두)     |
  | `SegmentedControl{Size,RootProps,ItemProps}` | `SegmentedControls*`                        |
  | props 기준이 `ToggleGroup`                   | `RadioGroup` — ToggleGroup 전용 props 제거  |
  | `asChild`                                    | 제거 — Item은 `asChild?: never`로 타입 차단 |
  | `data-state="on" \| "off"`                   | `data-state="checked" \| "unchecked"`       |

  ```diff
  - import { SegmentedControl } from "@jects/jds";
  - <SegmentedControl.Root defaultValue="list">
  -   <SegmentedControl.Item value="list" asChild>
  -     <button type="button">목록</button>
  -   </SegmentedControl.Item>
  - </SegmentedControl.Root>
  + import { SegmentedControls } from "@jects/jds";
  + <SegmentedControls.Root defaultValue="list">
  +   <SegmentedControls.Item value="list">목록</SegmentedControls.Item>
  + </SegmentedControls.Root>
  ```

  상태 attribute로 스타일링했다면 값을 교체합니다.

  ```diff
  - [data-state="on"] { font-weight: 600; }
  + [data-state="checked"] { font-weight: 600; }
  ```

- 9ca0acc: **Select**

  Select를 W3C Listbox 패턴 기반으로 재작성하고, 컨테이너의 variant로 항목 종류를 결정하던 구조를 선택 개수에 따른 `Select`와 `MultiSelect`로 분리합니다. 배치가 고정되어 `Select.List`, `Select.Radio`, `Select.Checkbox` 컴파운드를 더 이상 공개하지 않고 선택지를 `options`로 전달합니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                                                                                                                                 | TO-BE                                                                                 |
  | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
  | `<Select variant="list">` + `Select.List`                                                                                             | `<Select variant="label" options={...} />`                                            |
  | `<Select variant="radio">` + `Select.Radio`                                                                                           | `<Select variant="control" options={...} />`                                          |
  | `<Select variant="checkbox">` + `Select.Checkbox`                                                                                     | `<MultiSelect options={...} />`                                                       |
  | 컨테이너 `size` (`md` / `sm`)                                                                                                         | 제거 — `md` 고정, 크기는 `width` / `height`로 조절                                    |
  | 항목 `badge` (`Select.List` 전용)                                                                                                     | `SelectOption.suffix`                                                                 |
  | 항목 `isDisabled`                                                                                                                     | `SelectOption.disabled`                                                               |
  | `SelectVariant` / `SelectSize` / `SelectValue` / `SelectContextType` / `SelectListProps` / `SelectRadioProps` / `SelectCheckboxProps` | 제거 — `MultiSelectProps` / `SelectOption` / `OptionVariant` / `SelectDimension` 추가 |
  | 항목 `role="checkbox"`, `role="radio"`                                                                                                | `role="option"`                                                                       |
  | `ref`가 가리키던 `role` 보유 항목 래퍼                                                                                                | 최상위 컨테이너                                                                       |

  항목의 체크박스와 라디오는 선택 상태를 나타내는 시각적 요소로만 동작합니다. `role`이나 항목 엘리먼트로 DOM을 조회하던 코드는 셀렉터 수정이 필요하며, 항목은 데이터 객체가 되어 개별 `ref`를 받지 않습니다.

  값 타입이 컴포넌트별로 고정됩니다. `Select`는 `string`, `MultiSelect`는 `string[]`를 씁니다. 컨테이너가 `role="listbox"`를 가지므로 접근 가능한 이름이 필요합니다. 레이블 요소가 따로 없으면 `aria-label`을, 있으면 `aria-labelledby`를 전달합니다. `badge`는 전달한 내용을 컴포넌트가 `ContentBadge`로 감쌌지만 `suffix`는 전달받은 노드를 그대로 배치합니다.

  ```diff
  - <Select variant='radio' value={value} onChange={setValue}>
  -   <Select.Radio value='seoul'>서울특별시</Select.Radio>
  -   <Select.Radio value='busan'>부산광역시</Select.Radio>
  - </Select>
  + <Select
  +   variant='control'
  +   aria-label='지역'
  +   value={value}
  +   onChange={setValue}
  +   options={[
  +     { value: "seoul", label: "서울특별시" },
  +     { value: "busan", label: "부산광역시" },
  +   ]}
  + />
  ```

  ```diff
  - <Select variant='checkbox' value={values} onChange={setValues}>
  -   <Select.Checkbox value='seoul'>서울특별시</Select.Checkbox>
  -   <Select.Checkbox value='busan'>부산광역시</Select.Checkbox>
  - </Select>
  + <MultiSelect
  +   aria-label='지역'
  +   value={values}
  +   onChange={setValues}
  +   options={[
  +     { value: "seoul", label: "서울특별시" },
  +     { value: "busan", label: "부산광역시" },
  +   ]}
  + />
  ```

- 52e6f29: **SelectField**

  `Input.SelectField`를 내부 `Field` primitive 기반의 compound 컴포넌트 `SelectField`로 재작성합니다. 필드 공통 동작은 `Field` 항목에서 다룹니다.

  `SelectField.Label`, `SelectField.Input`, `SelectField.Helper`로 구성합니다. 선택지는 `SelectOption[]`으로 전달하며 값과 표시명, 캡션, 부가 요소, 비활성 여부를 지정할 수 있습니다. `value`와 `defaultValue`, `onChange`는 모두 `options[].value`를 주고받습니다.

  `variant`로 선택 표시 방식을, `suffix`로 입력 오른쪽에 놓을 읽기 전용 요소를 지정할 수 있습니다. `name`을 지정하면 선택값이 hidden input으로 렌더되어 폼 제출에 포함됩니다.

  `searchable`의 기본값은 `false`입니다. `true`이면 검색어로 항목을 필터링할 수 있으며, 목록이 닫히거나 포커스가 제거되면 선택한 값의 표시명으로 돌아갑니다. `false`이면 타이핑을 막기 위해 입력 요소에 native `readOnly`가 적용되지만 필드가 읽기 전용이 되는 것은 아니라, 읽기 전용 여부는 `data-readonly`로 판단해야 합니다.

  입력 요소는 `role="combobox"`로 native 시맨틱을 덮어쓰며 `aria-haspopup`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, `aria-readonly`를 함께 노출합니다.

  타입 `SelectFieldProps`, `SelectFieldInputProps`, `SelectFieldLabelProps`, `SelectFieldHelperProps`를 함께 내보냅니다.

  ```tsx
  <SelectField status='error' required>
    <SelectField.Label suffix={<Icon name='information-line' size='2xs' />}>지역</SelectField.Label>
    <SelectField.Input
      placeholder='지역을 선택하세요'
      value={value}
      onChange={setValue}
      options={[
        { value: "seoul", label: "서울특별시" },
        { value: "busan", label: "부산광역시" },
      ]}
    />
    <SelectField.Helper>지역을 선택해주세요</SelectField.Helper>
  </SelectField>
  ```

  **소비처 영향 (코드 수정 필요)**

  | AS-IS `Input.SelectField`                           | TO-BE `SelectField`                                                                     |
  | --------------------------------------------------- | --------------------------------------------------------------------------------------- |
  | 단일 컴포넌트 (prop 기반)                           | compound                                                                                |
  | `label`                                             | `<SelectField.Label>`                                                                   |
  | `helperText`                                        | `<SelectField.Helper>`                                                                  |
  | 루트 `value` (표시할 문자열)                        | `<SelectField.Input>`의 controlled(`value` + `onChange`) / uncontrolled(`defaultValue`) |
  | 소비처가 `Select`를 직접 배치                       | `<SelectField.Input options={…}>`                                                       |
  | `isOpen` / `onClick`으로 소비처가 열림 상태 관리    | 컴포넌트가 소유                                                                         |
  | `isWithInfoIcon`                                    | `<SelectField.Label suffix={<Icon … />}>`                                               |
  | `style="outlined" \| "empty"`                       | 제거 — `outlined` 표현으로 고정                                                         |
  | `validation="none" \| "error" \| "success"`         | `status="default" \| "success" \| "error"`                                              |
  | `interaction="enabled" \| "disabled" \| "readOnly"` | `disabled` / `readonly` (+ `required`) boolean prop                                     |
  | `labelIcon` / `button` (SelectFieldButton)          | 제거 — 대체재 없음                                                                      |
  | `SelectFieldProps` (단일 컴포넌트 props)            | `SelectFieldProps` (compound 루트 props)                                                |

  `SelectFieldProps`는 이름이 그대로라 타입 검사를 통과할 수 있습니다. 이 타입을 직접 참조하던 코드는 필드가 달라졌으므로 확인이 필요합니다.

  ```diff
  - const [isOpen, setIsOpen] = useState(false);
  -
  - <Input.SelectField
  -   label='지역'
  -   helperText='지역을 선택해주세요'
  -   value={findLabelByValue(options, value)}
  -   placeholder='지역을 선택하세요'
  -   isOpen={isOpen}
  -   onClick={() => setIsOpen(!isOpen)}
  - />;
  -
  - {isOpen && (
  -   <Select
  -     value={value}
  -     onChange={next => {
  -       setValue(next);
  -       setIsOpen(false);
  -     }}
  -     options={options}
  -   />
  - )}
  + <SelectField>
  +   <SelectField.Label>지역</SelectField.Label>
  +   <SelectField.Input
  +     placeholder='지역을 선택하세요'
  +     value={value}
  +     onChange={setValue}
  +     options={options}
  +   />
  +   <SelectField.Helper>지역을 선택해주세요</SelectField.Helper>
  + </SelectField>
  ```

- 63c3423: **Snackbar**

  Snackbar를 Compound 구조에서 `feedback` prop을 쓰는 단일 컴포넌트 구조로 변경합니다. `none`, `positive`, `destructive`, `notifying` 피드백을 지원하고 노출 시간을 `duration`으로 조절합니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                                                            | TO-BE                                                                     |
  | ---------------------------------------------------------------- | ------------------------------------------------------------------------- |
  | `Snackbar.Basic` / `Snackbar.Feedback`                           | 단일 `Snackbar`                                                           |
  | `Snackbar.Feedback`의 `variant`                                  | `Snackbar`의 `feedback`                                                   |
  | `caption`                                                        | `description`                                                             |
  | 선택값 `labelButtonProps`                                        | 필수값 `label`, `onClick`                                                 |
  | `snackbar.basic(title, options)`                                 | `snackbar.basic(title, label, onClick, options)`                          |
  | 고정된 노출 시간                                                 | `SnackbarProvider`의 `duration` 또는 호출 옵션의 `duration`               |
  | `SnackbarVariant = "positive" \| "destructive"`                  | `SnackbarFeedback = "none" \| "positive" \| "destructive" \| "notifying"` |
  | `SnackbarBasicProps`, `SnackbarFeedbackProps`                    | `SnackbarProps`                                                           |
  | `SnackbarStyle`, `SnackbarFeedbackIconProps`, `SnackbarDivProps` | 제거 — 대체재 없음                                                        |
  | `SnackbarBase`, `SnackbarButtonsProps`                           | 제거 — 대체재 없음                                                        |
  | 항상 노출되던 닫기 버튼                                          | `withCloseButton` 옵션으로 표시 여부 제어                                 |

  ```diff
  - snackbar.basic("저장 완료", {
  -   caption: "변경사항이 저장되었습니다.",
  -   labelButtonProps: {
  -     children: "되돌리기",
  -     onClick: handleUndo,
  -   },
  - });
  + snackbar.basic("저장 완료", "되돌리기", handleUndo, {
  +   description: "변경사항이 저장되었습니다.",
  +   duration: 4000,
  +   withCloseButton: true,
  + });
  ```

  ```diff
  - <Snackbar.Feedback
  -   id="snackbar-1"
  -   variant="positive"
  -   title="저장 완료"
  -   caption="변경사항이 저장되었습니다."
  -   labelButtonProps={{
  -     children: "되돌리기",
  -     onClick: handleUndo,
  -   }}
  - />
  + <Snackbar
  +   id="snackbar-1"
  +   feedback="positive"
  +   title="저장 완료"
  +   description="변경사항이 저장되었습니다."
  +   label="되돌리기"
  +   onClick={handleUndo}
  +   withCloseButton
  + />
  ```

  **추가**
  - `SnackbarActionProps` — 액션 버튼 타입. `label`, `onClick`
  - `SnackbarOptions` — 호출 옵션 타입. `description`, `duration`, `withCloseButton`

  **동작 변경 (코드 수정 불필요)**
  - `SnackbarProvider`가 스크린리더 낭독용 live region을 둘로 분리 — `feedback="destructive"`는 `role="alert"`와 `aria-live="assertive"` 영역에서 즉시 낭독, 나머지는 `role="status"`와 `aria-live="polite"` 영역에서 안내
  - 같은 렌더에 동일한 alert 또는 status 채널의 Snackbar가 여러 개 추가되면 해당 채널의 가장 최근 항목만 안내 — 여러 알림의 내용을 모두 전달해야 하면 하나의 Snackbar로 통합 필요
  - 낭독 문구에 제목과 설명뿐 아니라 액션 버튼의 존재도 "{label} 버튼이 있습니다." 형식으로 포함
  - 자동 낭독은 `useSnackbar` 또는 `snackbarController`로 `SnackbarProvider`의 큐에 추가한 경우에만 동작, `<Snackbar>`를 직접 렌더링하면 미동작
  - Snackbar에 hover 또는 focus 중일 때는 자동 닫힘 일시정지

- 21af116: **Steps**

  수직 레이아웃 연결선에 활성 상태 색상을 적용하고 활성 여부 결정 규칙을 정리합니다. 활성 상태 DOM 속성 이름이 바뀌고 `activated`와 `current`의 우선순위가 바뀝니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                                 | TO-BE                                 |
  | ------------------------------------- | ------------------------------------- |
  | 활성 상태 DOM 속성 `data-activated`   | `data-steps-activated`                |
  | `current`가 있으면 `activated`를 무시 | `activated`가 `current` 계산을 덮어씀 |

  `Steps.Item`의 활성 상태를 소비처에서 스타일링했다면 속성 이름을 교체합니다.

  ```diff
  - [data-activated="true"] { ... }
  + [data-steps-activated="true"] { ... }
  ```

  `current`와 `activated`를 함께 넘기던 경우 동작이 바뀝니다. 이전에는 `activated`가 무시됐지만 이제 반영됩니다. 건너뛴 선택 단계처럼 `current`만으로 표현할 수 없는 상태에 씁니다. 두 prop 중 하나만 쓰던 코드는 동작이 동일합니다.

  ```tsx
  <Steps.Root current={2}>
    <Steps.Item index={0}>계정 생성</Steps.Item>
    <Steps.Item index={1} activated={false}>
      선택 단계
    </Steps.Item>
    <Steps.Item index={2}>완료</Steps.Item>
  </Steps.Root>
  ```

  **동작 변경 (코드 수정 불필요)**
  - 수직 연결선 색상이 활성 여부로 분기 — 뒤에 오는 단계가 활성이면 `semantic.accent.neutral`, 아니면 `semantic.stroke.alpha.subtle`
  - 수직 연결선의 비활성 색상이 `semantic.stroke.alpha.assistive`에서 `semantic.stroke.alpha.subtle`로 변경
  - 수직 연결선의 활성 판정을 `:has()`로 처리 — `Steps.Item`을 다른 컴포넌트로 감싼 경우에도 활성 상태 유지
  - 수평 separator 아이콘 크기 축소 — lg 16px → 14px, md 14px → 12px
  - 수직 연결선 `Divider`에 `decorative` 적용으로 내부 `aria-hidden`이 `false`에서 `true`로 변경 — 상위 래퍼가 이미 `aria-hidden`이라 보조기술 노출 여부는 동일
  - 수평 layout 화살표 아이콘은 활성 여부와 무관하게 단일 색상 유지

- e9e82d1: **SuggestionField**

  `Input.TagField`를 내부 `Field` primitive 기반의 compound 컴포넌트 `SuggestionField`로 재작성합니다. 필드 공통 동작은 `Field` 항목에서 다룹니다.

  `SuggestionField.Label`, `SuggestionField.Input`, `SuggestionField.Footer`, `SuggestionField.Helper`, `SuggestionField.Counter`로 구성합니다. 값은 `string[]`이고 입력한 문자열이 값이 됩니다. `suggestions`는 입력을 보조하는 목록이며 값의 범위를 제한하지 않습니다. 목록에서 선택한 항목은 입력한 값과 동일하게 처리되어 목록에서 제외됩니다.

  `suffix`로 입력 오른쪽에 놓을 읽기 전용 요소를 지정할 수 있습니다. `maxValues`로 추가 개수를 제한할 수 있고, `SuggestionField.Counter`를 `SuggestionField.Footer` 안에 두면 현재 개수와 최대 개수를 표시합니다. `name`을 지정하면 값마다 hidden input이 렌더되므로 `FormData.getAll(name)`으로 받습니다.

  `acceptValueOnBlur`의 기본값은 `true`이며, 포커스가 제거될 때 입력 중인 값을 확정할지 결정할 수 있습니다.

  입력 요소는 `role="combobox"`로 native 시맨틱을 덮어쓰며 `aria-haspopup`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, `aria-readonly`를 함께 노출합니다.

  값을 옵션으로 제한해야 하는 경우 `MultiSelectField`를 사용합니다.

  타입 `SuggestionFieldProps`, `SuggestionFieldInputProps`, `SuggestionFieldLabelProps`, `SuggestionFieldHelperProps`, `SuggestionFieldFooterProps`, `SuggestionFieldCounterProps`를 함께 내보냅니다.

  ```tsx
  <SuggestionField>
    <SuggestionField.Label>관심 기술 스택</SuggestionField.Label>
    <SuggestionField.Input
      suggestions={["React", "TypeScript", "Next.js"]}
      defaultValue={["React"]}
      maxValues={5}
      name='stacks'
      placeholder='기술 스택을 입력하세요'
    />
    <SuggestionField.Footer>
      <SuggestionField.Helper>최대 5개까지 고를 수 있어요</SuggestionField.Helper>
      <SuggestionField.Counter />
    </SuggestionField.Footer>
  </SuggestionField>
  ```

  **소비처 영향 (코드 수정 필요)**

  | AS-IS `Input.TagField`                              | TO-BE `SuggestionField`                                                        |
  | --------------------------------------------------- | ------------------------------------------------------------------------------ |
  | 단일 컴포넌트 (prop 기반)                           | compound                                                                       |
  | `label`                                             | `SuggestionField.Label`                                                        |
  | `helperText`                                        | `SuggestionField.Footer` 안의 `SuggestionField.Helper`                         |
  | `tags`, `onTagsChange` (`Tag[]`)                    | `SuggestionField.Input`의 `value`, `onChange` 또는 `defaultValue` (`string[]`) |
  | `maxTags`                                           | `SuggestionField.Input`의 `maxValues`                                          |
  | `allowDuplicates`                                   | 제거 — 값은 항상 고유                                                          |
  | `isWithInfoIcon`                                    | `SuggestionField.Label`의 `suffix`                                             |
  | `style="outlined" \| "empty"`                       | 제거 — `outlined` 표현으로 고정                                                |
  | `validation="none" \| "error" \| "success"`         | `status="default" \| "success" \| "error"`                                     |
  | `interaction="enabled" \| "disabled" \| "readOnly"` | `disabled`, `readonly` boolean prop                                            |
  | `TagFieldButton` (`labelIcon`, `button`)            | 제거 — 대체재 없음                                                             |
  | `TagFieldProps`, `TagFieldPublicProps`, `Tag`       | `SuggestionFieldProps`, `SuggestionFieldInputProps`                            |

  ```diff
  - const [tags, setTags] = useState<Tag[]>([{ id: "1", label: "React" }]);
  -
  - <Input.TagField
  -   label='관심 기술 스택'
  -   helperText='최대 5개까지 고를 수 있어요'
  -   placeholder='태그를 입력하고 Enter를 누르세요'
  -   tags={tags}
  -   onTagsChange={setTags}
  -   maxTags={5}
  - />;
  + <SuggestionField>
  +   <SuggestionField.Label>관심 기술 스택</SuggestionField.Label>
  +   <SuggestionField.Input
  +     suggestions={["React", "TypeScript", "Next.js"]}
  +     defaultValue={["React"]}
  +     maxValues={5}
  +     placeholder='기술 스택을 입력하세요'
  +   />
  +   <SuggestionField.Footer>
  +     <SuggestionField.Helper>최대 5개까지 고를 수 있어요</SuggestionField.Helper>
  +     <SuggestionField.Counter />
  +   </SuggestionField.Footer>
  + </SuggestionField>
  ```

- 26e3786: **Table**

  Table을 vanilla-extract 기반으로 재작성하고 `Table.ColorChip`을 공개합니다. 컴파운드 이름과 props는 유지되지만 헤더가 렌더하는 DOM 구조가 바뀝니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                        | TO-BE                                            |
  | ---------------------------- | ------------------------------------------------ |
  | `<thead>` 직속에 `<th>` 렌더 | `<thead>` 안에 `<tr>`을 두고 그 안에 `<th>` 렌더 |

  `<thead>` 직속에 `<th>`를 두던 유효하지 않은 마크업을 고친 것이며, `Table.Header`에 넘기는 자식은 그대로 `Table.HeaderItem`이라 호출부 JSX는 바뀌지 않습니다. `thead > th`처럼 DOM을 조회하거나 스타일링하던 코드는 셀렉터 수정이 필요합니다.

  ```diff
    <thead>
  -   <th>레이블</th>
  -   <th>레이블</th>
  +   <tr>
  +     <th>레이블</th>
  +     <th>레이블</th>
  +   </tr>
    </thead>
  ```

  **추가**
  - `Table.ColorChip` — label variant 안에서만 쓰던 컬러 칩을 단독으로 사용 가능
  - `Table.HeaderItem`의 `hasDivider` — 우측 구분선 표시 여부, 기본값 `true`
  - `Table.Header`의 `rowProps` — 내부 `<tr>`에 전달할 속성
  - `Table.Header`, `Table.HeaderItem`, `Table.Body`가 native 속성(`className`, `style`, `data-*` 등) 상속 — 기존에는 무시
  - `Table.Header`, `Table.HeaderItem`, `Table.Body`, `Table.Row`, `Table.RowItem`이 `ref` 지원 — 기존에는 `Table.Root`만 지원

  **동작 변경 (코드 수정 불필요)**
  - `Table.HeaderItem`의 `width`가 `<th>`에 적용 — 기존에는 값을 받고도 무시
  - `<th>`에 `scope="col"` 추가
  - 헤더 텍스트의 굵기가 bold에서 normal로, 색상이 `object.bold`에서 `object.bolder`로 변경
  - label variant 제목 텍스트의 bold 제거
  - badge variant의 배지가 `hierarchy="accent"`에서 `hierarchy="primary"`, `size="sm"`으로 변경
  - 헤더 배경이 `fill.subtlest`에서 `surface.deeper`로 변경
  - 루트 radius가 `6px`에서 `10px`으로 변경, `overflow: hidden` 추가
  - 셀 내용의 세로 정렬이 `middle`에서 `top`으로, 내용 사이 간격이 `6`에서 `4`로 변경
  - label variant가 렌더하는 컬러 칩에 `aria-hidden="true"` 적용 — 보조기술이 읽지 않음, 단독으로 쓰는 `Table.ColorChip`은 기본값 없음
  - `displayName`이 `TableRoot`에서 `Table.Root` 형태로 변경 — 컴포넌트 이름에 의존하던 스냅샷 확인 필요

- 829272b: **Tabs**

  기존 `Tab` 컴포넌트를 제거하고 `Tabs`로 대체합니다. `Tab` 네임스페이스와 개별 export, 관련 타입을 더 이상 사용할 수 없으므로 이름을 교체해야 합니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS             | TO-BE              |
  | ----------------- | ------------------ |
  | `Tab`             | `Tabs`             |
  | `Tab.Root`        | `Tabs.Root`        |
  | `Tab.List`        | `Tabs.List`        |
  | `Tab.Trigger`     | `Tabs.Trigger`     |
  | `Tab.Content`     | `Tabs.Content`     |
  | `TabRoot`         | `TabsRoot`         |
  | `TabList`         | `TabsList`         |
  | `TabTrigger`      | `TabsTrigger`      |
  | `TabContent`      | `TabsContent`      |
  | `TabVariant`      | `TabsVariant`      |
  | `TabRootProps`    | `TabsRootProps`    |
  | `TabListProps`    | `TabsListProps`    |
  | `TabTriggerProps` | `TabsTriggerProps` |
  | `TabContentProps` | `TabsContentProps` |

  ```diff
  - import { Tab } from "@jects/jds";
  - import type { TabContentProps, TabRootProps, TabTriggerProps } from "@jects/jds";
  -
  - <Tab.Root defaultValue="tab1">
  -   <Tab.List>
  -     <Tab.Trigger value="tab1">First</Tab.Trigger>
  -     <Tab.Trigger value="tab2">Second</Tab.Trigger>
  -   </Tab.List>
  -   <Tab.Content value="tab1">First content</Tab.Content>
  -   <Tab.Content value="tab2">Second content</Tab.Content>
  - </Tab.Root>;
  + import { Tabs } from "@jects/jds";
  + import type { TabsContentProps, TabsRootProps, TabsTriggerProps } from "@jects/jds";
  +
  + <Tabs.Root defaultValue="tab1">
  +   <Tabs.List>
  +     <Tabs.Trigger value="tab1">First</Tabs.Trigger>
  +     <Tabs.Trigger value="tab2">Second</Tabs.Trigger>
  +   </Tabs.List>
  +   <Tabs.Content value="tab1">First content</Tabs.Content>
  +   <Tabs.Content value="tab2">Second content</Tabs.Content>
  + </Tabs.Root>;
  ```

  네임스페이스 대신 개별 export를 쓰던 경우도 이름을 교체합니다.

  ```diff
  - import { TabRoot, TabList, TabTrigger, TabContent } from "@jects/jds";
  + import { TabsRoot, TabsList, TabsTrigger, TabsContent } from "@jects/jds";
  ```

- 6ef4a7b: **Textarea**

  `Input.InputArea`를 내부 `Field` primitive 기반의 compound 컴포넌트 `Textarea`로 재작성합니다. 필드 공통 동작은 `Field` 항목에서 다룹니다.

  `Textarea.Label`, `Textarea.Control`, `Textarea.Footer`, `Textarea.Helper`, `Textarea.Counter`로 구성합니다. 값은 controlled(`value` + `onChange`)와 uncontrolled(`defaultValue`)를 모두 지원합니다.

  `maxLength`를 지정하고 `Textarea.Counter`를 `Textarea.Footer` 안에 두면 현재 글자 수와 최대 글자 수를 표시합니다. uncontrolled에서는 `onChange`로만 길이를 추적하므로, `<form>` reset이나 ref로 값을 직접 변경하면 카운터가 실제 내용과 어긋납니다.

  타입 `TextareaProps`, `TextareaControlProps`, `TextareaLabelProps`, `TextareaHelperProps`, `TextareaFooterProps`, `TextareaCounterProps`를 함께 내보냅니다.

  ```tsx
  <Textarea status='error' required>
    <Textarea.Label suffix={<Icon name='information-line' size='2xs' />}>자기소개</Textarea.Label>
    <Textarea.Control
      maxLength={200}
      placeholder='내용을 입력하세요'
      value={value}
      onChange={onChange}
    />
    <Textarea.Footer>
      <Textarea.Helper>200자 이내로 입력해주세요</Textarea.Helper>
      <Textarea.Counter />
    </Textarea.Footer>
  </Textarea>
  ```

  **소비처 영향 (코드 수정 필요)**

  | AS-IS `Input.InputArea`                                                                         | TO-BE `Textarea`                                                                                                                    |
  | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
  | 단일 컴포넌트 (prop 기반)                                                                       | compound                                                                                                                            |
  | `label`                                                                                         | `<Textarea.Label>`                                                                                                                  |
  | `helperText`                                                                                    | `<Textarea.Helper>`                                                                                                                 |
  | 루트의 `value` / `onChange` (필수)                                                              | `<Textarea.Control>`의 controlled(`value` + `onChange`) / uncontrolled(`defaultValue`)                                              |
  | `maxLength` (내장 카운터)                                                                       | `<Textarea.Control maxLength>`와 `<Textarea.Counter>`                                                                               |
  | `labelIcon`                                                                                     | `<Textarea.Label suffix={<Icon … />}>`                                                                                              |
  | `style="outlined" \| "empty"`                                                                   | 제거 — `outlined` 표현으로 고정                                                                                                     |
  | `validation="none" \| "error"`                                                                  | `status="default" \| "success" \| "error"`                                                                                          |
  | `interaction="enabled" \| "disabled" \| "readOnly"`                                             | `disabled` / `readonly` (+ `required`) boolean prop                                                                                 |
  | `height` / `minHeight`                                                                          | `Textarea.Control`에 CSS로 지정                                                                                                     |
  | `InputAreaProps`, `InputAreaStyle`, `InputAreaLayout`, `InputAreaValidation`, `InputAreaStatus` | `TextareaProps`, `TextareaControlProps`, `TextareaLabelProps`, `TextareaHelperProps`, `TextareaFooterProps`, `TextareaCounterProps` |

  ```diff
  - <Input.InputArea
  -   label='자기소개'
  -   helperText='200자 이내로 입력해주세요'
  -   validation='error'
  -   maxLength={200}
  -   value={value}
  -   onChange={onChange}
  - />
  + <Textarea status='error'>
  +   <Textarea.Label>자기소개</Textarea.Label>
  +   <Textarea.Control
  +     maxLength={200}
  +     placeholder='내용을 입력하세요'
  +     value={value}
  +     onChange={onChange}
  +   />
  +   <Textarea.Footer>
  +     <Textarea.Helper>200자 이내로 입력해주세요</Textarea.Helper>
  +     <Textarea.Counter />
  +   </Textarea.Footer>
  + </Textarea>
  ```

  **동작 변경 (코드 수정 불필요)**
  - 최소 높이가 112px에서 48px로 축소
  - 세로 방향 `resize` 지원, `disabled`와 `readonly`에서는 불가

- 1ae9eac: **TextField**

  `Input.TextField`를 내부 `Field` primitive 기반의 compound 컴포넌트 `TextField`로 재작성합니다. 필드 공통 동작은 `Field` 항목에서 다룹니다.

  `TextField.Label`, `TextField.Input`, `TextField.Footer`, `TextField.Helper`, `TextField.Counter`로 구성합니다. 값은 controlled(`value` + `onChange`)와 uncontrolled(`defaultValue`)를 모두 지원합니다.

  `maxLength`를 지정하고 `TextField.Counter`를 `TextField.Footer` 안에 두면 현재 글자 수와 최대 글자 수를 표시합니다. uncontrolled에서는 `onChange`로만 길이를 추적하므로, `<form>` reset이나 ref로 값을 직접 변경하면 카운터가 실제 내용과 어긋납니다.

  `prefix`와 `suffix`로 입력 좌우에 부가 요소를 배치할 수 있습니다. `TextField.Label`도 같은 prop을 받습니다.

  타입 `TextFieldProps`, `TextFieldInputProps`, `TextFieldLabelProps`, `TextFieldHelperProps`, `TextFieldFooterProps`, `TextFieldCounterProps`를 함께 내보냅니다.

  ```tsx
  <TextField status='error' required>
    <TextField.Label suffix={<Icon name='information-line' size='2xs' />}>닉네임</TextField.Label>
    <TextField.Input
      maxLength={10}
      placeholder='닉네임을 입력하세요'
      value={value}
      onChange={onChange}
    />
    <TextField.Footer>
      <TextField.Helper>10자 이내로 입력해주세요</TextField.Helper>
      <TextField.Counter />
    </TextField.Footer>
  </TextField>
  ```

  **소비처 영향 (코드 수정 필요)**

  | AS-IS `Input.TextField`                             | TO-BE `TextField`                                                                                                     |
  | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
  | 단일 컴포넌트 (prop 기반)                           | compound                                                                                                              |
  | `label`                                             | `<TextField.Label>`                                                                                                   |
  | `helperText`                                        | `<TextField.Helper>`                                                                                                  |
  | 루트의 `value` / `onChange` (필수)                  | `<TextField.Input>`의 controlled(`value` + `onChange`) / uncontrolled(`defaultValue`)                                 |
  | `isWithInfoIcon`                                    | `<TextField.Label suffix={<Icon … />}>`                                                                               |
  | `style="outlined" \| "empty"`                       | 제거 — `outlined` 표현으로 고정                                                                                       |
  | `validation="none" \| "error" \| "success"`         | `status="default" \| "success" \| "error"`                                                                            |
  | `interaction="enabled" \| "disabled" \| "readOnly"` | `disabled` / `readonly` (+ `required`) boolean prop                                                                   |
  | `labelIcon` / `button` (TextFieldButton)            | `<TextField.Input prefix suffix>` / `<TextField.Label prefix suffix>`                                                 |
  | `TextFieldPublicProps`, `TextFieldButtonProps`      | `TextFieldInputProps`, `TextFieldLabelProps`, `TextFieldHelperProps`, `TextFieldFooterProps`, `TextFieldCounterProps` |
  | `TextFieldProps` (단일 컴포넌트 props)              | `TextFieldProps` (compound 루트 props)                                                                                |

  `TextFieldProps`는 이름이 그대로라 타입 검사를 통과할 수 있습니다. 이 타입을 직접 참조하던 코드는 필드가 달라졌으므로 확인이 필요합니다.

  ```diff
  - <Input.TextField
  -   label='이메일'
  -   helperText='유효한 이메일 주소를 입력해주세요'
  -   validation='error'
  -   interaction='disabled'
  -   isWithInfoIcon
  -   value={value}
  -   onChange={onChange}
  - />
  + <TextField status='error' disabled>
  +   <TextField.Label suffix={<Icon name='information-line' size='2xs' />}>이메일</TextField.Label>
  +   <TextField.Input placeholder='이메일을 입력하세요' value={value} onChange={onChange} />
  +   <TextField.Helper>유효한 이메일 주소를 입력해주세요</TextField.Helper>
  + </TextField>
  ```

  **동작 변경 (코드 수정 불필요)**
  - 입력 타이포가 `body-sm`에서 `body-md`로 확대

- 0593d46: **Toast**

  Toast를 Compound 구조에서 `feedback` prop을 쓰는 단일 컴포넌트 구조로 변경합니다. `notifying` 피드백이 추가되고 노출 시간을 `duration`으로 조절합니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                                                   | TO-BE                                                                  |
  | ------------------------------------------------------- | ---------------------------------------------------------------------- |
  | `Toast.Basic` / `Toast.Feedback`                        | 단일 `Toast`                                                           |
  | `Toast.Feedback`의 `variant`                            | `Toast`의 `feedback`                                                   |
  | `caption`                                               | `description`                                                          |
  | `toast.basic(title, description)`                       | `toast.basic(title, { description })`                                  |
  | 고정된 노출 시간                                        | `ToastProvider`의 `duration` 또는 호출 옵션의 `duration`               |
  | `ToastVariant = "positive" \| "destructive"`            | `ToastFeedback = "none" \| "positive" \| "destructive" \| "notifying"` |
  | `ToastBasicProps`, `ToastFeedbackProps`                 | `ToastProps`                                                           |
  | `ToastStyle`, `ToastFeedbackIconProps`, `ToastDivProps` | 제거 — 대체재 없음                                                     |
  | 닫기 버튼                                               | 제거 — `duration` 기반 자동 종료로 대체                                |

  ```diff
  - toast.basic("저장 완료", "변경사항이 저장되었습니다.");
  + toast.basic("저장 완료", {
  +   description: "변경사항이 저장되었습니다.",
  +   duration: 3000,
  + });
  ```

  ```diff
  - <Toast.Feedback id="toast-1" variant="positive" title="저장 완료" caption="변경사항이 저장되었습니다." />
  + <Toast id="toast-1" feedback="positive" title="저장 완료" description="변경사항이 저장되었습니다." />
  ```

  **동작 변경 (코드 수정 불필요)**
  - `ToastProvider`가 스크린리더 낭독용 live region을 둘로 분리 — `feedback="destructive"`는 `role="alert"`와 `aria-live="assertive"` 영역에서 즉시 낭독, 나머지는 `role="status"`와 `aria-live="polite"` 영역에서 안내
  - 같은 렌더에 동일한 alert 또는 status 채널의 Toast가 여러 개 추가되면 해당 채널의 가장 최근 항목만 안내 — 여러 알림의 내용을 모두 전달해야 하면 하나의 Toast로 통합 필요
  - 자동 낭독은 `useToast` 또는 `toastController`로 `ToastProvider`의 큐에 추가한 경우에만 동작, `<Toast>`를 직접 렌더링하면 미동작

- 344a73b: **Toggle**

  켜짐과 꺼짐 상태를 전환하는 `Toggle` 컴포넌트를 추가합니다. `checked`와 `onChange`를 쓰는 제어 방식과 `defaultChecked`를 쓰는 비제어 방식을 모두 지원합니다.

  `disabled`, `name`, `onClick`, `aria-*` 등 native input props를 전달할 수 있고 `ref`는 내부 checkbox input을 가리킵니다. `className`과 `style`은 Toggle의 시각적 루트에 적용됩니다. native checkbox 동작을 따르며 Space 키로 상태를 전환합니다.

  화면에 표시되는 라벨이 포함되지 않으므로 소비처에서 `aria-label` 또는 `aria-labelledby`를 전달해야 합니다. checkbox에서 동작하지 않는 `readOnly`와 컴포넌트가 고정하는 `children`, `role`, `type` prop은 지원하지 않습니다.

  타입 `ToggleProps`를 함께 내보냅니다.

  ```tsx
  import { type ChangeEvent, useState } from "react";

  const [isChecked, setIsChecked] = useState(false);

  const handleToggleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  <Toggle checked={isChecked} onChange={handleToggleChange} aria-label='알림 받기' />;

  <Toggle defaultChecked aria-label='자동 저장' />;
  ```

- d2e62ad: **타입 선언**

  공개 타입의 선언 형태를 정리합니다. export하는 이름과 import 경로, 렌더 결과는 그대로입니다.

  단일 객체로 선언하던 타입 별칭이 `interface`가 되었습니다. 유니온이 섞인 타입은 별칭으로 남습니다.

  `interface`는 암묵적 인덱스 시그니처를 지원하지 않아 `Record<string, unknown>`처럼 인덱스 시그니처를 요구하는 곳에 그대로 전달할 수 없습니다. 해당 값은 스프레드로 새 객체를 만들어 전달해야 합니다.

  ```diff
    declare const option: CheckboxOption;

  - const payload: Record<string, unknown> = option;
  + const payload: Record<string, unknown> = { ...option };
  ```

- 26e3786: **typography**

  본문 텍스트 스타일을 클래스명으로 얻는 `getBodyClassName`을 추가합니다. 기존 `getLabelClassName`, `getTitleClassName`과 같은 방식으로 씁니다.

  **추가**
  - `getBodyClassName({ size, weight })` — 본문 타이포 클래스명 반환
  - 타입 `BodySize`(`"lg" | "md" | "sm" | "xs" | "2xs"`), `BodyWeight`(`"bold" | "normal"`), `BodyStyleOptions`

  ```tsx
  <p className={getBodyClassName({ size: "md" })}>본문 텍스트</p>
  ```

- 79ef13f: **getLabelClassName / getTitleClassName**

  두 함수가 돌려주는 클래스에 글자 속성만 남습니다. 이전에는 `display: flex`, `align-items: center`, `color`, `cursor`와 정렬까지 함께 적용됐습니다. 정렬과 커서 옵션은 제거됐고, 레이아웃과 색은 클래스를 붙이는 쪽에서 선언해야 합니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                                                                         | TO-BE                                          |
  | ----------------------------------------------------------------------------- | ---------------------------------------------- |
  | `getLabelClassName({ textAlign })`                                            | 제거 — 해당 요소에 `justify-content` 직접 선언 |
  | `getLabelClassName({ cursor })`                                               | 제거 — 해당 요소에 `cursor` 직접 선언          |
  | `getTitleClassName({ textAlign })`                                            | 제거 — 해당 요소에 `justify-content` 직접 선언 |
  | `TitleStyleOptions.textAlign`                                                 | 제거                                           |
  | `TitleTextAlign`                                                              | 제거                                           |
  | 두 함수가 함께 주던 `display: flex`, `align-items: center`, `color`, `cursor` | 제거 — 해당 요소에서 직접 선언                 |

  `getLabelClassName`의 옵션 타입은 `LabelOwnProps`에서 `LabelStyleOptions`로 바뀝니다.

  ```diff
  -<span className={getLabelClassName({ size: "sm", textAlign: "center", cursor: "pointer" })}>
  +<span
  +  className={getLabelClassName({ size: "sm" })}
  +  style={{
  +    display: "flex",
  +    alignItems: "center",
  +    justifyContent: "center",
  +    color: vars.color.semantic.object.bold,
  +    cursor: "pointer",
  +  }}
  +>
     레이블
   </span>
  ```

  **추가**
  - `LabelStyleOptions` — `getLabelClassName`이 받는 `size`, `weight`만 담은 타입

  **동작 변경 (코드 수정 불필요)**
  - 클래스를 붙인 요소 안에서 텍스트와 인라인 요소 사이의 공백이 유지됨 — 이전에는 flex 컨테이너라 사라지던 공백

- cf01955: **typography**

  구문 텍스트 스타일을 클래스명으로 얻는 `getSyntaxClassName`을 추가합니다. 기존 `getLabelClassName`, `getTitleClassName`, `getBodyClassName`과 같은 방식으로 씁니다.

  **추가**
  - `getSyntaxClassName({ size })` — 구문 타이포 클래스명 반환
  - 타입 `SyntaxSize`(`"lg" | "md" | "sm" | "xs"`), `SyntaxStyleOptions`

  ```tsx
  <code className={getSyntaxClassName({ size: "md" })}>inline code</code>
  ```

- 12ee4c2: **tokens**

  textStyle을 전역 CSS 클래스 대신 중첩 스타일 객체로 제공합니다. `globalStyle(".semantic-textStyle-*")` 선언과 `textStyleClassNames`가 사라지고, 토큰명을 세그먼트로 쪼갠 `textStyles` 객체가 그 자리를 대신합니다. 클래스명으로 스타일링하던 코드는 객체 참조로 바꿔야 합니다. JDS 컴포넌트의 렌더 결과는 그대로입니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                               | TO-BE                                    |
  | ----------------------------------- | ---------------------------------------- |
  | `textStyleClassNames`               | 제거 — `textStyles`의 키로 대체          |
  | 전역 클래스 `.semantic-textStyle-*` | 제거 — `textStyles`의 값을 스타일에 전개 |

  ```diff
  -// Component.tsx
  -import { textStyleClassNames } from "@jects/jds/tokens";
  -
  -<span className='semantic-textStyle-body-md-normal'>본문</span>
  +// styles.css.ts
  +import { style } from "@vanilla-extract/css";
  +import { textStyles } from "@jects/jds/tokens";
  +
  +export const bodyMd = style(textStyles.body.md.normal);
  +
  +// Component.tsx
  +import { bodyMd } from "./styles.css";
  +
  +<span className={bodyMd}>본문</span>
  ```

  **추가**
  - `textStyles` — `title["6"]`, `label.md.bold`, `body["2xs"].normal`, `syntax.lg`처럼 토큰명 세그먼트로 접근하는 스타일 객체

- d74a3ac: **typography 유틸**

  `@jects/jds/utils`가 노출하는 타이포 표면이 `getLabelClassName`, `getTitleClassName`, `getBodyClassName`, `getSyntaxClassName` 네 함수와 그 옵션 타입으로 좁혀집니다. recipe를 그대로 내보내던 `typography` 객체, 내부 전용 헬퍼, 제거된 `Label` 컴포넌트에서 남아 있던 타입이 사라집니다. 이 변경으로 JDS 컴포넌트의 렌더 결과가 달라지지는 않습니다.

  **소비처 영향 (코드 수정 필요)**

  | AS-IS                                  | TO-BE                                                      |
  | -------------------------------------- | ---------------------------------------------------------- |
  | `typography.label`, `typography.title` | `getLabelClassName`, `getTitleClassName`                   |
  | `typography.inheritColor`              | 제거 — 해당 요소에 `color: inherit` 직접 선언              |
  | `shouldForwardTypographyProp`          | 제거                                                       |
  | `LabelOwnProps`                        | 제거 — `Menu.Category`의 prop 타입은 `MenuCategoryProps`   |
  | `LabelTextAlign`, `LabelCursor`        | 제거 — `Menu.Category`의 `textAlign`, `cursor` prop도 제거 |
  | `TEXT_ALIGN_MAPPING`                   | 제거                                                       |

  ```diff
  -import { typography } from "@jects/jds/utils";
  +import { getLabelClassName } from "@jects/jds/utils";

  -<span className={clsx(typography.label({ size: "sm" }), typography.inheritColor)}>레이블</span>
  +<span className={getLabelClassName({ size: "sm" })} style={{ color: "inherit" }}>
  +  레이블
  +</span>
  ```

- 26e3786: **visuallyHidden**

  화면에서는 감추고 보조기술에는 남기는 `visuallyHidden` 클래스를 추가합니다. `@jects/jds/utils`에서 가져옵니다.

  **추가**
  - `visuallyHidden` — vanilla-extract 클래스명 문자열

  ```tsx
  <span className={visuallyHidden}>새 창에서 열림</span>
  ```

### Patch Changes

- 79ef13f: **Accordion**

  제목 색이 트리거 색을 따릅니다. 활성 상태는 `object.bold`에서 `object.bolder`로, `disabled` 상태는 `object.bold`에서 `object.subtle`로 바뀝니다. 이전에는 상태와 무관하게 `object.bold`로 고정이었습니다.

- 26e3786: **Accordion**

  Accordion의 스타일링을 Emotion에서 vanilla-extract로 마이그레이션합니다. 소비처에서 고칠 코드는 없습니다.

- d74a3ac: **Button (BlockButton / LabelButton)**

  두 버튼이 선언하던 `font-family: inherit`을 제거합니다. 소비처가 고칠 것은 없습니다.

  **동작 변경 (코드 수정 불필요)**
  - 버튼 레이블의 폰트가 부모에서 상속된 폰트에서 label 타이포 스타일이 지정한 폰트로 변경

- 6b069ed: **Card**

  한 줄을 넘는 제목과 메타 항목이 말줄임(...)으로 끊깁니다. 두 요소가 `display: flex`여서 `text-overflow`가 무시되고 글자 중간에서 잘리던 것을 `display: block`으로 바꿨습니다. 카드의 테두리, 여백, 간격도 디자인 값에 맞췄습니다. 소비처가 고칠 것은 없습니다.

  **동작 변경 (코드 수정 불필요)**
  - `Card.Title`, `Card.MetaItem`의 넘치는 텍스트 — 글자 중간에서 잘림에서 말줄임(...)으로 변경
  - `variant='plate'` 카드의 테두리 — `border`에서 `outline`으로 변경, 안쪽 높이를 차지하지 않음
  - `variant='plate'` 카드의 구분선 — `border`에서 `inset box-shadow`로 변경, 안쪽 높이를 차지하지 않음
  - `variant='plate'`, `layout='vertical'` 카드의 전체 높이 — 테두리와 구분선이 차지하던 3px만큼 낮아짐
  - `variant='plate'`, `layout='horizontal'` 카드의 캡션 — 아래 2px이 잘리던 것이 온전히 표시
  - `variant='plate'`, `layout='horizontal'` 카드에서 `Card.ContentGroup` 없이 제목과 요약을 `Card.Content`에 직접 넣은 경우의 제목 — 위아래로 나뉘어 잘리던 것이 아래쪽으로 잘림, `Card.ContentGroup`으로 감싸면 잘리지 않음
  - `variant='plate'` 카드의 안쪽 여백 — 항상 20px에서 `margin.sm`으로 변경, 데스크톱 20px, 태블릿 16px, 모바일 12px
  - `Card.ContentGroup`의 `variant='post'` 간격 — 8px에서 10px로 변경
  - `Card.Meta`의 항목 간격 — 8px에서 12px로 변경

- cf01955: **Code**

  크기별 타이포그래피 스타일을 공통 `getSyntaxClassName` 유틸과 연동하고, 테두리 두께를 `semantic.strokeWeight["1"]` 토큰과 연동합니다. 공개 prop과 렌더 요소는 유지되므로 소비처에서 고칠 코드는 없습니다.

- 84a344d: **컨텍스트**

  컨텍스트 생성 방식을 공용 팩토리로 통일합니다. 공개 API와 타입, 렌더 결과는 그대로입니다.

  Provider 밖에서 훅을 호출할 때의 에러 메시지가 모든 컴포넌트에서 같은 형식이 됩니다.

- 344f4ba: **focusRing / overlay**

  `interaction: "delegated"`가 상태를 읽는 `[data-interaction-target]`의 범위를 후손 전체에서 직계 자식으로 좁힙니다. `delegated`를 쓰는 요소는 `[data-interaction-target]`을 직계 자식에 둬야 하며, JDS 컴포넌트는 모두 이 조건을 만족합니다.

  **추가**
  - `FocusRingInteraction` (`"self" | "within" | "delegated"`), `OverlayInteraction` (`"self" | "delegated"`) — `interaction` 옵션의 값 타입, `@jects/jds/utils`에서 가져옴

  **동작 변경 (코드 수정 불필요)**
  - `delegated`를 쓰는 요소 안에 `[data-interaction-target]`을 가진 컴포넌트(File, Chip)를 중첩하면 바깥 요소의 focus ring과 press 오버레이가 더 이상 함께 그려지지 않음 — Dialog의 `body`에 File이나 Chip을 넣은 경우가 해당

- b2bfe39: **Divider**

  Divider의 기본 색상을 `semantic.stroke.alpha.subtle`에서 `semantic.stroke.alpha.assistive`로 변경하고, 소비처에서 색상을 오버라이드할 수 있도록 `dividerColorVar`를 export합니다. 색상을 주입하지 않으면 변경된 기본 색상으로 fallback됩니다.

  **추가**
  - `dividerColorVar` — Divider 색상을 오버라이드하는 CSS variable

  **동작 변경 (코드 수정 불필요)**
  - Divider 기본 색상이 `semantic.stroke.alpha.subtle`에서 `semantic.stroke.alpha.assistive`로 변경

- e9e82d1: **es-hangul**

  목록 검색에서 한글을 자모 단위로 비교하기 위해 `es-hangul`을 런타임 의존성으로 추가합니다. gzip 기준 약 1.8KB이며, 이 라이브러리를 사용하는 컴포넌트를 포함하는 소비처 번들에만 포함됩니다.

- 12556b3: **Field (internal)**

  필드 계열 컴포넌트를 조립하기 위한 내부 컴포넌트 `Field`를 추가합니다. `TextField`, `Textarea`, `SelectField`, `MultiSelectField`, `SuggestionField`가 이 위에 올라갑니다. 각 컴포넌트가 노출하는 compound와 고유 prop은 해당 체인지셋에서 다룹니다.

  레이블과 컨트롤, 헬퍼 텍스트를 조합해 구성합니다. 루트에서 `status`(`default`/`success`/`error`)와 `disabled`, `readonly`, `required` 상태를 관리합니다. 헬퍼 텍스트와 카운터를 한 줄에 놓아야 하면 `Footer`로 감쌉니다. 루트는 native `div` props와 `ref` 전달을 지원합니다.

  `disabled`, `readOnly`, `required`는 컨트롤에 직접 지정할 수 있습니다. 컨트롤에 지정한 값이 루트를 덮어씁니다. 상태는 필드 박스의 테두리와 배경, 인터랙션에 반영됩니다. `disabled`는 레이블과 헬퍼 텍스트 색상까지 바꿉니다. `readonly` 상태는 컨트롤에 `data-readonly`로 노출합니다. `required`는 native `required` 대신 `aria-required`로 노출하므로 브라우저 기본 검증은 동작하지 않습니다.

  `id`는 루트에서 관리합니다. `<TextField id="email">`처럼 전달하면 컨트롤의 `id`와 레이블의 `htmlFor`, 헬퍼 텍스트의 `id`가 자동으로 연결됩니다. 생략하면 `useId`로 생성합니다.

  접근 가능한 이름은 레이블이 렌더되면 해당 레이블의 id를 참조합니다. 레이블이 없으면 전달된 `aria-labelledby`나 `aria-label`을 사용합니다.

  `status`가 `error`면 `aria-invalid`를 적용하고, 그 외에는 전달된 값을 그대로 사용합니다. 값이 없으면 속성을 추가하지 않습니다.

  `aria-describedby`는 렌더된 헬퍼 텍스트와 카운터의 id를 연결하고, 전달된 값이 있으면 함께 병합합니다.

  필드 박스의 테두리 안쪽 패딩을 클릭하면 컨트롤로 포커스가 이동합니다. 팝업이 있는 필드에서는 목록도 함께 열립니다.

- 0c068b9: **@jects/jds**

  `exports`의 `import`와 `require`에 각각 타입 선언을 연결합니다. 공개 API는 그대로이므로 코드 수정은 필요하지 않습니다.

  **동작 변경 (코드 수정 불필요)**
  - CJS로 가져가는 소비처가 `.d.cts`를 참조함, 이전에는 ESM 선언인 `.d.ts`를 참조해 `require`로 가져올 수 없어서 오류가 발생했음

- 79ef13f: **LocalNavigation**

  제목의 `line-height: 1` 선언을 제거합니다. 타이포 클래스의 `line-height`에 밀려 적용되지 않던 선언이라 렌더 결과는 그대로입니다.

- ea36c4a: **Menu (Menu / MenuItem)**

  두 컴포넌트의 스타일링을 Emotion에서 vanilla-extract로 마이그레이션합니다. 소비처에서 고칠 코드는 없습니다.

  **동작 변경 (코드 수정 불필요)**
  - `useMenuContext`를 Menu 밖에서 호출했을 때의 에러 메시지 개선

- e6cd211: **Menu (Menu.Tree)**

  `@react-aria/utils`가 의존성에서 제거됩니다. 공개 API와 키보드 동작은 이전과 같으므로 소비처 코드 수정은 필요하지 않습니다.

- 0dd70e0: **Icon / Listbox / Menu / Button / LocalNavigation**

  모듈 간 순환 참조를 제거하는 내부 정리입니다. 공개 API와 타입, 렌더 결과가 모두 그대로이므로 소비처 영향은 없습니다.

- d84b786: **Toast / Snackbar / Tooltip**

  화면 위에 겹쳐 뜨는 컴포넌트의 `z-index`를 레이어 토큰으로 정리합니다. Dialog가 `zIndex.overlay`를 단독으로 쓰고 Toast, Snackbar, Tooltip은 `zIndex.floated`를 씁니다. 소비처에서 고칠 코드는 없습니다.

  **동작 변경 (코드 수정 불필요)**
  - Toast, Snackbar 스택 컨테이너의 `z-index`가 `zIndex.overlay`(400)에서 `zIndex.floated`(300)로 변경 — Dialog가 열려 있는 동안 뜬 Toast, Snackbar는 포털 생성 순서와 관계없이 Dialog 뒤에 배치
  - Tooltip 콘텐츠의 `z-index`가 `9999`에서 `zIndex.floated`(300)로 변경 — Dialog 안에서 연 Tooltip은 Dialog 뒤에 가려짐

- d74a3ac: **tokens**

  syntax 계열 textStyle의 `letter-spacing`이 `0%`에서 `0em`으로 바뀝니다. 소비처가 고칠 것은 없습니다.

  **동작 변경 (코드 수정 불필요)**
  - `letter-spacing`의 백분율을 지원하는 브라우저(Firefox 45 이상, Safari 7 이상, Chrome, Edge 145 이상)에서는 `0%`와 `0em`이 모두 `0`이라 결과가 같음
  - 지원하지 않는 브라우저에서는 syntax 타이포의 자간이 조상에서 상속된 값에서 `0`으로 변경 — 이전에는 `0%` 선언이 버려져 상속 값이 적용

- 39a8332: **Thumbnail**

  `ratio`에 `2:3` 옵션을 추가하고, 기본 fallback과 인터랙션 색상을 조정합니다.

  **추가**
  - `ratio`에 `2:3` 비율 추가

  **동작 변경 (코드 수정 불필요)**
  - 기본 fallback이 아이콘에서 공용 placeholder 이미지로 변경
  - hover와 active dim, focus ring, border 색상을 디자인 토큰 기준으로 정렬

## 0.4.0

### Minor Changes

- 6b251da: **Steps**

  스텝 컴포넌트 API 이름을 Step에서 Steps로 변경합니다. 기존 Step 컴포넌트와 관련 타입 export를 더 이상 @jects/jds에서 사용할 수 없으므로 breaking change입니다.

  | AS-IS           | TO-BE            |
  | --------------- | ---------------- |
  | `Step`          | `Steps`          |
  | `Step.Root`     | `Steps.Root`     |
  | `Step.Item`     | `Steps.Item`     |
  | `StepSize`      | `StepsSize`      |
  | `StepLayout`    | `StepsLayout`    |
  | `StepRootProps` | `StepsRootProps` |
  | `StepItemProps` | `StepsItemProps` |

  **AS-IS**

  ```tsx
  import { Step } from "@jects/jds";
  import type { StepItemProps, StepRootProps } from "@jects/jds";

  <Step.Root current={1}>
    <Step.Item index={0}>First</Step.Item>
    <Step.Item index={1}>Second</Step.Item>
  </Step.Root>;
  ```

  **TO-BE**

  ```tsx
  import { Steps } from "@jects/jds";
  import type { StepsItemProps, StepsRootProps } from "@jects/jds";

  <Steps.Root current={1}>
    <Steps.Item index={0}>First</Steps.Item>
    <Steps.Item index={1}>Second</Steps.Item>
  </Steps.Root>;
  ```

## 0.3.0

### Minor Changes

- 11888b9: **Badge Migration**

  뱃지 컴포넌트의 variant 값과 일부 props/type 이름을 변경합니다. 기존 variant 값 중 일부가 제거되거나 대체되었고, ContentBadge의 아이콘 버튼 사용 방식과 public props 타입 이름도 함께 정리되었으므로 breaking change입니다.

  | AS-IS                                                                                                                                                                                       | TO-BE                                                                                                                    |
  | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
  | `FeedbackVariant = "positive" \| "destructive" \| "notifying"`                                                                                                                              | `FeedbackVariant = "positive" \| "destructive"`                                                                          |
  | `ThemeVariant = "red" \| "orange" \| "amber" \| "yellow" \| "lime" \| "green" \| "emerald" \| "teal" \| "cyan" \| "sky" \| "blue" \| "violet" \| "purple" \| "fuchsia" \| "pink" \| "rose"` | `ThemeVariant = "red" \| "orange" \| "yellow" \| "lime" \| "green" \| "teal" \| "sky" \| "indigo" \| "purple" \| "pink"` |
  | `NumericBadgeStyle = "solid" \| "empty"`                                                                                                                                                    | `NumericBadgeStyle = "solid" \| "alpha" \| "hollow"`                                                                     |
  | `ContentBadge.Basic`의 `withIcon`                                                                                                                                                           | `ContentBadge.Basic`의 `withIconButton`                                                                                  |
  | `withIcon` 사용 시 선택적으로 전달하던 `onIconClick`                                                                                                                                        | `withIconButton: true` 사용 시 필수로 전달하는 `onIconClick`                                                             |
  | `ContentBadge.Feedback`에 아이콘 버튼 props 없음                                                                                                                                            | `ContentBadge.Feedback`도 `withIconButton`, `onIconClick` 지원                                                           |
  | `ContentFeedbackBadgeProps`                                                                                                                                                                 | `ContentBadgeFeedbackProps`                                                                                              |
  | `ContentThemeBadgeProps`                                                                                                                                                                    | `ContentBadgeThemeProps`                                                                                                 |
  | `NumericBasicBadgeProps`                                                                                                                                                                    | `NumericBadgeFeedbackProps`                                                                                              |
  | `BadgeStyle`, `BadgeStyleWithoutBorder`                                                                                                                                                     | 더 이상 export하지 않음                                                                                                  |

  ContentBadge의 Basic과 Feedback은 `withIconButton`이 `true`일 때만 `onIconClick`을 전달할 수 있습니다. `withIconButton`을 전달하지 않거나 `false`로 사용하는 경우에는 `onIconClick`을 함께 전달할 수 없습니다. Theme은 아이콘 버튼을 지원하지 않습니다.

  **AS-IS**

  ```tsx
  import { ContentBadge, DotBadge, NumericBadge } from "@jects/jds";
  import type {
    ContentFeedbackBadgeProps,
    ContentThemeBadgeProps,
    NumericBasicBadgeProps,
  } from "@jects/jds";

  <ContentBadge.Basic withIcon onIconClick={handleClick}>
    레이블
  </ContentBadge.Basic>;

  <ContentBadge.Feedback variant='notifying'>알림</ContentBadge.Feedback>;
  <DotBadge.Feedback variant='notifying' />;

  <ContentBadge.Theme variant='cyan'>테마</ContentBadge.Theme>;

  <NumericBadge.Basic badgeStyle='empty'>99</NumericBadge.Basic>;
  ```

  **TO-BE**

  ```tsx
  import { ContentBadge, DotBadge, NumericBadge } from "@jects/jds";
  import type {
    ContentBadgeFeedbackProps,
    ContentBadgeThemeProps,
    NumericBadgeFeedbackProps,
  } from "@jects/jds";

  <ContentBadge.Basic withIconButton onIconClick={handleClick}>
    레이블
  </ContentBadge.Basic>;

  <ContentBadge.Feedback variant='positive'>완료</ContentBadge.Feedback>;
  <DotBadge.Feedback variant='destructive' />;

  <ContentBadge.Theme variant='sky'>테마</ContentBadge.Theme>;

  <NumericBadge.Basic badgeStyle='hollow'>99</NumericBadge.Basic>;
  <NumericBadge.Feedback badgeStyle='alpha' variant='positive'>
    99
  </NumericBadge.Feedback>;
  ```

  사용처에서는 `notifying`, `empty`, 제거된 theme 색상(`amber`, `emerald`, `cyan`, `blue`, `violet`, `fuchsia`, `rose`)을 더 이상 사용할 수 없습니다. 해당 값들은 디자인 의도에 맞는 현재 variant 값으로 치환해야 합니다.

  추가로 Badge 컴포넌트들이 native `span` props를 받을 수 있도록 변경되어 `className`, `aria-*`, `data-*` 같은 속성을 컴포넌트에 직접 전달할 수 있습니다. 사용처에서 variant 옵션을 직접 관리하고 있다면 `FEEDBACK_VARIANT_OPTIONS`, `THEME_VARIANT_OPTIONS`, `NUMERIC_BADGE_STYLE_OPTIONS`를 기준으로 함께 갱신해야 합니다.

- 270653d: **Interaction Utility Migration**

  `focusRing`과 `overlay` 유틸을 style string export에서 recipe 함수 형태로 변경합니다. 두 유틸은 `@jects/jds/utils`를 통해 외부에 공개되어 있으므로, 외부 소비자가 직접 사용하고 있었다면 호출 방식 변경이 필요합니다.

  | AS-IS       | TO-BE         |
  | ----------- | ------------- |
  | `focusRing` | `focusRing()` |
  | `overlay`   | `overlay()`   |

  **AS-IS**

  ```tsx
  import { focusRing, overlay } from "@jects/jds/utils";

  const root = style([focusRing, overlay, baseStyles]);
  ```

  **TO-BE**

  ```tsx
  import { focusRing, overlay } from "@jects/jds/utils";

  const root = style([focusRing(), overlay(), baseStyles]);
  ```

  `focusRing`은 `border`, `feedback` variant를 지원하고, `overlay`는 `hierarchy`, `density`, `nativeHover` variant를 지원합니다. `nativeHover`는 `usePressable` / `useContainerPressable`을 거치지 않는 Radix 기반 컴포넌트 등에서 native `:hover` fallback이 필요한 경우에만 명시적으로 opt-in해야 합니다.

  ```tsx
  overlay({ hierarchy: "secondary", density: "normal", nativeHover: true });
  ```

  또한 interaction focus 색상과 interaction layer 토큰이 갱신되어, 관련 컴포넌트의 focus ring / hover / pressed 렌더링 결과가 달라질 수 있습니다.

## 0.2.2

### Patch Changes

- 12bc25b: include to added component in jds@0.2.1

## 0.2.1

### Patch Changes

- 72ccd58: 2차 QA 대응

## 0.2.0

### Minor Changes

- 9a1c7a3: refactor design systems and add code/table design system

## 0.0.1

### Patch Changes

- 050b727: 리팩토링 이전 디자인 시스템 배포 테스트
