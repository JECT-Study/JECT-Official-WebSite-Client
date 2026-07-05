---
"@jects/jds": minor
---

**Radio**

Radio가 radix 기반으로 재작성되면서 API가 바뀌고, 이제 그룹 안에서만 사용할 수 있습니다. 컨트롤 역할이 `Radio.Basic`에서 `Radio.Item`으로 이동하고, 인디케이터는 `Radio.Indicator`로 분리됩니다.

| AS-IS                   | TO-BE                  |
| ----------------------- | ---------------------- |
| `Radio.Basic`           | `Radio.Indicator`      |
| `Radio.Basic`의 `value` | `Radio.Item`의 `value` |
| `RadioBasicProps`       | `RadioIndicatorProps`  |

`Radio`는 반드시 `Radio.Root` 안에서 사용해야 합니다. 그룹에 속하지 않은 단독 라디오는 더 이상 지원하지 않습니다.

라디오 컨트롤이 `<input type="radio">`에서 `<button role="radio">`로 변경되었습니다. 라디오 DOM을 직접 조회하거나 폼 값에 의존하던 코드가 있다면 확인이 필요합니다.

**AS-IS**

```tsx
<Radio.Root value={value} onChange={setValue}>
  <Radio.Item>
    <Radio.Basic value='a' />
    <Radio.Label>레이블</Radio.Label>
  </Radio.Item>
</Radio.Root>
```

**TO-BE**

```tsx
<Radio.Root value={value} onChange={setValue}>
  <Radio.Item value='a'>
    <Radio.Indicator />
    <Radio.Label>레이블</Radio.Label>
  </Radio.Item>
</Radio.Root>
```
