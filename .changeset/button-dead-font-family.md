---
"@jects/jds": patch
---

**Button (BlockButton / LabelButton)**

두 버튼이 선언하던 `font-family: inherit`을 제거합니다. 타이포 유틸이 지정하는 `font-family`에 밀려 적용되지 않던 선언이라 렌더 결과는 같습니다. 소비처가 고칠 것은 없습니다.
