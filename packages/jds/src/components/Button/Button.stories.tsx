import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      description: '버튼 내부 콘텐츠',
      defaultValue: 'Button',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 상태',
      defaultValue: false,
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: '버튼 타입',
      defaultValue: 'button',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

export const TextButton: Story = {
  args: {
    children: 'Click me!',
  },
};

export const WithEmoji: Story = {
  args: {
    children: '✨ Magic Button',
  },
};

export const LongText: Story = {
  args: {
    children: 'This is a button with really long text content',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const SubmitButton: Story = {
  args: {
    children: 'Submit',
    type: 'submit',
  },
};

export const WithHTMLContent: Story = {
  args: {
    children: (
      <span>
        <strong>Bold</strong> and <em>Italic</em> text
      </span>
    ),
  },
};

export const WithIconAndText: Story = {
  args: {
    children: (
      <>
        <span>💾</span>
        <span style={{ marginLeft: '8px' }}>Save</span>
      </>
    ),
  },
};

export const WithClickHandler: Story = {
  args: {
    children: 'Click to see action',
    onClick: () => alert('Button clicked!'),
  },
};

export const WithInlineStyles: Story = {
  args: {
    children: 'Styled Button',
    style: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
    },
  },
};

export const WithClassName: Story = {
  args: {
    children: 'Custom Class Button',
    className: 'custom-button-class',
  },
};

export const Playground: Story = {
  args: {
    children: 'Playground Button',
    disabled: false,
    type: 'button',
  },
};
