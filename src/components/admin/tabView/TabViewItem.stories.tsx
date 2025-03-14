import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';

import TabView from './TabView';
import TabViewItem from './TabViewItem';

const meta: Meta<typeof TabViewItem> = {
  title: 'Components/TabViewItem',
  component: TabViewItem,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'TabViewItem은 TabView의 children으로 전달하는 컴포넌트입니다. ',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: '버튼의 레이블입니다.',
    },
    param: {
      control: 'object',
      description:
        'TabViewItem을 통해 쿼리 파라미터를 제어해야할 경우 쿼리의 key, value 값을 전달합니다. 실제 url에 전달된 쿼리파라미터가 존재할 경우 TabViewItem의 색상이 변경됩니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TabViewItem>;

export const TabViewItemStory: Story = {
  args: {
    children: '레이블',
    param: {
      key: 'test',
      value: '1',
    },
  },
};

export const TabViewToggleStory: Story = {
  name: 'TabViewItem Toggle Story',
  render: function Render() {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleParam = (key: string, value: string) => {
      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.set(key, value);
      setSearchParams(newSearchParams);
    };

    return (
      <TabView>
        <TabViewItem
          param={{ key: 'tabView', value: '1' }}
          onClick={() => handleParam('tabView', '1')}
        >
          레이블1
        </TabViewItem>
        <TabViewItem
          param={{ key: 'tabView', value: '2' }}
          onClick={() => handleParam('tabView', '2')}
        >
          레이블2
        </TabViewItem>
      </TabView>
    );
  },
};
