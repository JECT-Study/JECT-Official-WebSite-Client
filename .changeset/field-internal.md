---
"@jects/jds": patch
---

**Field (internal)**

필드 계열 컴포넌트를 조립하기 위한 내부 컴포넌트 `Field`를 추가합니다. 아래 동작은 `Field`를 기반으로 하는 `TextField`, `Textarea`, `SelectField`, `MultiSelectField`, `SuggestionField`에 공통으로 적용됩니다.

레이블과 컨트롤, 헬퍼 텍스트를 조합해 구성합니다. 루트에서 `status`(`default`/`success`/`error`)와 `disabled`, `readonly`, `required` 상태를 관리합니다. 헬퍼 텍스트와 카운터를 한 줄에 놓아야 하면 `Footer`로 감쌉니다. 루트는 native `div` props와 `ref` 전달을 지원합니다.

`disabled`, `readOnly`, `required`는 컨트롤에 직접 지정할 수 있습니다. 컨트롤에 지정한 값이 루트를 덮어씁니다. 상태는 필드 박스의 테두리와 배경, 인터랙션에 반영됩니다. `disabled`는 레이블과 헬퍼 텍스트 색상까지 바꿉니다. `readonly` 상태는 컨트롤에 `data-readonly`로 노출합니다. `required`는 native `required` 대신 `aria-required`로 노출하므로 브라우저 기본 검증은 동작하지 않습니다.

`id`는 루트에서 관리합니다. `<TextField id="email">`처럼 전달하면 컨트롤의 `id`와 레이블의 `htmlFor`, 헬퍼 텍스트의 `id`가 자동으로 연결됩니다. 생략하면 `useId`로 생성합니다.

접근 이름은 레이블이 렌더되면 그 id를 참조합니다. 레이블 없이 쓰면 컨트롤에 전달한 `aria-labelledby`나 `aria-label`을 사용합니다. `status`가 `error`면 컨트롤에 `aria-invalid`를 적용하고, 그 외에는 전달한 값을 그대로 씁니다. `aria-describedby`는 헬퍼 텍스트와 카운터가 렌더될 때 그 id를 연결합니다. 전달한 값이 있으면 함께 병합합니다.

필드 박스의 테두리 안쪽 패딩을 클릭하면 컨트롤로 포커스가 이동합니다.
