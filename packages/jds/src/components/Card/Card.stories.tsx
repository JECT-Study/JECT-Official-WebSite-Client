import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './index';

const meta = {
  title: 'Components/Card',
  component: Card.Root,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    layout: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: '카드 내부 요소들의 배열 방향',
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
    variant: {
      control: 'radio',
      options: ['plate', 'post'],
      description: '카드의 시각적 변형',
      table: {
        defaultValue: { summary: 'plate' },
      },
    },
    cardStyle: {
      control: 'radio',
      options: ['outlined', 'empty'],
      description: '카드의 스타일 (post variant에만 적용)',
    },
    isDisabled: {
      control: 'boolean',
      description: '비활성화 상태',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Card.Root>;

export default meta;

export const CompoundBasic: StoryObj = {
  name: '🆕 Compound - Basic Usage',
  render: () => (
    <div style={{ width: '400px' }}>
      <Card.Root layout='vertical' variant='plate'>
        <Card.Image src='https://via.placeholder.com/300x200' alt='프로젝트 이미지' />
        <Card.Content>
          {' '}
          <Card.Caption>2024 Spring</Card.Caption>
          <Card.Title>Compound Components 예시</Card.Title>
          <Card.Body>
            {' '}
            Compound Components 패턴으로 자유롭게 조합할 수 있습니다. 최대한의 유연성을 제공합니다.
          </Card.Body>
        </Card.Content>{' '}
      </Card.Root>{' '}
    </div>
  ),
};

export const CompoundCustom: StoryObj = {
  name: '🆕 Compound - Custom Composition',
  render: () => (
    <div style={{ width: '400px' }}>
      <Card.Root layout='vertical' variant='plate'>
        <Card.Image src='https://via.placeholder.com/300x200' alt='커스텀 카드' />
        <Card.Content>
          {' '}
          <Card.Title>커스텀 구성 카드</Card.Title>
          <Card.Body>원하는 대로 블록을 조립할 수 있습니다.</Card.Body>
          <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
            <span
              style={{
                padding: '4px 8px',
                background: '#f0f0f0',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            >
              태그1
            </span>
            <span
              style={{
                padding: '4px 8px',
                background: '#f0f0f0',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            >
              태그2
            </span>
          </div>{' '}
        </Card.Content>{' '}
      </Card.Root>{' '}
    </div>
  ),
};

export const CompoundWithMeta: StoryObj = {
  name: '🆕 Compound - With Meta',
  render: () => (
    <div style={{ width: '400px' }}>
      <Card.Root layout='vertical' variant='post' cardStyle='outlined'>
        <Card.Image src='https://via.placeholder.com/300x200' alt='블로그 포스트' />
        <Card.Content>
          {' '}
          <Card.Title>블로그 포스트 제목</Card.Title>
          <Card.Body>
            메타 정보가 포함된 카드입니다. Meta 컴포넌트가 자동으로 구분선을 추가합니다.
          </Card.Body>
          <Card.Meta>
            {' '}
            <Card.MetaItem>홍길동</Card.MetaItem>
            <Card.MetaItem>2025.01.15</Card.MetaItem>
            <Card.MetaItem>5분 읽기</Card.MetaItem>
          </Card.Meta>{' '}
        </Card.Content>{' '}
      </Card.Root>{' '}
    </div>
  ),
};

export const PresetPlateWithTitle: StoryObj = {
  name: '🆕 Preset - PlateWithTitle',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ width: '350px' }}>
        <Card.Preset.PlateWithTitle
          layout='vertical'
          image={{ src: 'https://via.placeholder.com/300x200', alt: '프로젝트' }}
          caption='2024 Spring'
          title='프로젝트 제목'
          body='프로젝트에 대한 설명입니다. Preset을 사용하면 간단하게 카드를 생성할 수 있습니다.'
        />
      </div>
      <div style={{ width: '500px' }}>
        <Card.Preset.PlateWithTitle
          layout='horizontal'
          image={{ src: 'https://via.placeholder.com/120x120', alt: '프로젝트' }}
          caption='2024 Winter'
          title='가로 레이아웃'
          body='horizontal layout으로 설정하면 이미지가 옆에 표시됩니다.'
        />
      </div>{' '}
    </div>
  ),
};

export const PresetPlateWithLabel: StoryObj = {
  name: '🆕 Preset - PlateWithLabel',
  render: () => (
    <div style={{ width: '400px' }}>
      <Card.Preset.PlateWithLabel
        layout='vertical'
        image={{ src: 'https://via.placeholder.com/300x200', alt: '사용자 프로필' }}
        caption='Frontend Developer'
        label='김개발'
        body='다양한 프로젝트 경험이 있는 프론트엔드 개발자입니다. React와 TypeScript를 주로 사용합니다.'
      />
    </div>
  ),
};

export const PresetPlateCompact: StoryObj = {
  name: '🆕 Preset - PlateCompact',
  render: () => (
    <div style={{ width: '350px' }}>
      <Card.Preset.PlateCompact
        layout='horizontal'
        image={{ src: 'https://via.placeholder.com/120x120', alt: '썸네일' }}
        caption='공지사항'
        body='Title이나 Label 없이 간결하게 정보를 표시하는 카드입니다.'
      />
    </div>
  ),
};

export const PresetPost: StoryObj = {
  name: '🆕 Preset - Post',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ width: '400px' }}>
        <Card.Preset.Post
          as='a'
          href='#'
          layout='vertical'
          cardStyle='outlined'
          image={{ src: 'https://via.placeholder.com/300x200', alt: '블로그 포스트' }}
          title='디자인 시스템 구축하기'
          body='체계적인 디자인 시스템을 구축하는 방법에 대해 알아봅니다. 토큰 기반의 접근 방식을 사용합니다.'
          author='홍길동'
          date='2025.01.15'
        />
      </div>
      <div style={{ width: '400px' }}>
        <Card.Preset.Post
          as='button'
          layout='vertical'
          cardStyle='empty'
          image={{ src: 'https://via.placeholder.com/300x200', alt: '블로그 포스트' }}
          title='React 성능 최적화'
          body='React 애플리케이션의 성능을 향상시키는 다양한 기법들을 소개합니다.'
          author='김개발'
          date='2025.01.10'
        />
      </div>
      <div style={{ width: '600px' }}>
        <Card.Preset.Post
          as='a'
          href='#'
          layout='horizontal'
          cardStyle='outlined'
          image={{ src: 'https://via.placeholder.com/120x120', alt: '블로그 포스트' }}
          title='TypeScript 실전 활용법'
          body='TypeScript를 실무에서 효과적으로 활용하는 방법을 알아봅니다.'
          author='이타입'
          date='2025.01.08'
        />
      </div>{' '}
    </div>
  ),
};

export const InteractionTest: StoryObj = {
  name: '🎨 Interaction - Hover & Active',
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '16px' }}>Hover/Active 인터랙션 테스트</h2>
      <p style={{ marginBottom: '24px', color: '#666' }}>
        Post Preset의 화살표 아이콘은 hover 시 나타나며, 우측으로 nudge 효과가 적용됩니다.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ width: '500px' }}>
          <h3 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
            ↓ 링크 카드 (as="a") - hover 해보세요!
          </h3>
          <Card.Preset.Post
            as='a'
            href='#'
            layout='horizontal'
            cardStyle='outlined'
            image={{ src: 'https://via.placeholder.com/120x120', alt: 'Post' }}
            title='Hover 시 화살표 표시'
            body='마우스를 올리면 우측에 화살표 아이콘이 나타나며 nudge 효과가 적용됩니다.'
            author='홍길동'
            date='2025.01.15'
          />
        </div>
        <div style={{ width: '500px' }}>
          <h3 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
            ↓ 버튼 카드 (as="button") - 클릭 해보세요!
          </h3>
          <Card.Preset.Post
            as='button'
            onClick={() => alert('Card clicked!')}
            layout='horizontal'
            cardStyle='empty'
            image={{ src: 'https://via.placeholder.com/120x120', alt: 'Post' }}
            title='Active 시 nudge 증가'
            body='클릭하면 화살표가 더 멀리 이동합니다 (2px → 4px).'
            author='김개발'
            date='2025.01.10'
          />
        </div>
        <div style={{ width: '400px' }}>
          <h3 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
            ↓ Vertical 레이아웃
          </h3>
          <Card.Preset.Post
            as='a'
            href='#'
            layout='vertical'
            cardStyle='outlined'
            image={{ src: 'https://via.placeholder.com/300x200', alt: 'Post' }}
            title='Vertical도 동일하게 작동'
            body='레이아웃과 무관하게 hover/active 인터랙션이 적용됩니다.'
            author='이타입'
            date='2025.01.08'
          />
        </div>{' '}
      </div>{' '}
    </div>
  ),
};

export const ComparisonGuide: StoryObj = {
  name: '🎯 Usage Guide - When to Use What',
  render: () => (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2 style={{ marginBottom: '20px' }}>Card 컴포넌트 사용 가이드</h2>
      <div style={{ marginBottom: '30px' }}>
        <h3>🔹 Compound Components (최대 유연성)</h3>
        <p>
          <strong>언제 사용:</strong> 디자인 시스템에 없는 독특한 구조가 필요할 때
        </p>
        <div
          style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', marginTop: '12px' }}
        >
          <Card.Root layout='vertical' variant='plate'>
            <Card.Content>
              {' '}
              <Card.Title>커스텀 구조</Card.Title>
              <Card.Body>원하는 대로 블록을 자유롭게 조합</Card.Body>
              <div style={{ marginTop: '8px', color: '#666', fontSize: '14px' }}>
                ✨ 커스텀 요소 추가 가능
              </div>
            </Card.Content>{' '}
          </Card.Root>{' '}
        </div>{' '}
      </div>
      <div>
        {' '}
        <h3>🔹 Presets (간편함 + 일관성)</h3>
        <p>
          <strong>언제 사용:</strong> 디자인 시스템의 표준 패턴을 빠르게 사용할 때 (80% 케이스)
        </p>
        <div
          style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', marginTop: '12px' }}
        >
          <Card.Preset.PlateWithTitle
            caption='추천'
            title='대부분의 경우 Preset 사용'
            body='타입 안정성, 기본값 제공, 코드 간결'
          />
        </div>{' '}
      </div>{' '}
    </div>
  ),
};
