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
    radioSize: {
      control: { type: 'radio' },
      options: ['lg', 'md', 'sm', 'xs'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    radioSize: 'lg',
  },
};

export const Checked: Story = {
  render: () => <Radio radioSize='md' name='disabledGroup' value='1' checked={true} />,
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20 }}>
      <Radio radioSize='md' name='disabledGroup' value='2' checked={false} disabled={true} />
      <Radio radioSize='md' name='disabledGroup' value='1' checked={true} disabled={true} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => {
    const [checkedSize, setCheckedSize] = useState<RadioSize | undefined>('md');

    const sizes: RadioProps['radioSize'][] = ['lg', 'md', 'sm', 'xs'];

    return (
      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        {sizes.map(radioSize => (
          <Radio
            key={radioSize}
            radioSize={radioSize}
            name='sizeGroup'
            value={radioSize}
            checked={checkedSize === radioSize}
            onChange={() => setCheckedSize(radioSize)}
          />
        ))}
      </div>
    );
  },
};
