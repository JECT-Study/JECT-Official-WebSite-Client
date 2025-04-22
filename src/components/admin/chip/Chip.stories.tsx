import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';

import Chip from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    isActive: {
      control: 'boolean',
      description: 'Chip이 선택된 상태인지를 나타내는 prop입니다.',
    },
    children: {
      control: 'text',
      description: 'Chip의 레이블을 children으로 전달합니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const ChipStory: Story = {
  args: {
    isActive: false,
    children: '레이블',
  },
};

export const ChipQueryParamStory: Story = {
  name: 'Chip QueryParam Story',
  render: function Render() {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleParam = (key: string, value: string) => {
      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.set(key, value);
      setSearchParams(newSearchParams);
    };

    return (
      <div className='gap-xs flex'>
        <Chip isActive={searchParams.get('test') === '1'} onClick={() => handleParam('test', '1')}>
          레이블
        </Chip>
        <Chip isActive={searchParams.get('test') === '2'} onClick={() => handleParam('test', '2')}>
          레이블
        </Chip>
      </div>
    );
  },
};
