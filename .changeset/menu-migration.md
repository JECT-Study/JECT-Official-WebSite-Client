---
"@jects/jds": patch
---

**Menu (Menu / MenuItem / MegaMenu)**

세 컴포넌트의 스타일링을 Emotion에서 vanilla-extract로 마이그레이션합니다. 소비처에서 고칠 코드는 없습니다.

**동작 변경 (코드 수정 불필요)**

- `MegaMenu.Section`의 잘못된 `displayName`을 수정합니다.
- `useMenuContext`를 Menu 밖에서 호출했을 때의 에러 메시지를 개선합니다.
