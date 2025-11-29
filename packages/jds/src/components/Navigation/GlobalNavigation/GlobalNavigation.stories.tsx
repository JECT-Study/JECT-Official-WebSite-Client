import type { Meta, StoryObj } from "@storybook/react";

import { GlobalNavigation } from "./GlobalNavigation";
import { useGlobalNavigationVariant } from "./useGlobalNavigationVariant";
import { Logo } from "../../Logo";
import { LabelButton } from "../../Button/LabelButton";
import { BlockButton } from "../../Button/BlockButton";
import { useMediaQueryFlags } from "@/hooks";
import { SegmentedControl } from "../../SegmentedControl";

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
  title: "Components/GlobalNavigation",
  component: GlobalNavigation.Root,
  parameters: {
    viewport: {
      viewports: customViewports,
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["empty", "solid"],
      description: "내비게이션 스타일",
    },
  },
  args: {
    variant: "empty",
  },
} satisfies Meta<typeof GlobalNavigation.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0 }}>
      <GlobalNavigation.Root variant={args.variant}>
        <GlobalNavigation.LogoItem>
          <Logo href='/' hierarchy='primary' height={16} />
        </GlobalNavigation.LogoItem>
        <GlobalNavigation.Divider />
        <GlobalNavigation.List>
          <GlobalNavigation.Item>
            <GlobalNavigation.Trigger>
              <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                젝트
              </LabelButton.Basic>
            </GlobalNavigation.Trigger>
          </GlobalNavigation.Item>
          <GlobalNavigation.Item>
            <GlobalNavigation.Trigger>
              <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                프로그램
              </LabelButton.Basic>
            </GlobalNavigation.Trigger>
          </GlobalNavigation.Item>
          <GlobalNavigation.Item>
            <GlobalNavigation.Trigger>
              <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                뉴스
              </LabelButton.Basic>
            </GlobalNavigation.Trigger>
          </GlobalNavigation.Item>
          <GlobalNavigation.Item>
            <GlobalNavigation.Trigger>
              <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                합류 가이드
              </LabelButton.Basic>
            </GlobalNavigation.Trigger>
          </GlobalNavigation.Item>
        </GlobalNavigation.List>
        <GlobalNavigation.List align='right'>
          <GlobalNavigation.Item>
            <BlockButton.Basic hierarchy='primary' size='sm' onClick={() => alert("hello!")}>
              지원하기
            </BlockButton.Basic>
          </GlobalNavigation.Item>
        </GlobalNavigation.List>
      </GlobalNavigation.Root>
    </div>
  ),
};

export const WithScrollVariant: Story = {
  render: function Render() {
    const variant = useGlobalNavigationVariant();

    return (
      <div style={{ height: "200vh", paddingTop: "100px" }}>
        <div style={{ position: "fixed", top: 0, left: 0, right: 0 }}>
          <GlobalNavigation.Root variant={variant}>
            <GlobalNavigation.LogoItem>
              <Logo href='/' hierarchy='primary' height={16} />
            </GlobalNavigation.LogoItem>
            <GlobalNavigation.Divider />
            <GlobalNavigation.List>
              <GlobalNavigation.Item>
                <GlobalNavigation.Trigger>
                  <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                    젝트
                  </LabelButton.Basic>
                </GlobalNavigation.Trigger>
              </GlobalNavigation.Item>
              <GlobalNavigation.Item>
                <GlobalNavigation.Trigger>
                  <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                    프로그램
                  </LabelButton.Basic>
                </GlobalNavigation.Trigger>
              </GlobalNavigation.Item>
              <GlobalNavigation.Item>
                <GlobalNavigation.Trigger>
                  <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                    뉴스
                  </LabelButton.Basic>
                </GlobalNavigation.Trigger>
              </GlobalNavigation.Item>
              <GlobalNavigation.Item>
                <GlobalNavigation.Trigger>
                  <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                    합류 가이드
                  </LabelButton.Basic>
                </GlobalNavigation.Trigger>
              </GlobalNavigation.Item>
            </GlobalNavigation.List>
            <GlobalNavigation.List align='right'>
              <GlobalNavigation.Item>
                <BlockButton.Basic hierarchy='primary' size='sm' onClick={() => alert("hello!")}>
                  지원하기
                </BlockButton.Basic>
              </GlobalNavigation.Item>
            </GlobalNavigation.List>
          </GlobalNavigation.Root>
        </div>
        <p style={{ textAlign: "center" }}>
          useGlobalNavigationVariant 훅을 사용하여 스크롤 위치에 따라 variant가 자동으로 변경됩니다.{" "}
          <br /> 스크롤하여 variant 변경을 확인하세요
        </p>
      </div>
    );
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "useGlobalNavigationVariant 훅을 사용하여 스크롤 위치에 따라 variant가 자동으로 변경됩니다. 스크롤이 최상단이면 empty, 스크롤하면 solid로 변경됩니다.",
      },
    },
  },
};

export const Responsive: Story = {
  render: function Render(args) {
    const { isTablet } = useMediaQueryFlags();
    const labelButtonSize = isTablet ? "sm" : "md";
    const blockButtonSize = isTablet ? "xs" : "sm";

    return (
      <div style={{ position: "fixed", top: 0, left: 0, right: 0 }}>
        <GlobalNavigation.Root variant={args.variant}>
          <GlobalNavigation.LogoItem>
            <Logo href='/' hierarchy='primary' height={16} />
          </GlobalNavigation.LogoItem>
          <GlobalNavigation.Divider />
          <GlobalNavigation.List>
            <GlobalNavigation.Item>
              <GlobalNavigation.Trigger>
                <LabelButton.Basic
                  hierarchy='primary'
                  size={labelButtonSize}
                  suffixIcon='arrow-down-s-line'
                >
                  젝트
                </LabelButton.Basic>
              </GlobalNavigation.Trigger>
            </GlobalNavigation.Item>
            <GlobalNavigation.Item>
              <GlobalNavigation.Trigger>
                <LabelButton.Basic
                  hierarchy='primary'
                  size={labelButtonSize}
                  suffixIcon='arrow-down-s-line'
                >
                  프로그램
                </LabelButton.Basic>
              </GlobalNavigation.Trigger>
            </GlobalNavigation.Item>
            <GlobalNavigation.Item>
              <GlobalNavigation.Trigger>
                <LabelButton.Basic
                  hierarchy='primary'
                  size={labelButtonSize}
                  suffixIcon='arrow-down-s-line'
                >
                  뉴스
                </LabelButton.Basic>
              </GlobalNavigation.Trigger>
            </GlobalNavigation.Item>
            <GlobalNavigation.Item>
              <GlobalNavigation.Trigger>
                <LabelButton.Basic
                  hierarchy='primary'
                  size={labelButtonSize}
                  suffixIcon='arrow-down-s-line'
                >
                  합류 가이드
                </LabelButton.Basic>
              </GlobalNavigation.Trigger>
            </GlobalNavigation.Item>
          </GlobalNavigation.List>
          <GlobalNavigation.List align='right'>
            <GlobalNavigation.Item>
              <BlockButton.Basic
                hierarchy='primary'
                size={blockButtonSize}
                onClick={() => alert("hello!")}
              >
                지원하기
              </BlockButton.Basic>
            </GlobalNavigation.Item>
          </GlobalNavigation.List>
        </GlobalNavigation.Root>
        <p style={{ textAlign: "center", paddingTop: "100px" }}>
          viewport를 변경하여 네비게이션 스타일을 확인하세요
        </p>
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

export const WithThemeSwitcher: Story = {
  render: function Render(args) {
    const handleThemeChange = (value: string) => {
      document.documentElement.setAttribute("data-theme", value);
    };

    return (
      <div style={{ position: "fixed", top: 0, left: 0, right: 0 }}>
        <GlobalNavigation.Root variant={args.variant}>
          <GlobalNavigation.LogoItem>
            <Logo href='/' hierarchy='primary' height={16} />
          </GlobalNavigation.LogoItem>
          <GlobalNavigation.Divider />
          <GlobalNavigation.List>
            <GlobalNavigation.Item>
              <GlobalNavigation.Trigger>
                <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                  젝트
                </LabelButton.Basic>
              </GlobalNavigation.Trigger>
            </GlobalNavigation.Item>
            <GlobalNavigation.Item>
              <GlobalNavigation.Trigger>
                <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                  프로그램
                </LabelButton.Basic>
              </GlobalNavigation.Trigger>
            </GlobalNavigation.Item>
            <GlobalNavigation.Item>
              <GlobalNavigation.Trigger>
                <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                  뉴스
                </LabelButton.Basic>
              </GlobalNavigation.Trigger>
            </GlobalNavigation.Item>
            <GlobalNavigation.Item>
              <GlobalNavigation.Trigger>
                <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                  합류 가이드
                </LabelButton.Basic>
              </GlobalNavigation.Trigger>
            </GlobalNavigation.Item>
          </GlobalNavigation.List>
          <GlobalNavigation.List align='right'>
            <GlobalNavigation.Item>
              <BlockButton.Basic hierarchy='primary' size='sm' onClick={() => alert("hello!")}>
                지원하기
              </BlockButton.Basic>
            </GlobalNavigation.Item>
          </GlobalNavigation.List>
          <div style={{ width: "160px" }}>
            <SegmentedControl.Root defaultValue='light' size='xs' onValueChange={handleThemeChange}>
              <SegmentedControl.Item value='light'>라이트</SegmentedControl.Item>
              <SegmentedControl.Item value='dark'>다크</SegmentedControl.Item>
            </SegmentedControl.Root>
          </div>
        </GlobalNavigation.Root>
        <p style={{ textAlign: "center", paddingTop: "100px" }}>테마 스위처를 변경해보세요</p>
      </div>
    );
  },
  args: {
    variant: "solid",
  },
  parameters: {
    docs: {
      description: {
        story:
          "SegmentedControl을 조합하여 테마 스위처를 포함한 내비게이션입니다. 세그먼트를 선택하면 실제로 테마가 변경됩니다.",
      },
    },
  },
};

const TempNavigationContent = () => {
  return (
    <div
      style={{
        width: "922px",
        height: "424px",
        border: "1px solid #ECEDF9",
        borderRadius: "10px",
        background: "#ECEDF9",
      }}
    />
  );
};

export const WithContent: Story = {
  render: args => (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0 }}>
      <GlobalNavigation.Root variant={args.variant}>
        <GlobalNavigation.LogoItem>
          <Logo href='/' hierarchy='primary' height={16} />
        </GlobalNavigation.LogoItem>
        <GlobalNavigation.Divider />
        <GlobalNavigation.List>
          <GlobalNavigation.Item>
            <GlobalNavigation.Trigger>
              <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                젝트
              </LabelButton.Basic>
            </GlobalNavigation.Trigger>
            <GlobalNavigation.Content>
              <TempNavigationContent />
            </GlobalNavigation.Content>
          </GlobalNavigation.Item>
          <GlobalNavigation.Item>
            <GlobalNavigation.Trigger>
              <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                프로그램
              </LabelButton.Basic>
            </GlobalNavigation.Trigger>
            <GlobalNavigation.Content>
              <TempNavigationContent />
            </GlobalNavigation.Content>
          </GlobalNavigation.Item>
          <GlobalNavigation.Item>
            <GlobalNavigation.Trigger>
              <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                뉴스
              </LabelButton.Basic>
            </GlobalNavigation.Trigger>
            <GlobalNavigation.Content>
              <TempNavigationContent />
            </GlobalNavigation.Content>
          </GlobalNavigation.Item>
          <GlobalNavigation.Item>
            <GlobalNavigation.Trigger>
              <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
                합류 가이드
              </LabelButton.Basic>
            </GlobalNavigation.Trigger>
            <GlobalNavigation.Content>
              <TempNavigationContent />
            </GlobalNavigation.Content>
          </GlobalNavigation.Item>
        </GlobalNavigation.List>
        <GlobalNavigation.List align='right'>
          <GlobalNavigation.Item>
            <BlockButton.Basic hierarchy='primary' size='sm' onClick={() => alert("hello!")}>
              지원하기
            </BlockButton.Basic>
          </GlobalNavigation.Item>
        </GlobalNavigation.List>
      </GlobalNavigation.Root>
      <p style={{ textAlign: "center", paddingTop: "100px" }}>토글 버튼을 호버해보세요</p>
    </div>
  ),
  args: {
    variant: "empty",
  },
  parameters: {
    docs: {
      description: {
        story:
          "`GlobalNavigation.Content`를 사용하여 토글 메뉴에 드롭다운 패널을 구성한 예시입니다. GlobalNavigation.Content는 드롭다운 패널의 위치를 조정합니다.",
      },
    },
  },
};
