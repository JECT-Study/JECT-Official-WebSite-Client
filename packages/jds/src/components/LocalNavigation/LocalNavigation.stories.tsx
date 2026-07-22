import type { Meta, StoryObj } from "@storybook/react-vite";
import floatedNavBg from "@storybook-assets/floated-nav-bg.jpg";
import { IconButton } from "components";
import { type ComponentType } from "react";
import { vars } from "tokens";

import { LocalNavigation } from "./LocalNavigation";
import { LOCAL_NAVIGATION_TITLE_AS_OPTIONS } from "./localNavigation.types";

const withContainer = (Story: ComponentType) => (
  <div
    style={{
      padding: vars.scheme.semantic.spacing["20"],
    }}
  >
    <Story />
  </div>
);

const withFloatedBackground = (Story: ComponentType) => (
  <div
    style={{
      backgroundImage: `url(${floatedNavBg})`,
      padding: `${vars.scheme.semantic.spacing["32"]} ${vars.scheme.semantic.spacing["20"]}`,
    }}
  >
    <Story />
  </div>
);

const meta = {
  title: "Components/LocalNavigation",
  component: LocalNavigation,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    title: {
      control: "text",
      description: "내비게이션 타이틀 텍스트",
    },
    titleAs: {
      control: "select",
      options: LOCAL_NAVIGATION_TITLE_AS_OPTIONS,
      description: "타이틀 요소 태그. heading 레벨은 문서 구조에 맞게 지정",
      table: { defaultValue: { summary: "span" } },
    },
    nested: {
      control: "boolean",
      description: "하위 계층 여부 (true면 뒤로 가기 버튼 노출)",
      table: { defaultValue: { summary: "false" } },
    },
    floated: {
      control: "boolean",
      description: "반투명 배경 및 블러, 하단 border 적용 여부",
      table: { defaultValue: { summary: "false" } },
    },
    stretched: {
      control: "boolean",
      description: "기본 좌우 여백 제거 여부",
      table: { defaultValue: { summary: "false" } },
    },
    suffixAction: {
      control: false,
      description: "타이틀 우측 액션 슬롯",
    },
  },
  args: {
    title: "내비게이션 타이틀",
    titleAs: "span",
    nested: false,
    floated: false,
    stretched: false,
  },
} satisfies Meta<typeof LocalNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Root: Story = {
  args: {
    nested: false,
  },
  decorators: [withContainer],
  parameters: {
    docs: {
      description: {
        story: "최상위 내비게이션입니다. 뒤로 가기 버튼이 노출되지 않습니다.",
      },
    },
  },
};

export const Nested: Story = {
  args: {
    nested: true,
  },
  decorators: [withContainer],
  parameters: {
    docs: {
      description: {
        story: "하위 내비게이션입니다. 좌측에 뒤로 가기 버튼이 노출됩니다.",
      },
    },
  },
};

export const Floated: Story = {
  args: {
    nested: true,
    floated: true,
  },
  decorators: [withFloatedBackground],
  parameters: {
    docs: {
      description: {
        story: "floated=true일 때 반투명 배경과 블러, 하단 border가 적용됩니다.",
      },
    },
  },
};

export const Stretched: Story = {
  args: {
    stretched: true,
  },
  decorators: [withContainer],
  parameters: {
    docs: {
      description: {
        story: "stretched=true일 때 좌우 margin이 제거됩니다.",
      },
    },
  },
};

export const WithSuffixAction: Story = {
  args: {
    nested: true,
    suffixAction: <IconButton hierarchy='tertiary' size='xl' icon='blank' />,
  },
  decorators: [withContainer],
  parameters: {
    docs: {
      description: {
        story: "suffixAction 슬롯으로 타이틀 우측에 액션 버튼을 배치할 수 있습니다.",
      },
    },
  },
};
