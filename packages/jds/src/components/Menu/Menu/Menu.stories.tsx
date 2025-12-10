import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexRow } from "@storybook-utils/layout";

import { Menu } from "./Menu";

import { IconButton } from "@/components/Button/IconButton";
import { Label } from "@/components/Label";

const meta: Meta<typeof Menu.Root> = {
  title: "Components/Menu",
  component: Menu.Root,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    menuStyle: {
      control: "radio",
      options: ["solid", "empty"],
    },
    size: {
      control: "radio",
      options: ["lg", "md", "sm"],
    },
  },
  args: {
    menuStyle: "solid",
    size: "md",
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <Menu.Root {...args}>
      <Menu.Trigger>
        <IconButton.Basic icon='menu-line' />
      </Menu.Trigger>
      <Menu.Content side='right' align='start' sideOffset={10}>
        <Menu.Category>카테고리</Menu.Category>
        <Menu.Group>
          <Menu.GroupItem style={{ width: "120px" }}>
            <Menu.Button>메뉴 레이블</Menu.Button>
          </Menu.GroupItem>
          <Menu.GroupItem style={{ width: "120px" }}>
            <Menu.Button>메뉴 레이블</Menu.Button>
          </Menu.GroupItem>
          <Menu.GroupItem>
            <Menu.Button disabled>메뉴 레이블(disabled)</Menu.Button>
          </Menu.GroupItem>
          <Menu.GroupItem>
            <Menu.Button isSelected>메뉴 레이블(selected)</Menu.Button>
          </Menu.GroupItem>
          <Menu.GroupItem>
            <Menu.Button isDestructive>메뉴 레이블(destructive)</Menu.Button>
          </Menu.GroupItem>
        </Menu.Group>
      </Menu.Content>
    </Menu.Root>
  ),
};

export const MenuStyles: Story = {
  render: () => (
    <FlexRow>
      <Label>solid style</Label>
      <Menu.Root menuStyle='solid'>
        <Menu.Trigger>
          <IconButton.Basic icon='menu-line' />
        </Menu.Trigger>
        <Menu.Content align='end'>
          <Menu.Category>카테고리</Menu.Category>
          <Menu.Group>
            <Menu.GroupItem>
              <Menu.Button>메뉴 레이블</Menu.Button>
            </Menu.GroupItem>
            <Menu.GroupItem>
              <Menu.Button>메뉴 레이블</Menu.Button>
            </Menu.GroupItem>
          </Menu.Group>
        </Menu.Content>
      </Menu.Root>
      <Label>empty style</Label>
      <Menu.Root menuStyle='empty'>
        <Menu.Trigger>
          <IconButton.Basic icon='menu-line' />
        </Menu.Trigger>
        <Menu.Content align='start' sideOffset={10}>
          <Menu.Category>카테고리</Menu.Category>
          <Menu.Group>
            <Menu.GroupItem>
              <Menu.Button>메뉴 레이블</Menu.Button>
            </Menu.GroupItem>
            <Menu.GroupItem>
              <Menu.Button>메뉴 레이블</Menu.Button>
            </Menu.GroupItem>
          </Menu.Group>
        </Menu.Content>
      </Menu.Root>
    </FlexRow>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Menu.Content의 side, align, sideOffset, alignOffset 속성을 통해서 Menu.Content의 위치를 조정할 수 있습니다",
      },
    },
  },
};
