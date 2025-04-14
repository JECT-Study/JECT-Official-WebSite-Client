import { useEffect } from 'react';

import FileField from './FileField';
import SelectField from './SelectField';
import TextField from './textField';
import UrlField from './UrlField';
import LabelButton from '../common/button/LabelButton';
import Icon from '../common/icon/Icon';
import Label from '../common/label/Label';

import useQuestionsQuery from '@/hooks/useQuestionsQuery';
import { useToastActions } from '@/stores/toastStore';
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
  const { data: questions, isError, refetch } = useQuestionsQuery(questionJob);
  const { addToast } = useToastActions();

  useEffect(() => {
    if (questions?.status !== 'SUCCESS') return;

    const isCompleted = validateApplication(questions.data, application);

    onActiveSubmitButton(isCompleted);
  }, [application, questions, onActiveSubmitButton]);

  if (isError || questions?.status !== 'SUCCESS') {
    addToast('일시적 오류로 추가 질문들을 불러올 수 없었어요.', 'negative');

    return (
      <div className='gap-md flex flex-col text-center'>
        <Label hierarchy='normal' weight='normal' textColor='text-feedback-negative-dark'>
          일시적 오류로 추가 질문들을 불러올 수 없었어요.
        </Label>
        <div>
          <LabelButton
            onClick={() => void refetch()}
            size='md'
            hierarchy='secondary'
            leftIcon={<Icon name='refresh' size='sm' fillColor='fill-object-neutral-dark' />}
          >
            다시 불러오기
          </LabelButton>
        </div>
      </div>
    );
  }

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
