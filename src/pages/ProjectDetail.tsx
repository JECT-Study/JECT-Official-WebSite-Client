import { Navigate, useParams } from 'react-router-dom';

import cardSampleImage from '@/assets/CardSample.png';
import BlockButton from '@/components/common/button/BlockButton';
import CalloutInformation from '@/components/common/callout/CalloutInformation';
import EmptyData from '@/components/common/emptyState/EmptyData';
import Icon from '@/components/common/icon/Icon';
import Label from '@/components/common/label/Label';
import { Tab, TabHeader, TabItem, TabPanel } from '@/components/common/tab/Tab';
import Title from '@/components/common/title/Title';
import { PATH } from '@/constants/path';
import { useProjectDetailQuery } from '@/hooks/useProjectDetailQuery';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: projectDetailData,
    isError,
    isSuccess,
    isPending,
  } = useProjectDetailQuery(id ?? '');

  if (isPending) {
    return null;
  }

  if (isError) {
    return <Navigate to={PATH.nonSpecificError} replace />;
  }

  if (
    isSuccess &&
    (projectDetailData?.status === 'PROJECT_NOT_FOUND' || !projectDetailData?.data)
  ) {
    return <Navigate to={PATH.notFoundError} replace />;
  }

  const project = projectDetailData.data;

  const teamRoles = [
    { id: 'fe', title: 'FE', members: project.teamMemberNames?.frontendDevelopers ?? [] },
    { id: 'be', title: 'BE', members: project.teamMemberNames?.backendDevelopers ?? [] },
    { id: 'pm', title: 'PM', members: project.teamMemberNames?.productManagers ?? [] },
    { id: 'pd', title: 'PD', members: project.teamMemberNames?.productDesigners ?? [] },
  ];

  const techStack = project.techStack ?? [];

  return (
    <div className='gap-11xl flex flex-col items-center px-(--gap-5xl) pt-(--gap-9xl) pb-(--gap-12xl)'>
      <section className='gap-6xl flex w-full max-w-[60rem] flex-col'>
        <img
          src={project.thumbnailUrl || cardSampleImage}
          alt='프로젝트 이미지'
          className='radius-md border-border-alternative-dark block h-[20.0625rem] w-full border object-contain'
        />
        <div className='gap-2xl flex w-full flex-col items-start'>
          <div className='gap-md flex flex-col'>
            <Title hierarchy='stronger'>{project.name}</Title>
            <Label hierarchy='stronger' weight='bold' textColor='text-object-normal-dark'>
              {project.startDate} ~ {project.endDate}
            </Label>
          </div>
          <div className='gap-md flex w-full flex-col items-start'>
            <div className='gap-md flex w-full content-start items-start'>
              {teamRoles
                .filter(role => role.members.length > 0)
                .map(role => (
                  <CalloutInformation key={role.id} title={role.title} labels={role.members} />
                ))}
            </div>
            <CalloutInformation title='플랫폼 및 기술' labels={techStack} />
          </div>
          <p className='text-object-normal-dark body-lg'>{project.description}</p>
        </div>
        <BlockButton
          size='lg'
          style='solid'
          hierarchy='primary'
          onClick={() => window.open(project.serviceUrl, '_blank', 'noopener,noreferrer')}
          rightIcon={<Icon name='northEast' size='md' fillColor='fill-object-inverse-hero-dark' />}
        >
          서비스 바로가기
        </BlockButton>
      </section>
      <section className='gap-8xl flex w-full max-w-[60rem] flex-col'>
        <div className='text-center'>
          <Title hierarchy='strong'>서비스 소개서</Title>
        </div>
        <Tab>
          <div className='gap-4xl flex w-full flex-col'>
            <TabHeader>
              <TabItem id={0} label='서비스 소개' />
              <TabItem id={1} label='아키텍처' />
            </TabHeader>
            <TabPanel id={0}>
              <div className='gap-4xl flex flex-col'>
                {(project.serviceIntros ?? []).length > 0 ? (
                  project.serviceIntros
                    .sort((a, b) => a.sequence - b.sequence)
                    .map(intro => (
                      <img
                        key={intro.sequence}
                        src={intro.imageUrl}
                        alt={`서비스 소개 ${intro.sequence}번`}
                        className='border-border-alternative-dark block h-[29rem] w-full border object-contain'
                      />
                    ))
                ) : (
                  <EmptyData />
                )}
              </div>
            </TabPanel>
            <TabPanel id={1}>
              <div className='gap-4xl flex flex-col'>
                {(project.devIntros ?? []).length > 0 ? (
                  project.devIntros
                    .sort((a, b) => a.sequence - b.sequence)
                    .map(intro => (
                      <img
                        key={intro.sequence}
                        src={intro.imageUrl}
                        alt={`개발 소개 ${intro.sequence}번`}
                        className='border-border-alternative-dark block h-[29rem] w-full border object-contain'
                      />
                    ))
                ) : (
                  <EmptyData />
                )}
              </div>
            </TabPanel>
          </div>
        </Tab>
      </section>
    </div>
  );
};

export default ProjectDetail;
