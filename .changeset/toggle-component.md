---
"@jects/jds": minor
---

**Toggle**

켜짐과 꺼짐 상태를 전환하는 `Toggle` 컴포넌트를 추가합니다. `checked`와 `onChange`를 사용하는 제어 방식과 `defaultChecked`를 사용하는 비제어 방식을 모두 지원합니다.

`disabled`, `name`, `onClick`, `aria-*` 등 native input props를 전달할 수 있으며, ref는 내부 checkbox input을 가리킵니다. `className`과 `style`은 Toggle의 시각적 루트에 적용됩니다.

Toggle에는 화면에 표시되는 라벨이 포함되지 않으므로, 소비처에서 `aria-label` 또는 `aria-labelledby`를 전달해야 합니다. native checkbox 동작을 따르며 Space 키로 상태를 전환할 수 있습니다.

checkbox에서 동작하지 않는 `readOnly` prop과 컴포넌트가 고정하는 `children`, `role`, `type` prop은 지원하지 않습니다.

```tsx
import { type ChangeEvent, useState } from "react";

const [isChecked, setIsChecked] = useState(false);

const handleToggleChange = (event: ChangeEvent<HTMLInputElement>) => {
  setIsChecked(event.target.checked);
};

<Toggle checked={isChecked} onChange={handleToggleChange} aria-label='알림 받기' />;

<Toggle defaultChecked aria-label='자동 저장' />;
```
