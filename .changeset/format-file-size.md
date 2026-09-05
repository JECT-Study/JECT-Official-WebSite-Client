---
"@jects/jds": minor
---

**formatFileSize**

바이트를 표시 문자열로 변환하는 `formatFileSize`를 배럴에서 export합니다. 단위별로 환산한 뒤 소수점 한 자리까지 내림하고 `B`, `KB`, `MB`, `GB`, `TB`를 붙입니다.

두 번째 인자 `unitStep`은 1KB를 몇 바이트를 기준으로 사용할지 정하며 기본값은 `1024`입니다. `1000`을 전달하면 macOS와 iOS의 표기 기준을 사용할 수 있으며, 단위 레이블은 동일합니다.

`File`의 `fileSize`와 `FileField.Size`에서 이 함수를 기본 포매터로 사용합니다.

```tsx
formatFileSize(2726297); // "2.5MB"
formatFileSize(2726297, 1000); // "2.7MB"
```
