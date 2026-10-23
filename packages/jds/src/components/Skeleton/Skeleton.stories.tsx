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
          "데이터를 기다리는 콘텐츠 자리를 표시합니다. 크기와 반응형은 소비처 CSS로 지정하고, `radius`로 반경을 선택합니다. 로딩 상태와 안내는 소비처에서 관리합니다.",
      },
    },
  },
  argTypes: {
    width: {
      control: "text",
      description: "선택적 너비: 숫자(px) 또는 CSS 문자열. CSS로 지정하면 생략",
    },
    height: {
      control: "text",
      description: "선택적 높이: 숫자(px) 또는 CSS 문자열. CSS로 지정하면 생략",
    },
    radius: {
      control: "select",
      options: Object.keys(vars.scheme.semantic.radius),
      description: "JDS radius 토큰 키",
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
        story: "카드 프레임을 유지하고 이미지와 텍스트만 Skeleton으로 표시합니다.",
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
          "제목과 분류 필터를 유지하고 게시글 내용만 Skeleton으로 표시합니다. 필터는 로컬 선택 예시입니다.",
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
        story: "프로필은 `radius='max'`, 이름과 역할은 기본 반경을 사용합니다.",
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
