---
"@jects/jds": minor
---

**Badge Migration**

뱃지 컴포넌트의 variant 값과 일부 props/type 이름을 변경합니다. 기존 variant 값 중 일부가 제거되거나 대체되었고, ContentBadge의 아이콘 버튼 사용 방식과 public props 타입 이름도 함께 정리되었으므로 breaking change입니다.

| AS-IS | TO-BE |
| --- | --- |
| `FeedbackVariant = "positive" \| "destructive" \| "notifying"` | `FeedbackVariant = "positive" \| "destructive"` |
| `ThemeVariant = "red" \| "orange" \| "amber" \| "yellow" \| "lime" \| "green" \| "emerald" \| "teal" \| "cyan" \| "sky" \| "blue" \| "violet" \| "purple" \| "fuchsia" \| "pink" \| "rose"` | `ThemeVariant = "red" \| "orange" \| "yellow" \| "lime" \| "green" \| "teal" \| "sky" \| "indigo" \| "purple" \| "pink"` |
| `NumericBadgeStyle = "solid" \| "empty"` | `NumericBadgeStyle = "solid" \| "alpha" \| "hollow"` |
| `ContentBadge.Basic`의 `withIcon` | `ContentBadge.Basic`의 `withIconButton` |
| `withIcon` 사용 시 선택적으로 전달하던 `onIconClick` | `withIconButton: true` 사용 시 필수로 전달하는 `onIconClick` |
| `ContentBadge.Feedback`에 아이콘 버튼 props 없음 | `ContentBadge.Feedback`도 `withIconButton`, `onIconClick` 지원 |
| `ContentFeedbackBadgeProps` | `ContentBadgeFeedbackProps` |
| `ContentThemeBadgeProps` | `ContentBadgeThemeProps` |
| `NumericBasicBadgeProps` | `NumericBadgeFeedbackProps` |
| `BadgeStyle`, `BadgeStyleWithoutBorder` | 더 이상 export하지 않음 |

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

<ContentBadge.Feedback variant="notifying">알림</ContentBadge.Feedback>;
<DotBadge.Feedback variant="notifying" />;

<ContentBadge.Theme variant="cyan">테마</ContentBadge.Theme>;

<NumericBadge.Basic badgeStyle="empty">99</NumericBadge.Basic>;
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

<ContentBadge.Feedback variant="positive">완료</ContentBadge.Feedback>;
<DotBadge.Feedback variant="destructive" />;

<ContentBadge.Theme variant="sky">테마</ContentBadge.Theme>;

<NumericBadge.Basic badgeStyle="hollow">99</NumericBadge.Basic>;
<NumericBadge.Feedback badgeStyle="alpha" variant="positive">
  99
</NumericBadge.Feedback>;
```

사용처에서는 `notifying`, `empty`, 제거된 theme 색상(`amber`, `emerald`, `cyan`, `blue`, `violet`, `fuchsia`, `rose`)을 더 이상 사용할 수 없습니다. 해당 값들은 디자인 의도에 맞는 현재 variant 값으로 치환해야 합니다.

추가로 Badge 컴포넌트들이 native `span` props를 받을 수 있도록 변경되어 `className`, `aria-*`, `data-*` 같은 속성을 컴포넌트에 직접 전달할 수 있습니다. 사용처에서 variant 옵션을 직접 관리하고 있다면 `FEEDBACK_VARIANT_OPTIONS`, `THEME_VARIANT_OPTIONS`, `NUMERIC_BADGE_STYLE_OPTIONS`를 기준으로 함께 갱신해야 합니다.
