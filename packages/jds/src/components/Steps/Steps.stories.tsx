import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { useState } from "react";

import { Steps } from "./Steps";
import type { StepsLayout, StepsSize } from "./steps.types";

interface StepsStoryArgs {
  size: StepsSize;
  layout: StepsLayout;
  mode: "controlled" | "uncontrolled";
  current: number;
  activated?: boolean;
  firstLabel: string;
  secondLabel: string;
  thirdLabel: string;
  firstActivated: boolean;
  secondActivated: boolean;
  thirdActivated: boolean;
}

const StepsPreview: (props: StepsStoryArgs) => null = () => null;

const meta = {
  title: "Components/Steps",
  component: StepsPreview,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "스텝 컴포넌트는 사용자가 따라야 할 절차나 진행 단계를 시각적으로 나타냅니다. " +
          "Steps.Root로 컨테이너를 구성하고, 각 단계는 Steps.Item으로 표현합니다. " +
          "모든 Steps.Item은 명시적으로 index prop을 제공해야 합니다.\n\n" +
          "**두 가지 모드 지원:**\n" +
          "- **Controlled 모드**: Steps.Root에 current를 전달하면 각 Steps.Item의 activated가 자동 계산됩니다.\n" +
          "- **Uncontrolled 모드**: 각 Steps.Item에 activated를 직접 전달하여 제어가 가능합니다.",
      },
    },
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["lg", "md"],
      description: "스텝의 크기",
      table: {
        type: { summary: "'lg' | 'md'" },
      },
    },
    layout: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "스텝의 배치 방향",
      table: {
        type: { summary: "'horizontal' | 'vertical'" },
      },
    },
    mode: {
      control: "radio",
      options: ["controlled", "uncontrolled"],
      description: "Steps.Root current 기반 제어 여부",
      table: {
        category: "Preview",
        type: { summary: "'controlled' | 'uncontrolled'" },
      },
    },
    current: {
      control: { type: "number", min: 0, max: 2, step: 1 },
      description: "Controlled 모드에서 현재 단계의 index",
      table: {
        category: "Steps.Root",
        type: { summary: "number" },
      },
      if: { arg: "mode", eq: "controlled" },
    },
    activated: {
      control: false,
      description:
        "Steps.Item의 활성 여부입니다. Steps.Root에 current가 전달되면 current 기반으로 자동 계산되고, current가 없을 때 직접 제어할 수 있습니다.",
      table: {
        category: "Steps.Item",
        type: { summary: "boolean" },
      },
    },
    firstLabel: {
      control: "text",
      description: "첫 번째 스텝의 레이블 텍스트",
      table: {
        category: "Preview",
        type: { summary: "string" },
      },
    },
    secondLabel: {
      control: "text",
      description: "두 번째 스텝의 레이블 텍스트",
      table: {
        category: "Preview",
        type: { summary: "string" },
      },
    },
    thirdLabel: {
      control: "text",
      description: "세 번째 스텝의 레이블 텍스트",
      table: {
        category: "Preview",
        type: { summary: "string" },
      },
    },
    firstActivated: {
      control: "boolean",
      description: "Uncontrolled 모드에서 첫 번째 스텝의 활성 여부",
      table: {
        category: "Preview",
        type: { summary: "boolean" },
      },
      if: { arg: "mode", eq: "uncontrolled" },
    },
    secondActivated: {
      control: "boolean",
      description: "Uncontrolled 모드에서 두 번째 스텝의 활성 여부",
      table: {
        category: "Preview",
        type: { summary: "boolean" },
      },
      if: { arg: "mode", eq: "uncontrolled" },
    },
    thirdActivated: {
      control: "boolean",
      description: "Uncontrolled 모드에서 세 번째 스텝의 활성 여부",
      table: {
        category: "Preview",
        type: { summary: "boolean" },
      },
      if: { arg: "mode", eq: "uncontrolled" },
    },
  },
} satisfies Meta<typeof StepsPreview>;

export default meta;

type Story = StoryObj<typeof meta>;
type CustomStory = Omit<Story, "args">;

export const Default: Story = {
  args: {
    size: "md",
    layout: "horizontal",
    mode: "controlled",
    current: 1,
    firstLabel: "회원가입",
    secondLabel: "정보 입력",
    thirdLabel: "완료",
    firstActivated: true,
    secondActivated: true,
    thirdActivated: false,
  },
  render: args => {
    const isControlled = args.mode === "controlled";
    const previewWidth = args.layout === "vertical" ? "200px" : "600px";

    return (
      <div style={{ width: previewWidth }}>
        <Steps.Root
          size={args.size}
          layout={args.layout}
          current={isControlled ? args.current : undefined}
        >
          <Steps.Item index={0} activated={isControlled ? undefined : args.firstActivated}>
            {args.firstLabel}
          </Steps.Item>
          <Steps.Item index={1} activated={isControlled ? undefined : args.secondActivated}>
            {args.secondLabel}
          </Steps.Item>
          <Steps.Item index={2} activated={isControlled ? undefined : args.thirdActivated}>
            {args.thirdLabel}
          </Steps.Item>
        </Steps.Root>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "기본 스텝 컴포넌트입니다. Controls 패널에서 Steps.Root의 size, layout, current와 각 Steps.Item의 레이블 및 활성 여부를 조정하여 실시간으로 변경 사항을 확인할 수 있습니다.",
      },
    },
  },
};

export const AllCompleted: CustomStory = {
  render: () => (
    <div style={{ width: "600px" }}>
      <Steps.Root size='md'>
        <Steps.Item index={0} activated>
          회원가입
        </Steps.Item>
        <Steps.Item index={1} activated>
          정보 입력
        </Steps.Item>
        <Steps.Item index={2} activated>
          완료
        </Steps.Item>
      </Steps.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 단계가 완료된 상태입니다.",
      },
    },
  },
};

export const AllUncompleted: CustomStory = {
  render: () => (
    <div style={{ width: "600px" }}>
      <Steps.Root size='md'>
        <Steps.Item index={0} activated={false}>
          회원가입
        </Steps.Item>
        <Steps.Item index={1} activated={false}>
          정보 입력
        </Steps.Item>
        <Steps.Item index={2} activated={false}>
          완료
        </Steps.Item>
      </Steps.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 단계가 미완료 상태입니다.",
      },
    },
  },
};

export const SizeVariant: CustomStory = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div style={{ width: "600px" }}>
        <Steps.Root size='lg'>
          <Steps.Item index={0} activated>
            lg - 단계 1
          </Steps.Item>
          <Steps.Item index={1} activated>
            lg - 단계 2
          </Steps.Item>
          <Steps.Item index={2} activated={false}>
            lg - 단계 3
          </Steps.Item>
        </Steps.Root>
      </div>
      <div style={{ width: "600px" }}>
        <Steps.Root size='md'>
          <Steps.Item index={0} activated>
            md - 단계 1
          </Steps.Item>
          <Steps.Item index={1} activated>
            md - 단계 2
          </Steps.Item>
          <Steps.Item index={2} activated={false}>
            md - 단계 3
          </Steps.Item>
        </Steps.Root>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Steps 컴포넌트는 lg, md 2가지 크기를 제공합니다.",
      },
    },
  },
};

export const LayoutVariant: CustomStory = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      <div style={{ width: "600px" }}>
        <div style={{ marginBottom: "12px" }}>수평 (horizontal, 기본값)</div>
        <Steps.Root size='lg' layout='horizontal'>
          <Steps.Item index={0} activated>
            단계 1
          </Steps.Item>
          <Steps.Item index={1} activated>
            단계 2
          </Steps.Item>
          <Steps.Item index={2} activated={false}>
            단계 3
          </Steps.Item>
        </Steps.Root>
      </div>
      <div style={{ width: "200px" }}>
        <div style={{ marginBottom: "12px" }}>수직 (vertical)</div>
        <Steps.Root size='lg' layout='vertical'>
          <Steps.Item index={0} activated>
            단계 1
          </Steps.Item>
          <Steps.Item index={1} activated>
            단계 2
          </Steps.Item>
          <Steps.Item index={2} activated={false}>
            단계 3
          </Steps.Item>
        </Steps.Root>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "layout prop으로 수평(horizontal)과 수직(vertical) 레이아웃을 선택할 수 있습니다. 기본값은 horizontal입니다.",
      },
    },
  },
};

export const VariousItemCounts: CustomStory = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div style={{ width: "600px" }}>
        <Steps.Root size='md'>
          <Steps.Item index={0} activated>
            단계 1
          </Steps.Item>
          <Steps.Item index={1} activated>
            단계 2
          </Steps.Item>
        </Steps.Root>
      </div>
      <div style={{ width: "600px" }}>
        <Steps.Root size='md'>
          <Steps.Item index={0} activated>
            단계 1
          </Steps.Item>
          <Steps.Item index={1} activated>
            단계 2
          </Steps.Item>
          <Steps.Item index={2} activated>
            단계 3
          </Steps.Item>
        </Steps.Root>
      </div>
      <div style={{ width: "600px" }}>
        <Steps.Root size='md'>
          <Steps.Item index={0} activated>
            단계 1
          </Steps.Item>
          <Steps.Item index={1} activated>
            단계 2
          </Steps.Item>
          <Steps.Item index={2} activated>
            단계 3
          </Steps.Item>
          <Steps.Item index={3} activated={false}>
            단계 4
          </Steps.Item>
        </Steps.Root>
      </div>
      <div style={{ width: "600px" }}>
        <Steps.Root size='md'>
          <Steps.Item index={0} activated>
            단계 1
          </Steps.Item>
          <Steps.Item index={1} activated>
            단계 2
          </Steps.Item>
          <Steps.Item index={2} activated>
            단계 3
          </Steps.Item>
          <Steps.Item index={3} activated>
            단계 4
          </Steps.Item>
          <Steps.Item index={4} activated={false}>
            단계 5
          </Steps.Item>
        </Steps.Root>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "스텝 컴포넌트는 2개부터 5개 이상까지 다양한 개수의 항목을 지원합니다.",
      },
    },
  },
};

export const StatusVariants: CustomStory = {
  render: () => (
    <FlexColumn style={{ width: "100%", gap: "32px" }}>
      <FlexColumn gap='8px'>
        <div style={{ width: "100%", marginBottom: "20px" }}>Activated (활성)</div>
        <div style={{ width: "600px" }}>
          <Steps.Root size='md'>
            <Steps.Item index={0} activated>
              단계 1
            </Steps.Item>
            <Steps.Item index={1} activated>
              단계 2
            </Steps.Item>
            <Steps.Item index={2} activated>
              단계 3
            </Steps.Item>
          </Steps.Root>
        </div>
      </FlexColumn>
      <FlexColumn gap='8px'>
        <div style={{ width: "100%", marginBottom: "20px" }}>Mixed (혼합)</div>
        <div style={{ width: "600px" }}>
          <Steps.Root size='md'>
            <Steps.Item index={0} activated>
              단계 1
            </Steps.Item>
            <Steps.Item index={1} activated>
              단계 2
            </Steps.Item>
            <Steps.Item index={2} activated={false}>
              단계 3
            </Steps.Item>
          </Steps.Root>
        </div>
      </FlexColumn>
      <FlexColumn gap='8px'>
        <div style={{ width: "100%", marginBottom: "20px" }}>Inactivated (비활성)</div>
        <div style={{ width: "600px" }}>
          <Steps.Root size='md'>
            <Steps.Item index={0} activated={false}>
              단계 1
            </Steps.Item>
            <Steps.Item index={1} activated={false}>
              단계 2
            </Steps.Item>
            <Steps.Item index={2} activated={false}>
              단계 3
            </Steps.Item>
          </Steps.Root>
        </div>
      </FlexColumn>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: "스텝의 activated true/false 상태를 보여줍니다.",
      },
    },
  },
};

export const UncontrolledExample: CustomStory = {
  render: () => {
    function StoryComponent() {
      const [stepActivatedList, setStepActivatedList] = useState([true, true, true, false]);

      const updateStepActivated = (index: number, activated: boolean) => {
        setStepActivatedList(prevActivatedList =>
          prevActivatedList.map((prevActivated, prevIndex) =>
            prevIndex === index ? activated : prevActivated,
          ),
        );
      };

      return (
        <FlexColumn style={{ width: "100%", gap: "32px" }}>
          <div style={{ width: "700px" }}>
            <Steps.Root size='md'>
              <Steps.Item index={0} activated={stepActivatedList[0]}>
                계정 생성
              </Steps.Item>
              <Steps.Item index={1} activated={stepActivatedList[1]}>
                프로필 설정
              </Steps.Item>
              <Steps.Item index={2} activated={stepActivatedList[2]}>
                이메일 인증
              </Steps.Item>
              <Steps.Item index={3} activated={stepActivatedList[3]}>
                완료
              </Steps.Item>
            </Steps.Root>
          </div>

          <FlexColumn gap='16px'>
            <div style={{ width: "100%", marginBottom: "20px" }}>
              각 단계의 활성 여부를 개별적으로 제어할 수 있습니다
            </div>
            <FlexRow gap='8px' style={{ alignItems: "center" }}>
              <Label style={{ minWidth: "100px" }}>1단계:</Label>
              <button
                onClick={() => updateStepActivated(0, true)}
                disabled={stepActivatedList[0]}
                style={{ padding: "4px 8px", fontSize: "12px" }}
              >
                활성
              </button>
              <button
                onClick={() => updateStepActivated(0, false)}
                disabled={!stepActivatedList[0]}
                style={{ padding: "4px 8px", fontSize: "12px" }}
              >
                비활성
              </button>
            </FlexRow>

            <FlexRow gap='8px' style={{ alignItems: "center" }}>
              <Label style={{ minWidth: "100px" }}>2단계:</Label>
              <button
                onClick={() => updateStepActivated(1, true)}
                disabled={stepActivatedList[1]}
                style={{ padding: "4px 8px", fontSize: "12px" }}
              >
                활성
              </button>
              <button
                onClick={() => updateStepActivated(1, false)}
                disabled={!stepActivatedList[1]}
                style={{ padding: "4px 8px", fontSize: "12px" }}
              >
                비활성
              </button>
            </FlexRow>

            <FlexRow gap='8px' style={{ alignItems: "center" }}>
              <Label style={{ minWidth: "100px" }}>3단계:</Label>
              <button
                onClick={() => updateStepActivated(2, true)}
                disabled={stepActivatedList[2]}
                style={{ padding: "4px 8px", fontSize: "12px" }}
              >
                활성
              </button>
              <button
                onClick={() => updateStepActivated(2, false)}
                disabled={!stepActivatedList[2]}
                style={{ padding: "4px 8px", fontSize: "12px" }}
              >
                비활성
              </button>
            </FlexRow>

            <FlexRow gap='8px' style={{ alignItems: "center" }}>
              <Label style={{ minWidth: "100px" }}>4단계:</Label>
              <button
                onClick={() => updateStepActivated(3, true)}
                disabled={stepActivatedList[3]}
                style={{ padding: "4px 8px", fontSize: "12px" }}
              >
                활성
              </button>
              <button
                onClick={() => updateStepActivated(3, false)}
                disabled={!stepActivatedList[3]}
                style={{ padding: "4px 8px", fontSize: "12px" }}
              >
                비활성
              </button>
            </FlexRow>
          </FlexColumn>
        </FlexColumn>
      );
    }

    return <StoryComponent />;
  },
  parameters: {
    docs: {
      description: {
        story:
          "Uncontrolled 모드입니다. 각 Steps.Item에 activated를 직접 전달하여 독립적으로 제어할 수 있습니다. " +
          "각 단계의 활성 여부를 개별적으로 변경할 수 있고 순차적이지 않은 조합도 가능합니다.",
      },
    },
  },
};

export const ControlledExample: CustomStory = {
  render: () => {
    function StoryComponent() {
      const [currentStep, setCurrentStep] = useState(0);

      return (
        <FlexColumn style={{ width: "100%", gap: "24px" }}>
          <div style={{ width: "600px" }}>
            <Steps.Root current={currentStep} size='md'>
              <Steps.Item index={0}>회원가입</Steps.Item>
              <Steps.Item index={1}>정보 입력</Steps.Item>
              <Steps.Item index={2}>완료</Steps.Item>
            </Steps.Root>
          </div>

          <FlexRow gap='8px'>
            <button onClick={() => setCurrentStep(0)} disabled={currentStep === 0}>
              1단계로
            </button>
            <button onClick={() => setCurrentStep(1)} disabled={currentStep === 1}>
              2단계로
            </button>
            <button onClick={() => setCurrentStep(2)} disabled={currentStep === 2}>
              3단계로
            </button>
          </FlexRow>

          <Label>현재 단계: {currentStep + 1}</Label>
        </FlexColumn>
      );
    }

    return <StoryComponent />;
  },
  parameters: {
    docs: {
      description: {
        story:
          "Controlled 모드입니다. Steps.Root에 current를 전달하면 각 Steps.Item의 activated가 자동으로 계산됩니다. " +
          "버튼을 클릭하여 단계를 변경할 수 있습니다.",
      },
    },
  },
};
