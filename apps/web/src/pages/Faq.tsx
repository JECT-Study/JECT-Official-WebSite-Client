import { Accordion } from "@/components/common/accordion/Accordion";
import { Tab, TabHeader, TabItem, TabPanel } from "@/components/common/tab/Tab";
import Title from "@/components/common/title/Title";
import { faqActivity, faqApply, faqJect, faqProject } from "@/constants/faqPageData";
import { useFaqNavigation } from "@/hooks/useFaqNavigation";

function Faq() {
  const { activeTabId, openAccordionId, handleTabChange, handleAccordionChange } =
    useFaqNavigation();

  const getActiveFaqData = () => {
    switch (activeTabId) {
      case 1:
        return faqApply;
      case 2:
        return faqProject;
      case 3:
        return faqActivity;
      case 4:
        return faqJect;
      default:
        return faqApply;
    }
  };

  return (
    <div className="flex flex-col items-center py-(--gap-12xl)">
      <div className="gap-8xl flex flex-col">
        <div className="text-center">
          <Title hierarchy="strong">자주 묻는 질문</Title>
        </div>
        <section className="w-[45rem]">
          <Tab defaultActiveTabId={activeTabId} onTabChange={handleTabChange}>
            <TabHeader>
              <TabItem id={1} label="지원 관련" />
              <TabItem id={2} label="프로젝트 관련" />
              <TabItem id={3} label="활동 관련" />
              <TabItem id={4} label="젝트 관련" />
            </TabHeader>
            <div>
              <TabPanel id={1}>
                <div className="mt-(--gap-4xl)">
                  <Accordion
                    items={getActiveFaqData()}
                    defaultOpenId={openAccordionId}
                    onChange={handleAccordionChange}
                  />
                </div>
              </TabPanel>
              <TabPanel id={2}>
                <div className="mt-(--gap-4xl)">
                  <Accordion
                    items={getActiveFaqData()}
                    defaultOpenId={openAccordionId}
                    onChange={handleAccordionChange}
                  />
                </div>
              </TabPanel>
              <TabPanel id={3}>
                <div className="mt-(--gap-4xl)">
                  <Accordion
                    items={getActiveFaqData()}
                    defaultOpenId={openAccordionId}
                    onChange={handleAccordionChange}
                  />
                </div>
              </TabPanel>
              <TabPanel id={4}>
                <div className="mt-(--gap-4xl)">
                  <Accordion
                    items={getActiveFaqData()}
                    defaultOpenId={openAccordionId}
                    onChange={handleAccordionChange}
                  />
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
