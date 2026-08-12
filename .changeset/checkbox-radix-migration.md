---
"@jects/jds": minor
---

**Checkbox**

Checkbox를 radix Checkbox 기반으로 재작성하고 외부 API를 조립된 props 형태로 변경합니다. compound(`Checkbox.Root` / `Checkbox.Item` / `Checkbox.Control` / `Checkbox.Label` / `Checkbox.Helper`)는 더 이상 공개하지 않으며, 단독 체크박스는 `Checkbox`, 다중 선택은 `CheckboxGroup`으로 나뉩니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                | TO-BE                                       |
| ------------------------------------ | ------------------------------------------- |
| `Checkbox.Item` + `Checkbox.Basic`   | `Checkbox` (단독, `label` / `helper` props) |
| `Checkbox.Root` + `Checkbox.Item` 등 | `CheckboxGroup` (`options`)                 |
| `Checkbox.Label` / `Checkbox.Helper` | `label` / `helper` props                    |

레이아웃은 소비처가 감싸는 컨테이너에서 정합니다. `CheckboxGroup`은 상태와 접근성만 담당합니다.

```diff
- <Checkbox.Item>
-   <Checkbox.Basic checked={checked} onCheckedChange={setChecked} />
-   <Checkbox.Label>레이블</Checkbox.Label>
- </Checkbox.Item>
+ <Checkbox checked={checked} onCheckedChange={setChecked} label='레이블' />
```

```diff
- <Checkbox.Root value={value} onChange={setValue}>
-   <Checkbox.Item>
-     <Checkbox.Basic value='a' />
-     <Checkbox.Label>레이블</Checkbox.Label>
-   </Checkbox.Item>
- </Checkbox.Root>
+ <CheckboxGroup value={value} onChange={setValue} options={[{ value: 'a', label: '레이블' }]} />
```

**동작 변경 (코드 수정 불필요)**

- 체크박스 컨트롤이 `<input type="checkbox">`에서 `<button role="checkbox">`로 변경됩니다. 체크박스 DOM을 직접 조회하거나 폼 값에 의존하던 코드는 확인이 필요합니다.
