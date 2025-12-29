import type { Meta, StoryObj } from "@storybook/react-vite";

import InputField from "./InputField";
import BlockButton from "../button/BlockButton";
import LabelButton from "../button/LabelButton";
import Icon from "../icon/Icon";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  argTypes: {
    isError: {
      control: "boolean",
      description: "사용자와의 입력과 같은 상호작용이 옳지 않을 경우 사용합니다.",
    },
    isSuccess: {
      control: "boolean",
      description: "true일 경우 헬퍼 메시지의 색상이 초록색으로 변경됩니다.",
    },
    InputChildren: {
      description: "(선택) input 내부에 위치하는 버튼 혹은 아이콘 요소를 받습니다.",
    },
    children: {
      description: "(선택) input 외부에 위치하는 버튼을 받습니다.",
    },
    labelText: {
      control: "text",
      description: "(선택) input의 label을 나타냅니다. ",
    },
    helper: {
      control: "text",
      description: "(선택) 헬퍼메시지를 나타냅니다.",
    },
    className: {
      description: "(선택) input의 스타일을 추가하고싶을 때 사용합니다.",
    },
    required: {
      control: "boolean",
      description: "기본 props",
    },
    disabled: {
      control: "boolean",
      description: "기본 props",
    },
    type: {
      control: "inline-radio",
      description: "기본 props ex) password, email",
      options: ["text", "number", "password"],
    },
    placeholder: {
      control: "text",
      description: "기본 props",
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    isError: false,
    isSuccess: false,
    required: true,
    disabled: false,
    labelText: "레이블",
    helper: "헬퍼 메시지",
    placeholder: "플레이스 홀더",
  },
};

export const All: Story = {
  name: "InputField with external & internal button",
  render: () => {
    return (
      <InputField
        isError={false}
        isSuccess={false}
        required
        labelText='레이블'
        helper='헬퍼 메시지'
        placeholder='플레이스 홀더'
        InputChildren={
          <LabelButton size='md' hierarchy='accent'>
            인증하기
          </LabelButton>
        }
      >
        <BlockButton
          size='md'
          style='solid'
          hierarchy='accent'
          className='h-[3.375rem] cursor-pointer'
        >
          레이블
        </BlockButton>
      </InputField>
    );
  },
};

export const ExternalButtonStory: Story = {
  name: "InputField with external button",
  render: () => {
    return (
      <InputField
        isError={false}
        isSuccess={false}
        required
        labelText='레이블'
        helper='헬퍼 메시지'
        placeholder='플레이스 홀더'
      >
        <BlockButton
          size='md'
          style='solid'
          hierarchy='accent'
          className='h-[3.375rem] cursor-pointer'
        >
          레이블
        </BlockButton>
      </InputField>
    );
  },
};

export const InternalButtonStory: Story = {
  name: "InputField with internal label button",
  render: () => {
    return (
      <InputField
        isError={false}
        isSuccess={false}
        required
        labelText='레이블'
        helper='헬퍼 메시지'
        placeholder='플레이스 홀더'
        InputChildren={
          <LabelButton size='md' hierarchy='accent'>
            인증하기
          </LabelButton>
        }
      />
    );
  },
};

export const InternalIconStory: Story = {
  name: "InputField with internal Icon",
  render: () => {
    return (
      <InputField
        isError={false}
        isSuccess={false}
        required
        labelText='레이블'
        helper='헬퍼 메시지'
        placeholder='플레이스 홀더'
        className='group'
        InputChildren={
          <Icon
            name='dropDown'
            size='lg'
            fillColor='fill-object-assistive-dark group-focus-within:fill-object-neutral-dark'
          />
        }
      />
    );
  },
};

export const OnlyInputStory: Story = {
  name: "InputField only input",
  render: () => {
    return <InputField isError={false} isSuccess={false} required placeholder='플레이스 홀더' />;
  },
};

export const InputFieldHasHelperStory: Story = {
  name: "InputField has Helper",
  render: () => {
    return (
      <InputField
        isError={false}
        isSuccess={false}
        helper='헬퍼 메시지'
        placeholder='플레이스 홀더'
      />
    );
  },
};

export const InputFieldHasLabelStory: Story = {
  name: "InputField has LabelText",
  render: () => {
    return (
      <InputField
        isError={false}
        isSuccess={false}
        labelText='추가된 레이블'
        placeholder='플레이스 홀더'
      />
    );
  },
};
