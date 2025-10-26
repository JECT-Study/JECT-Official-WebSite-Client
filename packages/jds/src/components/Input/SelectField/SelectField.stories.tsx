import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { SelectField } from './index';
import { Select } from '../../Select';

const meta = {
  title: 'Components/Input/SelectField',
  component: SelectField,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    style: {
      control: 'select',
      options: ['outlined', 'empty'],
      description: 'SelectField의 시각적 스타일',
      table: {
        defaultValue: { summary: 'outlined' },
      },
    },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: '레이아웃 방향',
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
    validation: {
      control: 'select',
      options: ['none', 'error', 'success'],
      description: '유효성 검증 상태',
      table: {
        defaultValue: { summary: 'none' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: 'boolean',
      description: '읽기 전용 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: '레이블 텍스트',
    },
    labelIcon: {
      control: 'text',
      description: '레이블 옆에 표시할 아이콘 (IconName)',
    },
    helperText: {
      control: 'text',
      description: 'Helper 메시지',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder 텍스트',
      table: {
        defaultValue: { summary: '선택하세요' },
      },
    },
    dropdownIcon: {
      control: 'text',
      description: '드롭다운 아이콘',
      table: {
        defaultValue: { summary: 'arrow-down-s-line' },
      },
    },
    isOpen: {
      control: 'boolean',
      description: '드롭다운 열림 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
  },
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [value] = useState('');

    return (
      <div style={{ width: '20rem' }}>
        <SelectField
          label='지역 선택'
          placeholder='거주 지역을 선택하세요'
          helperText='현재 거주하시는 지역을 선택해주세요'
          value={value}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    );
  },
};

export const WithValue: Story = {
  args: {
    value: '',
  },
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [value] = useState('서울특별시');

    return (
      <div style={{ width: '20rem' }}>
        <SelectField
          label='지역'
          helperText='선택된 지역: 서울특별시'
          value={value}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    );
  },
};

export const OpenState: Story = {
  args: {
    value: '',
  },
  render: function Render() {
    const [isOpen, setIsOpen] = useState(true);
    const [value] = useState('');

    return (
      <div style={{ width: '20rem' }}>
        <SelectField
          label='옵션 선택'
          placeholder='옵션을 선택하세요'
          helperText='드롭다운이 열린 상태입니다'
          value={value}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    );
  },
};

export const ErrorState: Story = {
  args: {
    value: '',
  },
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [value] = useState('');

    return (
      <div style={{ width: '20rem' }}>
        <SelectField
          label='지역 선택'
          placeholder='지역을 선택하세요'
          validation='error'
          helperText='지역을 선택해주세요 (필수)'
          value={value}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    );
  },
};

export const SuccessState: Story = {
  args: {
    value: '',
  },
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [value] = useState('경기도');

    return (
      <div style={{ width: '20rem' }}>
        <SelectField
          label='지역 선택'
          validation='success'
          helperText='올바르게 선택되었습니다'
          value={value}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    value: '',
  },
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [value] = useState('');

    return (
      <div style={{ width: '20rem' }}>
        <SelectField
          label='지역 선택'
          placeholder='선택할 수 없습니다'
          disabled
          helperText='현재 선택이 비활성화되어 있습니다'
          value={value}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    );
  },
};

export const ReadOnly: Story = {
  args: {
    value: '',
  },
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [value] = useState('인천광역시');

    return (
      <div style={{ width: '20rem' }}>
        <SelectField
          label='지역'
          readOnly
          helperText='읽기 전용 상태입니다'
          value={value}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    );
  },
};

export const EmptyStyle: Story = {
  args: {
    value: '',
  },
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [value] = useState('');

    return (
      <div style={{ width: '20rem' }}>
        <SelectField
          label='지역 선택'
          placeholder='지역을 선택하세요'
          style='empty'
          helperText='테두리가 없는 스타일입니다'
          value={value}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    );
  },
};

export const HorizontalLayout: Story = {
  args: {
    value: '',
  },
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [value] = useState('');

    return (
      <div style={{ width: '30rem' }}>
        <SelectField
          label='지역'
          placeholder='선택하세요'
          layout='horizontal'
          helperText='레이블이 왼쪽에 위치합니다'
          value={value}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    );
  },
};

export const WithLabelIcon: Story = {
  args: {
    value: '',
  },
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [value] = useState('');

    return (
      <div style={{ width: '20rem' }}>
        <SelectField
          label='중요한 선택'
          labelIcon='information-line'
          placeholder='옵션을 선택하세요'
          helperText='아이콘을 호버하면 추가 정보를 볼 수 있습니다'
          value={value}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    );
  },
};

export const CustomDropdownIcon: Story = {
  args: {
    value: '',
  },
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [value] = useState('');

    return (
      <div style={{ width: '20rem' }}>
        <SelectField
          label='정렬'
          placeholder='정렬 방식 선택'
          dropdownIcon='arrow-down-wide-line'
          helperText='커스텀 아이콘을 사용합니다'
          value={value}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    );
  },
};

export const InteractiveExample: Story = {
  args: {
    value: '',
  },
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState('');

    const options = ['서울특별시', '경기도', '인천광역시', '부산광역시', '대구광역시'];

    const handleSelect = (option: string) => {
      setValue(option);
      setIsOpen(false);
    };

    return (
      <div style={{ width: '20rem', position: 'relative' }}>
        <SelectField
          label='지역 선택'
          placeholder='지역을 선택하세요'
          helperText='드롭다운을 열어 지역을 선택해보세요'
          value={value}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '4px',
              background: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              zIndex: 1000,
            }}
          >
            {options.map(option => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #f0f0f0',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
};

export const WithSelectComponent: Story = {
  args: {
    value: '',
  },
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    const options = [
      { value: 'seoul', label: '서울특별시' },
      { value: 'gyeonggi', label: '경기도' },
      { value: 'incheon', label: '인천광역시' },
      { value: 'busan', label: '부산광역시' },
      { value: 'daegu', label: '대구광역시' },
    ];

    const handleSelectChange = (value: string) => {
      const selected = options.find(opt => opt.value === value);
      setSelectedValue(selected?.label || '');
      setIsOpen(false);
    };

    return (
      <div style={{ width: '20rem', position: 'relative' }}>
        <SelectField
          label='지역 선택'
          placeholder='지역을 선택하세요'
          helperText='실제 Select 컴포넌트를 사용합니다'
          value={selectedValue}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '4px',
              zIndex: 1000,
            }}
          >
            <Select value={selectedValue} onChange={handleSelectChange}>
              {options.map(option => (
                <Select.Label key={option.value} value={option.value}>
                  {option.label}
                </Select.Label>
              ))}
            </Select>
          </div>
        )}
      </div>
    );
  },
};

export const WithSelectAndCaption: Story = {
  args: {
    value: '',
  },
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    const options = [
      { value: 'card', label: '신용카드', caption: '신용카드 또는 체크카드' },
      { value: 'transfer', label: '계좌이체', caption: '즉시 이체' },
      { value: 'virtual', label: '가상계좌', caption: '가상계좌 발급 후 입금' },
      { value: 'phone', label: '휴대폰 결제', caption: '휴대폰 소액결제' },
    ];

    const handleSelectChange = (value: string) => {
      const selected = options.find(opt => opt.value === value);
      setSelectedValue(selected?.label || '');
      setIsOpen(false);
    };

    return (
      <div style={{ width: '20rem', position: 'relative' }}>
        <SelectField
          label='결제 방법'
          placeholder='결제 수단을 선택하세요'
          helperText='Caption이 포함된 Select를 사용합니다'
          value={selectedValue}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '4px',
              zIndex: 1000,
            }}
          >
            <Select value={selectedValue} onChange={handleSelectChange}>
              {options.map(option => (
                <Select.Label key={option.value} value={option.value} caption={option.caption}>
                  {option.label}
                </Select.Label>
              ))}
            </Select>
          </div>
        )}
      </div>
    );
  },
};
