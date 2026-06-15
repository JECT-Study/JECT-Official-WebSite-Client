---
"@jects/jds": minor
---

**Checkbox Migration**

Checkbox가 vanilla-extract 기반으로 재작성되면서 API를 Compound Component 패턴으로 재설계했습니다. 단일 컴포넌트(`Checkbox.Basic` / `Checkbox.Content`)에서 복합 컴포넌트 구조로 바뀌고, 일부 prop의 이름·값과 public 타입이 변경/제거됩니다.

| AS-IS | TO-BE |
| --- | --- |
| `Checkbox.Basic`, `Checkbox.Content` | `Checkbox.Root`, `Checkbox.Item`, `Checkbox.Basic`, `Checkbox.Label`, `Checkbox.Helper` |
| `Checkbox.Content`의 `label` / `subLabel` props 프리셋 | `Checkbox.Item` + `Basic` + `Label` + `Helper` 조합 |
| `subLabel` | `Checkbox.Helper` |
| `variant = "empty" \| "outlined"` | `variant = "hollow" \| "outlined"` |
| `align = "left" \| "right"` | 제거 |
| `CheckboxBasicProps`, `CheckboxBoxProps`, `CheckboxContentProps` | `CheckboxRootProps`, `CheckboxItemProps`, `CheckboxBasicProps`, `CheckboxLabelProps`, `CheckboxHelperProps` |
| `CheckboxAlign` | 제거 |

`Checkbox.Root`가 추가되었습니다. 여러 Checkbox를 그룹으로 관리하기 위한 컨테이너 컴포넌트이며, 선택된 항목은 `string[]` 형태로 관리됩니다.

그룹 내에서 사용하는 `Checkbox.Basic`에는 항목을 식별하기 위한 `value` prop이 필수입니다. `value`가 누락되면 런타임 에러가 발생합니다. 단독으로 사용하는 경우에는 `value` 없이 `checked` 또는 `defaultChecked`로 상태를 제어할 수 있습니다.

또한 `defaultChecked`를 통한 비제어 방식을 지원합니다. 기존의 제어 방식(`checked`)도 계속 사용할 수 있습니다.

`indeterminate` 상태는 제어 모드(`checked="indeterminate"`)에서만 지원됩니다. `defaultChecked`는 `boolean` 값만 허용하므로 `indeterminate` 상태의 초기값으로 사용할 수 없습니다.

이제 `invalid` 스타일은 unchecked 상태에서만 적용됩니다. checked 또는 indeterminate 상태에서는 invalid 스타일이 적용되지 않습니다.

**AS-IS**

```tsx
import { Checkbox } from "@jects/jds";
import type { CheckedState } from "@jects/jds";

// 단일
<Checkbox.Basic size='md' checked={checked} onCheckedChange={setChecked} />;

// 라벨 프리셋
<Checkbox.Content
  size='md'
  variant='empty'
  align='left'
  label='레이블'
  subLabel='헬퍼 텍스트'
  checked={checked}
  onCheckedChange={setChecked}
/>;
```

**TO-BE**

```tsx
import { Checkbox } from "@jects/jds";
import type { CheckedState } from "@jects/jds";

// 단일
<Checkbox.Item size='md' variant='hollow'>
  <Checkbox.Basic checked={checked} onCheckedChange={setChecked} />
  <Checkbox.Label>레이블</Checkbox.Label>
  <Checkbox.Helper>헬퍼 텍스트</Checkbox.Helper>
</Checkbox.Item>;

// 그룹
<Checkbox.Root value={selected} onChange={setSelected} variant='outlined'>
  <Checkbox.Item>
    <Checkbox.Basic value='1' />
    <Checkbox.Label>옵션 1</Checkbox.Label>
  </Checkbox.Item>
  <Checkbox.Item>
    <Checkbox.Basic value='2' />
    <Checkbox.Label>옵션 2</Checkbox.Label>
  </Checkbox.Item>
</Checkbox.Root>;
```
