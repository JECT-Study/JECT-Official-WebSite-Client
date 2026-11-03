---
"@jects/jds": minor
---

**MultiSelectField**

`MultiSelectField.Input`의 `suffix`를 제거하고 단축키를 표시하는 `kbd`를 추가합니다. `suffix`를 넘기던 코드는 타입 에러가 발생합니다. 단축키는 `kbd`에 키 문자열 배열로 넘겨야 합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS    | TO-BE                                                        |
| -------- | ------------------------------------------------------------ |
| `suffix` | `kbd` — 키 문자열 배열, 최대 4개, 단축키 외 요소는 표시 불가 |

```diff
- <MultiSelectField.Input options={options} suffix={<Kbd size='sm'>⌘</Kbd>} />
+ <MultiSelectField.Input options={options} kbd={["⌘", "K"]} />
```

배열을 변수에 담아 넘기면 `string[]`로 추론되므로 `as const`를 붙이거나 `MultiSelectFieldKbdKeys` 타입을 지정해야 합니다.

**추가**

- `MultiSelectFieldKbdKeys` — 1개부터 4개까지의 키 문자열 튜플 타입

**동작 변경 (코드 수정 불필요)**

- 단축키 — `sm` 크기 `Kbd`로 표시, 키 사이 간격 2px, disabled에서 흐리게 표시
- 단축키 위치 — 칩이 여러 줄이어도 박스 오른쪽 세로 중앙에 고정
- 단축키를 눌렀을 때 — 박스를 누른 것과 같이 목록 열기, 닫기
- 칩과 입력칸 — `div` 요소로 감싸서 렌더링, 단축키 왼쪽 영역 안에서 줄바꿈, `FieldContent`의 직계 자식으로 가정한 스타일은 확인 필요
