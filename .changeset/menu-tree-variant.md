---
"@jects/jds": minor
---

**Menu**

계층형(아코디언) 메뉴를 위한 `Menu.Tree` 컴포넌트를 추가하고, MenuItem의 표현 옵션을 확장합니다.

**추가된 기능**

- `Menu.Tree` 컴포넌트 추가 (`MenuTreeProps` export): 같은 패널 안에서 펼쳐지는 아코디언형 항목.
  - `label`로 헤더 행 렌더, chevron 클릭 또는 `→` / `←` 키로 펼침·접힘 (메뉴는 닫히지 않음)
  - 비제어(`defaultOpen`) / 제어(`open` + `onOpenChange`) 모두 지원
  - `withTreeButton={false}`로 chevron 없는 말단 항목 표현, 중첩 깊이에 따라 자동 들여쓰기
- `MenuItem`에 selected 상태 시각화 추가 (`aria-selected` 기반 배경)
- `MenuItem.Button` / `MenuItem.Anchor`에 `stretched`, `fullWidthText` prop 추가
  - `fullWidthText`: 라벨을 남은 공간만큼 확장해 후행 아이콘/배지를 오른쪽 끝으로 정렬
  - `stretched`: 좌우 패딩을 제거해 컨테이너 너비에 꽉 차게 배치
- `MenuItem.Anchor`에 후행 `NumericBadge` 옵션 추가: `suffixBadge`, `suffixBadgeVisible`, `suffixBadgeMuted`
- `Menu.Group`(ul)이 표준 `ul` 속성(`className` 등)을 전달받도록 확장

**소비자 영향 (코드 수정 필요)**

| 항목             | AS-IS                                      | TO-BE              |
| ---------------- | ------------------------------------------ | ------------------ |
| `menuStyle` 값   | `"empty"`                                  | `"hollow"`         |
| 타입 export      | `MenuTrigger`                              | `MenuTriggerProps` |
| MenuItem 톤 옵션 | `isDestructive` prop / `MenuItemTone` 타입 | 제거               |

```diff
- <Menu.Root menuStyle="empty">
+ <Menu.Root menuStyle="hollow">
```

```diff
- import type { MenuTrigger } from "@jects/jds";
+ import type { MenuTriggerProps } from "@jects/jds";
```

```diff
- <Menu.Button isDestructive>삭제</Menu.Button>
+ <Menu.Button>삭제</Menu.Button>
```
