---
"@jects/jds": patch
---

**Typography**

typography label의 색상을 `labelColorVar` CSS 변수로 분리합니다. 라벨 색상을 덮어쓰는 컴포넌트는 클래스 특이도 경쟁 대신 `labelColorVar` 변수 할당으로 색상을 제어할 수 있습니다. 기본 색상(`object.bold`)은 동일하게 유지됩니다.
