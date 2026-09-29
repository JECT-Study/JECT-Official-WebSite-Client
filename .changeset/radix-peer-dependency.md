---
"@jects/jds": minor
---

`radix-ui`가 `dependencies`에서 `peerDependencies`로 이동했습니다. 소비처의 `package.json`에 `radix-ui`를 `^1.6.7` 범위로 직접 추가해야 합니다.

```diff
  "dependencies": {
+   "radix-ui": "^1.6.7"
  }
```

JDS 공개 API와 사용 방법은 동일합니다.
