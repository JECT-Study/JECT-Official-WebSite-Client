---
"@jects/jds": minor
---

**@jects/jds**

요구하는 Node 버전을 `>=18.0.0`에서 `>=22.0.0`으로 올립니다. Node 22 미만에서 설치하면 `EBADENGINE` 경고가 나오고, `engine-strict`를 켠 환경에서는 설치가 실패합니다. 공개 API는 그대로이므로 코드는 수정하지 않고, 실행 환경을 Node 22 이상으로 올리면 됩니다.
