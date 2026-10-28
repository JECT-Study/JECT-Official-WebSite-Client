---
name: ject-jds-package-check
description: JDS 배포 코드·공개 API·타입·CSS·빌드 변경을 실제 패키지 산출물과 필요한 소비 환경에서 검증한다. 체인지셋과 소비처 영향을 연결하며 문서/스토리만 변경한 작업에 패키지 빌드·배포를 강제하지 않는다.
---

# JDS 패키지와 소비처 검증

## 범위 선택

현재 package.json·exports·지원 React 범위·빌드 스크립트와 변경 head를 확인한다. [저장소 맥락](../ject-jds-context/SKILL.md)과 [코드 리뷰](../ject-jds-review/SKILL.md)를 사용하며 배포·체인지셋 판단에는 대상 head의 changeset-guide 원문 전체를 읽는다. 검증은 릴리스·버전 변경·태그·게시·커밋·푸시 권한을 포함하지 않는다.

| 변경               | 확인할 소비 계약                                                   |
| ------------------ | ------------------------------------------------------------------ |
| 컴포넌트·타입·배럴 | import/export, 선언 타입, props·ref·event·DOM/role, 기존 사용 예제 |
| 토큰·스타일        | CSS 진입점·provider·theme, 생성물과 소비처 참조                    |
| 번들·진입점·의존성 | ESM/CJS 해석, 런타임/타입 의존성, sideEffects·CSS·트리 셰이킹      |
| Next/RSC 지원 주장 | 서버/클라이언트 경계와 해당 Next·번들러 버전의 실제 소비 빌드      |
| 문서·스토리만      | 관련 자료 검증. 배포 코드 변경이 없으면 체인지셋 불필요            |

## 실행

1. 현재 AGENTS의 type-check/lint와 변경 성격에 맞는 검사를 실행한다. 커밋 단계의 format 규칙은 별도로 따른다. 캐시된 검사와 실제 신규 실행을 구분한다.
2. 배포 코드 변경에는 기존 `npm run build --workspace=@jects/jds` 경로를 사용한다. 현재 build.mjs에 연결된 check-dts/check-package와 publint/타입 검사의 실행·exit code를 확인한다. 설정이 바뀌면 경로를 다시 확인한다.
3. 공개 배럴과 package exports, 생성 선언 파일의 미선언 의존성 참조, stylesheet 경로·실제 포함을 확인한다. 소스 typecheck 성공만으로 패키지 사용 가능을 단정하지 않는다.
4. 필요 시 npm pack으로 만든 실제 tarball을 임시 소비 공간에서 설치·빌드한다. 기존 패키지/설정/소비처를 변경하지 않고 가능한 기존 도구를 사용한다. 새 의존성·새 패키지·CI 설정이 필요하면 승인 범위를 확인한다.
5. ESM/CJS나 bundler별 결과를 구분한다. Divider 한 개의 번들 결과를 Icon·모든 컴포넌트·모든 번들러로 일반화하지 않는다. 성능은 측정한 원본/압축 크기·모듈·설정과 함께 보고하고 로딩 속도 비율을 추정하지 않는다.
6. 체인지셋 필요 여부·bump·소비처 migration을 현재 규약으로 판단한다. 생성물은 직접 수정하지 않는다. 검사 실패는 해당 원인을 수정하거나 미해결로 보고하고 배포물을 손으로 고쳐 통과시키지 않는다.

## 결과

대상 HEAD와 dirty 변경 범위, 실행 명령·실제 exit code와 산출물, 적용 module format·consumer·bundler 버전, 공개 API/CSS 영향, 체인지셋 및 미검증을 반환한다. 제품 검증과 하네스 설치 검사, 빌드 성공과 실제 소비 환경 성공을 구분한다.

## 테스트 시나리오

- 정상: 새 공개 컴포넌트 → source/type/barrel/story/changeset 확인 → 기존 패키지 빌드 → 소비 예제 검증.
- 경계: 스토리 설명만 수정 → 문서 검증, 새 체인지셋·배포 없음.
- 오류: 소스 typecheck 통과·tarball export 해석 실패 → 패키지 검증 실패로 보고하고 공개 진입점 원인 조사.

검사 적용 여부와 결과 판정은 [검증 선택과 판정](../ject-jds-workflow/references/quality-gates.md)을 따른다.
