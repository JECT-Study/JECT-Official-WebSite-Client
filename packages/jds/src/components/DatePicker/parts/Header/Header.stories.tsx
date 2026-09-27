import type { Meta, StoryObj } from "@storybook/react-vite";

import { Header } from "./Header";
import { IconButton } from "../../../Button/IconButton";
import { LabelButton } from "../../../Button/LabelButton";

const PANEL_WIDTH = 272;

const YearMonthTitles = () => (
  <>
    <LabelButton size='lg' suffixIcon='chevron-down'>
      2026년
    </LabelButton>
    <LabelButton size='lg' suffixIcon='chevron-down'>
      9월
    </LabelButton>
  </>
);

const MonthNavigation = ({ prevDisabled = false }: { prevDisabled?: boolean }) => (
  <>
    <IconButton
      size='lg'
      icon='chevron-left'
      condensed={false}
      aria-label='이전 달'
      disabled={prevDisabled}
    />
    <IconButton size='lg' icon='chevron-right' condensed={false} aria-label='다음 달' />
  </>
);

const meta: Meta<typeof Header> = {
  title: "Components/DatePicker/Header",
  component: Header,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "DatePicker 상단의 연월 표시와 이동 버튼을 배치하는 파츠입니다. 배럴에 공개되지 않으며 DatePicker 내부에서만 사용합니다. 버튼은 파츠가 만들지 않고 소비처가 titles와 navigation에 넣습니다. titles는 남는 공간을 모두 차지하고 navigation은 오른쪽에 붙습니다. 너비를 고정하지 않으므로 부모 폭을 따릅니다.",
      },
    },
  },
  argTypes: {
    titles: { control: false },
    navigation: { control: false },
  },
  decorators: [
    Story => (
      <div style={{ width: PANEL_WIDTH }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    titles: <YearMonthTitles />,
    navigation: <MonthNavigation />,
  },
};

export const LongTitle: Story = {
  args: {
    titles: (
      <LabelButton size='lg' suffixIcon='chevron-down'>
        2026년 9월
      </LabelButton>
    ),
    navigation: <MonthNavigation />,
  },
};

export const DisabledNavigation: Story = {
  args: {
    titles: <YearMonthTitles />,
    navigation: <MonthNavigation prevDisabled />,
  },
};
