# JDS JavaScript 모듈 분리 검증

## 이번 변경

- ESM JS 빌드에만 `unbundle: true`를 적용해 소스의 모듈 경계를 유지한다. CJS는 `unbundle: false`로 기존 진입점·공통 청크 번들 방식을 유지한다.
- 기존 import 경로, 점 표기 API, 타입 선언, 통합 CSS를 유지한다.
- 빌드마다 Divider만 가져오는 ESM 소비처를 번들링한다. Divider export 또는 분리된 구현 모듈이 누락되거나 허용하지 않은 모듈·PNG가 남으면 빌드를 실패시킨다.

## 비교 기준

- 변경 전: `dev`의 `1df5f9ec`, JDS **0.8.0**. 최초 제보의 0.7.0과 버전이 다르므로 그 수치와 직접 비교하지 않는다.
- Node 24.14.0, tsdown 0.22.14의 Rolldown 번들러로 같은 입력을 변경 전후에 측정했다.
- 별도 Next.js 16.3.6 / React 19.2.8 앱에 각각 `npm pack`으로 만든 패키지를 설치했다. 매번 `.next`를 삭제하고 프로덕션 빌드했다.
- Next 앱은 서버 페이지와 클라이언트 컴포넌트에서 Divider를 가져오며, `/theme`, `/utils`, `/styles`도 사용한다. 실제 홈페이지 측정은 아니다.

## 측정 결과

아래 수치는 모듈 분리 도입 시점의 커밋 `22d67fa1` 기준이다. 이후 스타일 JS 출력 파일명 변경에 대한 검증은 아래 호환성 확인에 기록한다.

| 측정 대상                       |  변경 전 JS |  변경 후 JS |            gzip 전 → 후 | PNG 전 → 후 |
| ------------------------------- | ----------: | ----------: | ----------------------: | ----------: |
| Rolldown · ESM · Divider만 사용 | 1,439,035 B |     5,087 B |       926,892 → 1,813 B |       4 → 0 |
| Next.js · Webpack               | 2,122,860 B |   563,334 B |   1,138,225 → 171,965 B |       4 → 0 |
| Next.js · Turbopack             | 2,102,070 B | 2,101,141 B | 1,140,342 → 1,142,106 B |       4 → 4 |
| Rolldown · CJS · Divider만 사용 | 1,467,940 B | 1,498,853 B |     932,215 → 937,566 B |       4 → 4 |

- Rolldown 측정은 JDS의 dependencies·peerDependencies를 외부 의존성으로 두었다. React 등은 수치에 포함하지 않는다.
- Next 수치는 `/`의 생성 HTML이 참조하는 JS 파일 합계다. Next 런타임과 polyfill을 포함하며, gzip은 각 파일을 따로 압축한 크기의 합계다.
- 일반 ESM 소비처와 Next Webpack에서는 개선을 확인했다. **Turbopack과 CJS의 미사용 코드 제거는 이번 변경으로 해결되지 않았다.**
- Next의 `experimental-analyze --output` 분석기로 변경 전후 모듈 그래프를 확인했다. 변경 후 Turbopack에도 `index.js → Icon.js → IconMap.js` 경로가 남는다. 그래프에 보이는 모듈 수만으로 번들 크기를 판단하지 않고 생성 JS에서도 PNG 4장을 확인했다.
- Icon과 이를 가져오는 BlockButton은 ESM에서도 PNG 4장이 남는다. 실제 의존하는 파일까지 자동으로 제거되지는 않는다.

## 호환성 확인

- `npm run build --workspace=@jects/jds`, `npm run type-check`, `npm run lint`, `npm run format:check` 통과.
- 배포 패키지 검사(publint·AreTheTypesWrong) 통과.
- 설치한 압축 패키지의 기본 경로, `/hooks`, `/theme`, `/utils`, `/tokens`에서 ESM import와 CJS require 모두 성공. 공개 export 목록은 변경 전후 동일하다.
- 배포된 CSS와 `.d.ts`·`.d.cts` 파일은 변경 전후 바이트 단위로 동일하다.
- 기본 경로와 `/hooks`의 `"use client"` 지시어를 유지한다.
- Next 기본 빌드와 Webpack 빌드 모두 성공. 브라우저에서 Divider 스타일, 클릭 후 두께 1px → 2px 변경을 확인했고 런타임 오류가 없었다.
- 새 회귀 검사는 변경 전 패키지에서 미사용 PNG 때문에 실패하고 변경 후 패키지에서 통과한다.
- 상위 폴더 이름이 `components`인 정상 패키지도 통과한다. 경로는 배포 디렉터리를 기준으로 판정한다.
- 기존 단일 JS에서 PNG만 제거해도 검사에 실패한다. 분리된 `Divider.js` 구현 모듈의 존재를 확인해 미사용 컴포넌트가 남은 단일 JS를 통과시키지 않는다.
- 모듈별 스타일 JS의 출력 이름에서 `.css` 접미사를 `.styles`로 바꾼다. 현재 ESM은 `divider.styles.js`를 출력하고, 번들 방식의 CJS에서는 이 코드가 진입점·공통 청크에 포함된다. 실제 CSS 파일과 소스 파일명은 유지한다.
- 배포 패키지 검사는 vanilla-extract가 스타일 원본으로 인식하는 `.css.js`, `.css.cjs` 등의 파일명이 배포 디렉터리에 남으면 실패한다.
- 수정 전후 압축 패키지를 설치한 Vite 6.4.1 / `@vanilla-extract/vite-plugin` 5.2.2 소비처에서 확인했다. 수정 전에는 `divider.css.js`의 `Invalid exports`로 빌드가 실패하고, 수정 후에는 소비처 자체의 `.css.ts`와 JDS 통합 CSS를 함께 사용해도 빌드가 통과한다.
- 파일명 변경 전후 공개 ESM/CJS export, Divider 서버 렌더링 결과와 클라이언트 지시어를 확인했다. 통합 CSS와 선언 파일 12개는 바이트 단위로 동일하다.
- 새 파일명 검사는 수정 전 산출물의 스타일 JS 110개를 감지해 실패하고 수정 후에는 통과한다. 이 검사는 소비처 Vite 빌드를 실행하지 않고 배포 파일명을 검사한다.

## CJS 번들 방식 복원 비교

ESM의 모듈 분리는 유지하고 CJS만 기존 번들 방식으로 복원했다. 아래 수치는 2026-10-27 최신 dev 통합 이전의 비교 기록이다. 비교 대상은 스타일 JS 파일명 수정까지 적용한 동일 소스이며, 변경 전은 ESM/CJS 모두 `unbundle: true`, 변경 후는 ESM만 `true`다.

Node 24.14.0과 tsdown 0.22.14에서 각각 빌드한 압축 패키지로 비교했다. 소비처 번들은 Divider만 ESM으로 재수출하거나 CJS `require` 결과에서 Divider를 내보낸다. 각 형식으로 다시 번들링하며 minify와 `NODE_ENV=production` 치환을 적용하고, JDS의 dependencies·peerDependencies는 외부 의존성으로 둔다. gzip은 출력 청크를 각각 압축한 크기의 합계다. 위 최초 도입 측정표와는 별도 비교다.

| 항목                          |     변경 전 |     변경 후 |
| ----------------------------- | ----------: | ----------: |
| 배포 CJS JS 파일 수           |         360 |           8 |
| 배포 CJS JS 합계, 소스맵 제외 | 1,789,948 B | 1,672,052 B |
| Divider ESM 소비처 JS         |     5,959 B |     5,959 B |
| Divider ESM 소비처 gzip       |     2,247 B |     2,247 B |
| Divider CJS 소비처 JS         | 1,496,659 B | 1,467,526 B |
| Divider CJS 소비처 gzip       |   937,933 B |   932,298 B |
| ESM 소비처 PNG 수             |           0 |           0 |
| CJS 소비처 PNG 수             |           4 |           4 |

- 파일 수와 용량 감소는 CJS 출력 방식을 복원한 결과다. CJS에서 미사용 컴포넌트와 PNG가 제거되는 문제를 해결한 것은 아니다.
- 두 압축 패키지의 기본 경로와 `/hooks`, `/utils`, `/tokens`, `/theme`에서 ESM import와 CJS require, NodeNext ESM/CJS 타입 검사가 통과했다.
- 공개 export 목록, Divider의 기본·세로·점선 서버 렌더링 결과와 클라이언트 지시어가 유지된다. ESM JS·소스맵, 통합 CSS, 타입 선언·소스맵 738개 파일은 바이트 단위로 동일하다.
- 두 패키지 모두 Vite + vanilla-extract 소비처 빌드가 통과한다. 이번 비교에서는 Next.js를 다시 빌드하지 않았으며, 위 Next.js 수치는 최초 도입 시점의 기록이다.
- 최신 dev 통합 커밋 `2f1cf588` 위에 리뷰 수정을 적용한 뒤 JDS 빌드, 전체 타입 검사·린트와 압축 패키지의 ESM/CJS 진입점·NodeNext 타입·클라이언트 지시어·Vite 소비처를 다시 확인했다. 모두 통과했고 CJS JS 파일 수는 8개를 유지한다. 위 크기 비교표는 dev 통합 전 기록으로 보존한다.

## ESM 회귀 검사의 허용 범위

`components/`로 대상을 제한하지 않고, 소비처 번들에 실제 코드가 남은 모든 모듈을 검사한다. 경로는 배포 디렉터리를 기준으로 정규화하며, 검사 스크립트가 만든 소비처 진입점 자체는 제외한다.

| 허용 대상                                                                                        | 이유                                                   |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| `components/Divider/Divider.js`                                                                  | Divider 구현                                           |
| `components/Divider/divider.styles.js`                                                           | Divider의 클래스 선택 함수와 CSS 변수                  |
| `_virtual/_rolldown/runtime.js`                                                                  | 번들러가 생성한 모듈 호환성 보조 코드                  |
| 번들에 포함된 `@vanilla-extract/dynamic`, `@vanilla-extract/private`, `@vanilla-extract/recipes` | 인라인 CSS 변수와 recipe 실행에 필요한 라이브러리 코드 |

- 위 목록에 없는 JDS 모듈은 `hooks/`, `utils/`, `tokens/`를 포함해 위치와 관계없이 검사에 실패한다. 필요한 공유 의존성이 추가되면 소스와 산출물에서 필요성을 확인한 뒤 해당 모듈을 허용 목록에 추가한다.
- 라이브러리는 버전에 따라 바뀌는 내부 파일명 대신 패키지 단위로 허용한다. 따라서 허용한 라이브러리 내부의 모든 미사용 코드 제거를 보장하지 않는다. 다른 패키지는 자동으로 허용하지 않는다.
- 공개 API 여부와 이 소비처의 필요 여부는 별개다. 공개 export를 제거하지 않으며, `dependencies`와 `peerDependencies`는 기존처럼 소비처 번들 밖에 둔다.
- 이 검사는 ESM 소비처의 모듈 포함 여부를 확인한다. 통합 CSS의 미사용 스타일 제거, CJS, 다른 번들러의 동작은 보장하지 않는다.
- 정상 사례와 불필요한 컴포넌트·훅·유틸·토큰·Divider 내부 파일·다른 라이브러리 포함 사례, PNG 포함, 구현 모듈 누락, 번들 오류의 임시 fixture 10개에서 기대한 통과·실패 및 임시 디렉터리 정리를 확인했다.

## 다시 실행

```bash
npm run build --workspace=@jects/jds
```

- 위 빌드에 ESM 회귀 검사가 포함되어 있다. 크기 수치를 고정하지 않고 Divider 모듈 경계와 허용하지 않은 모듈·PNG 포함 여부를 검사한다.
- CJS와 프레임워크별 동작은 이 회귀 검사의 보장 범위에 포함하지 않는다.
- 다음 작업에서는 Turbopack에 남는 import 경로와 클라이언트 경계를 먼저 검토한다. Icon 이미지 분리와 compound API 변경은 별도 변경으로 다룬다.
