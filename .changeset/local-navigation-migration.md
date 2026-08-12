---
"@jects/jds": minor
---

**LocalNavigation**

LocalNavigation을 vanilla-extract 기반으로 재작성하고 API를 단일 컴포넌트 props로 통합합니다. 기존 compound와 관련 public 타입을 제거했으므로 호출부 수정이 필요합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                                | TO-BE                      |
| ---------------------------------------------------- | -------------------------- |
| `LocalNavigation.Root` + 자식 조립                   | 단일 `<LocalNavigation />` |
| `LocalNavigation.Title` (`as`)                       | `title` + `titleAs`        |
| `LocalNavigation.BackButton`의 `onClick`             | `nested` + `onBackClick`   |
| `LocalNavigation.ButtonGroup` (`extraButtonVisible`) | `suffixAction`             |
| `isStretched`                                        | `stretched`                |

`nested`가 `true`면 좌측에 뒤로 가기 버튼이 노출되고 `onBackClick`으로 클릭 핸들러를 연결합니다. `false`(기본값)면 버튼을 렌더링하지 않습니다. `floated`와 `stretched`는 모두 생략 가능하고 기본값은 `false`이며, `floated`가 `true`면 `stretched`는 `false`만 허용합니다. 타이틀 요소는 기본적으로 `span`으로 렌더링되고 `titleAs`로 `h1`~`h6`을 지정할 수 있습니다.

```diff
- <LocalNavigation.Root isStretched>
-   <LocalNavigation.BackButton onClick={handleBack} />
-   <LocalNavigation.Title>지원 안내</LocalNavigation.Title>
-   <LocalNavigation.ButtonGroup extraButtonVisible>
-     <IconButton icon='blank' />
-   </LocalNavigation.ButtonGroup>
- </LocalNavigation.Root>
+ <LocalNavigation
+   title='지원 안내'
+   nested
+   stretched
+   onBackClick={handleBack}
+   suffixAction={<IconButton icon='blank' />}
+ />
```

**동작 변경 (코드 수정 불필요)**

- 뒤로 가기 아이콘 크기가 `xl`로 고정됩니다.
