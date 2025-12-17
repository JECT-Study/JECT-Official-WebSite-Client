import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { useState } from "react";

import { Step } from "./Step";

const meta = {
  title: "Components/Step",
  component: Step.Item,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "스텝 컴포넌트는 사용자가 따라야 할 절차나 진행 단계를 시각적으로 나타냅니다. " +
          "Step.Root로 컨테이너를 구성하고, 각 단계는 Step.Item으로 표현합니다. " +
          "모든 Step.Item은 명시적으로 index prop을 제공해야 합니다.\n\n" +
          "**두 가지 모드 지원:**\n" +
          "- **Controlled 모드**: Step.Root에 current를 전달하면 각 Step.Item의 status가 자동 계산됩니다.\n" +
          "- **Uncontrolled 모드**: 각 Step.Item에 status를 직접 전달하여 제어가 가능합니다.",
      },
    },
  },
  argTypes: {
    status: {
      control: "select",
      options: ["completed", "ongoing", "uncompleted"],
      description: "스텝의 진행 상태",
      table: {
        type: { summary: "'completed' | 'ongoing' | 'uncompleted'" },
      },
    },
    children: {
      control: "text",
      description: "스텝의 레이블 텍스트",
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
} satisfies Meta<typeof Step.Item>;

export default meta;

type Story = StoryObj<typeof meta>;
type CustomStory = Omit<Story, "args">;

export const Default: Story = {
  args: {
    index: 1,
    status: "ongoing",
    children: "정보 입력",
  },
  render: args => (
    <div style={{ width: "600px" }}>
      <Step.Root size='md'>
        <Step.Item index={0} status='completed'>
          회원가입
        </Step.Item>
        <Step.Item index={1} status={args.status}>
          {args.children}
        </Step.Item>
        <Step.Item index={2} status='uncompleted'>
          완료
        </Step.Item>
      </Step.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "기본 스텝 컴포넌트입니다. Controls 패널에서 Step.Root 내부의 단일 Step.Item에 대한 status, size, children을 조정하여 실시간으로 변경 사항을 확인할 수 있습니다.",
      },
    },
  },
};

export const AllCompleted: CustomStory = {
  render: () => (
    <div style={{ width: "600px" }}>
      <Step.Root size='md'>
        <Step.Item index={0} status='completed'>
          회원가입
        </Step.Item>
        <Step.Item index={1} status='completed'>
          정보 입력
        </Step.Item>
        <Step.Item index={2} status='completed'>
          완료
        </Step.Item>
      </Step.Root>
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
      <Step.Root size='md'>
        <Step.Item index={0} status='uncompleted'>
          회원가입
        </Step.Item>
        <Step.Item index={1} status='uncompleted'>
          정보 입력
        </Step.Item>
        <Step.Item index={2} status='uncompleted'>
          완료
        </Step.Item>
      </Step.Root>
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
        <Step.Root size='lg'>
          <Step.Item index={0} status='completed'>
            lg - 단계 1
          </Step.Item>
          <Step.Item index={1} status='ongoing'>
            lg - 단계 2
          </Step.Item>
          <Step.Item index={2} status='uncompleted'>
            lg - 단계 3
          </Step.Item>
        </Step.Root>
      </div>
      <div style={{ width: "600px" }}>
        <Step.Root size='md'>
          <Step.Item index={0} status='completed'>
            md - 단계 1
          </Step.Item>
          <Step.Item index={1} status='ongoing'>
            md - 단계 2
          </Step.Item>
          <Step.Item index={2} status='uncompleted'>
            md - 단계 3
          </Step.Item>
        </Step.Root>
      </div>
      <div style={{ width: "600px" }}>
        <Step.Root size='sm'>
          <Step.Item index={0} status='completed'>
            sm - 단계 1
          </Step.Item>
          <Step.Item index={1} status='ongoing'>
            sm - 단계 2
          </Step.Item>
          <Step.Item index={2} status='uncompleted'>
            sm - 단계 3
          </Step.Item>
        </Step.Root>
      </div>
      <div style={{ width: "600px" }}>
        <Step.Root size='xs'>
          <Step.Item index={0} status='completed'>
            xs - 단계 1
          </Step.Item>
          <Step.Item index={1} status='ongoing'>
            xs - 단계 2
          </Step.Item>
          <Step.Item index={2} status='uncompleted'>
            xs - 단계 3
          </Step.Item>
        </Step.Root>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Step 컴포넌트는 lg, md, sm, xs 4가지 크기를 제공합니다.",
      },
    },
  },
};

export const VariousItemCounts: CustomStory = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div style={{ width: "600px" }}>
        <Step.Root size='md'>
          <Step.Item index={0} status='completed'>
            단계 1
          </Step.Item>
          <Step.Item index={1} status='ongoing'>
            단계 2
          </Step.Item>
        </Step.Root>
      </div>
      <div style={{ width: "600px" }}>
        <Step.Root size='md'>
          <Step.Item index={0} status='completed'>
            단계 1
          </Step.Item>
          <Step.Item index={1} status='completed'>
            단계 2
          </Step.Item>
          <Step.Item index={2} status='ongoing'>
            단계 3
          </Step.Item>
        </Step.Root>
      </div>
      <div style={{ width: "600px" }}>
        <Step.Root size='md'>
          <Step.Item index={0} status='completed'>
            단계 1
          </Step.Item>
          <Step.Item index={1} status='completed'>
            단계 2
          </Step.Item>
          <Step.Item index={2} status='ongoing'>
            단계 3
          </Step.Item>
          <Step.Item index={3} status='uncompleted'>
            단계 4
          </Step.Item>
        </Step.Root>
      </div>
      <div style={{ width: "600px" }}>
        <Step.Root size='md'>
          <Step.Item index={0} status='completed'>
            단계 1
          </Step.Item>
          <Step.Item index={1} status='completed'>
            단계 2
          </Step.Item>
          <Step.Item index={2} status='completed'>
            단계 3
          </Step.Item>
          <Step.Item index={3} status='ongoing'>
            단계 4
          </Step.Item>
          <Step.Item index={4} status='uncompleted'>
            단계 5
          </Step.Item>
        </Step.Root>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "스텝 컴포넌트는 2개부터 5개 이상까지 다양한 개수의 항목을 지원합니다. 각 항목의 너비는 자동으로 균등 분배됩니다.",
      },
    },
  },
};

export const LongLabels: CustomStory = {
  render: () => (
    <FlexColumn style={{ width: "100%", gap: "48px" }}>
      <div style={{ width: "600px" }}>
        <div style={{ width: "100%", marginBottom: "20px" }}>단일 레이블 한 줄 바꿈</div>
        <Step.Root size='md'>
          <Step.Item index={0} status='completed'>
            회원가입 및 약관 동의
          </Step.Item>
          <Step.Item index={1} status='ongoing'>
            개인정보 입력 및 이메일 인증 절차를 진행합니다
          </Step.Item>
          <Step.Item index={2} status='uncompleted'>
            완료
          </Step.Item>
        </Step.Root>
      </div>

      <div style={{ width: "600px" }}>
        <div style={{ width: "100%", marginBottom: "20px" }}>단일 레이블 여러 줄 바꿈</div>
        <Step.Root size='md'>
          <Step.Item index={0} status='completed'>
            계정 생성
          </Step.Item>
          <Step.Item index={1} status='ongoing'>
            개인정보 및 프로필 사진 업로드, 관심사 선택, 알림 설정 등 상세 정보를 입력하는
            단계입니다
          </Step.Item>
          <Step.Item index={2} status='uncompleted'>
            완료
          </Step.Item>
        </Step.Root>
      </div>

      <div style={{ width: "600px" }}>
        <div style={{ width: "100%", marginBottom: "20px" }}>여러 레이블에 줄 바꿈</div>
        <Step.Root size='md'>
          <Step.Item index={0} status='completed'>
            이용 약관 및 개인정보 처리 방침에 동의하고 회원가입을 진행합니다
          </Step.Item>
          <Step.Item index={1} status='ongoing'>
            프로필 설정
          </Step.Item>
          <Step.Item index={2} status='uncompleted'>
            이메일 인증 링크를 클릭하여 계정을 활성화하는 마지막 단계입니다
          </Step.Item>
        </Step.Root>
      </div>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "긴 레이블은 자동으로 줄바꿈됩니다. 해당 Step.Item만 높이가 늘어나고, 다른 Step.Item들의 높이는 영향을 받지 않습니다. " +
          "각 Step.Item은 독립적으로 높이를 관리하므로, 하나의 레이블이 길어져도 다른 Step.Item들은 원래 높이를 유지합니다.",
      },
    },
  },
};

export const StatusVariants: CustomStory = {
  render: () => (
    <FlexColumn style={{ width: "100%", gap: "32px" }}>
      <FlexColumn gap='8px'>
        <div style={{ width: "100%", marginBottom: "20px" }}>Completed (완료됨)</div>
        <div style={{ width: "600px" }}>
          <Step.Root size='md'>
            <Step.Item index={0} status='completed'>
              단계 1
            </Step.Item>
            <Step.Item index={1} status='completed'>
              단계 2
            </Step.Item>
            <Step.Item index={2} status='completed'>
              단계 3
            </Step.Item>
          </Step.Root>
        </div>
      </FlexColumn>
      <FlexColumn gap='8px'>
        <div style={{ width: "100%", marginBottom: "20px" }}>Ongoing (진행 중)</div>
        <div style={{ width: "600px" }}>
          <Step.Root size='md'>
            <Step.Item index={0} status='ongoing'>
              단계 1
            </Step.Item>
            <Step.Item index={1} status='ongoing'>
              단계 2
            </Step.Item>
            <Step.Item index={2} status='ongoing'>
              단계 3
            </Step.Item>
          </Step.Root>
        </div>
      </FlexColumn>
      <FlexColumn gap='8px'>
        <div style={{ width: "100%", marginBottom: "20px" }}>Uncompleted (미완료)</div>
        <div style={{ width: "600px" }}>
          <Step.Root size='md'>
            <Step.Item index={0} status='uncompleted'>
              단계 1
            </Step.Item>
            <Step.Item index={1} status='uncompleted'>
              단계 2
            </Step.Item>
            <Step.Item index={2} status='uncompleted'>
              단계 3
            </Step.Item>
          </Step.Root>
        </div>
      </FlexColumn>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "스텝의 3가지 상태를 보여줍니다. completed(완료), ongoing(진행 중), uncompleted(미완료) 상태에 따라 Divider와 텍스트 색상이 변경됩니다.",
      },
    },
  },
};

export const UncontrolledExample: CustomStory = {
  render: () => {
    function StoryComponent() {
      const [step1Status, setStep1Status] = useState<"completed" | "ongoing" | "uncompleted">(
        "completed",
      );
      const [step2Status, setStep2Status] = useState<"completed" | "ongoing" | "uncompleted">(
        "completed",
      );
      const [step3Status, setStep3Status] = useState<"completed" | "ongoing" | "uncompleted">(
        "ongoing",
      );
      const [step4Status, setStep4Status] = useState<"completed" | "ongoing" | "uncompleted">(
        "uncompleted",
      );

      return (
        <FlexColumn style={{ width: "100%", gap: "32px" }}>
          <div style={{ width: "700px" }}>
            <Step.Root size='md'>
              <Step.Item index={0} status={step1Status}>
                계정 생성
              </Step.Item>
              <Step.Item index={1} status={step2Status}>
                프로필 설정
              </Step.Item>
              <Step.Item index={2} status={step3Status}>
                이메일 인증
              </Step.Item>
              <Step.Item index={3} status={step4Status}>
                완료
              </Step.Item>
            </Step.Root>
          </div>

          <FlexColumn gap='16px'>
            <div style={{ width: "100%", marginBottom: "20px" }}>
              각 단계의 상태를 개별적으로 제어할 수 있습니다
            </div>
            <FlexRow gap='8px' style={{ alignItems: "center" }}>
              <Label style={{ minWidth: "100px" }}>1단계:</Label>
              <button
                onClick={() => setStep1Status("completed")}
                disabled={step1Status === "completed"}
                style={{ padding: "4px 8px", fontSize: "12px" }}
              >
                완료
              </button>
              <button
                onClick={() => setStep1Status("ongoing")}
                disabled={step1Status === "ongoing"}
                style={{ padding: "4px 8px", fontSize: "12px" }}
              >
                진행중
              </button>
              <button
                onClick={() => setStep1Status("uncompleted")}
                disabled={step1Status === "uncompleted"}
                style={{ padding: "4px 8px", fontSize: "12px" }}
              >
                미완료
              </button>
            </FlexRow>

            <FlexRow gap='8px' style={{ alignItems: "center" }}>
              <Label style={{ minWidth: "100px" }}>2단계:</Label>
              <button
                onClick={() => setStep2Status("completed")}
                disabled={step2Status === "completed"}
                style={{ padding: "4px 8px", fontSize: "12px" }}
              >
                완료
              </button>
              <button
                onClick={() => setStep2Status("ongoing")}
                disabled={step2Status === "ongoing"}
                style={{ padding: "4px 8px", fontSize: "12px" }}
              >
                진행중
              </button>
              <button
                onClick={() => setStep2Status("uncompleted")}
                disabled={step2Status === "uncompleted"}
                style={{ padding: "4px 8px", fontSize: "12px" }}
              >
                미완료
              </button>
            </FlexRow>

            <FlexRow gap='8px' style={{ alignItems: "center" }}>
              <Label style={{ minWidth: "100px" }}>3단계:</Label>
              <button
                onClick={() => setStep3Status("completed")}
                disabled={step3Status === "completed"}
                style={{ padding: "4px 8px", fontSize: "12px" }}
              >
                완료
              </button>
              <button
                onClick={() => setStep3Status("ongoing")}
                disabled={step3Status === "ongoing"}
                style={{ padding: "4px 8px", fontSize: "12px" }}
              >
                진행중
              </button>
              <button
                onClick={() => setStep3Status("uncompleted")}
                disabled={step3Status === "uncompleted"}
                style={{ padding: "4px 8px", fontSize: "12px" }}
              >
                미완료
              </button>
            </FlexRow>

            <FlexRow gap='8px' style={{ alignItems: "center" }}>
              <Label style={{ minWidth: "100px" }}>4단계:</Label>
              <button
                onClick={() => setStep4Status("completed")}
                disabled={step4Status === "completed"}
                style={{ padding: "4px 8px", fontSize: "12px" }}
              >
                완료
              </button>
              <button
                onClick={() => setStep4Status("ongoing")}
                disabled={step4Status === "ongoing"}
                style={{ padding: "4px 8px", fontSize: "12px" }}
              >
                진행중
              </button>
              <button
                onClick={() => setStep4Status("uncompleted")}
                disabled={step4Status === "uncompleted"}
                style={{ padding: "4px 8px", fontSize: "12px" }}
              >
                미완료
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
          "Uncontrolled 모드입니다. 각 Step.Item에 status를 직접 전달하여 독립적으로 제어할 수 있습니다. " +
          "각 단계의 상태를 개별적으로 변경할 수 있고 순차적이지 않은 상태 조합도 가능합니다.",
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
            <Step.Root current={currentStep} size='md'>
              <Step.Item index={0}>회원가입</Step.Item>
              <Step.Item index={1}>정보 입력</Step.Item>
              <Step.Item index={2}>완료</Step.Item>
            </Step.Root>
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
          "Controlled 모드입니다. Step.Root에 current를 전달하면 각 Step.Item의 status가 자동으로 계산됩니다. " +
          "버튼을 클릭하여 단계를 변경할 수 있습니다.",
      },
    },
  },
};
