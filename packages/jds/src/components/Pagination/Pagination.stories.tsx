import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, Label } from "@storybook-utils/layout";
import {
  createContext,
  forwardRef,
  useContext,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import { Pagination } from "./Pagination";

const NavigateContext = createContext<(href: string) => void>(() => {});

interface RouterLinkProps extends ComponentPropsWithoutRef<"a"> {
  href: string;
}

const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  ({ href, onClick, ...restProps }, ref) => {
    const navigate = useContext(NavigateContext);

    return (
      <a
        ref={ref}
        href={href}
        {...restProps}
        onClick={event => {
          onClick?.(event);
          if (event.defaultPrevented) return;

          event.preventDefault();
          navigate(href);
        }}
      />
    );
  },
);

RouterLink.displayName = "RouterLink";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "연관된 콘텐츠 뷰를 여러 페이지 단위로 더 작게 나눠 탐색할 수 있도록 돕는 컴포넌트입니다.",
      },
    },
  },
  args: {
    "aria-label": "페이지 이동",
    defaultPage: 5,
    totalPages: 10,
    visiblePageCount: 7,
    disabled: false,
  },
  argTypes: {
    page: {
      control: { type: "number", min: 1, step: 1 },
      description: "현재 페이지입니다. 1부터 시작합니다.",
    },
    defaultPage: {
      control: { type: "number", min: 1, step: 1 },
      description: "비제어 방식에서 사용할 초기 페이지입니다.",
    },
    totalPages: {
      control: { type: "number", min: 1, step: 1 },
      description: "전체 페이지 수입니다.",
    },
    visiblePageCount: {
      control: "radio",
      options: [7, 8, 9, 10, 11],
      description: "이전, 다음 버튼을 제외하고 말줄임을 포함해 표시할 최대 항목 수입니다.",
    },
    disabled: {
      control: "boolean",
      description: "모든 페이지 이동 요소의 비활성 여부입니다.",
    },
    getPageHref: {
      control: false,
      description: "각 페이지의 URL을 반환합니다. 제공하면 링크로 렌더링합니다.",
    },
    linkAs: {
      control: false,
      description: "링크 모드에서 사용할 라우팅 컴포넌트입니다. 기본값은 a 요소입니다.",
    },
    onPageChange: {
      control: false,
      description: "페이지 이동 요소를 눌렀을 때 호출됩니다.",
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => <Pagination key={args.defaultPage} {...args} />,
  parameters: {
    docs: {
      description: {
        story: "defaultPage를 사용해 내부에서 현재 페이지를 관리하는 비제어 방식입니다.",
      },
    },
  },
};

export const Controlled: Story = {
  render: function Render() {
    const [page, setPage] = useState(5);

    return (
      <Pagination aria-label='페이지 이동' page={page} totalPages={10} onPageChange={setPage} />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "page와 onPageChange를 사용해 외부에서 현재 페이지를 관리하는 제어 방식입니다.",
      },
    },
  },
};

export const LinkNavigation: Story = {
  args: {
    page: 5,
    defaultPage: undefined,
    getPageHref: page => `?page=${page}`,
  },
  parameters: {
    docs: {
      description: {
        story: "getPageHref를 제공하면 모든 페이지 이동 요소를 링크로 렌더링합니다.",
      },
    },
  },
};

export const LinkAs: Story = {
  render: function Render() {
    const [href, setHref] = useState("?page=5");
    const page = Number(new URLSearchParams(href).get("page"));

    return (
      <NavigateContext.Provider value={setHref}>
        <FlexColumn gap='12px'>
          <Pagination
            aria-label='페이지 이동'
            page={page}
            totalPages={10}
            getPageHref={targetPage => `?page=${targetPage}`}
            linkAs={RouterLink}
          />
          <Label style={{ width: "max-content" }}>현재 페이지: {page}</Label>
        </FlexColumn>
      </NavigateContext.Provider>
    );
  },
};

export const BoundaryStates: Story = {
  render: () => (
    <FlexColumn gap='20px'>
      <FlexColumn gap='8px'>
        <Label>첫 페이지</Label>
        <Pagination aria-label='페이지 이동' defaultPage={1} totalPages={10} />
      </FlexColumn>
      <FlexColumn gap='8px'>
        <Label>마지막 페이지</Label>
        <Pagination aria-label='페이지 이동' defaultPage={10} totalPages={10} />
      </FlexColumn>
    </FlexColumn>
  ),
};

export const VisiblePageCounts: Story = {
  render: () => (
    <FlexColumn gap='20px'>
      {([7, 8, 9, 10, 11] as const).map(visiblePageCount => (
        <FlexColumn gap='8px' key={visiblePageCount}>
          <Label style={{ width: "max-content" }}>visiblePageCount: {visiblePageCount}</Label>
          <Pagination
            aria-label='페이지 이동'
            defaultPage={10}
            totalPages={20}
            visiblePageCount={visiblePageCount}
          />
        </FlexColumn>
      ))}
    </FlexColumn>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
