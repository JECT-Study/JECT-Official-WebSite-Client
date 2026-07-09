import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";

import { Badge } from "../Badge";
import {
  BADGE_SIZE_OPTIONS,
  BASIC_HIERARCHY_OPTIONS,
  FEEDBACK_VARIANT_OPTIONS,
} from "../badge.types";
import { CONTENT_BADGE_STYLE_OPTIONS, THEME_VARIANT_OPTIONS } from "./contentBadge.types";

const meta: Meta<typeof Badge.Content> = {
  title: "Components/Badge/Content",
  component: Badge.Content,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    hierarchy: {
      control: "radio",
      options: BASIC_HIERARCHY_OPTIONS,
    },
    feedback: {
      control: "radio",
      options: FEEDBACK_VARIANT_OPTIONS,
    },
    variant: {
      control: "select",
      options: THEME_VARIANT_OPTIONS,
    },
    size: {
      control: "radio",
      options: BADGE_SIZE_OPTIONS,
    },
    badgeStyle: {
      control: "radio",
      options: CONTENT_BADGE_STYLE_OPTIONS,
    },
    isMuted: {
      control: "boolean",
    },
    withIconButton: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge.Content>;

const getIconButtonProps = (withIconButton?: boolean) =>
  withIconButton
    ? { withIconButton: true as const, onIconClick: () => undefined }
    : { withIconButton: false as const };

export const Default: Story = {
  argTypes: {
    feedback: {
      control: false,
    },
    variant: {
      control: false,
    },
  },
  args: {
    hierarchy: "accent",
    size: "md",
    badgeStyle: "alpha",
    isMuted: false,
    withIconButton: false,
    children: "레이블",
  },
  render: args => (
    <Badge.Content
      hierarchy={args.hierarchy}
      size={args.size}
      badgeStyle={args.badgeStyle}
      isMuted={args.isMuted}
      {...getIconButtonProps(args.withIconButton)}
    >
      {args.children}
    </Badge.Content>
  ),
};

export const ContentBadgeSizes: Story = {
  argTypes: {
    size: {
      control: false,
    },
    feedback: {
      control: false,
    },
    variant: {
      control: false,
    },
  },
  args: {
    hierarchy: "accent",
    badgeStyle: "solid",
    isMuted: false,
    withIconButton: false,
    children: "레이블",
  },
  render: args => (
    <FlexRow>
      {BADGE_SIZE_OPTIONS.map(size => (
        <Badge.Content
          key={size}
          hierarchy={args.hierarchy}
          size={size}
          badgeStyle={args.badgeStyle}
          isMuted={args.isMuted}
          {...getIconButtonProps(args.withIconButton)}
        >
          {args.children}
        </Badge.Content>
      ))}
    </FlexRow>
  ),
};

export const ContentBadgeBadgeStyles: Story = {
  argTypes: {
    badgeStyle: {
      control: false,
    },
    feedback: {
      control: false,
    },
    variant: {
      control: false,
    },
  },
  args: {
    hierarchy: "accent",
    size: "md",
    isMuted: false,
    withIconButton: false,
    children: "레이블",
  },
  render: args => (
    <FlexRow>
      {CONTENT_BADGE_STYLE_OPTIONS.map(badgeStyle => (
        <Badge.Content
          key={badgeStyle}
          hierarchy={args.hierarchy}
          size={args.size}
          badgeStyle={badgeStyle}
          isMuted={args.isMuted}
          {...getIconButtonProps(args.withIconButton)}
        >
          {args.children}
        </Badge.Content>
      ))}
    </FlexRow>
  ),
};

export const ContentBadgeHierarchies: Story = {
  argTypes: {
    hierarchy: {
      control: false,
    },
    feedback: {
      control: false,
    },
    variant: {
      control: false,
    },
  },
  args: {
    size: "md",
    badgeStyle: "solid",
    isMuted: false,
    withIconButton: false,
    children: "레이블",
  },
  render: args => (
    <FlexRow>
      {BASIC_HIERARCHY_OPTIONS.map(hierarchy => (
        <Badge.Content
          key={hierarchy}
          hierarchy={hierarchy}
          size={args.size}
          badgeStyle={args.badgeStyle}
          isMuted={args.isMuted}
          {...getIconButtonProps(args.withIconButton)}
        >
          {args.children}
        </Badge.Content>
      ))}
    </FlexRow>
  ),
};

export const ContentBadgeFeedback: Story = {
  argTypes: {
    hierarchy: {
      control: false,
    },
    feedback: {
      control: false,
    },
    variant: {
      control: false,
    },
  },
  args: {
    size: "md",
    badgeStyle: "solid",
    isMuted: false,
    withIconButton: false,
    children: "레이블",
  },
  render: args => (
    <FlexRow>
      {FEEDBACK_VARIANT_OPTIONS.map(feedback => (
        <Badge.Content
          key={feedback}
          feedback={feedback}
          size={args.size}
          badgeStyle={args.badgeStyle}
          isMuted={args.isMuted}
          {...getIconButtonProps(args.withIconButton)}
        >
          {args.children}
        </Badge.Content>
      ))}
    </FlexRow>
  ),
};

export const ContentBadgeWithIconButton: Story = {
  argTypes: {
    badgeStyle: {
      control: false,
    },
    hierarchy: {
      control: false,
    },
    feedback: {
      control: false,
    },
    variant: {
      control: false,
    },
    withIconButton: {
      control: false,
    },
  },
  args: {
    size: "md",
    isMuted: false,
    children: "레이블",
  },
  render: args => (
    <FlexColumn style={{ alignItems: "center" }}>
      <FlexRow>
        {CONTENT_BADGE_STYLE_OPTIONS.map(badgeStyle => (
          <Badge.Content
            key={badgeStyle}
            hierarchy='accent'
            size={args.size}
            badgeStyle={badgeStyle}
            isMuted={args.isMuted}
            withIconButton
            onIconClick={() => undefined}
          >
            {args.children}
          </Badge.Content>
        ))}
      </FlexRow>
      <FlexRow>
        {CONTENT_BADGE_STYLE_OPTIONS.map(badgeStyle => (
          <Badge.Content
            key={badgeStyle}
            feedback='positive'
            size={args.size}
            badgeStyle={badgeStyle}
            isMuted={args.isMuted}
            withIconButton
            onIconClick={() => undefined}
          >
            {args.children}
          </Badge.Content>
        ))}
      </FlexRow>
    </FlexColumn>
  ),
};

export const ContentBadgeTheme: Story = {
  argTypes: {
    hierarchy: {
      control: false,
    },
    feedback: {
      control: false,
    },
    variant: {
      control: false,
    },
    withIconButton: {
      control: false,
    },
  },
  args: {
    size: "md",
    badgeStyle: "solid",
    isMuted: false,
    children: "레이블",
  },
  render: args => (
    <FlexRow>
      {THEME_VARIANT_OPTIONS.map(variant => (
        <Badge.Content
          key={variant}
          variant={variant}
          size={args.size}
          badgeStyle={args.badgeStyle}
          isMuted={args.isMuted}
        >
          {args.children}
        </Badge.Content>
      ))}
    </FlexRow>
  ),
};

export const ContentBadgeMuted: Story = {
  argTypes: {
    badgeStyle: {
      control: false,
    },
    feedback: {
      control: false,
    },
    variant: {
      control: false,
    },
    isMuted: {
      control: false,
    },
  },
  args: {
    hierarchy: "accent",
    size: "md",
    withIconButton: false,
    children: "레이블",
  },
  render: args => (
    <FlexRow>
      {CONTENT_BADGE_STYLE_OPTIONS.map(badgeStyle => (
        <Badge.Content
          key={badgeStyle}
          hierarchy={args.hierarchy}
          size={args.size}
          badgeStyle={badgeStyle}
          isMuted
          {...getIconButtonProps(args.withIconButton)}
        >
          {args.children}
        </Badge.Content>
      ))}
    </FlexRow>
  ),
};

export const ContentBadgeFeedbackMuted: Story = {
  argTypes: {
    hierarchy: {
      control: false,
    },
    badgeStyle: {
      control: false,
    },
    feedback: {
      control: false,
    },
    variant: {
      control: false,
    },
    isMuted: {
      control: false,
    },
  },
  args: {
    size: "md",
    withIconButton: false,
    children: "레이블",
  },
  render: args => (
    <FlexColumn>
      {FEEDBACK_VARIANT_OPTIONS.map(feedback => (
        <FlexRow key={feedback}>
          {CONTENT_BADGE_STYLE_OPTIONS.map(badgeStyle => (
            <Badge.Content
              key={badgeStyle}
              feedback={feedback}
              size={args.size}
              badgeStyle={badgeStyle}
              isMuted
              {...getIconButtonProps(args.withIconButton)}
            >
              {args.children}
            </Badge.Content>
          ))}
        </FlexRow>
      ))}
    </FlexColumn>
  ),
};

export const ContentBadgeThemeMuted: Story = {
  argTypes: {
    hierarchy: {
      control: false,
    },
    badgeStyle: {
      control: false,
    },
    feedback: {
      control: false,
    },
    variant: {
      control: false,
    },
    isMuted: {
      control: false,
    },
    withIconButton: {
      control: false,
    },
  },
  args: {
    size: "md",
    children: "레이블",
  },
  render: args => (
    <FlexColumn style={{ alignItems: "center" }}>
      {CONTENT_BADGE_STYLE_OPTIONS.map(badgeStyle => (
        <FlexRow key={badgeStyle}>
          {THEME_VARIANT_OPTIONS.map(variant => (
            <Badge.Content
              key={variant}
              variant={variant}
              size={args.size}
              badgeStyle={badgeStyle}
              isMuted
            >
              {args.children}
            </Badge.Content>
          ))}
        </FlexRow>
      ))}
    </FlexColumn>
  ),
};
