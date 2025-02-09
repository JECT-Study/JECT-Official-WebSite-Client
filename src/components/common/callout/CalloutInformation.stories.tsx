import { Meta, StoryObj } from '@storybook/react';

import CalloutInformation from './CalloutInformation';

const meta: Meta<typeof CalloutInformation> = {
  title: 'Components/Callout/CalloutInformation',
  component: CalloutInformation,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    labels: {
      control: 'object',
      description: '문자열 배열입니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CalloutInformation>;

export const Primary: Story = {
  args: {
    title: '콜아웃 레이블',
    labels: ['레이블', '레이블'],
  },
};
