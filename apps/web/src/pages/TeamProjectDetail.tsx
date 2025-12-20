import {
  BlockButton,
  ContentBadge,
  Hero,
  Icon,
  IconButton,
  Image,
  Label,
  LocalNavigation,
} from "@ject/jds";
import { useNavigate, useParams } from "react-router-dom";

import positionBe from "@/assets/images/position-be.png";
import positionFe from "@/assets/images/position-fe.png";
import positionPd from "@/assets/images/position-pd.png";
import positionPm from "@/assets/images/position-pm.png";
import { PATH } from "@/constants/path";

const TeamProjectDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  //   const {
  //     data: projectDetailData,
  //     isError,
  //     isSuccess,
  //     isPending,
  //   } = useProjectDetailQuery(id ?? "");

  return (
    <div className='mt-14 flex h-full w-full justify-center py-(--semantic-margin-2xl)'>
      <div className='px-(--semantic-margin-lg) pt-(--semantic-spacing-0) pb-(--semantic-spacing-80)'>
        <div className='desktop:w-[922px]'>
          <LocalNavigation.Root isStretched={true}>
            <LocalNavigation.BackButton onClick={() => void navigate(PATH.teamProject)} />
            <LocalNavigation.Title>팀 프로젝트</LocalNavigation.Title>
          </LocalNavigation.Root>

          <div className='flex flex-col gap-(--semantic-spacing-32) pt-(--semantic-margin-xl) pb-(--semantic-margin-3xl)'>
            <Image ratio='9:21' alt={"??"} orientation='landscape' isReadonly={true} />
            <div className='flex gap-(--semantic-spacing-16)'>
              <Image ratio='9:21' alt={"??"} orientation='landscape' isReadonly={true} />
              <Image ratio='9:21' alt={"??"} orientation='landscape' isReadonly={true} />
              <Image ratio='9:21' alt={"??"} orientation='landscape' isReadonly={true} />
            </div>

            {/* title  */}
            <div className='flex flex-col gap-(--semantic-spacing-24)'>
              <div className='flex flex-col gap-(--semantic-spacing-12)'>
                <div className='flex gap-(--semantic-spacing-6)'>
                  <ContentBadge.Basic size='lg' badgeStyle='outlined'>
                    젝트 3기
                  </ContentBadge.Basic>
                  <ContentBadge.Basic size='lg' badgeStyle='outlined'>
                    App
                  </ContentBadge.Basic>
                </div>
                <div className='flex items-center gap-(--semantic-spacing-8)'>
                  <Hero size='xs' textAlign='left'>
                    마이코드
                  </Hero>
                  <IconButton.Basic hierarchy='tertiary' size='2xl' icon='link-line' />
                </div>
                <span className='textStyle-body-sm-normal text-(--semantic-textStyle-body-sm-normal)'>
                  공연, 전시, 축제 정보를 하나의 플랫폼에서 확인하고 설문을 통해 나의 성향을 파악할
                  수 있습니다. 취향에 맞는 체험형 콘텐츠를 추천받아 나의 일정, 관심목록으로 편리하게
                  관리할 수 있습니다.
                </span>
              </div>

              {/* info module - project region */}
              <div className='flex flex-col gap-(--semantic-spacing-12)'>
                <div className='rounded-(--semantic-radius-4) border border-(--semantic-stroke-subtle)'>
                  <div className='flex border-b border-(--semantic-stroke-subtle)'>
                    <div className='border-r border-(--semantic-stroke-subtle) bg-(--semantic-fill-subtlest) p-(--semantic-spacing-12)'>
                      <Label size='md' textAlign='left' weight='bold'>
                        진행 기간
                      </Label>
                    </div>
                    <div className='flex gap-(--semantic-spacing-10) p-(--semantic-spacing-12)'>
                      <Label size='md' textAlign='left' weight='bold'>
                        2025년 5월 18일(일)
                      </Label>
                      <Label size='md' textAlign='left' weight='bold'>
                        -
                      </Label>
                      <Label size='md' textAlign='left' weight='bold'>
                        2025년 10월 18일(토)
                      </Label>
                    </div>
                  </div>

                  <div className='flex border-b border-(--semantic-stroke-subtle)'>
                    <div className='border-r border-(--semantic-stroke-subtle) bg-(--semantic-fill-subtlest) p-(--semantic-spacing-12)'>
                      <Label size='md' textAlign='left' weight='bold'>
                        사용 기술
                      </Label>
                    </div>
                    <div className='flex gap-(--semantic-spacing-10) p-(--semantic-spacing-12)'>
                      <Label size='md' textAlign='left' weight='bold'>
                        TypeScript
                      </Label>
                      <Label size='md' textAlign='left' weight='bold'>
                        React Native
                      </Label>
                    </div>
                  </div>
                </div>

                {/* info module - teammate section */}
                <div className='flex justify-between gap-(--semantic-spacing-12) *:flex-1'>
                  <div className='rounded-(--semantic-radius-4) border border-(--semantic-stroke-subtle) bg-(--semantic-surface-shallow)'>
                    <div className='flex items-center gap-(--semantic-spacing-8) border-b border-(--semantic-stroke-subtle) bg-(--semantic-theme-green-alpha-subtlest) px-(--semantic-spacing-12) py-(--semantic-spacing-8)'>
                      <img src={positionFe} alt='position fe' width='16' height='16' />
                      <Label
                        size='md'
                        textAlign='left'
                        weight='bold'
                        className='text-(--semantic-theme-green-normal)!'
                      >
                        프론트엔드 개발자
                      </Label>
                    </div>
                    <div className='flex gap-(--semantic-spacing-10) p-(--semantic-spacing-12)'>
                      <Label size='md' textAlign='left' weight='bold'>
                        김동구
                      </Label>
                    </div>
                  </div>

                  <div className='rounded-(--semantic-radius-4) border border-(--semantic-stroke-subtle) bg-(--semantic-surface-shallow)'>
                    <div className='flex items-center gap-(--semantic-spacing-8) border-b border-(--semantic-stroke-subtle) bg-(--semantic-theme-sky-alpha-subtlest) px-(--semantic-spacing-12) py-(--semantic-spacing-8)'>
                      <img src={positionBe} alt='position be' width='16' height='16' />
                      <Label
                        size='md'
                        textAlign='left'
                        weight='bold'
                        className='text-(--semantic-theme-sky-normal)!'
                      >
                        백엔드 개발자
                      </Label>
                    </div>
                    <div className='flex gap-(--semantic-spacing-10) p-(--semantic-spacing-12)'>
                      <Label size='md' textAlign='left' weight='bold'>
                        김도연
                      </Label>
                      <Label size='md' textAlign='left' weight='bold'>
                        김도욱
                      </Label>
                    </div>
                  </div>

                  <div className='rounded-(--semantic-radius-4) border border-(--semantic-stroke-subtle) bg-(--semantic-surface-shallow)'>
                    <div className='flex items-center gap-(--semantic-spacing-8) border-b border-(--semantic-stroke-subtle) bg-(--semantic-theme-orange-alpha-subtlest) px-(--semantic-spacing-12) py-(--semantic-spacing-8)'>
                      <img src={positionPm} alt='position pm' width='16' height='16' />
                      <Label
                        size='md'
                        textAlign='left'
                        weight='bold'
                        className='text-(--semantic-theme-orange-normal)!'
                      >
                        프로덕트 매니저
                      </Label>
                    </div>
                    <div className='flex gap-(--semantic-spacing-10) p-(--semantic-spacing-12)'>
                      <Label size='md' textAlign='left' weight='bold'>
                        이재호
                      </Label>
                    </div>
                  </div>

                  <div className='rounded-(--semantic-radius-4) border border-(--semantic-stroke-subtle) bg-(--semantic-surface-shallow)'>
                    <div className='flex items-center gap-(--semantic-spacing-8) border-b border-(--semantic-stroke-subtle) bg-(--semantic-theme-purple-alpha-subtlest) px-(--semantic-spacing-12) py-(--semantic-spacing-8)'>
                      <img src={positionPd} alt='position pd' width='16' height='16' />
                      <Label
                        size='md'
                        textAlign='left'
                        weight='bold'
                        className='text-(--semantic-theme-purple-normal)!'
                      >
                        프로덕트 디자이너
                      </Label>
                    </div>
                    <div className='flex gap-(--semantic-spacing-10) p-(--semantic-spacing-12)'>
                      <Label size='md' textAlign='left' weight='bold'>
                        길윤서
                      </Label>
                      <Label size='md' textAlign='left' weight='bold'>
                        최원준
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* button container */}
              <BlockButton.Basic
                hierarchy='accent'
                size='lg'
                variant='solid'
                suffixIcon='external-link-line'
              >
                서비스 바로가기
              </BlockButton.Basic>
            </div>

            {/* content */}
            <div className='flex gap-(--semantic-spacing-24)'>
              <Image ratio='9:16' alt='콘텐츠 이미지' orientation='landscape' isReadonly={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamProjectDetail;
