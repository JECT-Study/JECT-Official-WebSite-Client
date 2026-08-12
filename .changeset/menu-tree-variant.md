---
"@jects/jds": minor
---

**Menu**

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

- `Menu.Tree` (`MenuTreeProps`) — chevron 또는 `→`, `←`로 펼치고 접습니다. 비제어(`defaultOpen`)와 제어(`open` + `onOpenChange`)를 모두 지원하고 `withTreeButton={false}`로 말단 항목을 표현합니다
- `MenuItem`의 `isSelected`로 selected 상태를 시각화하고, `stretched`와 `fullWidthText` 옵션을 지정할 수 있습니다
- `MenuItem.Anchor`의 후행 배지 — `suffixBadge`, `suffixBadgeVisible`, `suffixBadgeMuted`
- `Menu.Button`, `Menu.Anchor`에 항목 레벨 `onSelect`와 `textValue` 노출
