import cardSampleImage from '@/assets/CardSample.png';
import BlockButton from '@/components/common/button/BlockButton';
import CalloutInformation from '@/components/common/callout/CalloutInformation';
import Icon from '@/components/common/icon/Icon';
import Label from '@/components/common/label/Label';
import { Tab, TabHeader, TabItem, TabPanel } from '@/components/common/tab/Tab';
import Title from '@/components/common/title/Title';

const projectDetailData = {
  thumbnailUrl: cardSampleImage,
  name: '프로젝트 명',
  startDate: '2025-03-02',
  endDate: '2025-06-30',
  teamMemberNames: {
    projectManagers: ['member1'],
    productDesigners: ['member2'],
    frontendDevelopers: ['member3', 'member4'],
    backendDevelopers: ['member5', 'member6'],
  },
  techStack: ['React', 'Java', 'Spring'],
  description:
    '놓아 이러하는 해로 존재할 풀이 까마득하는 아쉬움을 사실 금지를 예술, 덜다. 32초 여공의 중요시는, 일반화할 매체에서 얻어지어도 말다 있으냐. 있고 꽃으로 것 맥락을 가출인데 번개부터 건네다 조사는 말다. 제스처적과 이상을 이어요 긴장되는 이용하다. 것 확신이 이같이 우리에 생활을 뒤로서 잃어버리다. 이 다르어 제출하다 필요하여 나오면서 국왕에 친절하다, 교육계로 꺾이어 있다. 묘하자면 역사로, 영화에 연구는 없이 싱싱하는 따뜻하는 젊음 있는다. 되어야 농경에 있은 교류의 그를 사관이든가 친 뒤따르어서 할까.',
  serviceUrl: 'https://www.ject.com',
  serviceIntros: [
    {
      imageUrl: cardSampleImage,
      sequence: 1,
    },
    {
      imageUrl: cardSampleImage,
      sequence: 2,
    },
    {
      imageUrl: cardSampleImage,
      sequence: 3,
    },
  ],
  devIntros: [
    {
      imageUrl: cardSampleImage,
      sequence: 1,
    },
    {
      imageUrl: cardSampleImage,
      sequence: 2,
    },
  ],
};

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
    </div>
  );
};

export default ProjectDetail;
