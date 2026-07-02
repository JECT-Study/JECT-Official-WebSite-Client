import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";

import { IconButton } from "./IconButton";
import {
  ICON_BUTTON_HIERARCHY_OPTIONS,
  ICON_BUTTON_SIZE_OPTIONS,
  type IconButtonSize,
} from "./iconButton.types";

const MATRIX_SIZE_OPTIONS = ["sm", "md", "xl"] as const satisfies readonly IconButtonSize[];

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    icon: {
      control: "text",
      description: "표시할 아이콘 이름 (Icon 컴포넌트에서 사용하는 값)",
    },
    hierarchy: {
      control: "select",
      options: ICON_BUTTON_HIERARCHY_OPTIONS,
      description: "버튼의 시각적 위계",
      table: { defaultValue: { summary: "primary" } },
    },
    size: {
      control: "select",
      options: ICON_BUTTON_SIZE_OPTIONS,
      description: "버튼 크기",
      table: { defaultValue: { summary: "md" } },
    },
    condensed: {
      control: "boolean",
      description:
        "true이면 버튼이 아이콘 크기에 맞게 렌더링되고, 인터랙션 영역이 아이콘 바깥까지 확장됩니다. false이면 사이즈별 spacing/radius 토큰에 따라 padding이 적용됩니다.",
      table: { defaultValue: { summary: "true" } },
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
      table: { defaultValue: { summary: "false" } },
    },
    "aria-label": {
      control: "text",
      description:
        "아이콘 버튼은 화면에 표시되는 텍스트가 없으므로, 스크린 리더를 위한 레이블을 반드시 지정해야 합니다.",
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: "check-line",
    hierarchy: "primary",
    size: "md",
    "aria-label": "체크 버튼",
  },
};

export const IconButtonSizes: Story = {
  render: () => (
    <FlexRow>
      {ICON_BUTTON_SIZE_OPTIONS.map(size => (
        <IconButton key={size} icon='check-line' size={size} aria-label={`체크 ${size}`} />
      ))}
    </FlexRow>
  ),
};

export const IconButtonHierarchies: Story = {
  render: () => (
    <FlexRow>
      {ICON_BUTTON_HIERARCHY_OPTIONS.map(hierarchy => (
        <IconButton
          key={hierarchy}
          icon='check-line'
          hierarchy={hierarchy}
          aria-label={`체크 ${hierarchy}`}
        />
      ))}
    </FlexRow>
  ),
};

export const IconButtonDisabled: Story = {
  render: () => (
    <FlexRow>
      {ICON_BUTTON_HIERARCHY_OPTIONS.map(hierarchy => (
        <IconButton
          key={hierarchy}
          icon='check-line'
          hierarchy={hierarchy}
          disabled
          aria-label={`체크 ${hierarchy}`}
        />
      ))}
    </FlexRow>
  ),
};

export const IconButtonCondensed: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow>
        {MATRIX_SIZE_OPTIONS.map(size => (
          <IconButton
            key={size}
            icon='check-line'
            size={size}
            condensed
            aria-label={`condensed ${size}`}
          />
        ))}
      </FlexRow>
      <FlexRow>
        {MATRIX_SIZE_OPTIONS.map(size => (
          <IconButton
            key={size}
            icon='check-line'
            size={size}
            condensed={false}
            aria-label={`spacious ${size}`}
          />
        ))}
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "위 행은 condensed=true(기본)로 아이콘 외경에 맞고, 아래 행은 condensed=false로 사이즈별 spacing 토큰만큼 padding을 둬 컴포넌트 자체가 더 큽니다.",
      },
    },
  },
};

export const IconButtonAccentOverride: Story = {
  render: () => (
    <FlexRow>
      {MATRIX_SIZE_OPTIONS.map(size => (
        <IconButton
          key={size}
          icon='check-line'
          hierarchy='accent'
          size={size}
          aria-label={`accent ${size}`}
        />
      ))}
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

export const IconButtonComprehensiveMatrix: Story = {
  render: () => (
    <FlexColumn>
      {ICON_BUTTON_HIERARCHY_OPTIONS.map(hierarchy => (
        <FlexRow key={hierarchy}>
          {MATRIX_SIZE_OPTIONS.map(size => (
            <IconButton
              key={size}
              icon='check-line'
              hierarchy={hierarchy}
              size={size}
              aria-label={`${hierarchy} ${size}`}
            />
          ))}
          {MATRIX_SIZE_OPTIONS.map(size => (
            <IconButton
              key={`${size}-disabled`}
              icon='check-line'
              hierarchy={hierarchy}
              size={size}
              disabled
              aria-label={`${hierarchy} ${size} disabled`}
            />
          ))}
        </FlexRow>
      ))}
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 hierarchy 및 대표 size 조합을 enabled / disabled로 한눈에 확인할 수 있습니다.",
      },
    },
  },
};
