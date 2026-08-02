---
"@jects/jds": minor
---

**Snackbar**

Snackbar가 Compound 구조에서 `feedback` prop을 사용하는 단일 컴포넌트 구조로 변경되었습니다. `none`, `positive`, `destructive`, `notifying` 피드백 상태를 지원하고, Snackbar 노출 시간을 `duration`으로 조절할 수 있습니다. 스크린리더 낭독은 시각용 Snackbar 스택과 분리된 live region에서 가장 최근 Snackbar만 읽도록 개선되었습니다. 사용자가 Snackbar에 hover 또는 focus 중일 때는 자동 닫힘이 일시정지됩니다.

`SnackbarProvider`는 스크린리더 자동 낭독용 live region을 둘로 나눠, `feedback="destructive"` 스낵바는 `role="alert"`와 `aria-live="assertive"` 영역에서 즉시 낭독하고 나머지 피드백은 `role="status"`와 `aria-live="polite"` 영역에서 안내합니다. 이 자동 낭독은 `useSnackbar` 또는 `snackbarController`를 통해 `SnackbarProvider`의 큐에 추가한 경우에만 동작하며, `<Snackbar>`를 직접 렌더링하면 동작하지 않습니다.

**소비자 영향 (코드 수정 필요)**

| AS-IS                                                            | TO-BE                                                                     |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `Snackbar.Basic` / `Snackbar.Feedback`                           | 단일 `Snackbar` 컴포넌트                                                  |
| `Snackbar.Feedback variant`                                      | `Snackbar feedback`                                                       |
| `caption`                                                        | `description`                                                             |
| 선택값 `labelButtonProps`                                        | 필수값 `label`, `onClick`                                                 |
| `snackbar.basic(title, options)`                                 | `snackbar.basic(title, label, onClick, options)`                          |
| 고정된 Snackbar 노출 시간                                        | `SnackbarProvider duration` 또는 snackbar 호출 옵션의 `duration`          |
| `SnackbarVariant = "positive" \| "destructive"`                  | `SnackbarFeedback = "none" \| "positive" \| "destructive" \| "notifying"` |
| `SnackbarBasicProps`, `SnackbarFeedbackProps`                    | `SnackbarProps`                                                           |
| `SnackbarStyle`, `SnackbarFeedbackIconProps`, `SnackbarDivProps` | 제거                                                                      |
| 닫기 버튼                                                        | `withCloseButton` 옵션으로 표시 여부 제어                                 |

**마이그레이션 예시**

```diff
- snackbar.basic("저장 완료", {
-   caption: "변경사항이 저장되었습니다.",
-   labelButtonProps: {
-     children: "되돌리기",
-     onClick: handleUndo,
-   },
- });
+ snackbar.basic("저장 완료", "되돌리기", handleUndo, {
+   description: "변경사항이 저장되었습니다.",
+   duration: 4000,
+   withCloseButton: true,
+ });
```

```diff
- <Snackbar.Feedback
-   id="snackbar-1"
-   variant="positive"
-   title="저장 완료"
-   caption="변경사항이 저장되었습니다."
-   labelButtonProps={{
-     children: "되돌리기",
-     onClick: handleUndo,
-   }}
- />
+ <Snackbar
+   id="snackbar-1"
+   feedback="positive"
+   title="저장 완료"
+   description="변경사항이 저장되었습니다."
+   label="되돌리기"
+   onClick={handleUndo}
+   withCloseButton
+ />
```
