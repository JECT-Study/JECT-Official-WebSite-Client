import { useCallback, useState } from 'react';

import { AnswersRequest, AnswersResponse, PortfolioResponse } from '@/types/apis/answer';
import { JobFamily } from '@/types/apis/question';

const initialAnswer = {
  answers: {},
  portfolios: [],
};

const useApplicationState = () => {
  const [isStepCompleted, setIsStepCompleted] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobFamily | null>(null);
  const [questionJob, setQuestionJob] = useState<JobFamily | null>(null);
  const [answersPayload, setAnswersPayload] = useState<AnswersRequest>(initialAnswer);

  const handleChangeAnswer = useCallback((id: number, text: string) => {
    setAnswersPayload(prev => ({ ...prev, answers: { ...prev.answers, [id]: text } }));
  }, []);

  const handleChangePortfolios = useCallback((files: PortfolioResponse[]) => {
    setAnswersPayload(prev => ({ ...prev, portfolios: files }));
  }, []);

  const updateAnswerByDraft = useCallback((draft: AnswersResponse) => {
    const { jobFamily, answers, portfolios } = draft;

    if (jobFamily) {
      setSelectedJob(jobFamily);
      setQuestionJob(jobFamily);
    }

    if (answers) setAnswersPayload(prev => ({ ...prev, answers }));

    if (portfolios) setAnswersPayload(prev => ({ ...prev, portfolios }));
  }, []);

  const resetAnswers = useCallback(() => {
    setQuestionJob(selectedJob);
    setAnswersPayload(initialAnswer);
  }, [selectedJob]);

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
    answersPayload,
    handleChangeAnswer,
    handleChangePortfolios,
    updateAnswerByDraft,
    resetAnswers,
    revertSelect,
    changeSelectAndQuestion,
    changeSelect,
    setSubmitButtonActive,
  };
};

export default useApplicationState;
