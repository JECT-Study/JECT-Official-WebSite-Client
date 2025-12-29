import { BlockButton, Dialog } from "@ject/jds";
import { type ReactNode, useCallback, useMemo, useState } from "react";

import { FileQuestionField, TextQuestionField, UrlQuestionField } from "./components";
import { useRegistrationFormWithDraft } from "./useRegistrationFormWithDraft";
import { formatPortfolioResponse } from "./utils";

import type { Question } from "@/apis/apply";
import { APPLY_TITLE } from "@/constants/applyPageData";
import { DIALOG_CONTENT } from "@/constants/dialog";
import { ApplyStepLayout } from "@/features/shared/components";
import { useSaveDraftMutation, useSubmitAnswerMutation } from "@/hooks/apply";
import type { AnswersByQuestionId, PortfolioFile, QuestionId } from "@/types/apis/application";
import type { RegistrationContext } from "@/types/funnel";
import { validateApplication } from "@/utils/validateApplication";

interface RegistrationStepProps {
  context: RegistrationContext;
  onNext: () => void;
  onBack: () => void;
}

interface TextBasedQuestionProps {
  question: Question;
  value: string;
  onChange: (id: QuestionId, text: string) => void;
}

interface FileQuestionProps {
  question: Question;
  portfolios: PortfolioFile[];
  onChangePortfolios: (portfolios: PortfolioFile[]) => void;
}

const TEXT_BASED_RENDERERS: Record<"TEXT" | "URL", (props: TextBasedQuestionProps) => ReactNode> = {
  TEXT: props => <TextQuestionField key={props.question.id} {...props} />,
  URL: props => <UrlQuestionField key={props.question.id} {...props} />,
};

const renderFileQuestion = (props: FileQuestionProps): ReactNode => (
  <FileQuestionField key={props.question.id} {...props} />
);

export function RegistrationStep({ context, onNext, onBack }: RegistrationStepProps) {
  const { jobFamily } = context;

  const { questions, answers, portfolios, setAnswers, setPortfolios } =
    useRegistrationFormWithDraft(jobFamily);

  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);

  const { mutate: saveDraftMutate } = useSaveDraftMutation();
  const { mutate: submitAnswerMutate } = useSubmitAnswerMutation({ onSuccess: onNext });

  //포트폴리오 응답 형식(중복 계산 방지-메모이제이션 불필요하면 삭제)
  const formattedPortfolios = useMemo(() => formatPortfolioResponse(portfolios), [portfolios]);

  //유효성 검증
  const isStepCompleted = useMemo(
    () => validateApplication(questions, { answers, portfolios: formattedPortfolios }),
    [questions, answers, formattedPortfolios],
  );

  //텍스트 답변 변경 핸들러
  const handleChangeAnswer = useCallback(
    (id: QuestionId, text: string) => {
      setAnswers((prev: AnswersByQuestionId) => ({ ...prev, [id]: text }));
    },
    [setAnswers],
  );

  //포트폴리오 변경 핸들러
  const handleChangePortfolios = useCallback(
    (newPortfolios: PortfolioFile[]) => {
      setPortfolios(newPortfolios);
    },
    [setPortfolios],
  );

  //지원서 임시 저장
  const handleSaveDraft = useCallback(() => {
    saveDraftMutate({ answers, portfolios: formattedPortfolios });
  }, [saveDraftMutate, answers, formattedPortfolios]);

  //지원서 제출
  const handleSubmit = useCallback(() => {
    setIsSubmitDialogOpen(false);
    submitAnswerMutate({
      jobFamily,
      answers: { answers, portfolios: formattedPortfolios },
    });
  }, [submitAnswerMutate, jobFamily, answers, formattedPortfolios]);

  const renderQuestion = useCallback(
    (question: Question): ReactNode => {
      const { inputType, id } = question;

      if (inputType === "TEXT" || inputType === "URL") {
        return TEXT_BASED_RENDERERS[inputType]({
          question,
          value: answers[id] ?? "",
          onChange: handleChangeAnswer,
        });
      }

      if (inputType === "FILE") {
        return renderFileQuestion({
          question,
          portfolios,
          onChangePortfolios: handleChangePortfolios,
        });
      }

      return null; // 지원하지 않는 type에 대해서 null 처리
    },
    [answers, portfolios, handleChangeAnswer, handleChangePortfolios],
  );

  return (
    <ApplyStepLayout
      variant='apply'
      title={APPLY_TITLE.registration}
      current={2}
      jobFamily={jobFamily}
      onBack={onBack}
    >
      <div className='flex flex-col items-stretch gap-(--semantic-spacing-24) self-stretch'>
        {questions.map(renderQuestion)}
      </div>

      <div className='gap-md flex w-full self-start *:flex-1'>
        <BlockButton.Basic
          size='md'
          variant='outlined'
          hierarchy='secondary'
          onClick={handleSaveDraft}
        >
          임시 저장하기
        </BlockButton.Basic>
        <BlockButton.Basic
          size='md'
          variant='solid'
          hierarchy='accent'
          disabled={!isStepCompleted}
          onClick={() => setIsSubmitDialogOpen(true)}
        >
          지원서 제출하기
        </BlockButton.Basic>
      </div>

      <Dialog
        open={isSubmitDialogOpen}
        onOpenChange={setIsSubmitDialogOpen}
        header={DIALOG_CONTENT.submitAnswer.header}
        body={DIALOG_CONTENT.submitAnswer.body}
        primaryAction={{
          children: DIALOG_CONTENT.submitAnswer.primaryLabel,
          hierarchy: "accent",
          onClick: handleSubmit,
        }}
        secondaryAction={{
          children: DIALOG_CONTENT.submitAnswer.secondaryLabel,
          onClick: () => setIsSubmitDialogOpen(false),
        }}
      />
    </ApplyStepLayout>
  );
}
