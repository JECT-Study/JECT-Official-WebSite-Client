import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";

import { Badge } from "../Badge";
import {
  BADGE_SIZE_OPTIONS,
  BASIC_HIERARCHY_OPTIONS,
  FEEDBACK_VARIANT_OPTIONS,
} from "../badge.types";
import { NUMERIC_BADGE_STYLE_OPTIONS } from "./numericBadge.types";

const meta: Meta<typeof Badge.Numeric> = {
  title: "Components/Badge/Numeric",
  component: Badge.Numeric,
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
    size: {
      control: "radio",
      options: BADGE_SIZE_OPTIONS,
    },
    badgeStyle: {
      control: "radio",
      options: NUMERIC_BADGE_STYLE_OPTIONS,
    },
    isMuted: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge.Numeric>;

export const Default: Story = {
  argTypes: {
    feedback: {
      control: false,
    },
  },
  args: {
    hierarchy: "accent",
    size: "md",
    badgeStyle: "alpha",
    isMuted: false,
    children: "99",
  },
  render: args => (
    <Badge.Numeric
      hierarchy={args.hierarchy}
      size={args.size}
      badgeStyle={args.badgeStyle}
      isMuted={args.isMuted}
    >
      {args.children}
    </Badge.Numeric>
  ),
};

export const NumericBadgeSizes: Story = {
  argTypes: {
    size: {
      control: false,
    },
    feedback: {
      control: false,
    },
  },
  args: {
    hierarchy: "accent",
    badgeStyle: "solid",
    isMuted: false,
    children: "99",
  },
  render: args => (
    <FlexRow>
      {BADGE_SIZE_OPTIONS.map(size => (
        <Badge.Numeric
          key={size}
          hierarchy={args.hierarchy}
          size={size}
          badgeStyle={args.badgeStyle}
          isMuted={args.isMuted}
        >
          {args.children}
        </Badge.Numeric>
      ))}
    </FlexRow>
  ),
};

export const NumericBadgeBadgeStyles: Story = {
  argTypes: {
    badgeStyle: {
      control: false,
    },
    feedback: {
      control: false,
    },
  },
  args: {
    hierarchy: "accent",
    size: "md",
    isMuted: false,
    children: "99",
  },
  render: args => (
    <FlexRow>
      {NUMERIC_BADGE_STYLE_OPTIONS.map(badgeStyle => (
        <Badge.Numeric
          key={badgeStyle}
          hierarchy={args.hierarchy}
          size={args.size}
          badgeStyle={badgeStyle}
          isMuted={args.isMuted}
        >
          {args.children}
        </Badge.Numeric>
      ))}
    </FlexRow>
  ),
};

export const NumericBadgeHierarchies: Story = {
  argTypes: {
    hierarchy: {
      control: false,
    },
    feedback: {
      control: false,
    },
  },
  args: {
    size: "md",
    badgeStyle: "solid",
    isMuted: false,
    children: "99",
  },
  render: args => (
    <FlexRow>
      {BASIC_HIERARCHY_OPTIONS.map(hierarchy => (
        <Badge.Numeric
          key={hierarchy}
          hierarchy={hierarchy}
          size={args.size}
          badgeStyle={args.badgeStyle}
          isMuted={args.isMuted}
        >
          {args.children}
        </Badge.Numeric>
      ))}
    </FlexRow>
  ),
};

export const NumericBadgeFeedback: Story = {
  argTypes: {
    hierarchy: {
      control: false,
    },
    feedback: {
      control: false,
    },
  },
  args: {
    size: "md",
    badgeStyle: "solid",
    isMuted: false,
    children: "99",
  },
  render: args => (
    <FlexRow>
      {FEEDBACK_VARIANT_OPTIONS.map(feedback => (
        <Badge.Numeric
          key={feedback}
          feedback={feedback}
          size={args.size}
          badgeStyle={args.badgeStyle}
          isMuted={args.isMuted}
        >
          {args.children}
        </Badge.Numeric>
      ))}
    </FlexRow>
  ),
};

export const NumericBadgeMuted: Story = {
  argTypes: {
    badgeStyle: {
      control: false,
    },
    feedback: {
      control: false,
    },
    isMuted: {
      control: false,
    },
  },
  args: {
    hierarchy: "accent",
    size: "md",
    children: "99",
  },
  render: args => (
    <FlexRow>
      {NUMERIC_BADGE_STYLE_OPTIONS.map(badgeStyle => (
        <Badge.Numeric
          key={badgeStyle}
          hierarchy={args.hierarchy}
          size={args.size}
          badgeStyle={badgeStyle}
          isMuted
        >
          {args.children}
        </Badge.Numeric>
      ))}
    </FlexRow>
  ),
};

export const NumericBadgeFeedbackMuted: Story = {
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
    isMuted: {
      control: false,
    },
  },
  args: {
    size: "md",
    children: "99",
  },
  render: args => (
    <FlexColumn>
      {FEEDBACK_VARIANT_OPTIONS.map(feedback => (
        <FlexRow key={feedback}>
          {NUMERIC_BADGE_STYLE_OPTIONS.map(badgeStyle => (
            <Badge.Numeric
              key={badgeStyle}
              feedback={feedback}
              size={args.size}
              badgeStyle={badgeStyle}
              isMuted
            >
              {args.children}
            </Badge.Numeric>
          ))}
        </FlexRow>
      ))}
    </FlexColumn>
  ),
};
