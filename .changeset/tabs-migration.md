---
"@jects/jds": minor
---

**Tabs**

기존 `Tab` 컴포넌트를 제거하고 `Tabs`로 대체합니다. `Tab`과 관련 타입 export를 더 이상 사용할 수 없으므로 이름을 교체해야 합니다.

**소비처 영향 (코드 수정 필요)**

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
