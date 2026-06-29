---
"@jects/jds": minor
---

**Menu**: 계층형(아코디언) `Menu.Tree` 추가 및 MenuItem 표현 옵션 확장.

**추가**

- `Menu.Tree` (`MenuTreeProps`): chevron 또는 `→`/`←`로 펼침·접힘, 비제어(`defaultOpen`)·제어(`open`+`onOpenChange`) 지원, `withTreeButton={false}`로 말단 항목 표현
- `MenuItem` selected 상태 시각화(`isSelected`), `stretched`·`fullWidthText` 옵션
- `MenuItem.Anchor` 후행 배지(`suffixBadge`, `suffixBadgeVisible`, `suffixBadgeMuted`)
- `Menu.Button`/`Menu.Anchor`에 항목 레벨 `onSelect`·`textValue` 노출

**소비자 영향 (코드 수정 필요)**

| 항목        | AS-IS                            | TO-BE                                       |
| ----------- | -------------------------------- | ------------------------------------------- |
| `menuStyle` | `"empty"`                        | `"hollow"`                                   |
| 타입 export | `MenuTrigger`                    | `MenuTriggerProps`                           |
| 톤 옵션     | `isDestructive` / `MenuItemTone` | 제거                                         |
| 항목 마크업 | `Menu.GroupItem`으로 감싸기      | 제거 — `Menu.Button`/`Menu.Anchor`를 `Menu.Group` 직속에 배치 |

```diff
  <Menu.Group>
-   <Menu.GroupItem>
-     <Menu.Button>메뉴 레이블</Menu.Button>
-   </Menu.GroupItem>
+   <Menu.Button>메뉴 레이블</Menu.Button>
  </Menu.Group>
```
