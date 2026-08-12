---
"@jects/jds": patch
---

**Toast / Snackbar / Tooltip**

화면 위에 겹쳐 뜨는 컴포넌트의 `z-index`를 레이어 토큰으로 정리합니다. Dialog가 `zIndex.overlay`를 단독으로 쓰고 Toast, Snackbar, Tooltip은 `zIndex.floated`를 씁니다. 소비처에서 고칠 코드는 없습니다.

**동작 변경 (코드 수정 불필요)**

- Toast, Snackbar 스택 컨테이너의 `z-index`가 `zIndex.overlay`(400)에서 `zIndex.floated`(300)로 바뀝니다. Dialog가 열려 있는 동안 뜬 Toast, Snackbar는 포털 생성 순서와 관계없이 Dialog 뒤에 놓입니다.
- Tooltip 콘텐츠의 `z-index`가 `9999`에서 `zIndex.floated`(300)로 바뀝니다. Dialog 안에서 연 Tooltip은 Dialog 뒤에 가려집니다.
