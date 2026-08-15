---
"@jects/jds": minor
---

**reset**

`textarea:not([rows]) { min-height: 10em }` 전역 규칙을 제거합니다. `rows` 없이 쓰던 모든 `<textarea>`의 최소 높이가 사라지므로 `rows`를 지정하거나 `min-height`를 직접 지정해야 합니다.

JDS reset을 적용한 앱의 raw `<textarea>` 전부가 대상이라 영향 범위가 `Textarea` 소비처보다 넓습니다. `Textarea`는 자체 스타일로 최소 높이를 잡으므로 영향받지 않습니다.
