import { ChangeEvent, FormEvent, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { RadioContent } from './RadioContent';

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
    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
      <RadioContent radioSize='md' radioStyle='outline' value='1'>
        레이블
      </RadioContent>
      <RadioContent
        radioSize='md'
        radioStyle='outline'
        subLabelVisible={true}
        subLabel='레이블'
        value='2'
      >
        레이블
      </RadioContent>
      <RadioContent radioSize='md' radioStyle='outline' align='right' value='3'>
        레이블
      </RadioContent>
      <RadioContent
        radioSize='md'
        radioStyle='outline'
        align='right'
        subLabelVisible={true}
        subLabel='레이블'
        value='4'
      >
        레이블
      </RadioContent>
    </div>
  ),
};

export const SubLabelWithHyperlink: Story = {
  render: () => (
    <RadioContent
      radioSize='md'
      radioStyle='outline'
      subLabelVisible={true}
      subLabel={
        <>
          하이퍼링크&nbsp;
          <a href='https://www.naver.com/' style={{ textDecoration: 'underline' }}>
            (네이버 바로가기)
          </a>
        </>
      }
      value='1'
    >
      레이블
    </RadioContent>
  ),
};

export const controlledRadio: Story = {
  render: () => {
    const [checked, setChecked] = useState('korea');

    const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          alert(`${form.namedItem('groupName').value} 확인!`);
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
