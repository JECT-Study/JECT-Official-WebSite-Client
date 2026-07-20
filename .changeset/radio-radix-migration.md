---
"@jects/jds": minor
---

**Radio**

Radio가 radix `RadioGroup` 기반으로 재작성되고, 외부 API가 조립된 props 형태의 `RadioGroup`으로 변경됩니다. 배치가 고정이므로 compound(`Radio.Root` / `Radio.Item` / `Radio.Indicator` / `Radio.Label` / `Radio.Helper`)는 더 이상 공개하지 않고, 선택지는 `options`로 전달합니다.

| AS-IS                          | TO-BE                        |
| ------------------------------ | ---------------------------- |
| `Radio.Root` + `Radio.Item` 등 | `RadioGroup` (options)       |
| `Radio.Basic`                  | `options[].value`            |
| `Radio.Label` / `Radio.Helper` | `options[].label` / `helper` |

- 그룹에 속하지 않고 단독으로 사용하는 라디오는 더 이상 지원하지 않습니다. 라디오는 `RadioGroup`으로만 사용합니다.
- 레이아웃은 소비자가 감싸는 컨테이너에서 정합니다. `RadioGroup`은 상태와 접근성만 담당합니다.
- 라디오 컨트롤이 `<input type="radio">`에서 `<button role="radio">`로 변경되었습니다. 라디오 DOM을 직접 조회하거나 폼 값에 의존하던 코드가 있다면 확인이 필요합니다.

**AS-IS**

```tsx
<Radio.Root value={value} onChange={setValue}>
  <Radio.Item>
    <Radio.Basic value='a' />
    <Radio.Label>레이블</Radio.Label>
  </Radio.Item>
  <Radio.Item>
    <Radio.Basic value='b' />
    <Radio.Label>레이블</Radio.Label>
  </Radio.Item>
</Radio.Root>
```

**TO-BE**

```tsx
<RadioGroup
  value={value}
  onChange={setValue}
  options={[
    { value: "a", label: "레이블" },
    { value: "b", label: "레이블" },
  ]}
/>
```
