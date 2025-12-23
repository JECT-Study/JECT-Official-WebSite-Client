import { LocalNavigation, Step, Title } from "@ject/jds";
import type { ReactNode } from "react";

import type { JobFamily } from "@/types/apis/application";
import { STEP_LABELS } from "@/types/funnel";

const JOB_FAMILY_LABELS: Record<JobFamily, string> = {
  PM: "[젝트 4기] 프로덕트 매니저 개발자 모집",
  PD: "[젝트 4기] 프로덕트 디자이너 개발자 모집",
  FE: "[젝트 4기] 프론트엔드 개발자 모집",
  BE: "[젝트 4기] 백엔드 개발자 모집",
};

type BaseProps = {
  children: ReactNode;
  title: ReactNode;
  onBack: () => void;
};

type ApplyStepLayoutProps = BaseProps &
  (
    | {
        variant: "apply";
        current: number;
        jobFamily: JobFamily;
      }
    | {
        variant: "auth";
        headerTitle: string;
      }
  );

export function ApplyStepLayout(props: ApplyStepLayoutProps) {
  const { children, title, onBack, variant } = props;
  const navigationTitle =
    variant === "apply" ? JOB_FAMILY_LABELS[props.jobFamily] : props.headerTitle;

  return (
    <div className='flex min-h-screen flex-col'>
      <header className='w-full'>
        <div className='mx-auto w-full max-w-130 px-4'>
          <LocalNavigation.Root>
            <LocalNavigation.BackButton onClick={onBack} />
            <LocalNavigation.Title>{navigationTitle}</LocalNavigation.Title>
          </LocalNavigation.Root>
          {variant === "apply" && (
            <Step.Root size='md' current={props.current}>
              {STEP_LABELS.map((label, index) => (
                <Step.Item key={label} index={index}>
                  {label}
                </Step.Item>
              ))}
            </Step.Root>
          )}
        </div>
      </header>
      <div className='flex flex-1 flex-col items-center pt-(--gap-9xl) pb-(--gap-12xl)'>
        <section className='gap-9xl flex w-full max-w-164 flex-col items-stretch px-(--gap-4xl)'>
          <Title size='md' textAlign='left'>
            {title}
          </Title>
          {children}
        </section>
      </div>
    </div>
  );
}
