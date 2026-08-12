---
"@jects/jds": minor
---

**Radio**

Radio를 radix `RadioGroup` 기반으로 재작성하고 외부 API를 조립된 props 형태의 `RadioGroup`으로 변경합니다. compound(`Radio.Root` / `Radio.Item` / `Radio.Indicator` / `Radio.Label` / `Radio.Helper`)는 더 이상 공개하지 않고 선택지를 `options`로 전달합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                          | TO-BE                          |
| ------------------------------ | ------------------------------ |
| `Radio.Root` + `Radio.Item` 등 | `RadioGroup` (`options`)       |
| `Radio.Basic`                  | `options[].value`              |
| `Radio.Label` / `Radio.Helper` | `options[].label` / `helper`   |
| 그룹에 속하지 않는 단독 라디오 | 제거 — `RadioGroup`으로만 사용 |

레이아웃은 소비처가 감싸는 컨테이너에서 정합니다. `RadioGroup`은 상태와 접근성만 담당합니다.

```diff
- <Radio.Root value={value} onChange={setValue}>
-   <Radio.Item>
-     <Radio.Basic value='a' />
-     <Radio.Label>레이블</Radio.Label>
-   </Radio.Item>
-   <Radio.Item>
-     <Radio.Basic value='b' />
-     <Radio.Label>레이블</Radio.Label>
-   </Radio.Item>
- </Radio.Root>
+ <RadioGroup
+   value={value}
+   onChange={setValue}
+   options={[
+     { value: "a", label: "레이블" },
+     { value: "b", label: "레이블" },
+   ]}
+ />
```

**동작 변경 (코드 수정 불필요)**

- 라디오 컨트롤이 `<input type="radio">`에서 `<button role="radio">`로 변경됩니다. 라디오 DOM을 직접 조회하거나 폼 값에 의존하던 코드는 확인이 필요합니다.
