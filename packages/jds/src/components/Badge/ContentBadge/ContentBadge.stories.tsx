import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";

import { ContentBadge } from "./ContentBadge";
import { CONTENT_BADGE_STYLE_OPTIONS, THEME_VARIANT_OPTIONS } from "./contentBadge.types";
import {
  BADGE_SIZE_OPTIONS,
  BASIC_HIERARCHY_OPTIONS,
  FEEDBACK_VARIANT_OPTIONS,
} from "../badge.types";

const meta: Meta<typeof ContentBadge> = {
  title: "Components/Badge/Content",
  component: ContentBadge,
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

type Story = StoryObj<typeof ContentBadge>;

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
    <ContentBadge
      hierarchy={args.hierarchy}
      size={args.size}
      badgeStyle={args.badgeStyle}
      isMuted={args.isMuted}
      {...getIconButtonProps(args.withIconButton)}
    >
      {args.children}
    </ContentBadge>
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
        <ContentBadge
          key={size}
          hierarchy={args.hierarchy}
          size={size}
          badgeStyle={args.badgeStyle}
          isMuted={args.isMuted}
          {...getIconButtonProps(args.withIconButton)}
        >
          {args.children}
        </ContentBadge>
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
        <ContentBadge
          key={badgeStyle}
          hierarchy={args.hierarchy}
          size={args.size}
          badgeStyle={badgeStyle}
          isMuted={args.isMuted}
          {...getIconButtonProps(args.withIconButton)}
        >
          {args.children}
        </ContentBadge>
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
        <ContentBadge
          key={hierarchy}
          hierarchy={hierarchy}
          size={args.size}
          badgeStyle={args.badgeStyle}
          isMuted={args.isMuted}
          {...getIconButtonProps(args.withIconButton)}
        >
          {args.children}
        </ContentBadge>
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
        <ContentBadge
          key={feedback}
          feedback={feedback}
          size={args.size}
          badgeStyle={args.badgeStyle}
          isMuted={args.isMuted}
          {...getIconButtonProps(args.withIconButton)}
        >
          {args.children}
        </ContentBadge>
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
          <ContentBadge
            key={badgeStyle}
            hierarchy='accent'
            size={args.size}
            badgeStyle={badgeStyle}
            isMuted={args.isMuted}
            withIconButton
            onIconClick={() => undefined}
          >
            {args.children}
          </ContentBadge>
        ))}
      </FlexRow>
      <FlexRow>
        {CONTENT_BADGE_STYLE_OPTIONS.map(badgeStyle => (
          <ContentBadge
            key={badgeStyle}
            feedback='positive'
            size={args.size}
            badgeStyle={badgeStyle}
            isMuted={args.isMuted}
            withIconButton
            onIconClick={() => undefined}
          >
            {args.children}
          </ContentBadge>
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
        <ContentBadge
          key={variant}
          variant={variant}
          size={args.size}
          badgeStyle={args.badgeStyle}
          isMuted={args.isMuted}
        >
          {args.children}
        </ContentBadge>
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
        <ContentBadge
          key={badgeStyle}
          hierarchy={args.hierarchy}
          size={args.size}
          badgeStyle={badgeStyle}
          isMuted
          {...getIconButtonProps(args.withIconButton)}
        >
          {args.children}
        </ContentBadge>
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
            <ContentBadge
              key={badgeStyle}
              feedback={feedback}
              size={args.size}
              badgeStyle={badgeStyle}
              isMuted
              {...getIconButtonProps(args.withIconButton)}
            >
              {args.children}
            </ContentBadge>
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
            <ContentBadge
              key={variant}
              variant={variant}
              size={args.size}
              badgeStyle={badgeStyle}
              isMuted
            >
              {args.children}
            </ContentBadge>
          ))}
        </FlexRow>
      ))}
    </FlexColumn>
  ),
};
