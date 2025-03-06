import cardSampleImage from '@/assets/CardSample.png';
import { Card } from '@/components/common/card/Card';
import Title from '@/components/common/title/Title';

const miniStudyData = [
  {
    name: 'Docker & Kubernetes 심화 스터디',
    linkUrl: 'https://youtube.com/watch?v=docker_k8s_tips789',
    imageUrl: cardSampleImage,
  },
  {
    name: 'Python 웹 크롤링 실습 스터디',
    linkUrl: 'https://youtube.com/watch?v=python_scraping456',
    imageUrl: cardSampleImage,
  },
  {
    name: 'Spring Boot & JPA 스터디',
    linkUrl: 'https://youtube.com/watch?v=springboot_jpa123',
    imageUrl: cardSampleImage,
  },
  {
    name: 'Docker & Kubernetes 심화 스터디',
    linkUrl: 'https://youtube.com/watch?v=docker_k8s_tips789',
    imageUrl: cardSampleImage,
  },
  {
    name: 'Python 웹 크롤링 실습 스터디',
    linkUrl: 'https://youtube.com/watch?v=python_scraping456',
    imageUrl: cardSampleImage,
  },
  {
    name: 'Spring Boot & JPA 스터디',
    linkUrl: 'https://youtube.com/watch?v=springboot_jpa123',
    imageUrl: cardSampleImage,
  },
];

const jecttalkData = [
  {
    name: '마이크로서비스 아키텍처 개념',
    youtubeUrl: 'https://youtube.com/watch?v=microservices_tips789',
    imageUrl: cardSampleImage,
  },
  {
    name: 'Python 비동기 프로그래밍(AIOHTTP)',
    youtubeUrl: 'https://youtube.com/watch?v=python_async456',
    imageUrl: cardSampleImage,
  },
  {
    name: 'Spring Boot REST API 개발',
    youtubeUrl: 'https://youtube.com/watch?v=springboot_api123',
    imageUrl: cardSampleImage,
  },
  {
    name: '마이크로서비스 아키텍처 개념',
    youtubeUrl: 'https://youtube.com/watch?v=microservices_tips789',
    imageUrl: cardSampleImage,
  },
  {
    name: 'Python 비동기 프로그래밍(AIOHTTP)',
    youtubeUrl: 'https://youtube.com/watch?v=python_async456',
    imageUrl: cardSampleImage,
  },
  {
    name: 'Spring Boot REST API 개발',
    youtubeUrl: 'https://youtube.com/watch?v=springboot_api123',
    imageUrl: cardSampleImage,
  },
  {
    name: '마이크로서비스 아키텍처 개념',
    youtubeUrl: 'https://youtube.com/watch?v=microservices_tips789',
    imageUrl: cardSampleImage,
  },
];

function Activity() {
  return (
    <div className='gap-12xl flex flex-col items-center py-(--gap-12xl)'>
      <section className='gap-8xl flex flex-col items-center'>
        <Title hierarchy='strong'>미니 스터디</Title>
        <div className='gap-4xl grid max-w-[60rem] grid-cols-3'>
          {miniStudyData.map((item, index) => (
            <Card
              key={index}
              to={item.linkUrl}
              title={item.name}
              label={item.name}
              imgUrl={item.imageUrl}
              isDescriptionVisible={false}
              target='_blank'
              rel='noopener noreferrer'
            >
              ''
            </Card>
          ))}
        </div>
      </section>
      <section className='gap-8xl flex flex-col items-center'>
        <Title hierarchy='strong'>JECTALK</Title>
        <div className='gap-4xl grid max-w-[60rem] grid-cols-3'>
          {jecttalkData.map((item, index) => (
            <Card
              key={index}
              to={item.youtubeUrl}
              title={item.name}
              label={item.name}
              imgUrl={item.imageUrl}
              isDescriptionVisible={false}
              target='_blank'
              rel='noopener noreferrer'
            >
              ''
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Activity;
