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
          "**활성 여부 결정 규칙:**\n" +
          "- 기본은 Steps.Root의 current입니다. index가 current 이하인 단계가 활성으로 계산됩니다.\n" +
          "- 개별 Steps.Item에 activated를 명시하면 current 계산을 덮어씁니다. 순차적이지 않은 조합이 필요할 때 사용합니다.\n" +
          "- current도 activated도 없으면 모든 단계가 비활성입니다.",
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
        "Steps.Item의 활성 여부입니다. 생략하면 Steps.Root의 current로 계산되고, 명시하면 current 계산을 덮어씁니다.",
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

export const VerticalControlled: CustomStory = {
  render: () => (
    <FlexColumn style={{ width: "100%", gap: "32px" }}>
      {(["lg", "md"] as const).map(size => (
        <FlexColumn key={size} gap='8px'>
          <Label>size: {size}</Label>
          <FlexRow gap='48px'>
            {[0, 1, 2].map(step => (
              <FlexColumn key={step} gap='8px' style={{ width: "160px" }}>
                <Label>current: {step}</Label>
                <Steps.Root size={size} layout='vertical' current={step}>
                  <Steps.Item index={0}>단계 1</Steps.Item>
                  <Steps.Item index={1}>단계 2</Steps.Item>
                  <Steps.Item index={2}>단계 3</Steps.Item>
                </Steps.Root>
              </FlexColumn>
            ))}
          </FlexRow>
        </FlexColumn>
      ))}
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "수직 레이아웃에서 current 기반 제어 모드입니다. lg는 연결선 높이 20px, md는 18px이며 이 높이가 단계 사이의 간격 역할을 합니다. 활성 단계로 이어지는 연결선은 accent 색상, 이후 연결선은 subtle 색상으로 표시됩니다.",
      },
    },
  },
};

export const VerticalUncontrolled: CustomStory = {
  render: () => (
    <FlexRow gap='48px'>
      <FlexColumn gap='8px' style={{ width: "160px" }}>
        <Label>전체 활성</Label>
        <Steps.Root size='md' layout='vertical'>
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
      </FlexColumn>
      <FlexColumn gap='8px' style={{ width: "160px" }}>
        <Label>전체 비활성</Label>
        <Steps.Root size='md' layout='vertical'>
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
      </FlexColumn>
    </FlexRow>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "수직 레이아웃에서 각 Steps.Item의 activated를 직접 제어하는 모드입니다. 연결선 색상은 바로 뒤에 오는 단계의 활성 여부를 따릅니다.",
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

export const ActivatedOverridesCurrent: CustomStory = {
  render: () => (
    <FlexColumn style={{ width: "100%", gap: "32px" }}>
      <FlexColumn gap='8px'>
        <Label>current=2 (activated 없음)</Label>
        <div style={{ width: "600px" }}>
          <Steps.Root size='md' current={2}>
            <Steps.Item index={0}>계정 생성</Steps.Item>
            <Steps.Item index={1}>선택 단계</Steps.Item>
            <Steps.Item index={2}>완료</Steps.Item>
          </Steps.Root>
        </div>
      </FlexColumn>
      <FlexColumn gap='8px'>
        <Label>current=2 + 2단계를 activated false로 덮어쓰기</Label>
        <div style={{ width: "600px" }}>
          <Steps.Root size='md' current={2}>
            <Steps.Item index={0}>계정 생성</Steps.Item>
            <Steps.Item index={1} activated={false}>
              선택 단계
            </Steps.Item>
            <Steps.Item index={2}>완료</Steps.Item>
          </Steps.Root>
        </div>
      </FlexColumn>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "activated는 current 계산보다 우선합니다. 건너뛴 선택 단계처럼 current만으로 표현할 수 없는 상태를 개별 Steps.Item에서 덮어쓸 수 있습니다. " +
          "두 번째 예시는 current가 2여서 기본 계산으로는 모든 단계가 활성이지만, 2단계만 비활성으로 지정한 결과입니다.",
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
          "각 Steps.Item에 activated를 직접 전달해 독립적으로 제어하는 예시입니다. activated는 current 계산을 덮어쓰므로 " +
          "current로 표현할 수 없는 순차적이지 않은 조합에 사용합니다.",
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
          "Steps.Root의 current만으로 제어하는 예시입니다. activated를 넘기지 않으면 index가 current 이하인 단계가 활성으로 계산됩니다. " +
          "버튼을 클릭하여 단계를 변경할 수 있습니다.",
      },
    },
  },
};
