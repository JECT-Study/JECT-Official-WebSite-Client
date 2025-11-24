import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";

import Dialog from "./Dialog";
import BlockButton from "../button/BlockButton";

import { useDialogActions } from "@/stores/dialogStore";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component:
          "Dialog 컴포넌트는 Layout 컴포넌트에 포함되어있으며 Dialog를 띄우려면 useDialogActions의 openDialog 메서드를 사용합니다. 필요한 페이지에 Dialog 컴포넌트를 불러와 작성하지 않습니다. <br/> Dialog의 정적인 내용은 객체 데이터로 관리되며, Dialog의 열림 닫힘 상태, 다이얼로그 타입(어떤 객체데이터인지), 버튼의 액션은 zustand로 관리됩니다. <br/> openDialog 메서드 사용 시 버튼 액션을 작성하지 않으면 단순 다이얼로그 닫기 동작과 동일합니다.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const HorizontalDialogStory: Story = {
  render: function Render() {
    const { openDialog } = useDialogActions();

    const handleDialogClick = () => {
      openDialog({
        type: "changeJob",
        onPrimaryBtnClick: () => action("버튼1 클릭"),
        onSecondaryBtnClick: () => action("버튼2 클릭"),
      });
    };

    return (
      <>
        <BlockButton size="md" style="solid" hierarchy="accent" onClick={handleDialogClick}>
          horizontal 다이얼로그 열기
        </BlockButton>
        <Dialog />
      </>
    );
  },
};

export const VerticalDialogStory: Story = {
  render: function Render() {
    const { openDialog } = useDialogActions();

    const handleDialogClick = () => {
      openDialog({
        type: "example",
        onPrimaryBtnClick: () => action("버튼1 클릭"),
        onSecondaryBtnClick: () => action("버튼2 클릭"),
      });
    };

    return (
      <>
        <BlockButton size="md" style="solid" hierarchy="accent" onClick={handleDialogClick}>
          Vertical 다이얼로그 열기
        </BlockButton>
        <Dialog />
      </>
    );
  },
};

export const SingleButtonDialogStory: Story = {
  render: function Render() {
    const { openDialog } = useDialogActions();

    const handleDialogClick = () => {
      openDialog({
        type: "expiredSession",
        onPrimaryBtnClick: () => action("버튼1 클릭"),
      });
    };

    return (
      <>
        <BlockButton size="md" style="solid" hierarchy="accent" onClick={handleDialogClick}>
          single Button 다이얼로그 열기
        </BlockButton>
        <Dialog />
      </>
    );
  },
};
