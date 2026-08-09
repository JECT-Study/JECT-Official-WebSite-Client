---
"@jects/jds": patch
---

**focusRing / overlay**

`interaction: "delegated"`가 상태를 읽는 `[data-interaction-target]`의 범위를 후손 전체에서 직계 자식으로 좁힙니다. `delegated`를 쓰는 요소는 `[data-interaction-target]`을 직계 자식에 둬야 합니다. JDS 컴포넌트는 모두 이 조건을 만족합니다.

**동작 변경 (코드 수정 불필요)**

- `delegated`를 쓰는 요소 안에 `[data-interaction-target]`을 가진 컴포넌트(File, Chip)를 중첩하면, 바깥 요소의 focus ring과 press 오버레이가 더 이상 함께 그려지지 않습니다. Dialog의 `body`에 File이나 Chip을 넣은 경우가 여기 해당합니다.
