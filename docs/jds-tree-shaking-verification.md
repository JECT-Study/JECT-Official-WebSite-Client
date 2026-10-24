# JDS JavaScript 모듈 분리 검증

## 이번 변경

- JS 빌드에 `unbundle: true`를 적용한다. 여러 컴포넌트를 한 파일에 합치지 않아, 소비처 번들러가 사용하지 않는 파일을 제거할 수 있게 한다.
- 기존 import 경로, 점 표기 API, 타입 선언, 통합 CSS를 유지한다.
- 빌드마다 Divider만 가져오는 ESM 소비처를 번들링한다. Divider export 또는 분리된 구현 모듈이 누락되거나 미사용 컴포넌트·PNG가 남으면 빌드를 실패시킨다.

## 비교 기준

- 변경 전: `dev`의 `1df5f9ec`, JDS **0.8.0**. 최초 제보의 0.7.0과 버전이 다르므로 그 수치와 직접 비교하지 않는다.
- Node 24.14.0, tsdown 0.22.14의 Rolldown 번들러로 같은 입력을 변경 전후에 측정했다.
- 별도 Next.js 16.3.6 / React 19.2.8 앱에 각각 `npm pack`으로 만든 패키지를 설치했다. 매번 `.next`를 삭제하고 프로덕션 빌드했다.
- Next 앱은 서버 페이지와 클라이언트 컴포넌트에서 Divider를 가져오며, `/theme`, `/utils`, `/styles`도 사용한다. 실제 홈페이지 측정은 아니다.

## 측정 결과

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

## 다시 실행

```bash
npm run build --workspace=@jects/jds
```

- 위 빌드에 ESM 회귀 검사가 포함되어 있다. 크기 수치를 고정하지 않고 Divider 모듈 경계와 미사용 컴포넌트·PNG 포함 여부를 검사한다.
- CJS와 프레임워크별 동작은 이 회귀 검사의 보장 범위에 포함하지 않는다.
- 다음 작업에서는 Turbopack에 남는 import 경로와 클라이언트 경계를 먼저 검토한다. Icon 이미지 분리와 compound API 변경은 별도 변경으로 다룬다.
