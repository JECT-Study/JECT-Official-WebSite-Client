import type { Meta, StoryObj } from '@storybook/react';
import { FlexRow, FlexColumn, Label } from '@storybook-utils/layout';
import { Checkbox, type CheckedState } from 'components';
import { useState } from 'react';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox.Basic,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    checked: {
      control: 'select',
      options: [false, true, 'indeterminate'],
      description: '체크 상태 (boolean | "indeterminate")',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: '체크박스의 크기',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isInvalid: {
      control: 'boolean',
      description: '유효하지 않은 상태 (에러)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Checkbox.Basic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    size: 'md',
  },
};

export const AllSizes: Story = {
  render: () => (
    <FlexRow>
      <Checkbox.Basic size='xs' />
      <Checkbox.Basic size='sm' />
      <Checkbox.Basic size='md' />
      <Checkbox.Basic size='lg' />
    </FlexRow>
  ),
};

export const AllStates: Story = {
  render: () => (
    <FlexColumn>
      <Label>Unchecked:</Label>
      <FlexRow gap='12px'>
        <Checkbox.Basic checked={false} size='xs' />
        <Checkbox.Basic checked={false} size='sm' />
        <Checkbox.Basic checked={false} size='md' />
        <Checkbox.Basic checked={false} size='lg' />
      </FlexRow>
      <Label>Checked:</Label>
      <FlexRow gap='12px'>
        <Checkbox.Basic checked={true} size='xs' />
        <Checkbox.Basic checked={true} size='sm' />
        <Checkbox.Basic checked={true} size='md' />
        <Checkbox.Basic checked={true} size='lg' />
      </FlexRow>
      <Label>Indeterminate:</Label>
      <FlexRow gap='12px'>
        <Checkbox.Basic checked='indeterminate' size='xs' />
        <Checkbox.Basic checked='indeterminate' size='sm' />
        <Checkbox.Basic checked='indeterminate' size='md' />
        <Checkbox.Basic checked='indeterminate' size='lg' />
      </FlexRow>
    </FlexColumn>
  ),
};

export const DisabledStates: Story = {
  render: () => (
    <FlexColumn>
      <Label>Disabled Unchecked:</Label>
      <FlexRow gap='12px'>
        <Checkbox.Basic checked={false} disabled size='xs' />
        <Checkbox.Basic checked={false} disabled size='sm' />
        <Checkbox.Basic checked={false} disabled size='md' />
        <Checkbox.Basic checked={false} disabled size='lg' />
      </FlexRow>
      <Label>Disabled Checked:</Label>
      <FlexRow gap='12px'>
        <Checkbox.Basic checked={true} disabled size='xs' />
        <Checkbox.Basic checked={true} disabled size='sm' />
        <Checkbox.Basic checked={true} disabled size='md' />
        <Checkbox.Basic checked={true} disabled size='lg' />
      </FlexRow>
      <Label>Disabled Indeterminate:</Label>
      <FlexRow gap='12px'>
        <Checkbox.Basic checked='indeterminate' disabled size='xs' />
        <Checkbox.Basic checked='indeterminate' disabled size='sm' />
        <Checkbox.Basic checked='indeterminate' disabled size='md' />
        <Checkbox.Basic checked='indeterminate' disabled size='lg' />
      </FlexRow>
    </FlexColumn>
  ),
};

export const InvalidStates: Story = {
  render: () => (
    <FlexColumn>
      <Label>Invalid Unchecked:</Label>
      <FlexRow gap='12px'>
        <Checkbox.Basic checked={false} isInvalid size='xs' />
        <Checkbox.Basic checked={false} isInvalid size='sm' />
        <Checkbox.Basic checked={false} isInvalid size='md' />
        <Checkbox.Basic checked={false} isInvalid size='lg' />
      </FlexRow>
      <Label>Invalid Checked:</Label>
      <FlexRow gap='12px'>
        <Checkbox.Basic checked={true} isInvalid size='xs' />
        <Checkbox.Basic checked={true} isInvalid size='sm' />
        <Checkbox.Basic checked={true} isInvalid size='md' />
        <Checkbox.Basic checked={true} isInvalid size='lg' />
      </FlexRow>
      <Label>Invalid Indeterminate:</Label>
      <FlexRow gap='12px'>
        <Checkbox.Basic checked='indeterminate' isInvalid size='xs' />
        <Checkbox.Basic checked='indeterminate' isInvalid size='sm' />
        <Checkbox.Basic checked='indeterminate' isInvalid size='md' />
        <Checkbox.Basic checked='indeterminate' isInvalid size='lg' />
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: '유효하지 않은 상태는 에러 색상으로 표시됩니다.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const ControlledCheckbox = () => {
      const [checkedState, setCheckedState] = useState<CheckedState>(false);

      return (
        <FlexColumn>
          <label>
            현재 상태:{' '}
            {checkedState === 'indeterminate'
              ? 'indeterminate'
              : checkedState
                ? 'checked'
                : 'unchecked'}
          </label>
          <Checkbox.Basic checked={checkedState} onCheckedChange={setCheckedState} />
          <FlexRow gap='8px'>
            <button onClick={() => setCheckedState(false)}>UnChecked만들기</button>
            <button onClick={() => setCheckedState(true)}>Checked만들기</button>
            <button onClick={() => setCheckedState('indeterminate')}>Indeterminate만들기</button>
          </FlexRow>
        </FlexColumn>
      );
    };

    return <ControlledCheckbox />;
  },
  parameters: {
    docs: {
      description: {
        story:
          '`checked` prop이 `boolean | "indeterminate"` 타입을 받습니다. 하나의 prop으로 세 가지 상태(unchecked, checked, indeterminate)를 모두 표현할 수 있습니다.',
      },
    },
  },
};

export const RefCallbackTest: Story = {
  render: () => {
    const RefCallbackTestComponent = () => {
      const [checkedState, setCheckedState] = useState<CheckedState>(false);
      const [renderCount, setRenderCount] = useState(0);

      return (
        <FlexColumn gap='16px'>
          <div
            style={{
              padding: '16px',
              backgroundColor: '#f0f0f0',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>
              RefCallback 동작 테스트
            </h4>
            <p style={{ margin: '4px 0', color: '#666' }}>
              <strong>테스트 목적:</strong> isIndeterminate 변경 시 refCallback이 재생성되어 ref
              detach/attach가 발생하는지 확인
            </p>
            <p style={{ margin: '4px 0', color: '#666' }}>
              <strong>예상 동작:</strong> isIndeterminate가 변경될 때마다 DETACHED → ATTACHED 로그가
              콘솔에 출력됨
            </p>
            <p style={{ margin: '4px 0', color: '#666' }}>
              <strong>확인 방법:</strong> 개발자 도구 콘솔을 열고 버튼을 클릭하여 로그를 확인하세요
            </p>
          </div>

          <div
            style={{
              padding: '12px',
              backgroundColor: '#e3f2fd',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          >
            <div>
              <strong>현재 상태:</strong>{' '}
              {checkedState === 'indeterminate'
                ? '🔶 indeterminate'
                : checkedState
                  ? '✅ checked'
                  : '⬜ unchecked'}
            </div>
            <div>
              <strong>렌더 횟수:</strong> {renderCount}
            </div>
          </div>

          <Checkbox.Basic
            checked={checkedState}
            onCheckedChange={newState => {
              setCheckedState(newState);
              setRenderCount(c => c + 1);
            }}
            size='lg'
          />

          <FlexRow gap='8px'>
            <button
              onClick={() => {
                setCheckedState(false);
                setRenderCount(c => c + 1);
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              ⬜ Unchecked
            </button>
            <button
              onClick={() => {
                setCheckedState(true);
                setRenderCount(c => c + 1);
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              ✅ Checked
            </button>
            <button
              onClick={() => {
                setCheckedState('indeterminate');
                setRenderCount(c => c + 1);
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              🔶 Indeterminate
            </button>
          </FlexRow>

          <button
            onClick={() => {
              console.clear();
              console.log('🧹 Console cleared - Start testing!');
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            콘솔 초기화
          </button>
        </FlexColumn>
      );
    };

    return <RefCallbackTestComponent />;
  },
  parameters: {
    docs: {
      description: {
        story:
          '**refCallback 동작 테스트용 스토리**\n\n' +
          '이 스토리는 `isIndeterminate` 상태가 변경될 때 `refCallback`이 어떻게 동작하는지 테스트하기 위한 것입니다.\n\n' +
          '**현재 구현:**\n' +
          '- `refCallback`의 의존성: `[ref, isIndeterminate]`\n' +
          '- `isIndeterminate`가 변경되면 refCallback이 재생성되고, React는 ref detach → attach를 수행합니다.\n\n' +
          '**테스트 방법:**\n' +
          '1. 개발자 도구 콘솔을 엽니다\n' +
          '2. "Clear Console" 버튼을 클릭하여 로그를 정리합니다\n' +
          '3. 상태 버튼을 클릭하며 콘솔 로그를 관찰합니다\n' +
          '4. `unchecked ↔ checked` 변경 시: 로그가 출력되지 않음 (isIndeterminate는 false로 동일)\n' +
          '5. `checked ↔ indeterminate` 변경 시: DETACHED → ATTACHED 로그 출력 (isIndeterminate 변경)\n\n' +
          '**개선 방향:**\n' +
          '- `useLayoutEffect`를 사용하여 `indeterminate` 속성 설정을 분리\n' +
          '- `refCallback`은 ref 연결만 담당하고 의존성을 `[ref]`로 축소\n' +
          '- 불필요한 ref detach/attach 방지',
      },
    },
  },
};

export const ControlledPattern: Story = {
  render: () => {
    const ControlledExample = () => {
      const [checked1, setChecked1] = useState<CheckedState>(false);
      const [checked2, setChecked2] = useState<CheckedState>(true);
      const [checked3, setChecked3] = useState<CheckedState>('indeterminate');

      return (
        <FlexColumn gap='12px'>
          <label>Controlled Pattern</label>
          <FlexColumn gap='8px'>
            <Checkbox.Basic checked={checked1} onCheckedChange={setChecked1} />
            <Checkbox.Content
              label='Checked by default'
              subLabel='State managed by parent'
              variant='empty'
              checked={checked2}
              onCheckedChange={setChecked2}
            />
            <Checkbox.Content
              label='Indeterminate state'
              subLabel='Click to toggle'
              variant='outlined'
              checked={checked3}
              onCheckedChange={setChecked3}
            />
          </FlexColumn>
        </FlexColumn>
      );
    };

    return <ControlledExample />;
  },
  parameters: {
    docs: {
      description: {
        story:
          '**Controlled Pattern (필수)**: JDS Checkbox는 controlled pattern만 지원합니다.\n\n' +
          '```tsx\n' +
          '// Controlled - checked + onCheckedChange\n' +
          'const [checked, setChecked] = useState<CheckedState>(false);\n' +
          '<Checkbox.Basic checked={checked} onCheckedChange={setChecked} />\n\n' +
          '// Indeterminate state\n' +
          '<Checkbox.Basic checked="indeterminate" onCheckedChange={setChecked} />\n' +
          '```',
      },
    },
  },
};

export const ContentEmpty: Story = {
  render: () => (
    <FlexColumn>
      <Label>Left Aligned:</Label>
      <FlexColumn gap='12px'>
        <Checkbox.Content size='xs' label='Extra Small Label' variant='empty' align='left' />
        <Checkbox.Content size='sm' label='Small Label' variant='empty' align='left' />
        <Checkbox.Content size='md' label='Medium Label' variant='empty' align='left' />
        <Checkbox.Content size='lg' label='Large Label' variant='empty' align='left' />
      </FlexColumn>
      <Label>Right Aligned:</Label>
      <FlexColumn gap='12px'>
        <Checkbox.Content size='xs' label='Extra Small Label' variant='empty' align='right' />
        <Checkbox.Content size='sm' label='Small Label' variant='empty' align='right' />
        <Checkbox.Content size='md' label='Medium Label' variant='empty' align='right' />
        <Checkbox.Content size='lg' label='Large Label' variant='empty' align='right' />
      </FlexColumn>
    </FlexColumn>
  ),
};

export const ContentOutlined: Story = {
  render: () => (
    <FlexColumn>
      <Label>Left Aligned:</Label>
      <FlexColumn gap='12px'>
        <Checkbox.Content size='xs' label='Extra Small Label' variant='outlined' align='left' />
        <Checkbox.Content size='sm' label='Small Label' variant='outlined' align='left' />
        <Checkbox.Content size='md' label='Medium Label' variant='outlined' align='left' />
        <Checkbox.Content size='lg' label='Large Label' variant='outlined' align='left' />
      </FlexColumn>
      <Label>Right Aligned:</Label>
      <FlexColumn gap='12px'>
        <Checkbox.Content size='xs' label='Extra Small Label' variant='outlined' align='right' />
        <Checkbox.Content size='sm' label='Small Label' variant='outlined' align='right' />
        <Checkbox.Content size='md' label='Medium Label' variant='outlined' align='right' />
        <Checkbox.Content size='lg' label='Large Label' variant='outlined' align='right' />
      </FlexColumn>
    </FlexColumn>
  ),
};

export const ContentWithSubLabel: Story = {
  render: () => (
    <FlexColumn gap='12px'>
      <Checkbox.Content
        size='xs'
        label='Main Label'
        subLabel='This is a sub label'
        variant='empty'
      />
      <Checkbox.Content
        size='sm'
        label='Main Label'
        subLabel='This is a sub label'
        variant='empty'
      />
      <Checkbox.Content
        size='md'
        label='Main Label'
        subLabel='This is a sub label'
        variant='empty'
      />
      <Checkbox.Content
        size='lg'
        label='Main Label'
        subLabel='This is a sub label'
        variant='empty'
      />
    </FlexColumn>
  ),
};

export const ContentOutlinedWithSubLabel: Story = {
  render: () => (
    <FlexColumn gap='12px'>
      <Checkbox.Content
        size='xs'
        label='Main Label'
        subLabel='This is a sub label'
        variant='outlined'
      />
      <Checkbox.Content
        size='sm'
        label='Main Label'
        subLabel='This is a sub label'
        variant='outlined'
      />
      <Checkbox.Content
        size='md'
        label='Main Label'
        subLabel='This is a sub label'
        variant='outlined'
      />
      <Checkbox.Content
        size='lg'
        label='Main Label'
        subLabel='This is a sub label'
        variant='outlined'
      />
    </FlexColumn>
  ),
};

export const ContentInvalidStates: Story = {
  render: () => (
    <FlexColumn gap='12px'>
      <Label>Invalid Empty:</Label>
      <Checkbox.Content
        size='md'
        label='Invalid Label'
        subLabel='This field is required'
        variant='empty'
        isInvalid
      />
      <Label>Invalid Outlined:</Label>
      <Checkbox.Content
        size='md'
        label='Invalid Label'
        subLabel='This field is required'
        variant='outlined'
        isInvalid
      />
      <Label>Invalid Disabled:</Label>
      <Checkbox.Content
        size='md'
        label='Invalid Disabled Label'
        subLabel='This field is required'
        variant='outlined'
        isInvalid
        disabled
      />
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Content variant에서도 isInvalid 상태를 지원합니다. 레이블 텍스트와 border가 에러 색상으로 표시됩니다.',
      },
    },
  },
};

export const ComprehensiveMatrix: Story = {
  render: () => (
    <FlexColumn gap='32px'>
      <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Checkbox.Basic</h3>
      <FlexColumn gap='12px'>
        {(['xs', 'sm', 'md', 'lg'] as const).map(size => (
          <FlexColumn key={size} gap='12px'>
            <Label>{size.toUpperCase()}:</Label>
            <FlexRow gap='12px'>
              <Checkbox.Basic size={size} checked={false} />
              <Checkbox.Basic size={size} checked={true} />
              <Checkbox.Basic size={size} checked='indeterminate' />
              <Checkbox.Basic size={size} checked={false} disabled />
              <Checkbox.Basic size={size} checked={true} disabled />
              <Checkbox.Basic size={size} checked='indeterminate' disabled />
            </FlexRow>
          </FlexColumn>
        ))}
      </FlexColumn>

      <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Checkbox.Content</h3>
      <FlexColumn gap='12px'>
        {(['empty', 'outlined'] as const).map(variant => (
          <FlexColumn key={variant} gap='12px'>
            <Label>{variant.charAt(0).toUpperCase() + variant.slice(1)}:</Label>
            <FlexColumn gap='8px'>
              <Checkbox.Content
                size='md'
                label='Normal'
                subLabel='Sub label text'
                variant={variant}
              />
              <Checkbox.Content
                size='md'
                label='Checked'
                subLabel='Sub label text'
                variant={variant}
                checked={true}
              />
              <Checkbox.Content
                size='md'
                label='Disabled'
                subLabel='Sub label text'
                variant={variant}
                disabled
              />
              <Checkbox.Content
                size='md'
                label='Invalid'
                subLabel='This field is required'
                variant={variant}
                isInvalid
              />
            </FlexColumn>
          </FlexColumn>
        ))}
      </FlexColumn>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 size, variant, 상태 조합을 한눈에 확인할 수 있습니다.',
      },
    },
  },
};
