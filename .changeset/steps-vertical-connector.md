---
"@jects/jds": minor
---

**Steps**

수직 레이아웃의 연결선이 단계 활성 여부에 따라 색상을 구분하도록 개선했습니다. 활성 단계로 이어지는 연결선은 `semantic.accent.neutral`, 이후 연결선은 `semantic.stroke.alpha.subtle`로 표시됩니다. 수평 레이아웃의 화살표 아이콘은 디자인 명세대로 활성 여부와 무관하게 단일 색상을 유지합니다.

활성 상태를 나타내는 data 속성 이름을 `data-activated`에서 `data-steps-activated`로 변경했습니다. 속성 선택자가 Steps 외부 요소와 충돌하지 않도록 이름을 좁힌 것입니다.

**AS-IS**

```css
[data-activated="true"] {
  /* Steps.Item의 활성 상태를 소비처에서 스타일링 */
}
```

**TO-BE**

```css
[data-steps-activated="true"] {
  /* Steps.Item의 활성 상태를 소비처에서 스타일링 */
}
```

**추가 사항**

- 연결선 활성 색상을 `:has()` 선택자로 처리해, `Steps.Item`을 다른 컴포넌트로 감싸도 활성 상태가 유지됩니다
- 수직 연결선의 `Divider`에 `decorative`를 적용해 접근성 트리에서 명시적으로 제외합니다
- 수평 레이아웃 separator 아이콘 크기를 조정했습니다 (lg `sm` → `xs`, md `xs` → `2xs`)
- deprecated `NumericBadge.Basic` 별칭 사용을 `NumericBadge`로 교체했습니다
- 수평 배치 간격 토큰을 CSS variable로 단일화해 `Steps.Root`와 내부 목록 항목의 간격이 항상 동일하게 유지됩니다
