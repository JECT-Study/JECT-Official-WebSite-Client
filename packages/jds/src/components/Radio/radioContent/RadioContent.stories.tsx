import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { RadioContent, RadioGroup } from './RadioContent';

const meta: Meta<typeof RadioContent> = {
  title: 'Components/RadioContent',
  component: RadioContent,
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

type Story = StoryObj<typeof RadioContent>;

export const Default: Story = {
  args: {
    radioSize: 'lg',
    radioStyle: 'empty',
    align: 'left',
    disabled: false,
    subLabelVisible: false,
    subLabel: '레이블',
    children: '레이블',
  },
};

export const OutlineRadio: Story = {
  render: () => (
    <RadioContent radioSize='md' radioStyle='outline' name='disabledGroup' value='1'>
      레이블
    </RadioContent>
  ),
};

export const controlledRadio: Story = {
  render: () => {
    const [checked, setChecked] = useState('korea');

    const handleGenderChange = e => {
      setChecked(e.target.value);
    };

    const items = ['korea', 'japan', 'us', 'uk'];

    return (
      <div style={{ display: 'flex', gap: 20 }}>
        {items.map(item => (
          <RadioContent
            key={item}
            radioSize='md'
            name='radioGroup'
            value={item}
            checked={checked === item}
            onChange={handleGenderChange}
          >
            {item}
          </RadioContent>
        ))}
        <p>결과: {checked}</p>
      </div>
    );
  },
};

export const uncontrolledRadio: Story = {
  render: () => (
    <div>
      <form
        style={{ display: 'flex', gap: 20 }}
        onSubmit={e => {
          e.preventDefault();
          alert(`${e.target.groupName.value} 확인!`);
        }}
      >
        <RadioContent radioSize='md' name='groupName' value='apple' defaultChecked>
          apple
        </RadioContent>
        <RadioContent radioSize='md' name='groupName' value='banana'>
          banana
        </RadioContent>
        <RadioContent radioSize='md' name='groupName' value='orange'>
          orange
        </RadioContent>
        <button type='submit'>제출 버튼</button>
      </form>
    </div>
  ),
};
