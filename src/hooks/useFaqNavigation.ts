import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { PATH } from '@/constants/path.ts';

interface UseFaqNavigationResult {
  activeTabId: number;
  openAccordionId: string | null;
  handleTabChange: (tabId: number) => void;
  handleAccordionChange: (id: string | null) => void;
}

export const useFaqNavigation = (): UseFaqNavigationResult => {
  const navigate = useNavigate();
  const { tabId: tabIdParam, questionId: questionIdParam } = useParams<{
    tabId?: string;
    questionId?: string;
  }>();

  const [activeTabId, setActiveTabId] = useState<number>(tabIdParam ? parseInt(tabIdParam, 10) : 1);
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(questionIdParam || null);

  useEffect(() => {
    if (tabIdParam) {
      setActiveTabId(parseInt(tabIdParam, 10));
    }

    if (questionIdParam) {
      setOpenAccordionId(questionIdParam);
    }
  }, [tabIdParam, questionIdParam]);

  const handleTabChange = (tabId: number): void => {
    setActiveTabId(tabId);
    setOpenAccordionId(null);

    if (tabId !== 1) {
      void navigate(`${PATH.faq}/${tabId}`, { replace: true });
    } else {
      void navigate(`${PATH.faq}`, { replace: true });
    }
  };

  const handleAccordionChange = (id: string | null): void => {
    setOpenAccordionId(id);
  };

  return {
    activeTabId,
    openAccordionId,
    handleTabChange,
    handleAccordionChange,
  };
};
