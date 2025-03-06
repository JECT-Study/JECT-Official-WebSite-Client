import cardSampleImage from '@/assets/CardSample.png';
import LabelButton from '@/components/common/button/LabelButton';
import { Card } from '@/components/common/card/Card';
import Icon from '@/components/common/icon/Icon';
import { Tab, TabHeader, TabItem, TabPanel } from '@/components/common/tab/Tab';
import Title from '@/components/common/title/Title';

const projectCardData = [
  {
    id: 1,
    thumbnailUrl: cardSampleImage,
    name: 'ProjectAName',
    summary: 'Project A에 대한 간단한 설명입니다.',
  },
  {
    id: 2,
    thumbnailUrl: cardSampleImage,
    name: 'ProjectBName',
    summary: 'Project B에 대한 간단한 설명입니다.',
  },
  {
    id: 3,
    thumbnailUrl: cardSampleImage,
    name: 'ProjectCName',
    summary: 'Project C에 대한 간단한 설명입니다.',
  },
  {
    id: 4,
    thumbnailUrl: cardSampleImage,
    name: 'ProjectDName',
    summary: 'Project D에 대한 간단한 설명입니다.',
  },
  {
    id: 5,
    thumbnailUrl: cardSampleImage,
    name: 'ProjectEName',
    summary: 'Project E에 대한 간단한 설명입니다.',
  },
  {
    id: 6,
    thumbnailUrl: cardSampleImage,
    name: 'ProjectFName',
    summary: 'Project F에 대한 간단한 설명입니다.',
  },
];

const hackathonCardData = [
  {
    id: 1,
    thumbnailUrl: cardSampleImage,
    name: 'HackathonAName',
    summary: 'Hackathon A에 대한 간단한 설명입니다.',
  },
  {
    id: 2,
    thumbnailUrl: cardSampleImage,
    name: 'HackathonBName',
    summary: 'Hackathon B에 대한 간단한 설명입니다.',
  },
  {
    id: 3,
    thumbnailUrl: cardSampleImage,
    name: 'HackathonCName',
    summary: 'Hackathon C에 대한 간단한 설명입니다.',
  },
  {
    id: 4,
    thumbnailUrl: cardSampleImage,
    name: 'HackathonDName',
    summary: 'Hackathon D에 대한 간단한 설명입니다.',
  },
  {
    id: 5,
    thumbnailUrl: cardSampleImage,
    name: 'HackathonEName',
    summary: 'Hackathon E에 대한 간단한 설명입니다.',
  },
  {
    id: 6,
    thumbnailUrl: cardSampleImage,
    name: 'HackathonFName',
    summary: 'Hackathon F에 대한 간단한 설명입니다.',
  },
];

const Project = () => {
  return (
    <div className='gap-12xl flex flex-col items-center px-(--gap-5xl) py-(--gap-12xl)'>
      <section className='gap-8xl flex max-w-[60rem] flex-col'>
        <Title hierarchy='strong'>프로젝트</Title>
        <div className='flex w-full flex-col'>
          <Tab>
            <div className='gap-4xl flex w-full flex-col'>
              <TabHeader>
                <TabItem id={0} label='프로젝트' />
                <TabItem id={1} label='해커톤' />
              </TabHeader>
              <div className='gap-xs flex w-full'>
                <LabelButton
                  size='lg'
                  hierarchy='secondary'
                  rightIcon={
                    <Icon
                      name='dropDown'
                      size='md'
                      fillColor='fill-object-static-inverse-hero-dark'
                    />
                  }
                />
              </div>
              <TabPanel id={0}>
                <div className='gap-4xl grid grid-cols-3'>
                  {projectCardData.map(card => (
                    <Card
                      key={card.id}
                      to={`/project/${card.id}`}
                      title={card.name}
                      label={card.name}
                      imgUrl={card.thumbnailUrl}
                    >
                      {card.summary}
                    </Card>
                  ))}
                </div>
              </TabPanel>
              <TabPanel id={1}>
                <div className='gap-4xl grid grid-cols-3'>
                  {hackathonCardData.map(card => (
                    <Card
                      key={card.id}
                      to={`/hackathon/${card.id}`}
                      title={card.name}
                      label={card.name}
                      imgUrl={card.thumbnailUrl}
                    >
                      {card.summary}
                    </Card>
                  ))}
                </div>
              </TabPanel>
            </div>
          </Tab>
        </div>
      </section>
      <section className='gap-8xl flex max-w-[60rem] flex-col'></section>
    </div>
  );
};

export default Project;
