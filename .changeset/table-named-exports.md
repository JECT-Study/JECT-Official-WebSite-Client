---
"@jects/jds": patch
---

**Table**

`TableRoot` 등 기존 파트의 개별 export를 추가합니다. 서버 컴포넌트에서 직렬화 가능한 props로 개별 파트를 조합할 수 있습니다. 기존 점 표기 API를 사용하는 코드는 수정할 필요가 없습니다.

**추가**

| 추가 API                 | 대상                                      |
| ------------------------ | ----------------------------------------- |
| `TableRoot`              | `Table.Root`의 별칭                       |
| `TableHeader`            | `Table.Header`의 별칭                     |
| `TableHeaderItem`        | `Table.HeaderItem`의 별칭                 |
| `TableBody`              | `Table.Body`의 별칭                       |
| `TableRow`               | `Table.Row`의 별칭                        |
| `TableRowItem`           | `Table.RowItem`의 별칭                    |
| `TableColorChip`         | `Table.ColorChip`의 별칭                  |
| `TableProps`             | `TableRoot`의 props 타입                  |
| `TableRootProps`         | `TableRoot`의 props 타입                  |
| `TableHeaderProps`       | `TableHeader`의 props 타입                |
| `TableHeaderItemProps`   | `TableHeaderItem`의 props 타입            |
| `TableBodyProps`         | `TableBody`의 props 타입                  |
| `TableRowProps`          | `TableRow`의 props 타입                   |
| `TableRowItemProps`      | `TableRowItem`의 props 타입               |
| `TableRowItemVariant`    | `TableRowItem`의 variant 타입             |
| `TableRowItemLabelProps` | label variant의 `TableRowItem` props 타입 |
| `TableRowItemCodeProps`  | code variant의 `TableRowItem` props 타입  |
| `TableRowItemBadgeProps` | badge variant의 `TableRowItem` props 타입 |
| `TableColorChipProps`    | `TableColorChip`의 props 타입             |
