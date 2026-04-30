import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexRow, FlexColumn, Label } from "@storybook-utils/layout";
import {
  ICON_BUTTON_HIERARCHY_OPTIONS,
  ICON_BUTTON_SIZE_OPTIONS,
  IconButton,
  type IconButtonSize,
} from "components";

const MATRIX_SIZE_OPTIONS = ["sm", "md", "xl"] as const satisfies readonly IconButtonSize[];

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    icon: {
      control: "text",
      description: "표시할 아이콘 이름입니다. Icon 컴포넌트에서 사용하는 값입니다.",
    },
    hierarchy: {
      control: "select",
      options: ICON_BUTTON_HIERARCHY_OPTIONS,
      description: "버튼의 시각적 맥락적 위계 구분",
    },
    size: {
      control: "select",
      options: ICON_BUTTON_SIZE_OPTIONS,
      description: "컴포넌트의 크기",
    },
    condensed: {
      control: "boolean",
      description:
        "true: 내부 패딩 없이 아이콘 크기로만 렌더되며 인터랙션 효과가 외부로 약간 확장됩니다. false: 사이즈별 spacing/radius 토큰만큼 padding을 가지고 인터랙션이 컴포넌트 외경에 맞춰집니다.",
    },
    disabled: {
      control: "boolean",
      description: "비활성화되었는지 여부",
    },
    "aria-label": {
      control: "text",
      description: "접근성 레이블이며 아이콘 버튼은 화면에 텍스트가 없으므로 항상 지정해야 합니다.",
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "check-line",
    hierarchy: "primary",
    size: "md",
    "aria-label": "체크 버튼",
  },
};

export const AllSizes: Story = {
  args: { icon: "check-line" },
  render: () => (
    <FlexRow>
      <IconButton icon='check-line' size='2xs' aria-label='2XS Check' />
      <IconButton icon='check-line' size='xs' aria-label='XS Check' />
      <IconButton icon='check-line' size='sm' aria-label='SM Check' />
      <IconButton icon='check-line' size='md' aria-label='MD Check' />
      <IconButton icon='check-line' size='lg' aria-label='LG Check' />
      <IconButton icon='check-line' size='xl' aria-label='XL Check' />
      <IconButton icon='check-line' size='2xl' aria-label='2XL Check' />
      <IconButton icon='check-line' size='3xl' aria-label='3XL Check' />
    </FlexRow>
  ),
};

export const AllHierarchies: Story = {
  args: { icon: "check-line" },
  render: () => (
    <FlexRow>
      <IconButton icon='check-line' hierarchy='accent' aria-label='Accent Check' />
      <IconButton icon='check-line' hierarchy='primary' aria-label='Primary Check' />
      <IconButton icon='check-line' hierarchy='secondary' aria-label='Secondary Check' />
      <IconButton icon='check-line' hierarchy='tertiary' aria-label='Tertiary Check' />
    </FlexRow>
  ),
};

export const Condensed: Story = {
  args: { icon: "check-line" },
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Label>condensed = true (default):</Label>
        <IconButton icon='check-line' size='md' condensed aria-label='Condensed MD' />
        <IconButton icon='check-line' size='xl' condensed aria-label='Condensed XL' />
        <IconButton icon='check-line' size='3xl' condensed aria-label='Condensed 3XL' />
      </FlexRow>
      <FlexRow>
        <Label>condensed = false:</Label>
        <IconButton icon='check-line' size='md' condensed={false} aria-label='Spacious MD' />
        <IconButton icon='check-line' size='xl' condensed={false} aria-label='Spacious XL' />
        <IconButton icon='check-line' size='3xl' condensed={false} aria-label='Spacious 3XL' />
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "condensed=true는 아이콘 외경에 맞고, condensed=false는 사이즈별 spacing 토큰만큼 padding을 두어 컴포넌트 자체가 더 큽니다. rest, hover, active, focus 상태를 직접 테스트해보세요.",
      },
    },
  },
};

export const HierarchyWithSizes: Story = {
  args: { icon: "check-line" },
  render: () => (
    <FlexColumn>
      {ICON_BUTTON_HIERARCHY_OPTIONS.map(hierarchy => (
        <FlexRow key={hierarchy}>
          <Label>{hierarchy}:</Label>
          {MATRIX_SIZE_OPTIONS.map(size => (
            <IconButton
              key={size}
              icon='check-line'
              size={size}
              hierarchy={hierarchy}
              aria-label={`${hierarchy} ${size}`}
            />
          ))}
        </FlexRow>
      ))}
    </FlexColumn>
  ),
};

export const AccentOverridable: Story = {
  args: { icon: "check-line" },
  render: () => (
    <FlexRow>
      <IconButton icon='check-line' hierarchy='accent' size='md' aria-label='Accent MD' />
      <IconButton icon='check-line' hierarchy='accent' size='xl' aria-label='Accent XL' />
      <IconButton icon='check-line' hierarchy='accent' size='3xl' aria-label='Accent 3XL' />
    </FlexRow>
  ),
  parameters: {
    docs: {
      description: {
        story: `DS는 feedback prop을 직접 노출하지 않습니다. 대신 \`hierarchy='accent'\`에서 색상을
\`iconButtonAccentColor\` / \`iconButtonAccentDisabledColor\` CSS variable로 덮어
사용처마다 positive / destructive 등의 프리셋을 만듭니다.

\`\`\`tsx
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { IconButton, iconButtonAccentColor, iconButtonAccentDisabledColor, vars } from 'jds';

<IconButton
  icon="close-line"
  hierarchy="accent"
  aria-label="삭제"
  style={assignInlineVars({
    [iconButtonAccentColor]: vars.color.semantic.feedback.destructive.normal,
    [iconButtonAccentDisabledColor]: vars.color.semantic.feedback.destructive.alpha.subtle,
  })}
/>
\`\`\``,
      },
    },
  },
};
