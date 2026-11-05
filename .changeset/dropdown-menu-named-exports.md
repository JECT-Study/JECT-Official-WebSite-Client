---
"@jects/jds": patch
---

**DropdownMenu**

`DropdownMenuRoot` 등 기존 파트의 개별 export를 추가합니다. 서버 컴포넌트에서 직렬화 가능한 props로 개별 파트를 조합할 수 있습니다. 기존 점 표기 API를 사용하는 코드는 수정할 필요가 없습니다.

**추가**

| 추가 API                    | 대상                                |
| --------------------------- | ----------------------------------- |
| `DropdownMenuRoot`          | `DropdownMenu.Root`의 별칭          |
| `DropdownMenuContent`       | `DropdownMenu.Content`의 별칭       |
| `DropdownMenuButton`        | `DropdownMenu.Button`의 별칭        |
| `DropdownMenuAnchor`        | `DropdownMenu.Anchor`의 별칭        |
| `DropdownMenuTree`          | `DropdownMenu.Tree`의 별칭          |
| `DropdownMenuCategory`      | `DropdownMenu.Category`의 별칭      |
| `DropdownMenuGroup`         | `DropdownMenu.Group`의 별칭         |
| `DropdownMenuTrigger`       | `DropdownMenu.Trigger`의 별칭       |
| `DropdownMenuCategoryProps` | `DropdownMenuCategory`의 props 타입 |
| `DropdownMenuGroupProps`    | `DropdownMenuGroup`의 props 타입    |
