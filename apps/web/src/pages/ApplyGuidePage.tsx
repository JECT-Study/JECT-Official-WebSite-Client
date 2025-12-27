/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  BlockButton,
  Hero,
  IconButton,
  Label,
  LocalNavigation,
  Tab,
  Title,
  toastController,
} from "@ject/jds";
import { theme } from "@ject/jds/tokens";
import { useNavigate, useParams, Navigate } from "react-router-dom";

import type { JobFamily } from "@/apis/apply";
import { findJobFamilyOption, JOB_FAMILY_OPTIONS } from "@/constants/applyPageData";
import { PATH } from "@/constants/path";

const VALID_JOB_FAMILIES = JOB_FAMILY_OPTIONS.map(opt => opt.value);

function isValidJobFamily(value: string | undefined): value is JobFamily {
  return VALID_JOB_FAMILIES.includes(value as JobFamily);
}

const bodyTextStyle = css`
  ${theme.textStyle["semantic-textStyle-body-md-normal"]}
  color: ${theme.color.semantic.object.bold};
`;

function ApplyGuidePage() {
  const navigate = useNavigate();
  const { jobFamily } = useParams();

  if (!isValidJobFamily(jobFamily)) {
    return <Navigate to={PATH.notFoundError} replace />;
  }

  const handleApply = () => {
    void navigate(`${PATH.applyFunnel}/${jobFamily}`);
  };

  const handleContinue = () => {
    void navigate(`${PATH.applyContinue}/${jobFamily}?step=PROFILE`);
  };

  const handleBack = () => {
    void navigate(PATH.applyList);
  };

  const handleCopyUrl = () => {
    void navigator.clipboard.writeText(window.location.href).then(() => {
      toastController.basic("URL을 클립보드에 복사했습니다.");
    });
  };

  return (
    <div className='flex max-w-[656px] flex-col items-start px-(--semantic-margin-lg) pb-(--semantic-spacing-80)'>
      <LocalNavigation.Root isStretched={true}>
        <LocalNavigation.BackButton onClick={handleBack} />
        <LocalNavigation.Title>지원 안내</LocalNavigation.Title>
      </LocalNavigation.Root>

      <section className='flex flex-col gap-(--semantic-spacing-32) pt-(--semantic-margin-xl) pb-(--semantic-margin-3xl)'>
        <div className='flex flex-col items-start gap-(--semantic-spacing-16) self-stretch'>
          <div className='flex flex-wrap content-center items-center gap-(--semantic-spacing-8) self-stretch'>
            <Hero size='xs' textAlign='left'>
              [젝트 4기]
            </Hero>
            <Hero size='xs' textAlign='left'>
              {findJobFamilyOption(jobFamily).koreanFirst}
            </Hero>
            <Hero size='xs' textAlign='left'>
              {findJobFamilyOption(jobFamily).koreanSecond}
            </Hero>
            <Hero size='xs' textAlign='left'>
              모집
            </Hero>
            <IconButton.Basic
              icon='link-line'
              size='2xl'
              hierarchy='tertiary'
              onClick={handleCopyUrl}
              aria-label='URL 복사'
            />
          </div>
          <Label as='span' size='lg' weight='bold' textAlign='left'>
            2025년 12월 29일(월) - 2026년 1월 18일(일)
          </Label>
        </div>

        <div className='flex gap-3 self-stretch'>
          <BlockButton.Basic
            variant='outlined'
            hierarchy='secondary'
            size='lg'
            onClick={handleContinue}
          >
            이어서 작성하기
          </BlockButton.Basic>
          <BlockButton.Basic
            variant='solid'
            hierarchy='accent'
            size='lg'
            suffixIcon='arrow-right-line'
            onClick={handleApply}
            className='flex-1'
          >
            지원서 작성하기
          </BlockButton.Basic>
        </div>
      </section>

      <Tab.Root
        defaultValue='info'
        className='flex flex-col items-start gap-(--semantic-spacing-48) self-stretch'
      >
        <Tab.List className='w-full'>
          <Tab.Trigger value='info'>모집 정보</Tab.Trigger>
          <Tab.Trigger value='notice'>안내사항</Tab.Trigger>
          <Tab.Trigger value='faq'>FAQ</Tab.Trigger>
        </Tab.List>

        <Tab.Content value='info'>
          <div className='flex flex-col items-start gap-(--semantic-spacing-32) self-stretch'>
            <div className='flex flex-col items-start gap-(--semantic-spacing-16) self-stretch'>
              <Title size='xs' textAlign='left'>
                젝트는 대한민국의 IT 동아리입니다
              </Title>
              <p css={bodyTextStyle}>
                젝트는 개발, 기획(매니지먼트), 디자인 관련 포지션의 팀원들이 한 팀이 되어 실제
                사용자에게 제공되는 디지털 서비스를 직접 만들고 운영하는 IT 동아리입니다.
                <br />
                <br />
                기획–개발–디자인의 협업 과정 전반을 경험하며, 사용자의 불편함을 해결하는 프로덕트
                개발-운영, 네트워킹을 통한 관계 구축을 핵심 가치로 삼고 있어요.
                <br />
                <br />
                현재 폭발적인 성장을 거듭하고 있는 젝트는 3기까지 총 100명 이상의 구성원과 함께
                12개의 프로젝트를 성공적으로 완료했으며, 26년 상반기를 함께할 4기 여러분들을
                모집합니다.
              </p>
            </div>
            <div className='flex flex-col items-start gap-(--semantic-spacing-16) self-stretch'>
              <Title size='xs' textAlign='left'>
                프론트엔드 개발자는 사용자와 상호작용하는 화면을 구현합니다:
              </Title>
              <ul
                css={[
                  bodyTextStyle,
                  css`
                    list-style-type: disc;
                    padding-left: ${theme.scheme.semantic.spacing[20]};
                  `,
                ]}
              >
                <li>
                  사용자 경험을 증진시키기 위해 웹 화면을 구현하며 서비스 인터페이스 전반을
                  책임집니다.
                </li>
                <li>PD, BE와 긴밀히 협업하며 데이터 흐름과 화면 설계를 자연스럽게 연결합니다.</li>
                <li>
                  React.js와 TypeScript를 활용해 구조적인 컴포넌트를 개발하고, 상태 관리를 통해
                  일관된 사용자 흐름을 만듭니다.
                </li>
                <li>
                  HTML/CSS/JavaScript 기반 UI 구현과 성능 최적화를 통해 유연한 사용자 경험을
                  제공합니다.
                </li>
              </ul>
            </div>
            <div className='flex flex-col items-start gap-(--semantic-spacing-16) self-stretch'>
              <Title size='xs' textAlign='left'>
                이런 경험들을 할 수 있어요:
              </Title>
              <ul
                css={[
                  bodyTextStyle,
                  css`
                    list-style-type: disc;
                    padding-left: ${theme.scheme.semantic.spacing[20]};
                  `,
                ]}
              >
                <li>
                  React/TS 컴포넌트 설계, 반응형 UI, 상태 관리 로직 작성 등 실무형 FE 역량을
                  강화하며 실제 서비스 수준의 웹 화면 개발을 처음부터 끝까지 경험할 수 있습니다.
                </li>
                <li>
                  API 스펙 협의, Figma 디자인과의 매칭, 데이터 흐름 설계를 통틀어 PD, BE와
                  협업합니다. 이 과정에서 ‘프론트엔드 개발자의 역할’을 명확히 이해할 수 있어요.
                </li>
                <li>
                  렌더링 최적화, 컴포넌트 분리, 불필요한 리렌더링 관리 등 실무 기술들을 습득할 수
                  있습니다.
                </li>
                <li>
                  팀 프로젝트 협업을 경험하는 과정에서 FE로서 협업에 기여하는 방법을 배울 수
                  있습니다.
                </li>
              </ul>
            </div>
            <div className='flex flex-col items-start gap-(--semantic-spacing-16) self-stretch'>
              <Title size='xs' textAlign='left'>
                이런 분과 함께 하고 싶어요:
              </Title>
              <ul
                css={[
                  bodyTextStyle,
                  css`
                    list-style-type: disc;
                    padding-left: ${theme.scheme.semantic.spacing[20]};
                  `,
                ]}
              >
                <li>HTML/CSS/JS, React.js, TypeScript 등 기본적인 웹 기술에 대한 이해가 있는 분</li>
                <li>상태 관리, 컴포넌트 설계 등에 관심이 많고 더 많이 성장하고 싶은 분</li>
                <li>사용자 경험을 고려해 '왜 이렇게 구현해야 하는지'를 고민할 수 있는 분</li>
                <li>PD, BE와 원활하게 소통하며 더 나은 화면 구조를 함께 만들어갈 수 있는 분</li>
                <li>주도적으로 문제를 해결하고, 협업 과정에서 열린 태도로 소통할 수 있는 분</li>
                <li>
                  최소 5개월 동안 적극적으로 시간을 투자하고 끝까지 책임감 있게 활동할 수 있는 분
                </li>
              </ul>
            </div>
          </div>
        </Tab.Content>

        <Tab.Content value='notice'>
          <div className='flex flex-col items-start gap-(--semantic-spacing-40) self-stretch'>
            <Title size='sm' textAlign='left'>
              모집 관련 안내
            </Title>
            <div className='flex flex-col items-start gap-(--semantic-spacing-16) self-stretch'>
              <Title size='xs' textAlign='left'>
                모집 일정 관련
              </Title>
              <ul
                css={[
                  bodyTextStyle,
                  css`
                    list-style-type: disc;
                    padding-left: ${theme.scheme.semantic.spacing[20]};
                  `,
                ]}
              >
                <li>모집 기간: 2025년 12월 29일(월) 18:00 - 2026년 1월 18일(일) 23:59</li>
                <li>합격 발표: 2026년 1월 22일(목) 18:00</li>
                <li>추가 합격 안내: 2026년 1월 22일(목) - 1월 30일(금)</li>
                <li>결원 발생 시 예비 합격 순번에 따라 안내</li>
                <li>오프라인 온보딩: 2026년 1월 31일(토), 서울</li>
                <li>활동 기간: 2026년 2월 2일(월) - 7월 11일(토)</li>
              </ul>
            </div>
            <div className='flex flex-col items-start gap-(--semantic-spacing-16) self-stretch'>
              <Title size='xs' textAlign='left'>
                동아리 회비 및 보증금 관련
              </Title>
              <p css={bodyTextStyle}>
                회비는 최종 합격자에 한해 입부 시 1회만 납입하며, 전액 행사 준비 및 동아리 운영을
                위한 비영리 목적으로 사용됩니다.
                <br />
                젝트 회비 및 보증금은 총 80,000원이며, 다음으로 구성되어 있습니다:
              </p>
              <ul
                css={[
                  bodyTextStyle,
                  css`
                    list-style-type: disc;
                    padding-left: ${theme.scheme.semantic.spacing[20]};
                  `,
                ]}
              >
                <li>회비: 50,000원</li>
                <li>보증금: 30,000원</li>
              </ul>
            </div>
          </div>
        </Tab.Content>

        <Tab.Content value='faq'>
          <div className='flex flex-col items-start gap-(--semantic-spacing-32) self-stretch'>
            <div className='flex flex-col items-start gap-(--semantic-spacing-16) self-stretch'>
              <Title size='xs' textAlign='left'>
                자주 묻는 질문
              </Title>
              <p css={bodyTextStyle}>FAQ 내용이 여기에 표시됩니다.</p>
            </div>
          </div>
        </Tab.Content>
      </Tab.Root>
    </div>
  );
}

export default ApplyGuidePage;
