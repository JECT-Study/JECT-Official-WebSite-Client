import type { Meta, StoryObj } from '@storybook/react';
import { BasicCallout } from './BasicCallout';

const meta = {
  title: 'Components/BasicCallout',
  component: BasicCallout,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'BasicCallout',
    },
  },
} satisfies Meta<typeof BasicCallout>;

export default meta;

export const BasicHierarchy: StoryObj<typeof BasicCallout> = {
  name: 'Basic BasicCallout',
  argTypes: {
    variant: { control: 'radio' },
    hierarchy: { control: 'radio', options: ['accent', 'primary', 'secondary'] },
    size: { control: 'radio', options: ['lg', 'md', 'sm', 'xs', '2xs'] },
    titleVisible: { control: 'boolean' },
    extraButtonVisible: { control: 'boolean' },
  },
  args: {
    hierarchy: 'accent',
    variant: 'hero',
    size: 'md',
    titleVisible: true,
    extraButtonVisible: false,
    title: '베이직 콜아웃 타이틀',
    children:
      '콜아웃 텍스트의 최대 입력 글자수 제한은 없지만, 너무 많은 글자수는 핵심적인 내용을 효과적으로 전달하는 데에 적절치 않다는 점을 유의합니다.',
  },
  render: args => (
    <BasicCallout
      title={args.title}
      hierarchy={args.hierarchy}
      variant={args.variant}
      size={args.size}
      titleVisible={args.titleVisible}
      extraButtonVisible={args.extraButtonVisible}
    >
      {args.children}
    </BasicCallout>
  ),
};
