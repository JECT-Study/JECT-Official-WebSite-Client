---
"@jects/jds": minor
---

**Textarea**

`status`에서 `"success"` 값을 제거합니다. `status='success'`를 넘기던 코드는 타입 에러가 발생합니다. `status`를 생략하거나 `'default'`로 바꿔야 합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS              | TO-BE                          |
| ------------------ | ------------------------------ |
| `status='success'` | 제거 — 디자인 스펙에 없는 상태 |

```diff
- <Textarea status='success'>
+ <Textarea>
```
