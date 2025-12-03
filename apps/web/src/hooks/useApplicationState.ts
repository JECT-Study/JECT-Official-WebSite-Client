import { useCallback, useState } from "react";

import type { AnswersResponse, JobFamily, PortfolioResponse } from "@/types/apis/application";
import type { Application } from "@/types/ui/application";

const initialAnswer: Application = {
  answers: {},
  portfolios: [],
};

const useApplicationState = () => {
  const [isStepCompleted, setIsStepCompleted] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobFamily | null>(null);
  const [questionJob, setQuestionJob] = useState<JobFamily | null>(null);
  const [application, setApplication] = useState<Application>(initialAnswer);

  const handleChangeAnswer = useCallback((id: number, text: string) => {
    setApplication(prev => ({ ...prev, answers: { ...prev.answers, [id]: text } }));
  }, []);

  const handleChangePortfolios = useCallback((files: PortfolioResponse[]) => {
    setApplication(prev => ({ ...prev, portfolios: files }));
  }, []);

  const updateAnswerByDraft = useCallback((draft: AnswersResponse) => {
    const { jobFamily, answers, portfolios } = draft;

    if (jobFamily) {
      setSelectedJob(jobFamily);
      setQuestionJob(jobFamily);
    }

    if (answers) setApplication(prev => ({ ...prev, answers }));

    if (portfolios) setApplication(prev => ({ ...prev, portfolios }));
  }, []);

  const resetApplication = useCallback((job: JobFamily) => {
    setQuestionJob(job);
    setApplication(initialAnswer);
  }, []);

  const revertSelect = useCallback(() => {
    setSelectedJob(questionJob);
  }, [questionJob]);

  const changeSelectAndQuestion = useCallback((job: JobFamily) => {
    setSelectedJob(job);
    setQuestionJob(job);
  }, []);

  const changeSelect = useCallback((job: JobFamily) => {
    setSelectedJob(job);
  }, []);

  const setSubmitButtonActive = useCallback((isCompleted: boolean) => {
    setIsStepCompleted(isCompleted);
  }, []);

  return {
    isStepCompleted,
    selectedJob,
    questionJob,
    application,
    handleChangeAnswer,
    handleChangePortfolios,
    updateAnswerByDraft,
    resetApplication,
    revertSelect,
    changeSelectAndQuestion,
    changeSelect,
    setSubmitButtonActive,
  };
};

export default useApplicationState;
