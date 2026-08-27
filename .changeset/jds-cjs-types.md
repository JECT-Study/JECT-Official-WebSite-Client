---
"@jects/jds": minor
---

**@jects/jds**

`exports`의 `import`와 `require`에 각각 타입 선언을 연결합니다. 공개 API는 그대로이므로 코드 수정은 필요하지 않습니다.

**동작 변경 (코드 수정 불필요)**

- CJS로 가져가는 소비처가 `.d.cts`를 참조함, 이전에는 ESM 선언인 `.d.ts`를 참조해 `require`로 가져올 수 없어서 오류가 발생했음
