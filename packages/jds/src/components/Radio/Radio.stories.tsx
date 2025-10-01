// Radio.stories.tsx
import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioProps, RadioSize } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['lg', 'md', 'sm', 'xs'],
    },
    isChecked: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    name: { control: 'text' },
    value: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    size: 'lg',
    isChecked: false,
    isDisabled: false,
    name: 'defaultRadio',
    value: '1',
  },
};

export const Sizes: Story = {
  render: () => {
    const [checkedSize, setCheckedSize] = useState<RadioSize | undefined>('md');

    const sizes: RadioProps['size'][] = ['lg', 'md', 'sm', 'xs'];

    return (
      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        {sizes.map(size => (
          <Radio
            key={size}
            size={size}
            name='sizeGroup'
            value={size}
            isChecked={checkedSize === size}
            onChange={() => setCheckedSize(size)}
          />
        ))}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20 }}>
      <Radio size='md' name='disabledGroup' value='2' isChecked={false} isDisabled={true} />
      <Radio size='md' name='disabledGroup' value='1' isChecked={true} isDisabled={true} />
    </div>
  ),
};
