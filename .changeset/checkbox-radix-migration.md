---
"@jects/jds": minor
---

**Checkbox**

Checkbox가 radix 기반으로 재작성되면서 컨트롤 컴포넌트의 이름이 바뀝니다. props는 그대로이며, `Checkbox.Basic`을 `Checkbox.Control`로 변경되었습니다.

| AS-IS                | TO-BE                  |
| -------------------- | ---------------------- |
| `Checkbox.Basic`     | `Checkbox.Control`     |
| `CheckboxBasicProps` | `CheckboxControlProps` |

체크박스 컨트롤이 `<input type="checkbox">`에서 `<button role="checkbox">`로 변경되었습니다. 체크박스 DOM을 직접 조회하거나 폼 값에 의존하던 코드가 있다면 확인이 필요합니다.

**AS-IS**

```tsx
<Checkbox.Item>
  <Checkbox.Basic value='a' />
  <Checkbox.Label>레이블</Checkbox.Label>
</Checkbox.Item>
```

**TO-BE**

```tsx
<Checkbox.Item>
  <Checkbox.Control value='a' />
  <Checkbox.Label>레이블</Checkbox.Label>
</Checkbox.Item>
```
