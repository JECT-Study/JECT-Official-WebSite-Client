---
"@jects/jds": minor
---

**Kbd**

`type` prop과 `KbdType` 타입을 제거합니다. 모든 키를 같은 텍스트 스타일과 크기 규칙으로 표시합니다. `type`을 넘기던 코드는 타입 에러가 발생하므로 `type`을 지워야 합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                          | TO-BE                               |
| ---------------------------------------------- | ----------------------------------- |
| `type='key'`, `type='text'`, `type='function'` | 제거 — 모든 키를 같은 스타일로 표시 |
| `KbdType`                                      | 제거                                |

```diff
- <Kbd type='function' size='sm'>⌘</Kbd>
+ <Kbd size='sm'>⌘</Kbd>
```

**동작 변경 (코드 수정 불필요)**

- 텍스트 스타일 — `type='function'`에 쓰던 label 대신 모든 키에 syntax 적용
- 글꼴 — `ui-monospace`, syntax 글꼴(D2Coding), `monospace` 순서로 변경, `ui-monospace`를 지원하는 브라우저에서는 운영체제의 고정폭 글꼴로 표시되어 키 기호 모양이 운영체제마다 다를 수 있음
- 최소 너비 — 높이와 같은 값으로 변경, `lg` 20px에서 26px, `md` 19px에서 24px, `sm` 19px에서 22px
- 기존 `type='function'` 키의 너비 — 높이와 같은 값 고정에서 내용에 따라 늘어나는 방식으로 변경, 좌우 여백 4px에서 6px
