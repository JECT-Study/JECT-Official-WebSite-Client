import type { ImgRatio } from "@ject/jds";
import {
  BlockButton,
  ContentBadge,
  Hero,
  IconButton,
  Image,
  Label,
  LocalNavigation,
} from "@ject/jds";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import positionBe from "@/assets/images/position-be.png";
import positionFe from "@/assets/images/position-fe.png";
import positionPd from "@/assets/images/position-pd.png";
import positionPm from "@/assets/images/position-pm.png";
import { PATH } from "@/constants/path";
import { useProjectDetailQuery } from "@/hooks/useProjectDetailQuery";
import { formatDate } from "@/utils/formatDate";

type Position = "프론트엔드 개발자" | "백엔드 개발자" | "프로덕트 디자이너" | "프로덕트 매니저";

interface TeammateByPositionProps {
  position: Position;
  teammates: string[];
}

type ProjectName =
  | "PICK-O"
  | "잔디 일기"
  | "치즈 마켓"
  | "HowMeet"
  | "밥버디"
  | "Re:creation"
  | "스터디트립"
  | "마이코드"
  | "펫핏";

const TeammateByPosition = ({ position, teammates }: TeammateByPositionProps) => {
  const positionIcon = {
    "프론트엔드 개발자": positionFe,
    "백엔드 개발자": positionBe,
    "프로덕트 디자이너": positionPd,
    "프로덕트 매니저": positionPm,
  };

  return (
    <div
      className={
        "rounded-(--semantic-radius-4) border border-(--semantic-stroke-subtle) bg-(--semantic-surface-shallow)"
      }
    >
      <div className='flex items-center gap-(--semantic-spacing-8) border-b border-(--semantic-stroke-subtle) bg-(--semantic-theme-sky-alpha-subtlest) px-(--semantic-spacing-12) py-(--semantic-spacing-8)'>
        <img src={positionIcon[position]} alt={position} width='16' height='16' />
        <Label
          size='md'
          textAlign='left'
          weight='bold'
          className='text-(--semantic-theme-sky-normal)!'
        >
          {position}
        </Label>
      </div>
      <div className='flex gap-(--semantic-spacing-10) p-(--semantic-spacing-12)'>
        {teammates.map((name, index) => (
          <Label key={name + index} size='md' textAlign='left' weight='bold'>
            {name}
          </Label>
        ))}
      </div>
    </div>
  );
};

const TeamProjectDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    data: projectDetailData,
    isError,
    isSuccess,
    isPending,
  } = useProjectDetailQuery(id ?? "");

  const projectName = [
    "PICK-O",
    "치즈 마켓",
    "잔디 일기",
    "HowMeet",
    "밥버디",
    "Re:creation",
    "스터디트립",
    "펫핏",
  ];
  const bannerRatio: Record<ProjectName, ImgRatio> = {
    "PICK-O": "2:3",
    "치즈 마켓": "2:3",
    "잔디 일기": "1:2",
    HowMeet: "1:2",
    밥버디: "2:3",
    "Re:creation": "9:21",
    스터디트립: "9:21",
    마이코드: "9:21",
    펫핏: "9:21",
  };

  if (isPending) {
    return null;
  }

  if (isError) {
    return <Navigate to={PATH.nonSpecificError} replace />;
  }

  if (
    isSuccess &&
    (projectDetailData?.status === "PROJECT_NOT_FOUND" || !projectDetailData?.data)
  ) {
    return <Navigate to={PATH.notFoundError} replace />;
  }

  const project = projectDetailData.data;
  const isSemester1 = projectName.includes(project.name);

  return (
    <div className='mt-14 flex h-full w-full justify-center py-(--semantic-margin-2xl)'>
      <div className='px-(--semantic-margin-lg) pt-(--semantic-spacing-0) pb-(--semantic-spacing-80)'>
        <div className='desktop:w-[922px]'>
          <LocalNavigation.Root isStretched={true}>
            <LocalNavigation.BackButton onClick={() => void navigate(PATH.teamProject)} />
            <LocalNavigation.Title>팀 프로젝트</LocalNavigation.Title>
          </LocalNavigation.Root>

          <div className='flex flex-col gap-(--semantic-spacing-32) pt-(--semantic-margin-xl) pb-(--semantic-margin-3xl)'>
            {/* 썸네일 */}
            <Image
              src={project.bannerImageUrl?.imageUrl}
              ratio={isSemester1 ? bannerRatio[project.name as ProjectName] : "9:16"}
              alt={project.name + "썸네일"}
              orientation='landscape'
              isReadonly={true}
            />

            {/* 서비스 샘플 이미지 */}
            {project.sampleImageUrls && (
              <div className='flex gap-(--semantic-spacing-16)'>
                {project.sampleImageUrls.map(img => (
                  <Image
                    key={img.sequence}
                    src={img.imageUrl}
                    ratio='9:16'
                    alt={project.name + "서비스 샘플 이미지" + img.sequence}
                    orientation='landscape'
                    isReadonly={true}
                    className='*:object-contain'
                  />
                ))}
              </div>
            )}

            {/* 타이틀 정보  */}
            <div className='flex flex-col gap-(--semantic-spacing-24)'>
              <div className='flex flex-col gap-(--semantic-spacing-12)'>
                <div className='flex gap-(--semantic-spacing-6)'>
                  {project.badges.map(badge => (
                    <ContentBadge.Basic key={badge} size='lg' badgeStyle='outlined'>
                      {badge}
                    </ContentBadge.Basic>
                  ))}
                </div>
                <div className='flex items-center gap-(--semantic-spacing-8)'>
                  <Hero size='xs' textAlign='left'>
                    {project.name}
                  </Hero>
                  <a href={project.serviceUrl} target='_blank' rel='noopener noreferrer'>
                    <IconButton.Basic hierarchy='tertiary' size='2xl' icon='link-line' />
                  </a>
                </div>
                <span className='textStyle-body-sm-normal text-(--semantic-object-bold)'>
                  {project.description}
                </span>
              </div>

              {/* 프로젝트 정보 - 진행 기간 및 사용 기술 */}
              <div className='flex flex-col gap-(--semantic-spacing-12)'>
                <div className='rounded-(--semantic-radius-4) border border-(--semantic-stroke-subtle)'>
                  <div className='flex border-b border-(--semantic-stroke-subtle)'>
                    <div className='border-r border-(--semantic-stroke-subtle) bg-(--semantic-fill-subtlest) p-(--semantic-spacing-12)'>
                      <Label size='md' textAlign='left' weight='bold' className='whitespace-nowrap'>
                        진행 기간
                      </Label>
                    </div>
                    <div className='flex flex-wrap gap-(--semantic-spacing-10) p-(--semantic-spacing-12)'>
                      <Label size='md' textAlign='left' weight='bold'>
                        {formatDate(project.startDate)}
                      </Label>
                      <Label size='md' textAlign='left' weight='bold'>
                        -
                      </Label>
                      <Label size='md' textAlign='left' weight='bold'>
                        {formatDate(project.endDate)}
                      </Label>
                    </div>
                  </div>

                  <div className='flex border-b border-(--semantic-stroke-subtle)'>
                    <div className='border-r border-(--semantic-stroke-subtle) bg-(--semantic-fill-subtlest) p-(--semantic-spacing-12)'>
                      <Label size='md' textAlign='left' weight='bold' className='whitespace-nowrap'>
                        사용 기술
                      </Label>
                    </div>
                    <div className='flex flex-wrap gap-(--semantic-spacing-10) p-(--semantic-spacing-12)'>
                      {project.techStack.map(stack => (
                        <Label key={stack} size='md' textAlign='left' weight='bold'>
                          {stack}
                        </Label>
                      ))}

                      <Label size='md' textAlign='left' weight='bold'>
                        React Native
                      </Label>
                    </div>
                  </div>
                </div>

                {/* 프로젝트 정보 - 팀원 */}
                <div className='desktop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 tablet:*:last:col-span-3 desktop:*:last:col-span-1 grid gap-(--semantic-spacing-12)'>
                  <TeammateByPosition
                    position={"프론트엔드 개발자"}
                    teammates={project.teamMemberNames.frontendDevelopers}
                  />
                  <TeammateByPosition
                    position={"백엔드 개발자"}
                    teammates={project.teamMemberNames.backendDevelopers}
                  />
                  <TeammateByPosition
                    position={"프로덕트 매니저"}
                    teammates={project.teamMemberNames.productManagers}
                  />
                  <TeammateByPosition
                    position={"프로덕트 디자이너"}
                    teammates={project.teamMemberNames.productDesigners}
                  />
                </div>
              </div>

              {/* 버튼 */}
              <a href={project.serviceUrl} target='_blank' rel='noopener noreferrer'>
                <BlockButton.Basic
                  hierarchy='accent'
                  size='lg'
                  variant='solid'
                  suffixIcon='external-link-line'
                  className='w-full'
                >
                  서비스 바로가기
                </BlockButton.Basic>
              </a>
            </div>
          </div>

          {/* 서비스 소개 */}
          <div className='flex flex-col gap-(--semantic-spacing-24)'>
            {project.descriptionImageUrls.map(img => (
              <Image
                key={img.sequence}
                src={img.imageUrl}
                ratio='9:16'
                alt={project.name + "서비스 소개 이미지" + img.sequence}
                orientation='landscape'
                isReadonly={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamProjectDetail;
