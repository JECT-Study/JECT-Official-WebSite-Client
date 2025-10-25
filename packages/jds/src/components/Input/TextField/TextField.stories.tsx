import type { Meta, StoryObj } from '@storybook/react';
import { FlexColumn, FlexRow, Label } from '@storybook-utils/layout';
import { BlockButton } from 'components';
import { useState } from 'react';

import { TextField } from './index';

const meta = {
  title: 'Components/Input/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    style: {
      control: 'select',
      options: ['outlined', 'empty'],
      description: 'Input 필드의 시각적 스타일',
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
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
    onChange: () => {},
  },
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '20rem' }}>
        <TextField.Button
          label='인증 코드'
          placeholder='인증 코드를 입력하세요'
          helperText='이메일로 전송된 인증 코드를 입력해주세요'
          value={value}
          onChange={e => setValue(e.target.value)}
          button={<BlockButton.Basic size='md'>인증</BlockButton.Basic>}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '**TextField.Button (기본)**\n\n' +
          'Input 오른쪽에 버튼이 포함된 필드입니다.\n' +
          '인증 코드 입력, 검색 등에 사용됩니다.',
      },
    },
  },
};

export const WithLabelIcon: Story = {
  args: {
    label: '이메일',
    labelIcon: 'information-line',
    placeholder: 'example@ject.com',
    helperText: '유효한 이메일 주소를 입력해주세요',
    value: '',
    onChange: () => {},
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '20rem' }}>
        <TextField {...args} value={value} onChange={e => setValue(e.target.value)} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '**Label Icon 포함**\n\n레이블 옆에 아이콘을 추가할 수 있습니다. 어떤 IconName이든 사용 가능합니다.',
      },
    },
  },
};

export const WithValidation: Story = {
  args: {
    value: '',
    onChange: () => {},
  },
  render: function Render() {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('invalid-email');
    const [value3, setValue3] = useState('user@example.com');

    return (
      <FlexColumn gap='24px'>
        <TextField
          label='이메일'
          placeholder='이메일을 입력하세요'
          helperText='유효한 이메일 주소를 입력해주세요'
          validation='none'
          value={value1}
          onChange={e => setValue1(e.target.value)}
        />
        <TextField
          label='이메일'
          value={value2}
          onChange={e => setValue2(e.target.value)}
          helperText='유효하지 않은 이메일 형식입니다'
          validation='error'
        />
        <TextField
          label='이메일'
          value={value3}
          onChange={e => setValue3(e.target.value)}
          helperText='올바른 이메일 형식입니다'
          validation='success'
        />
      </FlexColumn>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '**Validation 상태**\n\n' +
          '- `none`: 기본 상태\n' +
          '- `error`: 에러 상태 (빨간색 테두리 및 메시지)\n' +
          '- `success`: 성공 상태 (초록색 테두리 및 메시지)',
      },
    },
  },
};

export const States: Story = {
  args: {
    value: '',
    onChange: () => {},
  },
  render: function Render() {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('홍길동');

    return (
      <FlexColumn gap='32px'>
        <TextField
          label='Normal'
          placeholder='마우스를 올리거나 클릭해보세요'
          value={value1}
          onChange={e => setValue1(e.target.value)}
        />

        <TextField
          label='Disabled'
          placeholder='비활성화된 입력 필드'
          helperText='이 필드는 비활성화되어 있습니다'
          disabled
          value={value2}
          onChange={e => setValue2(e.target.value)}
        />

        <TextField
          label='Read Only'
          value={value3}
          onChange={e => setValue3(e.target.value)}
          helperText='이 필드는 읽기 전용 상태입니다'
          readOnly
        />
      </FlexColumn>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '**상태 예시**\n\n' +
          '- Normal: InteractionLayer 기반 hover/focus/active 인터랙션\n' +
          '- Disabled: 비활성화 상태 (회색)\n' +
          '- Read Only: 읽기 전용 상태',
      },
    },
  },
};

export const BasicTextField: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요',
    helperText: '유효한 이메일 주소를 입력해주세요',
    value: '',
    onChange: () => {},
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '20rem' }}>
        <TextField {...args} value={value} onChange={e => setValue(e.target.value)} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '**기본 TextField**\n\n' +
          'Label + Input + Helper가 모두 포함된 완전한 Input 필드입니다.\n' +
          'Controlled Pattern 전용: value와 onChange는 필수입니다.',
      },
    },
  },
};

export const ButtonWithValidation: Story = {
  args: {
    value: '',
    onChange: () => {},
  },
  render: function Render() {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('123456');
    const [value3, setValue3] = useState('987654');

    return (
      <div style={{ width: '20rem' }}>
        <TextField.Button
          label='인증 코드 (Normal)'
          placeholder='인증 코드를 입력하세요'
          value={value1}
          onChange={e => setValue1(e.target.value)}
          button={<BlockButton.Basic size='md'>인증</BlockButton.Basic>}
          validation='none'
        />
        <TextField.Button
          label='인증 코드 (Error)'
          value={value2}
          onChange={e => setValue2(e.target.value)}
          helperText='인증 코드가 일치하지 않습니다'
          button={
            <BlockButton.Feedback intent='destructive' size='md'>
              재전송
            </BlockButton.Feedback>
          }
          validation='error'
        />
        <TextField.Button
          label='인증 코드 (Success)'
          value={value3}
          onChange={e => setValue3(e.target.value)}
          helperText='인증이 완료되었습니다'
          button={<BlockButton.Basic size='md'>완료</BlockButton.Basic>}
          validation='success'
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '**TextField.Button + Validation**\n\n버튼과 validation 상태를 함께 사용할 수 있습니다.',
      },
    },
  },
};

export const AllStyles: Story = {
  args: {
    value: '',
    onChange: () => {},
  },
  render: function Render() {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    const [value5, setValue5] = useState('');
    const [value6, setValue6] = useState('');

    return (
      <FlexColumn gap='32px'>
        <FlexColumn gap='16px'>
          <Label>Outlined Style:</Label>
          <FlexRow gap='24px'>
            <TextField
              style='outlined'
              validation='none'
              label='Normal'
              placeholder='Outlined'
              value={value1}
              onChange={e => setValue1(e.target.value)}
            />
            <TextField
              style='outlined'
              validation='error'
              label='Error'
              placeholder='Outlined'
              value={value2}
              onChange={e => setValue2(e.target.value)}
            />
            <TextField
              style='outlined'
              validation='success'
              label='Success'
              placeholder='Outlined'
              value={value3}
              onChange={e => setValue3(e.target.value)}
            />
          </FlexRow>
        </FlexColumn>

        <FlexColumn gap='16px'>
          <Label>Empty Style:</Label>
          <FlexRow gap='24px'>
            <TextField
              style='empty'
              validation='none'
              label='Normal'
              placeholder='Empty'
              value={value4}
              onChange={e => setValue4(e.target.value)}
            />
            <TextField
              style='empty'
              validation='error'
              label='Error'
              placeholder='Empty'
              value={value5}
              onChange={e => setValue5(e.target.value)}
            />
            <TextField
              style='empty'
              validation='success'
              label='Success'
              placeholder='Empty'
              value={value6}
              onChange={e => setValue6(e.target.value)}
            />
          </FlexRow>
        </FlexColumn>
      </FlexColumn>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '**스타일 변형**\n\n' +
          '- `outlined`: 테두리가 있는 스타일 (기본값)\n' +
          '- `empty`: 테두리가 없는 스타일 (하단 보더만)',
      },
    },
  },
};

export const Layouts: Story = {
  args: {
    value: '',
    onChange: () => {},
  },
  render: function Render() {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');

    return (
      <FlexColumn gap='32px'>
        <div>
          <Label>Vertical Layout:</Label>
          <TextField
            layout='vertical'
            label='이름'
            placeholder='이름을 입력하세요'
            helperText='실명을 입력해주세요'
            value={value1}
            onChange={e => setValue1(e.target.value)}
          />
        </div>
        <div>
          <Label>Horizontal Layout:</Label>
          <TextField
            layout='horizontal'
            label='이름'
            placeholder='이름을 입력하세요'
            helperText='실명을 입력해주세요'
            value={value2}
            onChange={e => setValue2(e.target.value)}
          />
        </div>
      </FlexColumn>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '**레이아웃 방향**\n\n' +
          '- `vertical`: 세로 방향 (기본값)\n' +
          '- `horizontal`: 가로 방향',
      },
    },
  },
};

export const AllVariants: Story = {
  args: {
    value: '',
    onChange: () => {},
  },
  render: function Render() {
    const [basicValue, setBasicValue] = useState('');
    const [buttonValue, setButtonValue] = useState('');

    return (
      <FlexColumn gap='48px'>
        <FlexColumn gap='16px'>
          <label>
            <strong>TextField 기본형</strong>
          </label>
          <TextField
            label='이메일'
            placeholder='이메일을 입력하세요'
            helperText='유효한 이메일 주소를 입력해주세요'
            value={basicValue}
            onChange={e => setBasicValue(e.target.value)}
          />
        </FlexColumn>

        <FlexColumn gap='16px'>
          <label>
            <strong>TextField.Button (BlockButton.Basic 권장)</strong>
          </label>
          <TextField.Button
            label='인증 코드'
            placeholder='인증 코드를 입력하세요'
            helperText='이메일로 전송된 인증 코드를 입력해주세요'
            value={buttonValue}
            onChange={e => setButtonValue(e.target.value)}
            button={<BlockButton.Basic size='md'>인증</BlockButton.Basic>}
          />
        </FlexColumn>
      </FlexColumn>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '**모든 TextField 변형 (Controlled Pattern)**\n\n' +
          'Base + Variants 구조로 관심사를 분리하고, Namespace Pattern을 사용합니다:\n\n' +
          '1. **TextField**: 기본 Input 필드 (TextField.tsx)\n' +
          '2. **TextField.Button**: 버튼 포함 (TextFieldButton.tsx)\n\n' +
          '**권장사항:**\n' +
          '- TextField.Button의 button prop에는 BlockButton.Basic 사용을 권장합니다.\n' +
          '- size는 "md"로 고정하여 일관성을 유지합니다.\n\n' +
          '```tsx\n' +
          'import { TextField, BlockButton } from "@ject/jds";\n' +
          'import { useState } from "react";\n\n' +
          'const [value, setValue] = useState("");\n\n' +
          '// 기본\n' +
          '<TextField\n' +
          '  label="이메일"\n' +
          '  value={value}\n' +
          '  onChange={e => setValue(e.target.value)}\n' +
          '/>\n\n' +
          '// 버튼 포함 (BlockButton.Basic 권장)\n' +
          '<TextField.Button\n' +
          '  label="인증"\n' +
          '  value={value}\n' +
          '  onChange={e => setValue(e.target.value)}\n' +
          '  button={<BlockButton.Basic size="md">확인</BlockButton.Basic>}\n' +
          '/>\n' +
          '```',
      },
    },
  },
};
