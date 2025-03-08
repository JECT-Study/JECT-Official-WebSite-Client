import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import Uploader from './Uploader';

const meta: Meta<typeof Uploader> = {
  title: 'Components/Uploader',
  component: Uploader,
  parameters: {
    docs: {
      description: {
        component:
          'Uploader 컴포넌트는 드래그 & 드롭 또는 버튼을 통해 파일을 추가할 수 있습니다. 드래그 상태일 경우 드롭 박스의 디자인이 변경됩니다.',
      },
    },
  },
  argTypes: {
    onChangeFile: {
      action: 'onChange',
      description:
        '드래그&드롭 혹은 버튼을 통해 파일을 업로드했을 때 호출되는 함수입니다. 업로드된 파일 리스트를 인수로 받습니다. ',
    },
    isDisabled: {
      control: 'boolean',
      description: 'true일 경우, 파일 업로드가 불가능합니다.',
    },
    fileExtensions: {
      control: 'object',
      description: '업로드 가능한 확장자 파일을 담은 배열입니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Uploader>;

export const Default = {
  args: {
    onChangeFile: () => {},
    isDisabled: false,
    fileExtensions: ['pdf', 'png'],
  },
};

export const UploaderStory: Story = {
  name: 'UploaderStory',
  render: () => {
    return (
      <Uploader isDisabled={false} onChangeFile={action('add file')} fileExtensions={['pdf']} />
    );
  },
};

export const UploaderDisabledStory: Story = {
  name: 'UploaderDisabledStory',
  render: () => {
    return (
      <Uploader isDisabled={true} onChangeFile={action('add file')} fileExtensions={['pdf']} />
    );
  },
};
