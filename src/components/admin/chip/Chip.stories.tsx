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
    param: {
      control: 'object',
      description:
        'Chip을 통해 쿼리 파라미터를 제어해야할 경우 쿼리의 key, value 값을 전달합니다. 실제 url에 전달된 쿼리파라미터가 존재할 경우 Chip의 색상이 변경됩니다.',
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
    param: {
      key: 'test',
      value: 'active',
    },
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
        <Chip param={{ key: 'test', value: '1' }} onClick={() => handleParam('test', '1')}>
          레이블
        </Chip>
        <Chip param={{ key: 'test', value: '2' }} onClick={() => handleParam('test', '2')}>
          레이블
        </Chip>
      </div>
    );
  },
};
