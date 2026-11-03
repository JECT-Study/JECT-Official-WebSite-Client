---
"@jects/jds": minor
---

**TextField**

`TextField.Input`의 `suffix`를 제거하고 단축키를 표시하는 `kbd`와 입력한 텍스트를 모두 지우는 버튼을 표시하는 `withClearButton`을 추가합니다. `suffix`를 넘기던 코드는 타입 에러가 발생합니다. 단축키는 `kbd`에 키 문자열 배열로 넘겨야 합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS    | TO-BE                                                        |
| -------- | ------------------------------------------------------------ |
| `suffix` | `kbd` — 키 문자열 배열, 최대 4개, 단축키 외 요소는 표시 불가 |

```diff
- <TextField.Input suffix={<Kbd size='sm'>⌘</Kbd>} />
+ <TextField.Input kbd={["⌘", "K"]} />
```

배열을 변수에 담아 넘기면 `string[]`로 추론되므로 `as const`를 붙이거나 `TextFieldKbdKeys` 타입을 지정해야 합니다.

**추가**

- `withClearButton` — 기본값 `false`, 입력한 텍스트를 모두 지우는 버튼 표시, 값이 없거나 disabled, readonly에서는 표시하지 않음
- `TextFieldKbdKeys` — 1개부터 4개까지의 키 문자열 튜플 타입

지우기 버튼을 누르면 빈 값으로 `onChange`가 호출되고 입력칸으로 포커스가 이동합니다. 단축키가 있으면 단축키 왼쪽에 표시되고, uncontrolled에서는 `form.reset()` 후 초기화된 값 기준으로 표시 여부가 갱신됩니다.

**동작 변경 (코드 수정 불필요)**

- 단축키 — `sm` 크기 `Kbd`로 표시, 키 사이 간격 2px, disabled에서 흐리게 표시
- 단축키를 눌렀을 때 — 입력칸으로 포커스 이동
