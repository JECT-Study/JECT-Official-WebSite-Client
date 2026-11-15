---
"@jects/jds": minor
---

**Textarea**

`Textarea.Label`의 `prefix`, `suffix`를 제거하고 도움말 툴팁 문구를 받는 `tooltip`을 추가합니다. `prefix`, `suffix`를 넘기던 코드는 타입 에러가 발생합니다. 레이블 도움말은 `tooltip`에 문구만 넘겨야 합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                       | TO-BE                                                                                  |
| --------------------------- | -------------------------------------------------------------------------------------- |
| `Textarea.Label`의 `prefix` | 제거 — 레이블 앞 부가 요소는 표시 불가                                                 |
| `Textarea.Label`의 `suffix` | `tooltip` — 툴팁 문구 문자열, 도움말 아이콘은 컴포넌트가 렌더링, 다른 요소는 표시 불가 |

```diff
- <Textarea.Label suffix={<Icon name='info' size='2xs' />}>레이블</Textarea.Label>
+ <Textarea.Label tooltip='도움말 문구'>레이블</Textarea.Label>
```

**추가**

- `Textarea.Label`의 `tooltip` — 레이블 뒤 도움말 아이콘에 표시하는 툴팁 문구

도움말 아이콘은 hover와 키보드 포커스로 툴팁을 엽니다. 필드가 disabled이면 아이콘을 흐리게 표시합니다. disabled에서는 툴팁을 열지 않습니다.
