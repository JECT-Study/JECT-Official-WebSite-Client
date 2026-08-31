---
"@jects/jds": minor
---

**IconButton**

`aria-label`과 `aria-labelledby`를 함께 지정할 수 없도록 타입을 좁힙니다. 둘 다 넘기던 호출부는 하나를 지워야 합니다. 둘 중 어느 것도 지정하지 않는 것은 그대로 허용됩니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                      | TO-BE             |
| ------------------------------------------ | ----------------- |
| `aria-label`과 `aria-labelledby` 동시 지정 | 둘 중 하나만 지정 |

```diff
- <IconButton icon='x' aria-label='삭제' aria-labelledby='delete-label' />
+ <IconButton icon='x' aria-labelledby='delete-label' />
```
