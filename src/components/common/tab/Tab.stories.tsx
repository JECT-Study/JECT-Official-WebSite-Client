import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Tab, TabHeader, TabItem, TabPanel } from './Tab';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tab',
  component: Tab,
  parameters: {
    docs: {
      description: {
        component:
          'Tab 컴포넌트는  탭 헤더(TabHeader 및 TabItem)와 탭 콘텐츠(TabPanel)를 자유롭게 구성할 수 있습니다. Context API를 사용합니다.',
      },
    },
  },
  argTypes: {
    defaultActiveTabId: {
      control: 'text',
      description: '초기 활성 탭의 id를 설정합니다. string 형태입니다.',
    },
    onTabChange: {
      action: '탭 변경됨',
      description: '탭 변경 시 호출되는 콜백 함수입니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const TabStory: Story = {
  name: 'Tab',
  render: args => (
    <Tab defaultActiveTabId='1' {...args}>
      <TabHeader>
        <TabItem id='1' label='프론트엔드 개발자' />
        <TabItem id='2' label='백엔드 개발자' />
        <TabItem id='3' label='프로젝트 매니저' />
        <TabItem id='4' label='프로덕트 디자이너' />
      </TabHeader>
      <div>
        <TabPanel id='1'>
          <div>프론트엔드 개발자 콘텐츠</div>
        </TabPanel>
        <TabPanel id='2'>
          <div>백엔드 개발자 콘텐츠</div>
        </TabPanel>
        <TabPanel id='3'>
          <div>프로젝트 매니저 콘텐츠</div>
        </TabPanel>
        <TabPanel id='4'>
          <div>프로덕트 디자이너 콘텐츠</div>
        </TabPanel>
      </div>
    </Tab>
  ),
};
