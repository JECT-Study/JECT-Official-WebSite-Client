---
"@jects/jds": minor
---

**TextField**

`TextField.Input`의 `suffix`를 제거하고 단축키를 표시하는 `kbd`, 지우기 버튼을 표시하는 `withClearButton`, 액션 요소를 배치하는 `action`을 추가합니다. `TextField.Label`의 `prefix`, `suffix`를 제거하고 도움말 툴팁 문구를 받는 `tooltip`을 추가합니다. 제거된 prop을 넘기던 코드는 타입 에러가 발생합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                    | TO-BE                                                                                         |
| ---------------------------------------- | --------------------------------------------------------------------------------------------- |
| `TextField.Input`의 `suffix`             | `kbd` — 키 문자열 배열, 최대 4개, 단축키 외 요소는 표시 불가                                  |
| `TextField.Label`의 `prefix`             | 제거 — 레이블 앞 부가 요소는 표시 불가                                                        |
| `TextField.Label`의 `suffix`             | `tooltip` — 툴팁 문구 문자열, 도움말 아이콘은 컴포넌트가 렌더링, 다른 요소는 표시 불가        |
| `interface`로 `TextFieldInputProps` 확장 | `type` 교차 타입으로 변경 — 유니온 타입이 되어 `interface` 확장 불가                          |
| `Omit<TextFieldInputProps, ...>`         | 분배 `Omit`으로 변경 — `Omit`이 유니온을 하나로 합쳐 `TextField.Input`에 spread하면 타입 에러 |

단축키는 키 문자열 배열로 넘깁니다.

```diff
- <TextField.Input suffix={<Kbd size='sm'>⌘</Kbd>} />
+ <TextField.Input kbd={["⌘", "K"]} />
```

배열을 변수에 담아 넘기면 `string[]`로 추론되므로 `as const`를 붙이거나 `TextFieldKbdKeys` 타입을 지정해야 합니다.

레이블 도움말은 아이콘과 툴팁을 직접 구성하지 않고 문구만 넘깁니다.

```diff
- <TextField.Label suffix={<Icon name='info' size='2xs' />}>레이블</TextField.Label>
+ <TextField.Label tooltip='도움말 문구'>레이블</TextField.Label>
```

`TextFieldInputProps`를 확장할 때는 교차 타입을 씁니다.

```diff
- interface CustomInputProps extends TextFieldInputProps {
-   description?: string;
- }
+ type CustomInputProps = TextFieldInputProps & {
+   description?: string;
+ };
```

`TextFieldInputProps`에서 일부 prop을 뺄 때는 유니온의 각 멤버에 `Omit`을 적용하는 분배 `Omit`을 씁니다.

```diff
- type ProfileInputProps = Omit<TextFieldInputProps, "prefix">;
+ type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
+ type ProfileInputProps = DistributiveOmit<TextFieldInputProps, "prefix">;
```

**추가**

- `withClearButton` — 기본값 `false`, 입력한 텍스트를 모두 지우는 버튼 표시, 값이 없거나 disabled, readonly에서는 표시하지 않음
- `action` — 지우기 버튼 자리에 배치하는 액션 요소(`ReactNode`), `withClearButton`과 함께 사용 불가
- `TextField.Label`의 `tooltip` — 레이블 뒤 도움말 아이콘에 표시하는 툴팁 문구
- `TextFieldKbdKeys` — 1개부터 4개까지의 키 문자열 튜플 타입

지우기 버튼을 누르면 빈 값으로 `onChange`가 호출되고 입력칸으로 포커스가 이동합니다. uncontrolled에서는 `form.reset()` 후 초기화된 값 기준으로 지우기 버튼 표시 여부가 갱신됩니다. 지우기 버튼과 `action`은 단축키 왼쪽에 표시됩니다. `action`의 readonly, disabled 처리는 소비처가 정해야 합니다.

도움말 아이콘은 hover와 키보드 포커스로 툴팁을 엽니다. 필드가 disabled이면 아이콘을 흐리게 표시합니다. disabled에서는 툴팁을 열지 않습니다.

**동작 변경 (코드 수정 불필요)**

- 단축키 — `sm` 크기 `Kbd`로 표시, 키 사이 간격 2px, disabled에서 흐리게 표시
- 단축키를 눌렀을 때 — 입력칸으로 포커스 이동
