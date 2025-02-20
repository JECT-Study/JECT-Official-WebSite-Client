import Accordion from '@/components/common/accordion/Accordion';
import { Tab, TabHeader, TabItem, TabPanel } from '@/components/common/tab/Tab';
import Title from '@/components/common/title/Title';

function Faq() {
  return (
    <div className='bg-surface-standard-dark flex min-h-dvh flex-col items-center py-(--gap-12xl)'>
      <div className='gap-8xl flex flex-col'>
        <div className='text-center'>
          <Title hierarchy='strong'>자주 묻는 질문</Title>
        </div>
        <main className='w-[45rem]'>
          <Tab defaultActiveTabId={0}>
            <TabHeader>
              <TabItem id={0} label='지원 관련 ' />
              <TabItem id={1} label='프로젝트 관련' />
              <TabItem id={2} label='활동 관련' />
              <TabItem id={3} label='젝트 관련' />
            </TabHeader>
            <div>
              <TabPanel id={0}>
                <div className='gap-4xl mt-(--gap-4xl) flex flex-col'>
                  <Accordion
                    title='참여하려면 어느 정도의 실력이 필요한가요?'
                    label='지원자분들의 실력을 직접 평가하는 정량적인 기준은 없어요.'
                  >
                    젝트는 프로젝트 참여 태도와 활동 가능 시간을 더욱 더 중요하게 생각하고 있어요.
                    <br />그 밖에 아래와 같은 역량을 갖추고 계시다면 더욱 좋아요!
                    <br />
                    <ul className='list-ject'>
                      <li>협업에 필요한 원활한 의사소통 능력</li>
                      <li>최소한의 전문성 및 기술적 숙련도</li>
                    </ul>
                  </Accordion>
                  <Accordion
                    title='다른 IT 동아리에 소속되어 있는데, 젝트에도 지원 가능한가요?'
                    label='다른 IT 동아리 소속 시에는 지원이 어려워요.'
                  >
                    젝트의 활동에 부정적인 영향을 줄 수도 있기 때문이에요.
                    <br /> 그렇지만 지원자분의 타 동아리 소속 여부를 사전에 판단할 순 없기 때문에,
                    현명히 지원을 부탁드려요.
                    <br /> 다른 IT 동아리가 아닌, 면접이나 직군을 위한 스터디에 소속된 경우는
                    괜찮아요.
                  </Accordion>
                  <Accordion
                    title='불합격도 별도로 통지하나요?'
                    label='네. 젝트는 불합격 시에도 이메일로 통지드려요.'
                  >
                    지원해 주신 분들께 너무나 감사드려요. 통지를 기다리시느라 시간이 불필요하게
                    낭비되지 않게 할게요.
                  </Accordion>
                  <Accordion
                    title='연령이나 신분에 따른 지원 제한이 있나요?'
                    label='특별히 제한을 두고 있지 않아요.'
                  >
                    젝트는 다음과 같은 분들이면 문제 없이 활동하실 수 있어요.
                    <ul className='list-ject'>
                      <li>대학생(휴학생)</li>
                      <li>취준생</li>
                      <li>직장인</li>
                    </ul>
                    <div className='body-sm text-object-alternative-dark'>
                      젝트의 지향점에 공감할 수 있는 분이면 더욱 좋아요.
                    </div>
                  </Accordion>
                </div>
              </TabPanel>
              <TabPanel id={1}>
                <div>프로젝트 관련</div>
              </TabPanel>
              <TabPanel id={2}>
                <div>활동 관련</div>
              </TabPanel>
              <TabPanel id={3}>
                <div>젝트 관련</div>
              </TabPanel>
            </div>
          </Tab>
        </main>
      </div>
    </div>
  );
}

export default Faq;
