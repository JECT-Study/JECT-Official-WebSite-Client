import { useEffect } from 'react';

import FileField from './FileField';
import TextField from './textField';
import UrlField from './UrlField';

import useQuestionsQuery from '@/hooks/useQuestionsQuery';
import { AnswersRequest, PortfolioResponse } from '@/types/apis/answer';
import { JobFamily } from '@/types/apis/question';
import { validateAnswersPayload } from '@/utils/validateAnswersPayload';

interface AnswersProps {
  questionJob: JobFamily | null;
  answersPayload: AnswersRequest;
  onChangeAnswer: (id: number, text: string) => void;
  onChangePortfolios: (files: PortfolioResponse[]) => void;
  onActiveSubmitButton: (isCompleted: boolean) => void;
}

function Answers({
  questionJob,
  answersPayload,
  onChangeAnswer,
  onChangePortfolios,
  onActiveSubmitButton,
}: AnswersProps) {
  const { questions } = useQuestionsQuery(questionJob);

  useEffect(() => {
    if (!questions) return;

    const isCompleted = validateAnswersPayload(questions, answersPayload);

    onActiveSubmitButton(isCompleted);
  }, [answersPayload, questions, onActiveSubmitButton]);

  return (
    <form action='' className='gap-7xl flex flex-col' encType='multipart/form-data'>
      {questions?.map(data => {
        switch (data.inputType) {
          case 'TEXT':
            return (
              <TextField
                key={data.id}
                data={data}
                onChange={onChangeAnswer}
                value={answersPayload.answers[data.id]}
              />
            );
          case 'URL':
            return (
              <UrlField
                key={data.id}
                data={data}
                onChange={onChangeAnswer}
                value={answersPayload.answers[data.id]}
              />
            );
          case 'FILE':
            return (
              <FileField
                key={data.id}
                data={data}
                onChange={onChangePortfolios}
                values={answersPayload.portfolios}
              />
            );
        }
      })}
    </form>
  );
}

export default Answers;
