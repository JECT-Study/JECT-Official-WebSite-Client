---
"@jects/jds": patch
---

**디자인 토큰**

색상, letter-spacing, motion 토큰 값이 바뀌고, syntax letter-spacing 토큰 4개가 추가됩니다. 소비처 코드는 수정하지 않아도 됩니다.

**추가**

- `vars.typo.primitive.font.letterSpacing.syntax.lg`, `.md`, `.sm`, `.xs` — 값은 모두 `0px`

**동작 변경 (코드 수정 불필요)**

- `vars.colorPrimitive` 값 363개 변경
- `vars.color.semantic` 값 변경 — light 351개, dark 357개
- `vars.typo.primitive.font.letterSpacing` 값 변경
- `vars.environment.semantic.motion.entrance`, `.leave` 값 끝의 탭 문자 제거

| 토큰                                                 | 적용 구간      | 이전 값    | 새 값      |
| ---------------------------------------------------- | -------------- | ---------- | ---------- |
| `vars.typo.primitive.font.letterSpacing.label.sm`    | 전체           | `-0.080px` | `-0.072px` |
| `vars.typo.primitive.font.letterSpacing.label.xs`    | 전체           | `-0.050px` | `-0.066px` |
| `vars.typo.primitive.font.letterSpacing.body.sm`     | tablet, mobile | `0.060px`  | `0.056px`  |
| `vars.typo.primitive.font.letterSpacing.body.xs`     | 전체           | `0.070px`  | `0.065px`  |
| `vars.typo.primitive.font.letterSpacing.body["2xs"]` | 전체           | `0.080px`  | `0.072px`  |
