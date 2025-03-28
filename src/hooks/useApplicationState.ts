import { useCallback, useState } from 'react';

import { AnswersRequest, AnswersResponse, PortfolioResponse } from '@/types/apis/answer';
import { JobFamily } from '@/types/apis/question';

const initialAnswer = {
  answers: {},
  portfolios: [],
};

const useApplicationState = () => {
  const [isStepCompleted, setIsStepCompleted] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<JobFamily | null>(null);
  const [questionPosition, setQuestionPosition] = useState<JobFamily | null>(null);
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
      setSelectedPosition(jobFamily);
      setQuestionPosition(jobFamily);
    }

    if (answers) setAnswersPayload(prev => ({ ...prev, answers }));

    if (portfolios) setAnswersPayload(prev => ({ ...prev, portfolios }));
  }, []);

  const resetAnswers = useCallback(() => {
    setQuestionPosition(selectedPosition);
    setAnswersPayload(initialAnswer);
  }, [selectedPosition]);

  const revertSelect = useCallback(() => {
    setSelectedPosition(questionPosition);
  }, [questionPosition]);

  const changeSelectAndQuestion = useCallback((position: JobFamily) => {
    setSelectedPosition(position);
    setQuestionPosition(position);
  }, []);

  const changeSelect = useCallback((position: JobFamily) => {
    setSelectedPosition(position);
  }, []);

  const activeSubmitButton = useCallback((isCompleted: boolean) => {
    setIsStepCompleted(isCompleted);
  }, []);

  return {
    isStepCompleted,
    selectedPosition,
    questionPosition,
    answersPayload,
    handleChangeAnswer,
    handleChangePortfolios,
    updateAnswerByDraft,
    resetAnswers,
    revertSelect,
    changeSelectAndQuestion,
    changeSelect,
    activeSubmitButton,
  };
};

export default useApplicationState;
