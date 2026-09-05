---
"@jects/jds": minor
---

**타입 선언**

공개 타입의 선언 형태를 정리합니다. export하는 이름과 import 경로, 렌더 결과는 그대로입니다.

단일 객체로 선언하던 타입 별칭이 `interface`가 되었습니다. 유니온이 섞인 타입은 별칭으로 남습니다.

`interface`는 암묵적 인덱스 시그니처를 지원하지 않아 `Record<string, unknown>`처럼 인덱스 시그니처를 요구하는 곳에 그대로 전달할 수 없습니다. 해당 값은 스프레드로 새 객체를 만들어 전달해야 합니다.

```diff
  declare const option: CheckboxOption;

- const payload: Record<string, unknown> = option;
+ const payload: Record<string, unknown> = { ...option };
```
