import { LocalNavigation, Step, Title } from "@ject/jds";
import type { ReactNode } from "react";

import type { JobFamily } from "@/apis/apply";
import { findJobFamilyOption } from "@/constants/applyPageData";
import { STEP_LABELS } from "@/types/funnel";

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
    variant === "apply" ? findJobFamilyOption(props.jobFamily).navigationTitle : props.headerTitle;

  return (
    <div className='flex w-full max-w-[656px] flex-col items-start gap-(--semantic-spacing-48) px-(--semantic-margin-lg) pb-(--semantic-spacing-80)'>
      <header className='w-full'>
        <LocalNavigation.Root isStretched={true}>
          <LocalNavigation.BackButton onClick={onBack} />
          <LocalNavigation.Title>{navigationTitle}</LocalNavigation.Title>
        </LocalNavigation.Root>
        {variant === "apply" && (
          <div className='pt-(--semantic-spacing-24)'>
            <Step.Root size='md' current={props.current}>
              {STEP_LABELS.map((label, index) => (
                <Step.Item key={label} index={index}>
                  {label}
                </Step.Item>
              ))}
            </Step.Root>
          </div>
        )}
      </header>
      <section className='flex w-full flex-col items-stretch gap-(--semantic-margin-3xl)'>
        <Title size='md' textAlign='left'>
          {title}
        </Title>
        {children}
      </section>
    </div>
  );
}
