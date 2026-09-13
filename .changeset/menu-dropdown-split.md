---
"@jects/jds": minor
---

**Menu (Menu / DropdownMenu)**

여닫는 동작이 있는 메뉴와 펼쳐둔 메뉴를 `DropdownMenu`와 `Menu`로 나눕니다. 기존 `Menu`는 드롭다운 형태이므로 `DropdownMenu`로 이름이 바뀌고, `Menu`는 트리거 없이 펼쳐둔 목록이 됩니다. `MenuItem`이 제거되고 `Menu.Button`과 `Menu.Anchor`로 대체됩니다.

두 컴포넌트는 렌더 결과가 다릅니다. `DropdownMenu`는 `role="menu"`와 `role="menuitem"`을 붙이고 화살표 이동, typeahead, Escape 닫기를 제공합니다. `Menu`는 `ul role="list"` 안에 링크와 버튼을 렌더하며 탭으로 이동합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                 | TO-BE                                    |
| --------------------- | ---------------------------------------- |
| `Menu.Root`           | `DropdownMenu.Root`                      |
| `Menu.Trigger`        | `DropdownMenu.Trigger`                   |
| `Menu.Content`        | `DropdownMenu.Content`                   |
| `Menu.Category`       | `DropdownMenu.Category`                  |
| `Menu.Group`          | `DropdownMenu.Group`                     |
| `Menu.Button`         | `DropdownMenu.Button`                    |
| `Menu.Anchor`         | `DropdownMenu.Anchor`                    |
| `Menu.Tree`           | `DropdownMenu.Tree`                      |
| `MenuRootProps`       | `DropdownMenuRootProps`                  |
| `MenuTriggerProps`    | `DropdownMenuTriggerProps`               |
| `MenuContentProps`    | `DropdownMenuContentProps`               |
| `MenuButtonProps`     | `DropdownMenuButtonProps`                |
| `MenuAnchorProps`     | `DropdownMenuAnchorProps`                |
| `MenuTreeProps`       | `DropdownMenuTreeProps`                  |
| `MenuItem.Button`     | `Menu.Button`                            |
| `MenuItem.Anchor`     | `Menu.Anchor`                            |
| `MenuItemButtonProps` | `MenuButtonProps`                        |
| `MenuItemAnchorProps` | `MenuAnchorProps`                        |
| `MenuItemSize`        | `MenuSize`                               |
| `MenuItemVariant`     | `MenuButtonVariant`, `MenuAnchorVariant` |
| `MenuItemProps`       | 제거 — `DropdownMenu.Item`의 prop 별칭   |

`MenuStyle`, `MenuSize`, `MenuCategoryProps`, `MenuGroupProps`는 이름이 그대로입니다.

기존 드롭다운 메뉴를 사용하던 곳은 이름만 바꾸면 됩니다.

```diff
-<Menu.Root size='md'>
-  <Menu.Trigger asChild>
+<DropdownMenu.Root size='md'>
+  <DropdownMenu.Trigger asChild>
     <IconButton icon='menu' aria-label='메뉴' />
-  </Menu.Trigger>
-  <Menu.Content align='start'>
-    <Menu.Group>
-      <Menu.Anchor href='#'>메뉴 레이블</Menu.Anchor>
-    </Menu.Group>
-  </Menu.Content>
-</Menu.Root>
+  </DropdownMenu.Trigger>
+  <DropdownMenu.Content align='start'>
+    <DropdownMenu.Group>
+      <DropdownMenu.Anchor href='#'>메뉴 레이블</DropdownMenu.Anchor>
+    </DropdownMenu.Group>
+  </DropdownMenu.Content>
+</DropdownMenu.Root>
```

`MenuItem`을 직접 배치하던 곳은 `Menu`로 감쌉니다. `size`는 항목마다 지정하지 않고 `Menu.Root`에 한 번 지정하며, `Menu.Button`과 `Menu.Anchor`는 `li`를 포함하므로 `Menu.Group` 안에 둡니다.

```diff
-<MenuItem.Anchor href='#' size='sm'>
-  메뉴 레이블
-</MenuItem.Anchor>
+<Menu.Root size='sm'>
+  <Menu.Content>
+    <Menu.Group>
+      <Menu.Anchor href='#'>메뉴 레이블</Menu.Anchor>
+    </Menu.Group>
+  </Menu.Content>
+</Menu.Root>
```

**추가**

- `Menu` — 트리거 없이 펼쳐둔 메뉴, `Root`, `Content`, `Category`, `Group`, `Button`, `Anchor`로 구성
