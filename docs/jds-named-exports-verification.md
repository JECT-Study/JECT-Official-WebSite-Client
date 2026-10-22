# JDS 개별 compound export 검증

## 변경 계약

- `dev`의 `1df5f9ec`를 기준으로 14개 공개 compound 컴포넌트에 75개의 파트별 export를 추가했어요.
- 기존 루트 이름과 점 표기 API는 유지했어요. 새 export는 기존 파트와 같은 값을 가리켜요.
- Field와 Listbox 같은 내부 primitive는 패키지의 공개 컴포넌트로 추가하지 않았어요.
- 컴포넌트 구현을 새로 만들거나 기존 API를 제거하지 않는 별칭 추가이므로 컴포넌트별 patch 체인지셋을 작성했어요.
- [서버 사용 예시와 전체 export 목록](./jds-server-components.md)을 참고해 주세요.

## 패키지 검사

2026-10-22에 Node 24.14.0에서 확인했어요.

| 검사                                             | 결과                                                                  |
| ------------------------------------------------ | --------------------------------------------------------------------- |
| `npm run type-check`                             | 통과, JDS는 새로 실행하고 변경 없는 web은 최종 실행에서 캐시 사용     |
| `npm run lint`                                   | 통과                                                                  |
| `npm run format:check`                           | 통과                                                                  |
| `npm run build --workspace=@jects/jds`           | 통과, check-dts / publint / AreTheTypesWrong 포함                     |
| `npm run build-storybook --workspace=@jects/jds` | 통과                                                                  |
| 기존 런타임 export                               | ESM / CJS에서 66개 모두 유지                                          |
| 새 런타임 export                                 | ESM / CJS에서 75개 모두 기존 점 표기 파트와 동일성 확인               |
| 설치 패키지의 타입                               | strict NodeNext의 `.mts` / `.cts` 소비 코드에서 파트별 타입 호환 확인 |
| 통합 CSS                                         | 변경 전후 254,702바이트로 동일하고 SHA-256 일치                       |
| 클라이언트 지시어                                | index / hooks의 ESM / CJS에 유지, utils / tokens / theme에는 미추가   |

## Next.js 소비처

실제 `npm pack` 압축 패키지를 저장소 밖의 임시 Next.js 16.3.6 / React 19.2.8 앱에 설치했어요. Webpack과 Turbopack의 프로덕션 빌드를 각각 실행하고, Codex 내장 브라우저에서 해당 프로덕션 서버를 열었어요.

- 새 export 73개는 서버 페이지에서 직접 import해 조합했어요. 필수 `onClick`이 있는 `CardPlateButton`, `CardPostButton` 2개는 소비처 클라이언트 컴포넌트에서 사용했어요.
- Webpack 화면에서 TextField 입력과 카운터, Accordion 열기, Tabs 전환, SelectField 키보드 선택, DropdownMenu 트리 열기와 Escape 포커스 복귀, Tooltip 표시, SegmentedControls 포인터 선택을 확인했어요.
- Turbopack 화면에서 TextField 입력과 카운터, Accordion 열기, Tabs 전환을 확인했어요.
- 두 빌드 모두 기존 `TextField.Input`을 쓰는 controlled 입력과 새 Card preset 버튼의 클릭 상태 변경을 확인했어요.
- 입력 필드의 접근 가능한 레이블과 실제 입력 값, expanded / selected 상태는 브라우저 접근성 트리에서 확인했어요.

## PR #739와의 호환성

현재 변경은 `dev` 기반이므로 #739의 빌드 설정을 포함하지 않아요. 별도의 검증 산출물에 `unbundle: true`를 적용하고, #739의 `22d67fa1`에 있는 `check-tree-shaking.mjs`를 실행했어요. 새 export 75개를 포함한 상태에서도 ESM Divider의 모듈 경계, 미사용 컴포넌트와 PNG 부재 검사가 통과했어요.

이 검사는 Turbopack이나 CJS의 번들 크기 개선을 뜻하지 않아요. 이번 작업에서는 번들 크기 개선을 측정하지 않았어요.

## 최신 dev 통합 후 재검증

2026-10-23에 기준 브랜치를 `dev`의 `2b89874a`로 갱신했어요. Field 스타일 변경을 보존하고, 충돌한 여섯 폼 스토리에는 개별 import 변경만 다시 적용했어요.

- 전체 타입 검사, 린트, 포맷 검사, JDS 패키지 빌드와 Storybook 빌드를 다시 통과했어요.
- ESM / CJS에서 기존 export 66개 유지와 새 export 75개의 동일성을 다시 확인했어요.
- 최종 압축 패키지를 같은 임시 Next.js 앱에 다시 설치하고 Webpack / Turbopack 프로덕션 빌드를 통과했어요. React 19 타입을 설치한 상태에서 strict NodeNext의 `.mts` / `.cts` 소비 코드도 다시 통과했어요.
- 앞 절의 브라우저 조작과 CSS 바이트 비교는 2026-10-22의 최초 기준에 대한 결과예요. 최신 dev에는 별도 Field 스타일 변경이 포함되어 있으며, 이번 통합 후 브라우저 조작과 CSS 바이트 비교를 반복하지 않았어요.

## 검증 범위

2026-10-23에 Card의 `NamedPreset` 스토리 2개를 제거하고 네 개의 preset 사용 예시를 서버 사용 문서로 옮겼어요. 기존 스토리의 개별 export 예시와 기존 점 표기 예시는 유지했어요. 이 변경으로 두 신규 스토리의 baseline을 추가할 필요는 없어졌어요.

실제 홈페이지 빌드, 모든 파트의 모든 상호작용, 파일 업로드, 스크린 리더 낭독은 확인하지 않았어요. Docker가 실행 중이 아니어서 전체 VRT는 실행하지 않았어요. 기존 스토리는 기존 baseline으로 비교하는 대상이며, Storybook 빌드 통과와 CSS 동일성만으로 VRT 통과를 판단하지 않아요.
