import { useEffect } from 'react';

import FileField from './FileField';
import TextField from './textField';
import UrlField from './UrlField';

import useQuestionsQuery from '@/hooks/useQuestionsQuery';
import { AnswersPayload, JobFamily, PortfolioResponse } from '@/types/apis/application';
import { validateAnswersPayload } from '@/utils/validateAnswersPayload';

interface AnswersProps {
  questionJob: JobFamily | null;
  answersPayload: AnswersPayload;
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
  const { data: questions } = useQuestionsQuery(questionJob);

  useEffect(() => {
    if (questions?.status !== 'SUCCESS') return;

    const isCompleted = validateAnswersPayload(questions.data, answersPayload);

    onActiveSubmitButton(isCompleted);
  }, [answersPayload, questions, onActiveSubmitButton]);

  if (questions?.status !== 'SUCCESS') return;

  return (
    <form action='' className='gap-7xl flex flex-col' encType='multipart/form-data'>
      {questions.data?.map(data => {
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
