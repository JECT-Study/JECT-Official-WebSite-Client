# JDS Storybook 작성 규약

Storybook은 컴포넌트의 사용법과 화면 결과를 확인하는 예시로 작성해요. 새로운 방식을 도입하기 전에 같은 작업 트리의 인접한 스토리를 확인하고 구조를 맞춰요.

## 기본 구조

- `Meta`와 `StoryObj`로 타입을 지정하고, 기존 `Components/...` 제목 규칙을 따라요.
- `Default`는 `args`로 구성해 Controls에서 실제 공개 props를 바꿀 수 있게 해요. 별도 구성이 필요하지 않으면 `render`를 추가하지 않아요.
- `argTypes`에는 실제 지원하는 값과 기본값을 안내해요. Figma의 설명이나 variant를 그대로 새 prop으로 만들지 않아요.
- 조합 예시는 `render`로 작성하고, 기존 레이아웃 유틸리티와 JDS 컴포넌트·토큰을 재사용해요.
- 고정된 조합을 보여주는 스토리는 필요하면 Controls를 비활성화해요.

## 케이스 선택

- 기본 사용법, 의미 있는 형태·상태 차이, 실제 소비처 조합만 별도 케이스로 나눠요.
- Figma의 대표 사용 장면과 공개 계약을 기준으로 구성해요. 모든 토큰 값이나 내부 구현 분기를 각각 스토리로 늘리지 않아요.
- 예를 들어 Skeleton은 `Default`로 크기·반경 설정을 보여주고, Figma 리소스의 권장 사례에 맞춘 `ProjectCards`, `BlogPosts`, `Members`로 실제 소비처 구성을 보여줘요. 리소스에 포함된 비권장 사례를 올바른 사용법처럼 추가하지 않아요.
- Skeleton의 소비처 예시는 크기와 반응형을 `.css.ts`에서 지정하고 `className`으로 전달해요. 같은 속성을 CSS에서 관리할 때는 `width`·`height` prop을 생략해요. 편의 props 자체를 제거하지는 않으며, `Default`의 Controls는 유지해요.
- 실제 동작을 설명하는 버튼과 로컬 상태는 사용할 수 있어요. 다만 ref 확인, 0 크기 검사, 스타일 우선순위 검사 같은 검증용 UI는 사용 예시와 섞지 않아요.

## 검증 코드와 분리

- 신규·수정 스토리에 `play`, `mount`, `storybook/test` assertion을 기본으로 추가하지 않아요. 테스트 전용 `data-testid`도 예시를 위해 넣지 않아요.
- 이 기준은 이번 작업에서 사용자가 요청한 작성 방향이에요. 기존 일부 스토리에 `play`가 남아 있더라도 신규 예시의 기본 패턴으로 삼거나, 관련 없는 파일까지 일괄 수정하지 않아요.
- 자동화 테스트 도입이 필요하면 검증 목적과 실행 경로를 별도로 합의해요. 새 러너·애드온·의존성·설정은 승인 없이 추가하지 않아요.
- 브라우저에서 Controls, 상태 전환, 키보드와 필요한 화면 크기를 직접 확인하고, 결과는 작업 기록이나 PR에 남겨요. 스토리 소스에 검증용 코드를 넣지 않는 것과 검증을 생략하는 것은 달라요.
- 타입 검사·린트·빌드 통과와 브라우저 동작 확인, VRT 실행 여부는 구분해서 기록해요.

## 참고 예시와 확인 방법

- 기본 props와 조합 예시: [Kbd](../packages/jds/src/components/Kbd/Kbd.stories.tsx), [Divider](../packages/jds/src/components/Divider/Divider.stories.tsx)
- 소비처의 로딩 레이아웃: [Skeleton](../packages/jds/src/components/Skeleton/Skeleton.stories.tsx)

```bash
npm run storybook:jds
npm run type-check
npm run lint
npm run format:check
npm run build-storybook --workspace=@jects/jds
```
