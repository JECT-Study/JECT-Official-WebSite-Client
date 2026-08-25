import type { Meta, StoryObj } from "@storybook/react-vite";

import { Table } from ".";
import type { TableRowItemProps } from "./Table.types";

const meta: Meta<typeof Table.RowItem> = {
  title: "Components/Table",
  component: Table.RowItem,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
테이블은 행과 열 구조를 통해 여러 항목의 정보를 체계적으로 비교·정리해 보여주는 데이터 표현 컴포넌트입니다. 값 간의 관계를 한눈에 파악할 수 있도록 하며, 목록, 비교, 상태 확인처럼 구조화된 정보를 전달하는 데 사용합니다.\n
Compound Component 패턴 기반으로 구현되었으며, \`Table.RowItem\`의 \`variant\` 속성을 통해 다양한 형태의 데이터를 표현합니다.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["label", "code", "badge"],
      description: "셀의 렌더링 타입",
    },
    children: {
      control: "text",
      description: "셀 내용 (텍스트)",
    },
    description: {
      control: "text",
      description: "하단 부가 설명 (label, code 타입 전용)",
    },
    color: {
      control: "color",
      description: "좌측 컬러 칩 색상 (label 타입 전용)",
    },
    prefixIcon: {
      control: "select",
      description: "좌측 아이콘 (label 타입 전용)",
    },
    hasDivider: {
      control: "boolean",
      description: "우측 구분선 표시 여부",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table.RowItem>;

export const Basic: StoryObj<TableRowItemProps> = {
  args: {
    variant: "label",
    children: "레이블",
    description: "설명",
    hasDivider: true,
  },
  render: (args: TableRowItemProps) => (
    <Table.Root>
      <Table.Header>
        <Table.HeaderItem hasDivider={args.hasDivider}>레이블 (상태 확인 가능)</Table.HeaderItem>
        <Table.HeaderItem>레이블</Table.HeaderItem>
        <Table.HeaderItem>레이블</Table.HeaderItem>
        <Table.HeaderItem>레이블</Table.HeaderItem>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.RowItem {...args}>{args.children}</Table.RowItem>
          <Table.RowItem variant='label'>레이블</Table.RowItem>
          <Table.RowItem variant='label'>레이블</Table.RowItem>
          <Table.RowItem variant='label'>레이블</Table.RowItem>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  ),
};

export const VariantLabel: Story = {
  render: () => (
    <Table.Root>
      <Table.Header>
        <Table.HeaderItem>기본</Table.HeaderItem>
        <Table.HeaderItem>아이콘 표시</Table.HeaderItem>
        <Table.HeaderItem>설명 & 컬러 칩 표시</Table.HeaderItem>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.RowItem variant='label'>레이블</Table.RowItem>
          <Table.RowItem variant='label' prefixIcon='focus'>
            레이블
          </Table.RowItem>
          <Table.RowItem variant='label' color='#FF5733' description='16진수 색상 코드입니다.'>
            #FF5733
          </Table.RowItem>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  ),
};

export const VariantCode: Story = {
  render: () => (
    <Table.Root>
      <Table.Header>
        <Table.HeaderItem>단일</Table.HeaderItem>
        <Table.HeaderItem>다수</Table.HeaderItem>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.RowItem variant='code' description='단일 패키지 설치'>
            npm install react
          </Table.RowItem>
          <Table.RowItem variant='code' description='필수 의존성 목록'>
            {["react", "react-dom", "vite"]}
          </Table.RowItem>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  ),
};

export const VariantBadge: Story = {
  render: () => (
    <Table.Root>
      <Table.Header>
        <Table.HeaderItem>상태</Table.HeaderItem>
        <Table.HeaderItem>태그</Table.HeaderItem>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.RowItem variant='badge'>Active</Table.RowItem>
          <Table.RowItem variant='badge'>{["Design", "Develop", "QA"]}</Table.RowItem>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  ),
};

export const ComplexTable: Story = {
  render: () => (
    <Table.Root>
      <Table.Header>
        <Table.HeaderItem>레이블</Table.HeaderItem>
        <Table.HeaderItem>레이블</Table.HeaderItem>
        <Table.HeaderItem>레이블</Table.HeaderItem>
        <Table.HeaderItem>레이블</Table.HeaderItem>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.RowItem variant='label' prefixIcon='focus'>
            variant
          </Table.RowItem>
          <Table.RowItem variant='code'>{["code", "code", "code"]}</Table.RowItem>
          <Table.RowItem variant='label' description='셀의 형태를 결정합니다.'>
            Variant Type
          </Table.RowItem>
          <Table.RowItem variant='badge'>레이블</Table.RowItem>
        </Table.Row>
        <Table.Row>
          <Table.RowItem variant='label' prefixIcon='focus'>
            color
          </Table.RowItem>
          <Table.RowItem variant='code'>code</Table.RowItem>
          <Table.RowItem
            color='#21a2ff'
            variant='label'
            description='라벨 앞에 표시될 색상 칩입니다.'
          >
            #21a2ff
          </Table.RowItem>
          <Table.RowItem variant='badge'>
            {["레이블", "레이블", "레이블", "레이블", "레이블"]}
          </Table.RowItem>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  ),
};
