---
"@jects/jds": minor
---

**Radio**

Radio를 radix RadioGroup 기반으로 재작성하고 API를 조립된 props 형태로 바꿉니다. compound(`Radio.Root`, `Radio.Item`, `Radio.Basic`, `Radio.Label`, `Radio.SubLabel`)를 더 이상 공개하지 않으며, `Radio` export가 사라지고 `RadioGroup`으로 대체됩니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                                                                          | TO-BE                                             |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `Radio` (compound)                                                                             | `RadioGroup`                                      |
| `Radio.Root` + `Radio.Item` + `Radio.Basic` 조합                                               | `RadioGroup`의 `options`                          |
| `Radio.Label` / `Radio.SubLabel`                                                               | `options[].label` / `options[].helper`            |
| `radioSize`                                                                                    | `size`                                            |
| `radioStyle = "empty" \| "outline"`                                                            | `variant = "hollow" \| "outlined"`                |
| `radioAlign`                                                                                   | 제거 — 대체재 없음                                |
| `RadioRootProps`, `RadioItemProps`, `RadioBasicProps`, `RadioLabelProps`, `RadioSubLabelProps` | `RadioGroupProps`, `RadioOption`                  |
| `RadioStyle`, `RadioAlign`                                                                     | `RadioVariant`, `RadioAlign`은 제거 — 대체재 없음 |
| 컨트롤 엘리먼트 `<input type="radio">`                                                         | `<button role="radio">`                           |

그룹에 속하지 않는 단독 라디오는 지원하지 않습니다. 라디오는 `RadioGroup`으로만 씁니다. 컨트롤 엘리먼트가 바뀌었으므로 `input[type="radio"]`로 DOM을 조회하거나 스타일링하던 코드는 셀렉터 수정이 필요합니다. 폼 제출값은 `name`을 전달하면 그대로 유지됩니다.

```diff
- <Radio.Root
-   radioSize='md'
-   radioStyle='empty'
-   radioAlign='left'
-   value={selected}
-   onChange={setSelected}
-   name='group'
- >
-   <Radio.Item>
-     <Radio.Basic value='1' />
-     <Radio.Label>옵션 1</Radio.Label>
-     <Radio.SubLabel>헬퍼 텍스트</Radio.SubLabel>
-   </Radio.Item>
-   <Radio.Item>
-     <Radio.Basic value='2' />
-     <Radio.Label>옵션 2</Radio.Label>
-   </Radio.Item>
- </Radio.Root>
+ <RadioGroup
+   size='md'
+   variant='hollow'
+   value={selected}
+   onChange={setSelected}
+   name='group'
+   options={[
+     { value: "1", label: "옵션 1", helper: "헬퍼 텍스트" },
+     { value: "2", label: "옵션 2" },
+   ]}
+ />
```

**추가**

- `layout` — `"vertical"`(기본) 또는 `"grid"`, `grid`는 `columns` 필수
- `stretched` — 아이템이 전체 너비를 채움

**동작 변경 (코드 수정 불필요)**

- `RadioGroup`이 레이아웃을 직접 관리 — 소비처가 감싸 배치하던 컨테이너 불필요
- 레이블과 헬퍼의 `white-space: nowrap` 제거 — 폭이 부족하면 텍스트 개행
- 레이블과 헬퍼 텍스트를 클릭해도 해당 라디오 선택
- disabled 상태의 색상과 커서 등 시각적 표현을 신규 디자인 스펙에 맞게 변경
