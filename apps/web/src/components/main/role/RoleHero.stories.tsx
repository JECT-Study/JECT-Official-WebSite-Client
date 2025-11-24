import type { Meta, StoryObj } from "@storybook/react";

import RoleHero from "./RoleHero";

const meta: Meta<typeof RoleHero> = {
  title: "Components/Role/RoleHero",
  component: RoleHero,
  argTypes: {
    title: {
      control: "text",
      description: "RoleHero 컴포넌트의 타이틀입니다.",
    },
    labels: {
      control: "object",
      description: '최소 0개 ~ 최대 5개의 레이블 문자열 배열 (예: ["Java", "SpringBoot", "DB"])',
    },
    children: {
      control: "text",
      description: "RoleHero 컴포넌트의 내용부분을 작성합니다.",
    },
    variant: {
      control: "select",
      options: ["fe", "be", "do", "pm", "pd"],
      description:
        "RoleHero 아이콘에 해당하는 variant입니다. 아이콘에 따라 배경색이 함께 제어됩니다.",
    },
  },
  args: {
    title: "프론트엔드 개발자",
    labels: ["HTML/CSS/JS", "TS", "React.js", "상태 관리", "성능 최적화"],
    children:
      "긍정적인 사용자 경험을 위해 서비스에 적합한 기술을 활용하고 성능을 최적화해요. 디자이너, 백엔드와 협업을 통해 데이터 흐름을 최적화해 효율적인 구조로 코드를 작성해요.",
    variant: "fe",
  },
};

export default meta;
type Story = StoryObj<typeof RoleHero>;

export const DefaultStory: Story = {
  name: "Default Hero",
};

export const NoLabelsStory: Story = {
  name: "No Labels Hero",
  args: {
    labels: [],
  },
};

export const RoleHeroStory: Story = {
  name: "RoleHero",
  render: () => (
    <div className="story-container">
      <div className="story-inner-container w-[45rem]">
        <RoleHero
          title="프론트엔드 개발자"
          variant="fe"
          labels={["HTML/CSS/JS", "TS", "React.js", "상태 관리", "성능 최적화"]}
        >
          긍정적인 사용자 경험을 위해 서비스에 적합한 기술을 활용하고 성능을 최적화해요. 디자이너,
          백엔드와 협업을 통해 데이터 흐름을 최적화해 효율적인 구조로 코드를 작성해요.
        </RoleHero>
      </div>
      <div className="story-inner-container w-[45rem]">
        <RoleHero
          title="백엔드 개발자"
          variant="be"
          labels={["Java", "Spring Boot", "Restful API", "DB", "CI/CD"]}
        >
          안정적이고 효율적인 서버 로직을 개발해요. 비즈니스 요구사항을 분석하고, API 설계부터
          데이터베이스 연동, 배포까지 전 과정을 책임집니다. 또한 확장성과 보안성을 고려해 서비스
          품질을 향상시키는 역할도 맡고 있어요.
        </RoleHero>
      </div>
      <div className="story-inner-container w-[45rem]">
        <RoleHero
          title="프로덕트 매니저"
          variant="pm"
          labels={["문서 관리", "일정 조율", "커뮤니케이션", "팀 플레"]}
        >
          서비스 기획에 대한 아이디어를 제시하고 유저 경험을 설계합니다. 원활한 팀 플레잉을 위해
          서비스 릴리즈까지의 프로젝트 일정 전반을 관리해요.
        </RoleHero>
      </div>
      <div className="story-inner-container w-[45rem]">
        <RoleHero
          title="프로덕트 디자이너"
          variant="pd"
          labels={["UX 설계", "UI 디자인", "프로토타이핑", "디자인 시스템"]}
        >
          사용자 경험 향상과 협업을 위한 디자인 규칙을 설계해요. 매력적인 서비스를 만들어 내기 위해
          아이덴티티 요소들도 디자인합니다.
        </RoleHero>
      </div>
    </div>
  ),
};
