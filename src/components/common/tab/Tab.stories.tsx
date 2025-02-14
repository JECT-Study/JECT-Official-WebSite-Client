import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Tab, TabItem } from './Tab';

const meta: Meta<typeof Tab> = {
  title: 'Components/Tab',
  component: Tab,
  argTypes: {
    defaultActiveTabId: {
      control: 'text',
      description: '기본 활성 탭의 id를 설정합니다. 전달하지 않으면 첫 번째 탭이 활성화됩니다.',
    },
    onTabChange: {
      action: '탭 변경됨',
      description: '탭 변경 시 호출되는 콜백 함수입니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tab>;

export const TabStory: Story = {
  name: 'Tab',
  render: () => (
    <Tab>
      <TabItem id='1' label='프론트엔드 개발자' />
      <TabItem id='2' label='백엔드 개발자' />
      <TabItem id='3' label='프로젝트 매니저' />
      <TabItem id='4' label='프로덕트 디자이너' />
    </Tab>
  ),
};
