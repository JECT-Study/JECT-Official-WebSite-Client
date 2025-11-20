import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Select } from './index';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'sm'],
      description: 'Select의 크기',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    label: {
      control: 'text',
      description: 'Select 레이블 (선택적)',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'list',
    value: 'seoul',
    onChange: () => {},
  },
  render: function Render() {
    const [value, setValue] = useState('seoul');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '20rem' }}>
        <Select variant='list' value={value} onChange={setValue}>
          <Select.Label value='seoul'>서울특별시</Select.Label>
          <Select.Label value='gyeonggi'>경기도</Select.Label>
          <Select.Label value='incheon'>인천광역시</Select.Label>
          <Select.Label value='busan'>부산광역시</Select.Label>
          <Select.Label value='daegu'>대구광역시</Select.Label>
        </Select>

        <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '6px' }}>
          <strong>선택된 값:</strong> {value}
        </div>
      </div>
    );
  },
};

export const WithLabel: Story = {
  args: {
    variant: 'list',
    value: 'seoul',
    onChange: () => {},
    label: '지역 선택',
  },
  render: function Render() {
    const [value, setValue] = useState('seoul');

    return (
      <div style={{ width: '20rem' }}>
        <Select variant='list' label='지역 선택' value={value} onChange={setValue}>
          <Select.Label value='seoul'>서울특별시</Select.Label>
          <Select.Label value='gyeonggi'>경기도</Select.Label>
          <Select.Label value='incheon'>인천광역시</Select.Label>
          <Select.Label value='busan'>부산광역시</Select.Label>
        </Select>
      </div>
    );
  },
};

export const SmallSize: Story = {
  args: {
    variant: 'list',
    value: 'option1',
    onChange: () => {},
    size: 'sm',
  },
  render: function Render() {
    const [value, setValue] = useState('option1');

    return (
      <div style={{ width: '20rem' }}>
        <Select variant='list' size='sm' value={value} onChange={setValue}>
          <Select.Label value='option1'>Option 1</Select.Label>
          <Select.Label value='option2'>Option 2</Select.Label>
          <Select.Label value='option3'>Option 3</Select.Label>
        </Select>
      </div>
    );
  },
};

export const WithCaption: Story = {
  args: {
    variant: 'list',
    value: 'pro',
    onChange: () => {},
    label: '요금제 선택',
  },
  render: function Render() {
    const [value, setValue] = useState('pro');

    return (
      <div style={{ width: '20rem' }}>
        <Select variant='list' label='요금제 선택' value={value} onChange={setValue}>
          <Select.Label value='free' caption='무료로 시작하세요'>
            Free
          </Select.Label>
          <Select.Label value='pro' caption='개인 사용자에게 추천'>
            Pro
          </Select.Label>
          <Select.Label value='team' caption='팀 협업을 위한 플랜'>
            Team
          </Select.Label>
          <Select.Label value='enterprise' caption='대규모 조직을 위한 플랜'>
            Enterprise
          </Select.Label>
        </Select>
      </div>
    );
  },
};

export const WithBadge: Story = {
  args: {
    variant: 'list',
    value: 'pro',
    onChange: () => {},
    label: '요금제 선택',
  },
  render: function Render() {
    const [value, setValue] = useState('pro');

    return (
      <div style={{ width: '20rem' }}>
        <Select variant='list' label='요금제 선택' value={value} onChange={setValue}>
          <Select.Label value='free' caption='무료로 시작하세요' badge='Free'>
            Free Plan
          </Select.Label>
          <Select.Label value='pro' caption='개인 사용자에게 추천' badge='인기'>
            Pro Plan
          </Select.Label>
          <Select.Label value='team' caption='팀 협업을 위한 플랜' badge='NEW'>
            Team Plan
          </Select.Label>
        </Select>
      </div>
    );
  },
};

export const WithDisabled: Story = {
  args: {
    variant: 'list',
    value: 'available1',
    onChange: () => {},
    label: '옵션 선택',
  },
  render: function Render() {
    const [value, setValue] = useState('available1');

    return (
      <div style={{ width: '20rem' }}>
        <Select variant='list' label='옵션 선택' value={value} onChange={setValue}>
          <Select.Label value='available1'>사용 가능 1</Select.Label>
          <Select.Label value='disabled1' isDisabled>
            비활성화됨 1
          </Select.Label>
          <Select.Label value='available2'>사용 가능 2</Select.Label>
          <Select.Label value='disabled2' isDisabled>
            비활성화됨 2
          </Select.Label>
        </Select>
      </div>
    );
  },
};

export const AllFeatures: Story = {
  args: {
    variant: 'list',
    value: 'standard',
    onChange: () => {},
    label: '서비스 플랜 선택',
    size: 'md',
  },
  render: function Render() {
    const [value, setValue] = useState('standard');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '20rem' }}>
        <Select variant='list' label='서비스 플랜 선택' size='md' value={value} onChange={setValue}>
          <Select.Label value='free' caption='무료 체험 플랜' badge='무료'>
            Free
          </Select.Label>
          <Select.Label value='standard' caption='개인 사용자에게 추천' badge='인기'>
            Standard
          </Select.Label>
          <Select.Label value='premium' caption='프리미엄 기능 제공' badge='신규'>
            Premium
          </Select.Label>
          <Select.Label value='enterprise' caption='기업용 맞춤 플랜' isDisabled>
            Enterprise (준비중)
          </Select.Label>
        </Select>

        <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '6px' }}>
          <strong>선택된 플랜:</strong> {value}
        </div>
      </div>
    );
  },
};
