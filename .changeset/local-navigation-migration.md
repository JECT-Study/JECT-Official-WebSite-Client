---
"@jects/jds": minor
---

**LocalNavigation**

LocalNavigation이 vanilla-extract 기반으로 재작성되면서 API가 단일 컴포넌트 props로 통합되었습니다. 기존 compound와 관련 public 타입이 제거되었습니다.

| 이전                                                 | 이후                       |
| ---------------------------------------------------- | -------------------------- |
| `LocalNavigation.Root` + 자식 조립                   | 단일 `<LocalNavigation />` |
| `LocalNavigation.Title` (`as`)                       | `title` + `titleAs`        |
| `LocalNavigation.BackButton`의 `onClick`             | `nested` + `onBackClick`   |
| `LocalNavigation.ButtonGroup` (`extraButtonVisible`) | `suffixAction`             |
| `isStretched`                                        | `stretched`                |

`nested`가 `true`이면 좌측에 뒤로 가기 버튼이 노출되며, `onBackClick`으로 클릭 핸들러를 연결합니다. `false`(기본값)이면 버튼이 렌더링되지 않습니다.

`floated`와 `stretched`는 모두 생략 가능하며 기본값은 `false`이고, `floated`가 `true`인 경우 `stretched`는 `false`만 허용됩니다.

타이틀 요소는 기본적으로 `span`으로 렌더링되며, `titleAs`로 `h1`~`h6`을 지정해 문서 heading 아웃라인에 포함시킬 수 있습니다. 뒤로 가기 아이콘 크기는 `xl`로 고정됩니다.

**AS-IS**

```tsx
import { LocalNavigation } from "@jects/jds";

<LocalNavigation.Root isStretched>
  <LocalNavigation.BackButton onClick={handleBack} />
  <LocalNavigation.Title>지원 안내</LocalNavigation.Title>
  <LocalNavigation.ButtonGroup extraButtonVisible>
    <IconButton icon='blank' />
  </LocalNavigation.ButtonGroup>
</LocalNavigation.Root>;
```

**TO-BE**

```tsx
import { LocalNavigation } from "@jects/jds";

<LocalNavigation
  title='지원 안내'
  nested
  stretched
  onBackClick={handleBack}
  suffixAction={<IconButton icon='blank' />}
/>;
```
