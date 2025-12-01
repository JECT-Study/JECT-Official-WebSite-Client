import type { Meta, StoryObj } from "@storybook/react-vite";

import { LocalNavigation } from "./LocalNavigation";
import { IconButton } from "../../Button/IconButton";

import { useMediaQueryFlags } from "@/hooks";

const customViewports = {
  desktop: {
    name: "Desktop (1200px)",
    styles: {
      width: "1200px",
      height: "800px",
    },
  },
  tablet: {
    name: "Tablet (768px)",
    styles: {
      width: "768px",
      height: "1024px",
    },
  },
  mobile: {
    name: "Mobile (320px)",
    styles: {
      width: "320px",
      height: "568px",
    },
  },
};

const meta = {
  title: "Components/LocalNavigation",
  component: LocalNavigation.Root,
  parameters: {
    viewport: {
      layout: "centered",
      viewports: customViewports,
    },
  },
  argTypes: {
    isStretched: {
      control: "boolean",
      description: "시각적 패딩 값의 여부",
    },
  },
  args: {
    isStretched: false,
  },
} satisfies Meta<typeof LocalNavigation.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <LocalNavigation.Root isStretched={args.isStretched}>
      <LocalNavigation.BackButton />
      <LocalNavigation.Title>네비게이션 타이틀</LocalNavigation.Title>
      <LocalNavigation.ButtonGroup>
        <IconButton.Basic hierarchy='tertiary' size='xl' icon='blank' />
        <IconButton.Basic hierarchy='tertiary' size='xl' icon='blank' />
        <IconButton.Basic hierarchy='tertiary' size='xl' icon='blank' />
      </LocalNavigation.ButtonGroup>
    </LocalNavigation.Root>
  ),
};

export const ButtonVisible: Story = {
  render: args => (
    <LocalNavigation.Root {...args}>
      <LocalNavigation.BackButton />
      <LocalNavigation.Title>네비게이션 타이틀</LocalNavigation.Title>
      <LocalNavigation.ButtonGroup extraButtonVisible>
        <IconButton.Basic hierarchy='tertiary' size='xl' icon='blank' />
        <IconButton.Basic hierarchy='tertiary' size='xl' icon='blank' />
        <IconButton.Basic hierarchy='tertiary' size='xl' icon='blank' />
      </LocalNavigation.ButtonGroup>
    </LocalNavigation.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "LocalNavigation.ButtonGroup의 extraButtonVisible 옵션으로 로컬 네비게이션의 버튼 가시성을 설정할 수 있습니다. false를 기본값으로 가지며 해당 스토리는 true로 설정한 경우입니다.",
      },
    },
  },
};

export const NoTitle: Story = {
  render: args => (
    <LocalNavigation.Root {...args}>
      <LocalNavigation.BackButton />
      <LocalNavigation.ButtonGroup extraButtonVisible>
        <IconButton.Basic hierarchy='tertiary' size='xl' icon='blank' />
        <IconButton.Basic hierarchy='tertiary' size='xl' icon='blank' />
        <IconButton.Basic hierarchy='tertiary' size='xl' icon='blank' />
      </LocalNavigation.ButtonGroup>
    </LocalNavigation.Root>
  ),
};

export const OnlyBackButton: Story = {
  render: args => (
    <LocalNavigation.Root {...args}>
      <LocalNavigation.BackButton />
    </LocalNavigation.Root>
  ),
};

export const WithBackAction: Story = {
  render: args => (
    <LocalNavigation.Root {...args}>
      <LocalNavigation.BackButton
        onClick={() => {
          alert("뒤로 가기 버튼이 클릭되었습니다");
        }}
      />
      <LocalNavigation.Title>네비게이션 타이틀</LocalNavigation.Title>
      <LocalNavigation.ButtonGroup extraButtonVisible>
        <IconButton.Basic hierarchy='tertiary' size='xl' icon='blank' />
      </LocalNavigation.ButtonGroup>
    </LocalNavigation.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "LocalNavigation.BackButton의 onClick 이벤트를 사용하여 뒤로 가기 동작을 구현할 수 있습니다. 실제 사용 시에는 router.back() 또는 navigate(-1) 등을 사용합니다.",
      },
    },
  },
};

export const Responsive: Story = {
  render: function Render(args) {
    const { isMobile } = useMediaQueryFlags();
    const iconSize = isMobile ? "lg" : "xl";

    return (
      <div style={{ position: "fixed", left: 0, right: 0 }}>
        <LocalNavigation.Root isStretched={args.isStretched}>
          <LocalNavigation.BackButton />
          <LocalNavigation.Title>네비게이션 타이틀</LocalNavigation.Title>
          <LocalNavigation.ButtonGroup extraButtonVisible>
            <IconButton.Basic hierarchy='tertiary' size={iconSize} icon='blank' />
            <IconButton.Basic hierarchy='tertiary' size={iconSize} icon='blank' />
            <IconButton.Basic hierarchy='tertiary' size={iconSize} icon='blank' />
          </LocalNavigation.ButtonGroup>
        </LocalNavigation.Root>
      </div>
    );
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story: "desktop, tablet, mobile viewport에 따라 네비게이션의 스타일이 달라집니다.",
      },
    },
  },
};
