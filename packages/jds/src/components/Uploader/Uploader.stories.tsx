import type { Meta, StoryObj } from '@storybook/react';
import { Uploader } from './Uploader';

const meta = {
  title: 'Components/Uploader',
  component: Uploader.File,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: '업로드 로딩 여부',
    },
    isDisabled: {
      control: 'boolean',
      description: '업로더 비활성화 여부',
    },
  },
} satisfies Meta<typeof Uploader.File>;

export default meta;

export const File: StoryObj<typeof Uploader.File> = {
  name: 'File',
  args: {
    isLoading: false,
    isDisabled: false,
  },
  render: args => <Uploader.File isLoading={args.isLoading} isDisabled={args.isDisabled} />,
};

export const Image: StoryObj<typeof Uploader.Image> = {
  name: 'Image',
  args: {
    isLoading: false,
    isDisabled: false,
  },
  render: args => <Uploader.Image isLoading={args.isLoading} isDisabled={args.isDisabled} />,
};
