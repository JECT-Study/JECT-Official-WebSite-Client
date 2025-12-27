/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Accordion,
  BlockButton,
  Divider,
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
    <div className='flex w-full max-w-[656px] flex-col items-start px-(--semantic-margin-lg) pb-(--semantic-spacing-80)'>
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
        className='flex w-full flex-col items-stretch gap-(--semantic-spacing-48) self-stretch'
      >
        <Tab.List className='w-full'>
          <Tab.Trigger value='info'>모집 정보</Tab.Trigger>
          <Tab.Trigger value='notice'>안내사항</Tab.Trigger>
          <Tab.Trigger value='faq'>FAQ</Tab.Trigger>
        </Tab.List>

        <Tab.Content value='info' className='w-full'>
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

        <Tab.Content value='notice' className='w-full'>
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
            <div className='flex flex-col items-stretch gap-(--semantic-spacing-16) self-stretch'>
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
              <Accordion.Root type='single' isStretched={true} size='sm' collapsible>
                <Accordion.Item value='refund-policy'>
                  <Accordion.Trigger withPrefixIcon='information-line'>
                    회비 및 보증금 환불 정책 안내
                  </Accordion.Trigger>
                  <Accordion.Content>
                    <div
                      css={css`
                        display: flex;
                        flex-direction: column;
                        gap: ${theme.scheme.semantic.spacing[16]};
                      `}
                    >
                      <p css={bodyTextStyle}>
                        회비는 활동 시작 전(온보딩 전)에는 100% 환불 가능하며, 온보딩 시작 후에는
                        환불 불가합니다.
                      </p>
                      <p css={bodyTextStyle}>
                        보증금은 다음과 같은 조건을 모두 충족 시 보증금의 환불이 진행됩니다:
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
                        <li>프로젝트를 정상적으로 끝까지 완주하였을 경우</li>
                        <li>해당 기수 마무리까지 젝트 구성원으로서 소속해 있을 경우</li>
                        <li>
                          해당 기수의 필수 참여 행사를 모두 참석하였을 경우(리뷰위크, 활동 리뷰 등)
                        </li>
                      </ul>
                      <p css={bodyTextStyle}>보다 자세한 내용은 젝트 회비 정책을 확인해주세요.</p>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </div>

            <Divider />

            <Title size='sm' textAlign='left'>
              유의 사항 및 필수 안내
            </Title>
            <div className='flex flex-col items-start gap-(--semantic-spacing-32) self-stretch'>
              <div className='flex flex-col items-start gap-(--semantic-spacing-16) self-stretch'>
                <Title size='xs' textAlign='left'>
                  개인정보 수집 및 이용 관련
                </Title>
                <p css={bodyTextStyle}>
                  개인정보 수집 및 이용과 관련해, 지원자 편의를 위해 지원하실 때 작성하시는 내용들은
                  모두 수집됩니다. 자세한 내용은 개인정보 수집 및 이용 동의서를 확인해주세요.
                </p>
              </div>
              <div className='flex flex-col items-start gap-(--semantic-spacing-16) self-stretch'>
                <Title size='xs' textAlign='left'>
                  오프라인 행사 참여 관련
                </Title>
                <p css={bodyTextStyle}>
                  젝트 4기 활동 기간 동안 다양한 오프라인 행사가 진행될 예정이며, 이 중 일부 행사는
                  필수 참여 행사로 운영됩니다.
                  <br />
                  필수 참여 행사는 완주 조건에 포함됩니다. 대부분 주말, 서울 지역에서 진행될
                  예정이므로 개인 일정, 거주 지역, 이동 가능 여부 등을 충분히 고려한 후 지원해주시기
                  바랍니다.
                </p>
              </div>
              <div className='flex flex-col items-start gap-(--semantic-spacing-16) self-stretch'>
                <Title size='xs' textAlign='left'>
                  프로젝트 중도 이탈 관련 안내
                </Title>
                <p css={bodyTextStyle}>
                  젝트의 팀 프로젝트는 5개월간 장기적으로 진행되는 활동으로, 생각보다 많은 시간과
                  책임, 꾸준한 참여가 요구됩니다.
                  <br />
                  따라서 활동 기간 중 취업, 인턴, 해외여행 등 기타 중요 개인 일정이 예정되어 있는
                  경우, 끝까지 참여가 가능한지에 대해 충분한 고민과 판단 후 지원해주시기 바랍니다.
                </p>
              </div>
            </div>
          </div>
        </Tab.Content>

        <Tab.Content value='faq' className='w-full'>
          <div className='flex w-full flex-col items-stretch gap-(--semantic-spacing-24) self-stretch'>
            <Accordion.Root type='single' size='lg' isStretched={true} collapsible>
              <Accordion.Item value='faq-1'>
                <Accordion.Trigger>실력이 뛰어난 사람을 우선적으로 선발하나요?</Accordion.Trigger>
                <Accordion.Content>
                  <p css={bodyTextStyle}>
                    젝트는 전문적 역량보다 팀 프로젝트 참여 태도와 활동 가능 시간을 더욱 더 중요하게
                    생각하고 있습니다.
                    <br />
                    다만, 다음과 같은 전문 역량을 갖추고 계신지를 우선적으로 확인하고 있어요:
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
                    <li>원활한 협업에 필요한 친화적 의사소통 능력</li>
                    <li>자신의 포지션에 대한 최소한의 기술적 숙련도</li>
                  </ul>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value='faq-2'>
                <Accordion.Trigger>연령이나 신분에 따른 지원 제한이 있나요?</Accordion.Trigger>
                <Accordion.Content>
                  <p css={bodyTextStyle}>
                    법적 성년인 대한민국 국민은 누구나 젝트에 지원할 수 있습니다.
                    <br />
                    대학생, 휴학생, 졸업 예정자, 취준생, 재직자, 이직 준비중인 분들 등 다양한 분들이
                    젝트에 지원하셔서 함께하고 있어요.
                  </p>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value='faq-3'>
                <Accordion.Trigger>
                  활동 도중 취업/인턴/이직 계획이 있어도 지원이 가능한가요?
                </Accordion.Trigger>
                <Accordion.Content>
                  <p css={bodyTextStyle}>
                    지원이 가능합니다.
                    <br />
                    다만 5개월간 진행되는 팀 프로젝트인 만큼 꾸준한 열정과 시간 투자가 필요합니다.
                    활동 기간 중 취업/인턴/이직을 하시게 되더라도, 처음 약속한 팀원으로서 끝까지
                    책임감을 가지고 프로젝트에 성실히 참여해 주시길 바랍니다.
                    <br />
                    프로젝트 중도 이탈은 팀원과 젝트 공동체에 큰 부정적 영향을 끼치는 행위이니,
                    지원자분의 현 상황과 향후 계획 등을 충분히 고려하여 지원 부탁드립니다.
                  </p>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value='faq-4'>
                <Accordion.Trigger>
                  다른 IT 동아리에 소속되어 있어도 지원이 가능한가요?
                </Accordion.Trigger>
                <Accordion.Content>
                  <p css={bodyTextStyle}>
                    다른 IT 동아리 소속 시에는 지원이 어렵습니다.
                    <br />
                    만약 지원자분이 젝트에서 활동하게 되었을 때에 개인-팀-동아리에 부정적인 영향이
                    있을 수도 있기 때문이에요.
                    <br />
                    그렇지만 타 동아리 소속 여부를 사전에 판단할 수 없기 때문에 개인의 현 상황을
                    고려해 현명히 지원 부탁드립니다.
                  </p>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value='faq-5'>
                <Accordion.Trigger>
                  지원서 작성 중 이메일 인증 단계에서 인증번호 메일을 받지 못했습니다.
                </Accordion.Trigger>
                <Accordion.Content>
                  <p css={bodyTextStyle}>
                    스팸 메일함을 우선적으로 확인해주세요.
                    <br />
                    만약 스팸 메일함에 인증번호 메일이 없다면, 입력하신 이메일 주소가 정확한지 한번
                    더 확인 후 진행 부탁드립니다.
                    <br />
                    그럼에도 인증번호 메일을 받지 못하셨다면{" "}
                    <span className='underline'>jectofficial@ject.kr</span>로 문의해주세요.
                  </p>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value='faq-6'>
                <Accordion.Trigger>제출한 지원서 내용을 수정하고 싶습니다.</Accordion.Trigger>
                <Accordion.Content>
                  <p css={bodyTextStyle}>
                    이미 제출한 지원서 내용은 자체적으로 수정할 수 없어요.
                    <br />꼭 수정해야 하는 내용이 있다면{" "}
                    <span className='underline'>jectofficial@ject.kr</span>로 문의해주세요.
                  </p>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value='faq-7'>
                <Accordion.Trigger>불합격도 별도로 통지하나요?</Accordion.Trigger>
                <Accordion.Content>
                  <p css={bodyTextStyle}>
                    모집 결과는 합격 여부와 관계없이 이메일로 안내드립니다.
                    <br />
                    지원해 주신 모든 분들께 감사드리며, 결과를 기다리며 시간을 소모하시는 일이
                    없도록 하겠습니다.
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        </Tab.Content>
      </Tab.Root>
    </div>
  );
}

export default ApplyGuidePage;
