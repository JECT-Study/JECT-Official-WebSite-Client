import { useEffect } from 'react';

import FileField from './FileField';
import SelectField from './SelectField';
import TextField from './textField';
import UrlField from './UrlField';

import useQuestionsQuery from '@/hooks/useQuestionsQuery';
import { JobFamily, PortfolioResponse } from '@/types/apis/application';
import { Application } from '@/types/ui/application';
import { validateApplication } from '@/utils/validateApplication';

interface AnswersProps {
  questionJob: JobFamily | null;
  application: Application;
  onChangeAnswer: (id: number, text: string) => void;
  onChangePortfolios: (files: PortfolioResponse[]) => void;
  onActiveSubmitButton: (isCompleted: boolean) => void;
}

function Answers({
  questionJob,
  application,
  onChangeAnswer,
  onChangePortfolios,
  onActiveSubmitButton,
}: AnswersProps) {
  const { data: questions } = useQuestionsQuery(questionJob);

  useEffect(() => {
    if (questions?.status !== 'SUCCESS') return;

    const isCompleted = validateApplication(questions.data, application);

    onActiveSubmitButton(isCompleted);
  }, [application, questions, onActiveSubmitButton]);

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
                value={application.answers[data.id]}
              />
            );
          case 'URL':
            return (
              <UrlField
                key={data.id}
                data={data}
                onChange={onChangeAnswer}
                value={application.answers[data.id]}
              />
            );
          case 'FILE':
            return (
              <FileField
                key={data.id}
                data={data}
                onChange={onChangePortfolios}
                values={application.portfolios}
              />
            );
          case 'SELECT':
            return (
              <SelectField
                key={data.id}
                data={data}
                onChange={onChangeAnswer}
                value={application.answers[data.id]}
              />
            );
        }
      })}
    </form>
  );
}

export default Answers;
