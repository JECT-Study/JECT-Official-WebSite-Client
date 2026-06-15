---
"@jects/jds": minor
---

**SegmentedControls Migration**

SegmentedControl이 `SegmentedControls`로 이름이 변경되었습니다. 또한 vanilla-extract 기반으로 재작성되면서 내부 동작을 Radix `ToggleGroup`에서 `RadioGroup`으로 변경했습니다. 컴포넌트 사용 구조(`Root` / `Item`)는 유지되지만, public export 이름, public props 타입, 상태 attribute 기준이 변경됩니다.

| AS-IS | TO-BE |
| --- | --- |
| `SegmentedControl` | `SegmentedControls` |
| `SegmentedControlSize` | `SegmentedControlsSize` |
| `SegmentedControlRootProps` | `SegmentedControlsRootProps` |
| `SegmentedControlItemProps` | `SegmentedControlsItemProps` |
| Radix `ToggleGroup` 기반 동작 | Radix `RadioGroup` 기반 동작 |
| `SegmentedControlRootProps extends Omit<ToggleGroupSingleProps, "type">` | `SegmentedControlsRootProps extends Omit<RadioGroupProps, "asChild">` |
| `SegmentedControlItemProps = ToggleGroupItemProps` | `SegmentedControlsItemProps = Omit<RadioGroupItemProps, "asChild"> & { asChild?: never }` |
| `asChild` 사용 가능 | `asChild` 제거 |
| `data-state="on"` / `data-state="off"` | `data-state="checked"` / `data-state="unchecked"` |
| Emotion styled 기반 스타일 | vanilla-extract recipe 기반 스타일 |
| `StyledRootProps`, `StyledContentProps`, `StyledItemProps` | 제거 |

기존 `SegmentedControl` export는 제거되고 `SegmentedControls` export로 대체됩니다. 소비자는 import 이름과 JSX 사용처를 모두 `SegmentedControls`로 변경해야 합니다.

`SegmentedControls.Root`와 `SegmentedControls.Item`의 public props 타입이 RadioGroup 기준으로 변경되었습니다. 기존에 ToggleGroup 전용 props를 전달하고 있었다면 더 이상 사용할 수 없으며, RadioGroup에서 지원하는 props 기준으로 마이그레이션해야 합니다.

`asChild`는 더 이상 지원하지 않습니다. 기존에 `SegmentedControl.Root` 또는 `SegmentedControl.Item`에 `asChild`를 전달하던 사용처는 `SegmentedControls`로 이름을 변경하면서 `asChild`도 함께 제거해야 합니다.

상태 attribute를 기반으로 스타일을 오버라이드하던 경우 selector를 변경해야 합니다. 기존 `data-state="on"` / `data-state="off"` 기준 스타일은 `data-state="checked"` / `data-state="unchecked"` 기준으로 옮겨야 합니다.

`StyledRootProps`, `StyledContentProps`, `StyledItemProps`는 Emotion styled 구현에서만 사용되던 내부 스타일 타입이므로 제거되었습니다. 해당 타입을 직접 import해 사용하고 있었다면 더 이상 사용할 수 없습니다.

**AS-IS**

```tsx
import { SegmentedControl } from "@jects/jds";
import type { SegmentedControlItemProps } from "@jects/jds";

const itemProps: SegmentedControlItemProps = {
  value: "list",
  asChild: true,
};

<SegmentedControl.Root defaultValue='list'>
  <SegmentedControl.Item {...itemProps}>
    <button type='button'>목록</button>
  </SegmentedControl.Item>
  <SegmentedControl.Item value='card'>카드</SegmentedControl.Item>
</SegmentedControl.Root>;
```

```css
[data-state="on"] {
  font-weight: 600;
}
```

**TO-BE**

```tsx
import { SegmentedControls } from "@jects/jds";
import type { SegmentedControlsItemProps } from "@jects/jds";

const itemProps: SegmentedControlsItemProps = {
  value: "list",
};

<SegmentedControls.Root defaultValue='list'>
  <SegmentedControls.Item {...itemProps}>목록</SegmentedControls.Item>
  <SegmentedControls.Item value='card'>카드</SegmentedControls.Item>
</SegmentedControls.Root>;
```

```css
[data-state="checked"] {
  font-weight: 600;
}
```
