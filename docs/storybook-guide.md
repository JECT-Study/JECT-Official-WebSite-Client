# JDS Storybook 작성 규약

JDS 스토리를 추가하거나 고칠 때 따른다. 스토리는 컴포넌트의 사용법과 화면 결과를 보여 주는 예시다. 새로운 방식을 도입하기 전에 비슷한 기존 스토리를 확인하고 구조를 맞춘다.

## 1. 기본 구조

- `Meta`와 `StoryObj`로 타입을 지정하고, 기존 `Components/...` 제목 규칙을 따른다.
- `Default`는 `args`로 구성해 Controls에서 실제 공개 props를 바꿀 수 있게 한다. 별도 구성이 필요하지 않으면 `render`를 추가하지 않는다.
- `argTypes`에는 실제 지원하는 값과 기본값을 안내한다. Figma의 설명이나 variant를 그대로 새 prop으로 만들지 않는다.
- 조합 예시는 `render`로 작성하고, 기존 레이아웃 유틸리티와 JDS 컴포넌트·토큰을 재사용한다.
- 고정된 조합을 보여 주는 스토리는 필요하면 Controls를 비활성화한다.

## 2. 케이스 선택

- 기본 사용법, 의미 있는 형태·상태 차이, 실제 소비처 조합만 별도 케이스로 나눈다.
- Figma의 대표 사용 장면과 공개 계약을 기준으로 구성한다. 모든 토큰 값이나 내부 구현 분기를 각각 스토리로 늘리지 않는다.
- Figma 리소스의 비권장 사례는 올바른 사용법처럼 스토리로 옮기지 않는다.
- 실제 동작을 설명하는 버튼과 로컬 상태는 사용할 수 있다. ref 확인, 0 크기 검사, 스타일 우선순위 검사 같은 검증용 UI는 사용 예시와 섞지 않는다.

예를 들어 Skeleton은 `Default`로 크기와 반경 Controls를 보여 주고, Figma 리소스의 권장 사례에 맞춘 `ProjectCards`, `BlogPosts`, `Members`로 소비처 구성을 보여 준다. 소비처 예시의 크기와 반응형은 `.css.ts`에서 지정해 `className`으로 전달하고, 같은 속성을 `width`, `height` prop으로 다시 지정하지 않는다.

## 3. 검증 코드와 분리

- 신규·수정 스토리에 `play`, `mount`, `storybook/test` assertion을 기본으로 추가하지 않는다. 테스트 전용 `data-testid`도 예시를 위해 넣지 않는다.
- 기존 스토리에 남아 있는 `play`는 신규 스토리의 기본 패턴으로 삼지 않는다. 관련 없는 스토리를 일괄 수정하지도 않는다.
- 자동화 테스트 도입이 필요하면 검증 목적과 실행 경로를 먼저 합의한다. 새 러너, 애드온, 의존성, 설정은 승인 없이 추가하지 않는다.
- 스토리에 검증용 코드를 넣지 않는다고 검증을 생략하지는 않는다. 브라우저에서 Controls, 상태 전환, 키보드, 필요한 화면 크기를 직접 확인하고 결과를 PR에 남긴다.
- 타입 검사·린트·빌드 통과, 브라우저 동작 확인, VRT 실행 여부는 구분해서 기록한다.

## 4. 참고 예시와 확인 방법

- 기본 props와 조합 예시: [Kbd](../packages/jds/src/components/Kbd/Kbd.stories.tsx), [Divider](../packages/jds/src/components/Divider/Divider.stories.tsx)
- 소비처의 로딩 레이아웃: [Skeleton](../packages/jds/src/components/Skeleton/Skeleton.stories.tsx)

```bash
npm run storybook:jds
npm run type-check
npm run lint
npm run format:check
npm run build-storybook --workspace=@jects/jds
```
