# @jects/jds

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
