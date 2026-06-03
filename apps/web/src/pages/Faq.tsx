import { Accordion, Tab } from "@jects/jds";
import { useMediaQueryFlags } from "@jects/jds/hooks";

import { Hero, Title } from "@/components/common/typography";
import PageHeroContainer from "@/components/layout/PageHeroContainer";
import PageModule from "@/components/layout/PageModule";
import { faqActivity, faqApply, faqJect, faqProject } from "@/constants/faqPageData";
import { useFaqNavigation } from "@/hooks/useFaqNavigation";

function Faq() {
  const { activeTabId, openAccordionId, handleTabChange, handleAccordionChange } =
    useFaqNavigation();
  const { isMobile } = useMediaQueryFlags();

  return (
    <PageModule>
      <PageHeroContainer>
        <div className='flex flex-col items-start gap-(--semantic-spacing-16)'>
          <Hero size='xs' textAlign='left'>
            FAQ
          </Hero>
          <Title size='xs' textAlign='left'>
            젝트에 대해 자주 묻는 질문들이 정리되어 있어요.
          </Title>
        </div>
      </PageHeroContainer>

      <div className='flex flex-col gap-(--semantic-spacing-48)'>
        <Tab.Root
          isItemStretched={isMobile ? true : false}
          value={activeTabId}
          onValueChange={handleTabChange}
        >
          <Tab.List>
            <Tab.Trigger value='1'>지원</Tab.Trigger>
            <Tab.Trigger value='2'>프로젝트</Tab.Trigger>
            <Tab.Trigger value='3'>활동</Tab.Trigger>
            <Tab.Trigger value='4'>젝트</Tab.Trigger>
          </Tab.List>

          <Tab.Content value='1'>
            <div className='mt-12'>
              <Accordion.Root
                type='single'
                isStretched
                collapsible
                value={openAccordionId || undefined}
                onValueChange={handleAccordionChange}
              >
                {faqApply.map(({ id, title, content }) => (
                  <Accordion.Item key={id} value={id}>
                    <Accordion.Trigger>{title}</Accordion.Trigger>
                    <Accordion.Content>{content}</Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          </Tab.Content>
          <Tab.Content value='2'>
            <div className='mt-12'>
              <Accordion.Root
                type='single'
                collapsible
                value={openAccordionId || undefined}
                onValueChange={handleAccordionChange}
              >
                {faqProject.map(({ id, title, content }) => (
                  <Accordion.Item key={id} value={id}>
                    <Accordion.Trigger>{title}</Accordion.Trigger>
                    <Accordion.Content>{content}</Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          </Tab.Content>
          <Tab.Content value='3'>
            <div className='mt-12'>
              <Accordion.Root
                type='single'
                collapsible
                value={openAccordionId || undefined}
                onValueChange={handleAccordionChange}
              >
                {faqActivity.map(({ id, title, content }) => (
                  <Accordion.Item key={id} value={id}>
                    <Accordion.Trigger>{title}</Accordion.Trigger>
                    <Accordion.Content>{content}</Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          </Tab.Content>
          <Tab.Content value='4'>
            <div className='mt-12'>
              <Accordion.Root
                type='single'
                collapsible
                value={openAccordionId || undefined}
                onValueChange={handleAccordionChange}
              >
                {faqJect.map(({ id, title, content }) => (
                  <Accordion.Item key={id} value={id}>
                    <Accordion.Trigger>{title}</Accordion.Trigger>
                    <Accordion.Content>{content}</Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          </Tab.Content>
        </Tab.Root>
      </div>
    </PageModule>
  );
}

export default Faq;
