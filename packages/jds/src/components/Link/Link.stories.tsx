import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn } from "@storybook-utils/layout";

import { Link } from "./Link";

import { getBodyClassName, getLabelClassName } from "@/utils/typography";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "앱 내의 다른 페이지나 외부 웹사이트로 이동시키는 인라인 텍스트 컴포넌트입니다. 자체 크기를 갖지 않고 부모 요소의 텍스트 스타일을 상속받습니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "링크에 표시되는 텍스트입니다.",
    },
    href: {
      control: "text",
      description: "이동할 페이지의 주소입니다.",
    },
    external: {
      control: "boolean",
      description:
        "외부 리소스로 이동함을 나타냅니다. 외부 링크 아이콘과 스크린리더 레이블이 표시됩니다.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부입니다.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    asChild: {
      control: "boolean",
      description: "true이면 <a> 대신 전달한 자식 요소에 스타일을 합성합니다.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    children: "링크",
    href: "#",
  },
  decorators: [
    Story => (
      <span className={getBodyClassName({ size: "md" })}>
        <Story />
      </span>
    ),
  ],
};

export const InheritsSurroundingText: Story = {
  render: () => (
    <FlexColumn gap='16px'>
      <span className={getBodyClassName({ size: "lg" })}>
        body / lg 텍스트 안의 <Link href='#'>링크</Link>
      </span>
      <span className={getBodyClassName({ size: "md" })}>
        body / md 텍스트 안의 <Link href='#'>링크</Link>
      </span>
      <span className={getBodyClassName({ size: "sm" })}>
        body / sm 텍스트 안의 <Link href='#'>링크</Link>
      </span>
      <span className={getLabelClassName({ size: "lg" })}>
        label / lg 텍스트 안의 <Link href='#'>링크</Link>
      </span>
      <span className={getLabelClassName({ size: "sm" })}>
        label / sm 텍스트 안의 <Link href='#'>링크</Link>
      </span>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: "자체 크기 없이 부모 요소의 텍스트 스타일을 상속받아 표시됩니다.",
      },
    },
  },
};

export const External: Story = {
  render: () => (
    <span className={getBodyClassName({ size: "md" })}>
      자세한 내용은{" "}
      <Link href='https://example.com' target='_blank' rel='noopener noreferrer' external>
        외부 문서
      </Link>
      에서 확인하세요.
    </span>
  ),
  parameters: {
    docs: {
      description: {
        story: "외부 링크 아이콘과 스크린리더 레이블을 표시합니다.",
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <span className={getBodyClassName({ size: "md" })}>
      <Link href='#' disabled>
        링크
      </Link>
    </span>
  ),
  parameters: {
    docs: {
      description: {
        story: "페이지 이동을 차단합니다. 포커스는 유지되며 aria-disabled로 비활성을 안내합니다.",
      },
    },
  },
};
