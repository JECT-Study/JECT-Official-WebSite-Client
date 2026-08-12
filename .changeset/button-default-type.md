---
"@jects/jds": minor
---

**Button (BlockButton / LabelButton / IconButton)**

세 버튼의 기본 `type`을 `button`으로 지정합니다. 폼 안에서 이 버튼을 눌러 제출되던 코드가 있다면 `type="submit"`을 명시해야 합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                   | TO-BE                                |
| --------------------------------------- | ------------------------------------ |
| `type` 미지정 시 native 기본값 `submit` | `button`, `type` prop으로 오버라이드 |

```diff
- <BlockButton onClick={handleSubmit}>제출</BlockButton>
+ <BlockButton type='submit' onClick={handleSubmit}>제출</BlockButton>
```
