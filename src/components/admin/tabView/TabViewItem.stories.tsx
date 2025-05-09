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
    isActive: {
      control: 'boolean',
      description: 'TabViewItem이 선택된 상태인지를 나타내는 prop입니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TabViewItem>;

export const TabViewItemStory: Story = {
  args: {
    children: '레이블',
    isActive: false,
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
          isActive={searchParams.get('tabView') === '1'}
          onClick={() => handleParam('tabView', '1')}
        >
          레이블1
        </TabViewItem>
        <TabViewItem
          isActive={searchParams.get('tabView') === '2'}
          onClick={() => handleParam('tabView', '2')}
        >
          레이블2
        </TabViewItem>
      </TabView>
    );
  },
};
