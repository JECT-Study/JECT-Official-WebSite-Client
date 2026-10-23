import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { vars } from "tokens";
import { visuallyHidden } from "utils";

import { Skeleton } from "./Skeleton";
import * as styles from "./skeleton.stories.css";
import { Card } from "../Card";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "데이터를 기다리는 영역에 배치하는 장식용 placeholder입니다. 크기와 반응형은 소비처 CSS에서 정하고 className으로 전달합니다. width·height는 간단한 크기 지정을 위한 편의 prop이며, 같은 속성을 CSS에서 관리할 때는 생략합니다. 반경은 실제 요소와 같은 JDS 토큰을 선택합니다. Figma 리소스의 권장 사례를 기준으로, 고정된 제목·필터·카드 프레임은 유지하고 데이터에 따라 달라지는 내용만 Skeleton으로 표시합니다.",
      },
    },
  },
  argTypes: {
    width: { control: "text", description: "숫자(px) 또는 단위를 포함한 CSS 너비, 기본값 없음" },
    height: { control: "text", description: "숫자(px) 또는 단위를 포함한 CSS 높이, 기본값 없음" },
    radius: {
      control: "select",
      options: Object.keys(vars.scheme.semantic.radius),
      description: "실제 콘텐츠와 맞출 JDS radius 토큰 키",
      table: { defaultValue: { summary: "8" } },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

function ProjectSkeleton() {
  return (
    <Card.Root variant='plate' className={styles.projectCard}>
      <Skeleton className={styles.projectImageSkeleton} radius='0' />
      <Card.Content>
        <Card.ContentGroup>
          <div className={styles.titleSlot}>
            <Skeleton className={styles.projectTitleSkeleton} />
          </div>
          <div className={styles.bodyLines}>
            <Skeleton className={styles.bodyLineSkeleton} />
            <Skeleton className={styles.projectBodyLastSkeleton} />
          </div>
        </Card.ContentGroup>
        <div className={styles.projectCaptionSlot}>
          <Skeleton className={styles.projectCaptionSkeleton} />
        </div>
      </Card.Content>
    </Card.Root>
  );
}

function PostSkeleton() {
  return (
    <Card.Root variant='post' layout='horizontal'>
      <Card.Content>
        <Card.ContentGroup>
          <div className={styles.titleSlot}>
            <Skeleton className={styles.postTitleSkeleton} />
          </div>
          <div className={styles.bodyLines}>
            <Skeleton className={styles.bodyLineSkeleton} />
            <Skeleton className={styles.postBodyLastSkeleton} />
          </div>
        </Card.ContentGroup>
        <Card.Meta>
          <div className={styles.captionSlot}>
            <Skeleton className={styles.postAuthorSkeleton} />
          </div>
          <div className={styles.captionSlot}>
            <Skeleton className={styles.postDateSkeleton} />
          </div>
        </Card.Meta>
      </Card.Content>
      <Skeleton className={styles.postThumbnailSkeleton} radius='0' />
    </Card.Root>
  );
}

const BLOG_CATEGORIES = ["전체", "프론트엔드", "백엔드", "기획", "매니지먼트", "디자인"];

function BlogPostsExample() {
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);

  return (
    <section className={styles.preview}>
      <h2 className={styles.pageTitle}>테크 블로그</h2>
      <div className={styles.filters} role='group' aria-label='게시글 분류'>
        {BLOG_CATEGORIES.map(label => (
          <button
            key={label}
            type='button'
            className={styles.filterChip}
            aria-pressed={category === label}
            onClick={() => setCategory(label)}
          >
            {label}
          </button>
        ))}
      </div>
      <p className={visuallyHidden} role='status'>
        {category} 게시글을 불러오는 중입니다.
      </p>
      <div className={styles.posts} role='region' aria-label='게시글 목록' aria-busy='true'>
        {[1, 2, 3].map(postNumber => (
          <PostSkeleton key={postNumber} />
        ))}
      </div>
    </section>
  );
}

const MEMBER_PLACEHOLDERS = [
  { nameWidth: 56, positionWidth: 96 },
  { nameWidth: 64, positionWidth: 80 },
  { nameWidth: 48, positionWidth: 104 },
  { nameWidth: 72, positionWidth: 88 },
  { nameWidth: 64, positionWidth: 104 },
  { nameWidth: 48, positionWidth: 80 },
  { nameWidth: 72, positionWidth: 96 },
  { nameWidth: 56, positionWidth: 88 },
] as const;

export const Default: Story = {
  args: { width: "160px", height: "24px" },
};

export const ProjectCards: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Figma 리소스 1의 프로젝트 카드입니다. 카드 배경·외곽선·모서리를 유지하고 이미지, 제목, 본문, 캡션 자리만 대체합니다. 두 열 카드 그리드와 짧은 본문 마지막 줄을 사용합니다.",
      },
    },
  },
  render: () => (
    <section className={styles.preview}>
      <h2 className={styles.pageTitle}>프로젝트</h2>
      <p className={visuallyHidden} role='status'>
        프로젝트를 불러오는 중입니다.
      </p>
      <div className={styles.projectGrid} role='region' aria-label='프로젝트 목록' aria-busy='true'>
        {[1, 2, 3, 4].map(projectNumber => (
          <ProjectSkeleton key={projectNumber} />
        ))}
      </div>
    </section>
  ),
};

export const BlogPosts: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Figma 리소스 3의 게시글 목록입니다. 정해진 제목과 분류 필터는 실제 요소로 유지하고, 세 게시글의 제목·본문·작성자·날짜·각진 썸네일만 대체합니다. 분류 선택은 로컬 예시이며 실제 API 요청은 포함하지 않습니다.",
      },
    },
  },
  render: () => <BlogPostsExample />,
};

export const Members: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Figma 리소스 5의 운영진 목록입니다. 원형 프로필은 실제 요소와 같은 radius='max'를 사용하고 이름·역할은 기본 반경 8로 표시합니다. 네 열, 두 행의 배치를 작은 화면에서는 재배치합니다.",
      },
    },
  },
  render: () => (
    <section className={styles.preview}>
      <h2 className={styles.pageTitle}>운영진</h2>
      <p className={visuallyHidden} role='status'>
        운영진을 불러오는 중입니다.
      </p>
      <div className={styles.memberGrid} role='region' aria-label='운영진 목록' aria-busy='true'>
        {MEMBER_PLACEHOLDERS.map(({ nameWidth, positionWidth }) => (
          <div className={styles.member} key={`${nameWidth}-${positionWidth}`}>
            <Skeleton className={styles.memberProfileSkeleton} radius='max' />
            <div className={styles.memberDetails}>
              <div className={styles.nameSlot}>
                <Skeleton className={styles.memberNameSkeleton[nameWidth]} />
              </div>
              <div className={styles.positionSlot}>
                <Skeleton className={styles.memberPositionSkeleton[positionWidth]} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  ),
};
