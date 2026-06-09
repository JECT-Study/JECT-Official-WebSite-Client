---
"@jects/jds": minor
---

**Tabs**

기존 Tab 컴포넌트를 삭제하고 Tabs 컴포넌트로 대체합니다. 기존 Tab 컴포넌트와 관련 타입 export를 더 이상 @jects/jds에서 사용할 수 없으므로 breaking change입니다.

| AS-IS             | TO-BE              |
| ----------------- | ------------------ |
| `Tab`             | `Tabs`             |
| `Tab.Root`        | `Tabs.Root`        |
| `Tab.List`        | `Tabs.List`        |
| `Tab.Trigger`     | `Tabs.Trigger`     |
| `Tab.Content`     | `Tabs.Content`     |
| `TabVariant`      | `TabsVariant`      |
| `TabRootProps`    | `TabsRootProps`    |
| `TabListProps`    | `TabsListProps`    |
| `TabTriggerProps` | `TabsTriggerProps` |
| `TabContentProps` | `TabsContentProps` |

**AS-IS**

```tsx
import { Tab } from "@jects/jds";
import type { TabContentProps, TabRootProps, TabTriggerProps } from "@jects/jds";

<Tab.Root defaultValue="tab1">
  <Tab.List>
    <Tab.Trigger value="tab1">First</Tab.Trigger>
    <Tab.Trigger value="tab2">Second</Tab.Trigger>
  </Tab.List>
  <Tab.Content value="tab1">First content</Tab.Content>
  <Tab.Content value="tab2">Second content</Tab.Content>
</Tab.Root>;
```

**TO-BE**

```tsx
import { Tabs } from "@jects/jds";
import type { TabsContentProps, TabsRootProps, TabsTriggerProps } from "@jects/jds";

<Tabs.Root defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">First</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Second</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">First content</Tabs.Content>
  <Tabs.Content value="tab2">Second content</Tabs.Content>
</Tabs.Root>;
```
