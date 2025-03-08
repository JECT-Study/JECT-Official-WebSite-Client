import type { Meta, StoryObj } from '@storybook/react';

import CheckBox from './CheckBox';

const meta: Meta<typeof CheckBox> = {
  title: 'components/CheckBox',
  component: CheckBox,
  args: {
    checked: false,
    isIndeterminate: false,
    disabled: false,
    id: 'my-checkbox',
    labelText: '레이블',
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: '체크박스가 선택되었는지 여부를 결정합니다.',
    },
    isIndeterminate: {
      control: 'boolean',
      description: '체크박스가 불확실(indeterminate)한 상태인지 결정합니다.',
    },
    disabled: {
      control: 'boolean',
      description: 'true이면 체크박스가 비활성화됩니다.',
    },
    labelText: {
      control: 'text',
      description: '체크박스 옆에 표시될 라벨 텍스트입니다.',
    },
    id: {
      control: 'text',
      description: '체크박스의 고유 식별자입니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CheckBox>;

export const Default: Story = {
  name: 'CheckBox',
  render: args => (
    <div className='story-container'>
      <CheckBox {...args} />
    </div>
  ),
};
