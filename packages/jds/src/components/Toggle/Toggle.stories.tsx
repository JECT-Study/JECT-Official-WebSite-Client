import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Toggle } from './Toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['lg', 'md'],
      description: '토글의 크기',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    isChecked: {
      control: 'boolean',
      description: '체크(선택) 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    isChecked: false,
    disabled: false,
  },
};

export const Checked: Story = {
  args: {
    size: 'md',
    isChecked: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    size: 'md',
    isChecked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    size: 'md',
    isChecked: true,
    disabled: true,
  },
};

export const Sizes: Story = {
  args: {
    isChecked: false,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ width: '100px' }}>Large:</span>
        <Toggle size='lg' />
        <Toggle size='lg' isChecked />
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ width: '100px' }}>Medium:</span>
        <Toggle size='md' />
        <Toggle size='md' isChecked />
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  args: {
    size: 'md',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px' }}>Normal</h4>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <Toggle size='md' isChecked={false} />
            <span style={{ fontSize: '12px' }}>Unchecked</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <Toggle size='md' isChecked={true} />
            <span style={{ fontSize: '12px' }}>Checked</span>
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px' }}>Disabled</h4>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <Toggle size='md' isChecked={false} disabled />
            <span style={{ fontSize: '12px' }}>Unchecked</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <Toggle size='md' isChecked={true} disabled />
            <span style={{ fontSize: '12px' }}>Checked</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

const ControlledToggleComponent = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <Toggle size='md' isChecked={isChecked} onChange={setIsChecked} />
      <p>현재 상태: {isChecked ? 'ON' : 'OFF'}</p>
      <button onClick={() => setIsChecked(!isChecked)}>외부에서 토글</button>
    </div>
  );
};

export const ControlledExample: Story = {
  args: {
    size: 'md',
  },
  render: () => <ControlledToggleComponent />,
};

const MultipleTogglesComponent = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>알림</span>
        <Toggle
          size='md'
          isChecked={settings.notifications}
          onChange={checked => setSettings({ ...settings, notifications: checked })}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>다크 모드</span>
        <Toggle
          size='md'
          isChecked={settings.darkMode}
          onChange={checked => setSettings({ ...settings, darkMode: checked })}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>자동 저장</span>
        <Toggle
          size='md'
          isChecked={settings.autoSave}
          onChange={checked => setSettings({ ...settings, autoSave: checked })}
        />
      </div>
    </div>
  );
};

export const SettingsExample: Story = {
  args: {
    size: 'md',
  },
  render: () => <MultipleTogglesComponent />,
};

