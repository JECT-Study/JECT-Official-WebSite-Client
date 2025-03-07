import cardSampleImage from '@/assets/CardSample.png';
import LabelButton from '@/components/common/button/LabelButton';
import { Card } from '@/components/common/card/Card';
import Icon from '@/components/common/icon/Icon';
import { Post } from '@/components/common/post/Post';
import { Tab, TabHeader, TabItem, TabPanel } from '@/components/common/tab/Tab';
import Title from '@/components/common/title/Title';
import { PATH } from '@/constants/path';

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

const reviewData = [
  {
    linkUrl: 'https://test1.com',
    title: '제목 1',
    description: '본문 1...',
  },
  {
    linkUrl: 'https://test2.com',
    title: '제목 2',
    description: '본문 2...',
  },
  {
    linkUrl: 'https://test3.com',
    title: '제목 3',
    description: '본문 3...',
  },
  {
    linkUrl: 'https://test4.com',
    title: '제목 4',
    description: '본문 4...',
  },
];

const Project = () => {
  return (
    <div className='gap-12xl flex flex-col items-center px-(--gap-5xl) py-(--gap-12xl)'>
      <section className='gap-8xl flex w-full max-w-[60rem] flex-col items-center'>
        <Title hierarchy='strong'>프로젝트</Title>
        <div className='flex w-full flex-col'>
          <Tab>
            <div className='gap-4xl flex w-full flex-col'>
              <TabHeader>
                <TabItem id={0} label='프로젝트' />
                <TabItem id={1} label='해커톤' disabled />
              </TabHeader>
              <div className='gap-xs flex w-full'>
                <LabelButton
                  size='lg'
                  hierarchy='secondary'
                  rightIcon={
                    <Icon name='dropDown' size='md' fillColor='fill-object-neutral-dark' />
                  }
                >
                  기수 선택
                </LabelButton>
              </div>
              <TabPanel id={0}>
                <div className='gap-4xl grid grid-cols-3'>
                  {projectCardData.map(card => (
                    <Card
                      key={card.id}
                      to={`${PATH.project}/${card.id}`}
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
                      to={`${PATH.jeckathon}/${card.id}`}
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
      <section className='gap-8xl flex w-full max-w-[60rem] flex-col items-center'>
        <Title hierarchy='strong'>프로젝트 후기</Title>
        <div className='gap-2xl flex w-full flex-col'>
          {reviewData.map((item, index) => (
            <Post key={index} href={item.linkUrl} title={item.title} label='바로가기'>
              {item.description}
            </Post>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Project;
