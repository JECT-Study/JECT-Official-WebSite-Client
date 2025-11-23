import type { Meta, StoryObj } from '@storybook/react';

import type { BannerBarProps, BannerImageProps } from './banner.types';
import { Banner } from './index';

const meta: Meta = {
  title: 'Components/Banner',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type BarStory = StoryObj<BannerBarProps>;
type ImageStory = StoryObj<BannerImageProps>;

export const Default: BarStory = {
  render: args => <Banner.Bar {...args} />,
  args: {
    label: '레이블',
    subtitle: '서브타이틀 텍스트',
    title: '메인 타이틀 텍스트',
    onClose: () => alert('배너가 닫혔습니다'),
  },
};

export const WithoutLabel: BarStory = {
  render: args => <Banner.Bar {...args} />,
  args: {
    subtitle: '서브타이틀만 있는 경우',
    title: '메인 타이틀',
    onClose: () => console.log('Banner closed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Label이 없는 배너입니다.',
      },
    },
  },
};

export const WithoutSubtitle: BarStory = {
  render: args => <Banner.Bar {...args} />,
  args: {
    label: '레이블',
    title: '메인 타이틀만 있는 배너',
    onClose: () => console.log('Banner closed'),
  },
  parameters: {
    docs: {
      description: {
        story: '서브타이틀이 없는 배너입니다.',
      },
    },
  },
};

export const TitleOnly: BarStory = {
  render: args => <Banner.Bar {...args} />,
  args: {
    title: '타이틀만 있는 배너',
    onClose: () => console.log('Banner closed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Label과 서브타이틀이 모두 없는 배너입니다.',
      },
    },
  },
};

export const WithoutCloseButton: BarStory = {
  render: args => <Banner.Bar {...args} />,
  args: {
    title: '닫기 버튼이 없는 배너',
    subtitle: 'onClose prop을 제공하지 않으면 닫기 버튼이 표시되지 않습니다.',
    label: '레이블',
    onClose: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'onClose가 없으면 닫기 버튼이 표시되지 않습니다.',
      },
    },
  },
};

export const LongText: BarStory = {
  render: args => <Banner.Bar {...args} />,
  args: {
    label: '긴 레이블 텍스트',
    subtitle:
      '이것은 아주 긴 서브타이틀 텍스트입니다. 긴 텍스트가 어떻게 줄바꿈되는지 확인할 수 있습니다.',
    title:
      '이것은 아주 긴 메인 타이틀 텍스트입니다. 긴 텍스트가 어떻게 줄바꿈되는지 확인할 수 있습니다.',
    onClose: () => console.log('Banner closed'),
  },
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 줄바꿈되는 것을 보여주는 예시입니다.',
      },
    },
  },
};

export const ImageBanner: ImageStory = {
  render: args => <Banner.Image {...args} />,
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

export const ImageBannerWithoutSubtitle: ImageStory = {
  render: args => <Banner.Image {...args} />,
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

export const ImageBannerLongText: ImageStory = {
  render: args => <Banner.Image {...args} />,
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
