# JECT-Official-WebSite-Client

## 코드 스타일

포맷은 Prettier, 린트는 ESLint가 담당한다. Prettier는 저장소 루트에서 한 번만 실행되며 대상 제외는 루트 `.prettierignore`가 관리한다.

```bash
npm run format        # 전체 포맷 적용
npm run format:check  # 포맷 검증 (수정하지 않음)
npm run lint          # 린트 (--max-warnings 0)
```

`.prettierignore`에는 빌드 산출물과 함께 `build:tokens`, `build:icons`의 생성물이 들어 있다. 생성물을 포맷하면 다음 생성 때 되돌아가므로 제외 목록에서 빼지 않는다.

## 커밋 훅

Lefthook이 커밋 직전에 스테이지된 파일에만 Prettier와 ESLint를 적용하고, 수정된 결과를 다시 스테이징한다. 설정은 `lefthook.yml`에 있다.

훅은 `npm install` 시 자동으로 설치된다. `--ignore-scripts`로 설치했거나 훅이 동작하지 않으면 직접 설치한다.

```bash
npx lefthook install
```

일시적으로 건너뛰려면 `git commit --no-verify` 또는 `LEFTHOOK=0 git commit`을 쓴다.
