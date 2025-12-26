import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card } from "./index";

const meta = {
  title: "Components/Card",
  component: Card.Root,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `Card 컴포넌트는 부모 컨테이너로부터 명시적인 width와 height를 받아 렌더링됩니다.

**중요:**
- Card를 사용할 때는 부모 요소에 width를 반드시 지정해야 합니다.
- horizontal 레이아웃을 사용할 때는 부모 요소에 height도 반드시 지정해야 합니다.
- vertical 레이아웃은 width만 지정하면 height는 내부 콘텐츠에 따라 자동으로 결정됩니다.
- Image는 aspect-ratio를 유지하면서 부모 컨테이너의 크기에 맞춰 렌더링됩니다.`,
      },
    },
  },
  argTypes: {
    layout: {
      control: "radio",
      options: ["vertical", "horizontal"],
      description: "카드 내부 요소들의 배열 방향",
      table: {
        defaultValue: { summary: "vertical" },
      },
    },
    variant: {
      control: "radio",
      options: ["plate", "post"],
      description: "카드의 시각적 변형",
      table: {
        defaultValue: { summary: "plate" },
      },
    },
    cardStyle: {
      control: "radio",
      options: ["outlined", "empty"],
      description: "카드의 스타일 (post variant에만 적용)",
    },
    isDisabled: {
      control: "boolean",
      description: "비활성화 상태",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    interactive: {
      control: "boolean",
      description: `카드를 인터랙티브하게 만듭니다. Card.Overlay와 함께 사용해야 합니다.

인터랙션 효과:
- Hover: 카드가 위로 올라가며 그림자 강조 (150ms 애니메이션)
- Active: 즉시 원래 위치로 복귀 (모바일 터치 피드백)
- Focus: Hover 효과 + 포커스 링 표시 (키보드 네비게이션)`,
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<typeof Card.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CompoundBasic: Story = {
  name: "Basic 형태의 Compound 사용",
  args: {},
  render: () => (
    <div style={{ width: "400px" }}>
      <Card.Root layout='vertical' variant='plate'>
        <Card.Image alt='프로젝트 이미지' />
        <Card.Content>
          <Card.Title>타이틀 레이블</Card.Title>
          <Card.Body>
            Compound Components 패턴으로 자유롭게 조합할 수 있습니다. 최대한의 유연성을 제공합니다.
            부모의 크기를 명시적으로 선언해주어야 합니다.
          </Card.Body>
          <Card.Caption>캡션 레이블입니다.</Card.Caption>
        </Card.Content>
      </Card.Root>
    </div>
  ),
};

export const CompoundCustom: Story = {
  name: "Compound를 사용하여 커스텀한 경우",
  args: {},
  render: () => (
    <div style={{ width: "400px" }}>
      <Card.Root layout='vertical' variant='plate'>
        <Card.Image alt='커스텀 카드' />
        <Card.Content>
          <Card.Title>커스텀 구성 카드</Card.Title>
          <Card.Body>
            원하는 대로 내부 블록을 조립할 수 있습니다. 임의의 children 요소를 생성하여 테스트
          </Card.Body>
          <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
            <span
              style={{
                padding: "4px 8px",
                background: "#f0f0f0",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            >
              태그1
            </span>
            <span
              style={{
                padding: "4px 8px",
                background: "#f0f0f0",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            >
              태그2
            </span>
          </div>
        </Card.Content>
      </Card.Root>
    </div>
  ),
};

export const CompoundWithMeta: Story = {
  name: "Card.Meta, MetaItem을 사용한 케이스",
  args: {},
  render: () => (
    <div style={{ width: "400px" }}>
      <Card.Root layout='vertical' variant='post' cardStyle='outlined'>
        <Card.Image alt='블로그 포스트 사진' />
        <Card.Content>
          <Card.Title>포스트 제목</Card.Title>
          <Card.Body>
            메타 정보가 포함된 카드입니다. Meta 컴포넌트의 하위 요소 MetaItem을 정렬합니다.
          </Card.Body>
          <Card.Meta>
            <Card.MetaItem>메타 아이템 1번</Card.MetaItem>
            <Card.MetaItem>메타 아이템 2번</Card.MetaItem>
            <Card.MetaItem>메타 아이템 3번</Card.MetaItem>
          </Card.Meta>
        </Card.Content>
      </Card.Root>
    </div>
  ),
};

export const CompoundWithOverlay: Story = {
  name: "Interactive한 Card 요소(Card.Overlay 사용)",
  args: {},
  parameters: {
    docs: {
      description: {
        story: `Card를 인터랙티브하게 만들려면 \`interactive\` prop과 \`Card.Overlay\`를 함께 사용해야 합니다.

**인터랙션 동작:**
- \`interactive\` prop을 추가하면 Card.Root에 인터랙션 스타일이 적용됩니다
- **Hover**: 카드가 살짝 위로 올라가며(translateY -2px) 그림자가 강조됩니다
- **Active**: 원래 위치로 즉시 돌아옵니다 (모바일 터치 피드백)
- **Focus**: Hover와 동일한 효과 + 포커스 링이 표시됩니다 (키보드 네비게이션)
- **Transition**: Hover/Focus 전환은 150ms의 부드러운 애니메이션, Active는 즉각 반응

**구조:**
- \`Card.Root\`에 \`interactive\` prop 추가
- \`Card.Overlay\`를 마지막 자식으로 배치 (링크 또는 버튼)
- Overlay가 카드 전체를 덮어 클릭 영역을 확장

**접근성:**
- \`Card.Overlay\`에 반드시 \`aria-label\` 추가
- 키보드 네비게이션 지원 (Tab/Enter)
- 스크린 리더 호환`,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <div style={{ width: "350px" }}>
        <Card.Root layout='vertical' variant='plate' interactive>
          <Card.Image alt='클릭 가능한 카드' />
          <Card.Content>
            <Card.Title>인터랙티브 카드 (링크)</Card.Title>
            <Card.Body>
              마우스를 올려보세요. 카드가 살짝 떠오르며 그림자가 강조됩니다. Tab 키로 포커스를
              이동하면 포커스 링이 표시됩니다.
            </Card.Body>
            <Card.Caption>Hover, Focus, Active 상태 모두 지원</Card.Caption>
          </Card.Content>
          {/* @ts-expect-error - Polymorphic component의 제네릭 타입 추론 한계 (TypeScript와 forwardRef 간의 추론 제약사항) */}
          <Card.Overlay as='a' href='#' aria-label='카드 상세 페이지로 이동' />
        </Card.Root>
      </div>
      <div style={{ width: "350px" }}>
        <Card.Root layout='vertical' variant='plate' interactive>
          <Card.Image alt='버튼 카드' />
          <Card.Content>
            <Card.Title>인터랙티브 카드 (버튼)</Card.Title>
            <Card.Body>
              버튼으로도 사용할 수 있습니다. 클릭하면 알림이 표시됩니다. 키보드로도 접근 가능합니다.
            </Card.Body>
            <Card.Caption>onClick 이벤트 연결 가능</Card.Caption>
          </Card.Content>
          <Card.Overlay
            as='button'
            // @ts-expect-error - Polymorphic component의 제네릭 타입 추론 한계
            onClick={() => alert("카드가 클릭되었습니다!")}
            aria-label='카드 클릭'
          />
        </Card.Root>
      </div>
      <div style={{ width: "480px", height: "240px" }}>
        <Card.Root layout='horizontal' variant='plate' interactive>
          <Card.Image alt='가로 레이아웃' />
          <Card.Content>
            <Card.Title>가로 레이아웃도 지원</Card.Title>
            <Card.Body>
              horizontal layout에서도 인터랙션 스타일이 동일하게 작동합니다. 반응형 디자인에
              최적화되어 있습니다.
            </Card.Body>
            <Card.Caption>layout = horizontal</Card.Caption>
          </Card.Content>
          {/* @ts-expect-error - Polymorphic component의 제네릭 타입 추론 한계 */}
          <Card.Overlay as='a' href='#' aria-label='가로 카드 상세 페이지로 이동' />
        </Card.Root>
      </div>
    </div>
  ),
};

export const InteractionDetails: Story = {
  name: "인터랙션 스타일 상세 (비교용)",
  args: {},
  parameters: {
    docs: {
      description: {
        story: `Interactive와 Non-interactive 카드를 비교하여 인터랙션 스타일의 차이를 확인할 수 있습니다.

**Interactive 카드의 인터랙션 세부사항:**

1. **Transform 애니메이션**
   - Hover/Focus: \`translateY(-2px)\` - 살짝 위로 떠오름
   - Active: \`translateY(0)\` - 즉시 원위치
   - Transition: 150ms fluent motion

2. **Shadow 변화**
   - 기본: subtle shadow (1px blur)
   - Hover/Focus: raised shadow (강조된 그림자)
   - Active: 기본 shadow로 즉시 복귀

3. **Focus 스타일 (::after)**
   - 포커스 링이 카드 외곽에 표시
   - Transition: 100ms fluent motion (Card의 특수 요구사항)
   - 키보드 네비게이션 시 즉시 표시

4. **Card.Overlay**
   - position: absolute로 카드 전체를 덮음
   - z-index: 1로 다른 내용물 위에 배치
   - 투명하지만 클릭/포커스 영역 제공`,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: "24px", flexDirection: "column" }}>
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "bold" }}>
          Interactive 카드 (interactive prop 있음)
        </h3>
        <div style={{ width: "350px" }}>
          <Card.Root layout='vertical' variant='plate' interactive>
            <Card.Image alt='인터랙티브 카드' />
            <Card.Content>
              <Card.Title>인터랙션 효과 적용됨</Card.Title>
              <Card.Body>
                마우스를 올려보세요. 카드가 떠오르며 그림자가 강조됩니다. Tab 키로 포커스를 이동하면
                포커스 링이 표시됩니다.
              </Card.Body>
              <Card.Caption>Hover, Active, Focus 모두 동작</Card.Caption>
            </Card.Content>
            {/* @ts-expect-error - Polymorphic component의 제네릭 타입 추론 한계 */}
            <Card.Overlay as='a' href='#' aria-label='인터랙티브 카드' />
          </Card.Root>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "bold" }}>
          일반 카드 (interactive prop 없음)
        </h3>
        <div style={{ width: "350px" }}>
          <Card.Root layout='vertical' variant='plate'>
            <Card.Image alt='일반 카드' />
            <Card.Content>
              <Card.Title>인터랙션 효과 없음</Card.Title>
              <Card.Body>
                마우스를 올려도 아무 변화가 없습니다. Card.Overlay가 없으므로 클릭 영역도 없습니다.
              </Card.Body>
              <Card.Caption>정적인 정보 표시용 카드</Card.Caption>
            </Card.Content>
          </Card.Root>
        </div>
      </div>
    </div>
  ),
};

export const PresetPlateWithTitle: Story = {
  name: "Preset - PlateWithTitle (Card.Title을 사용하는 구조)",
  args: {},
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <div style={{ width: "350px" }}>
        <Card.Preset.PlateWithTitle.Link
          href='#'
          layout='vertical'
          image={{ alt: "image의 alt 이름" }}
          caption='캡션 내용이 들어감'
          title='제목부분입니다'
          body='body에 대한 설명입니다. Preset을 사용하면 주로 사용하는 카드 구조를 그대로 사용할 수 있습니다.'
        />
      </div>
      <div style={{ width: "480px", height: "160px" }}>
        <Card.Preset.PlateWithTitle.Button
          onClick={() => alert("카드가 클릭되었습니다!")}
          layout='horizontal'
          image={{ alt: "image의 alt 이름" }}
          caption='캡션 내용이 들어감'
          title='제목부분입니다'
          body='horizontal layout으로 설정하면 이미지가 좌측에 표시됩니다.'
        />
      </div>
    </div>
  ),
};

export const PresetPlateWithLabel: Story = {
  name: "Preset - PlateWithLabel (Card.Label을 사용하는 구조)",
  args: {},
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <div style={{ width: "274px" }}>
        <Card.Preset.PlateWithLabel.Link
          href='#'
          layout='vertical'
          image={{ alt: "image의 alt 이름" }}
          caption='캡션 내용이 들어감'
          label='제목(Card.Title보다 위계가 낮은 Card.label을 사용)'
          body='body에 대한 설명입니다. Preset을 사용하여 Card.Title보다 위계가 낮은 Card.Label을 사용하여 상단 요소를 표현합니다.'
        />
      </div>
      <div style={{ width: "480px", height: "160px" }}>
        <Card.Preset.PlateWithLabel.Button
          onClick={() => alert("PlateWithLabel 카드가 클릭되었습니다!")}
          layout='horizontal'
          image={{ alt: "image의 alt 이름" }}
          caption='캡션 내용이 들어감'
          label='가로 레이아웃 Label'
          body='horizontal layout에서도 Card.Label을 사용할 수 있습니다. 이미지가 좌측에 표시됩니다.'
        />
      </div>
    </div>
  ),
};

export const PresetPlateCompact: Story = {
  name: "Preset - PlateCompact (Card.Title, Card.Label을 둘다 사용하지 않는 구조)",
  args: {},
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <div style={{ width: "274px" }}>
        <Card.Preset.PlateCompact.Link
          href='#'
          layout='vertical'
          image={{ alt: "이미지의 alt 명" }}
          caption='캡션 내용이 들어갑니다.'
          body='Title이나 Label 없이 간결하게 정보를 표시하는 카드입니다. 1:2 비율의 이미지를 사용합니다.'
        />
      </div>
      <div style={{ width: "480px", height: "120px" }}>
        <Card.Preset.PlateCompact.Button
          onClick={() => alert("PlateCompact 카드가 클릭되었습니다!")}
          layout='horizontal'
          image={{ alt: "이미지의 alt 명" }}
          caption='캡션 내용이 들어갑니다.'
          body='horizontal layout에서도 간결한 카드를 사용할 수 있습니다.'
        />
      </div>
    </div>
  ),
};

export const PresetPost: Story = {
  name: "Preset - Post (디자인 에셋에서 Card/Post 케이스)",
  args: {},
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ width: "400px" }}>
        <Card.Preset.Post.Link
          href='#'
          layout='vertical'
          cardStyle='outlined'
          image={{ alt: "이미지의 alt 명" }}
          title='Post에 오는 제목이 옵니다.'
          body='Card.Post의 body(실질적인 내용)가 들어갑니다. 현재 a태그를 overlay로 사용합니다.'
          author='김젝트'
          date='2025년 5월 28일'
        />
      </div>
      <div style={{ width: "400px" }}>
        <Card.Preset.Post.Button
          onClick={() => alert("Post 카드(button형) 클릭됨!")}
          layout='vertical'
          cardStyle='empty'
          image={{ alt: "이미지의 alt 명" }}
          title='Post에 오는 제목이 옵니다.'
          body='Card.Post의 body(실질적인 내용)가 들어갑니다. 현재 button 태그를 overlay로 사용합니다.'
          author='김젝트'
          date='2025년 5월 28일'
        />
      </div>
      <div style={{ width: "400px" }}>
        <Card.Preset.Post.Link
          href='#'
          layout='horizontal'
          cardStyle='outlined'
          image={{ alt: "이미지의 alt 명" }}
          title='Post에 오는 제목이 옵니다.'
          body='Card.Post의 body(실질적인 내용)가 들어갑니다. 현재 a태그를 overlay로 사용합니다.'
          author='김젝트'
          date='2025년 5월 28일'
        />
      </div>
    </div>
  ),
};
