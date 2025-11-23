import type { Meta, StoryObj } from '@storybook/react';

import type { BannerImageProps } from './banner.types';
import { Banner } from './index';

const meta: Meta<typeof Banner.Image> = {
  title: 'Components/Banner/Image',
  component: Banner.Image,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    src: { control: 'text' },
    alt: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<BannerImageProps>;

export const Default: Story = {
  args: {
    variant: 'image',
    src: '',
    alt: '배너 배경 이미지',
    title: '배너의 히어로 타이틀은 최대 3줄까지 표시됩니다',
    subtitle: '서브타이틀은 최대 2줄까지 표시됩니다.',
  },
  parameters: {
    docs: {
      description: {
        story: '이미지 배경을 가진 배너입니다.',
      },
    },
  },
};

export const WithoutSubtitle: Story = {
  args: {
    variant: 'image',
    src: '',
    alt: '배너 배경 이미지',
    title: '타이틀만 있는 이미지 배너',
  },
  parameters: {
    docs: {
      description: {
        story: '서브타이틀이 없는 이미지 배너입니다.',
      },
    },
  },
};

export const LongText: Story = {
  args: {
    variant: 'image',
    src: '',
    alt: '배너 배경 이미지',
    title:
      '이것은 아주 긴 타이틀 텍스트입니다. 긴 텍스트가 어떻게 반응형으로 표시되고 줄바꿈되는지 확인할 수 있습니다.',
    subtitle:
      '이것은 아주 긴 서브타이틀 텍스트입니다. 다양한 화면 크기에서 텍스트가 어떻게 조정되는지 확인할 수 있습니다.',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 반응형으로 표시되는 이미지 배너입니다.',
      },
    },
  },
};
