import Accordion from '@/components/common/accordion/Accordion';
import { Tab, TabHeader, TabItem, TabPanel } from '@/components/common/tab/Tab';
import Title from '@/components/common/title/Title';
import { faqActivity, faqApply, faqJect, faqProject } from '@/constants/faqData';

function Faq() {
  return (
    <div className='flex flex-col items-center py-(--gap-12xl)'>
      <div className='gap-8xl flex flex-col'>
        <div className='text-center'>
          <Title hierarchy='strong'>자주 묻는 질문</Title>
        </div>
        <section className='w-[45rem]'>
          <Tab defaultActiveTabId={1}>
            <TabHeader>
              <TabItem id={1} label='지원 관련' />
              <TabItem id={2} label='프로젝트 관련' />
              <TabItem id={3} label='활동 관련' />
              <TabItem id={4} label='젝트 관련' />
            </TabHeader>
            <div>
              <TabPanel id={1}>
                <div className='gap-4xl mt-(--gap-4xl) flex flex-col'>
                  {faqApply.map(({ id, title, label, content, caption }) => (
                    <Accordion key={id} title={title} label={label} caption={caption}>
                      {content}
                    </Accordion>
                  ))}
                </div>
              </TabPanel>
              <TabPanel id={2}>
                <div className='gap-4xl mt-(--gap-4xl) flex flex-col'>
                  {faqProject.map(({ id, title, label, content, caption }) => (
                    <Accordion key={id} title={title} label={label} caption={caption}>
                      {content}
                    </Accordion>
                  ))}
                </div>
              </TabPanel>
              <TabPanel id={3}>
                <div className='gap-4xl mt-(--gap-4xl) flex flex-col'>
                  {faqActivity.map(({ id, title, label, content, caption }) => (
                    <Accordion key={id} title={title} label={label} caption={caption}>
                      {content}
                    </Accordion>
                  ))}
                </div>
              </TabPanel>
              <TabPanel id={4}>
                <div className='gap-4xl mt-(--gap-4xl) flex flex-col'>
                  {faqJect.map(({ id, title, label, content, caption }) => (
                    <Accordion key={id} title={title} label={label} caption={caption}>
                      {content}
                    </Accordion>
                  ))}
                </div>
              </TabPanel>
            </div>
          </Tab>
        </section>
      </div>
    </div>
  );
}

export default Faq;
