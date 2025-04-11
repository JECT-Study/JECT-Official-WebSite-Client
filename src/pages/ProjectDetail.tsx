import cardSampleImage from '@/assets/CardSample.png';
import ApplySnackBar from '@/components/apply/ApplySnackBar';
import BlockButton from '@/components/common/button/BlockButton';
import CalloutInformation from '@/components/common/callout/CalloutInformation';
import Icon from '@/components/common/icon/Icon';
import Label from '@/components/common/label/Label';
import { Tab, TabHeader, TabItem, TabPanel } from '@/components/common/tab/Tab';
import Title from '@/components/common/title/Title';
import { APPLY_SNACKBAR } from '@/constants/applyMessages';

const ProjectDetail = () => {
  return (
    <div className='gap-11xl flex flex-col items-center px-(--gap-5xl) pt-(--gap-9xl) pb-(--gap-12xl)'>
      <section className='gap-6xl flex w-full max-w-[60rem] flex-col'>
        <img
          src={projectDetailData.thumbnailUrl}
          alt='프로젝트 이미지'
          className='radius-md border-border-alternative-dark block h-[20.0625rem] w-full border object-cover'
        />
        <div className='gap-2xl flex w-full flex-col items-start'>
          <div className='gap-md flex flex-col'>
            <Title hierarchy='stronger'>{projectDetailData.name}</Title>
            <Label hierarchy='stronger' weight='bold' textColor='text-object-normal-dark'>
              {projectDetailData.startDate} ~ {projectDetailData.endDate}
            </Label>
          </div>
          <div className='gap-md flex w-full flex-col items-start'>
            <div className='gap-md flex w-full content-start items-start'>
              <CalloutInformation
                title='FE'
                labels={projectDetailData.teamMemberNames.frontendDevelopers}
              />
              <CalloutInformation
                title='BE'
                labels={projectDetailData.teamMemberNames.backendDevelopers}
              />
              <CalloutInformation
                title='PM'
                labels={projectDetailData.teamMemberNames.projectManagers}
              />
              <CalloutInformation
                title='PD'
                labels={projectDetailData.teamMemberNames.productDesigners}
              />
            </div>
            <CalloutInformation title='플랫폼 및 기술' labels={projectDetailData.techStack} />
          </div>
          <p className='text-object-normal-dark body-lg'>{projectDetailData.description}</p>
        </div>
        <BlockButton
          size='lg'
          style='solid'
          hierarchy='primary'
          onClick={() => window.open(projectDetailData.serviceUrl, '_blank', 'noopener,noreferrer')}
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
                {projectDetailData.serviceIntros
                  .sort((a, b) => a.sequence - b.sequence)
                  .map(intro => (
                    <img
                      key={intro.sequence}
                      src={intro.imageUrl}
                      alt={`서비스 소개 ${intro.sequence}번`}
                      className='border-border-alternative-dark block h-[29rem] w-full border object-cover'
                    />
                  ))}
              </div>
            </TabPanel>
            <TabPanel id={1}>
              <div className='gap-4xl flex flex-col'>
                {projectDetailData.devIntros
                  .sort((a, b) => a.sequence - b.sequence)
                  .map(intro => (
                    <img
                      key={intro.sequence}
                      src={intro.imageUrl}
                      alt={`개발 소개 ${intro.sequence}번`}
                      className='border-border-alternative-dark block h-[29rem] w-full border object-cover'
                    />
                  ))}
              </div>
            </TabPanel>
          </div>
        </Tab>
      </section>
      <ApplySnackBar message={APPLY_SNACKBAR.default} width='w-[31.25rem]' />
    </div>
  );
};

export default ProjectDetail;
