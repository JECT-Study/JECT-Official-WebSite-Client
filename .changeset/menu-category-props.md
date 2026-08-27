---
"@jects/jds": minor
---

**Menu (Menu.Category)**

`Menu.Category`에서 `textAlign`, `cursor`, `htmlFor`를 제거합니다. 세 prop을 쓰던 코드는 해당 속성을 지워야 합니다. 기본값을 쓰던 코드는 렌더 결과가 같습니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS       | TO-BE                  |
| ----------- | ---------------------- |
| `textAlign` | 제거, 왼쪽 정렬로 고정 |
| `cursor`    | 제거, `default`로 고정 |
| `htmlFor`   | 제거, 대체 없음        |

```diff
- <Menu.Category as='label' htmlFor='email' textAlign='center' cursor='pointer'>
+ <Menu.Category as='label'>
    카테고리
  </Menu.Category>
```
