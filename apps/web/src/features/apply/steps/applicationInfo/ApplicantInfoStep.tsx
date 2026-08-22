import {
  BlockButton,
  Checkbox,
  Icon,
  Label,
  TextField,
  toastController,
  Tooltip,
} from "@jects/jds";
import { Controller } from "react-hook-form";

import { SelectController } from "./components/SelectController";

import { APPLY_MESSAGE } from "@/constants/applyMessages";
import { APPLY_TITLE } from "@/constants/applyPageData";
import { ApplyStepLayout, RequiredMark } from "@/features/shared/components";
import { useMemberProfileMutation } from "@/hooks/apply";
import { useApplyApplicantInfoForm } from "@/hooks/useApplyApplicantInfoForm";
import { phoneNumberCompleteSchema } from "@/schema/applySchema";
import type { ApplicantInfoContext, ProfileData } from "@/types/funnel";
import {
  CAREER_DETAILS_OPTIONS,
  EXPERIENCE_PERIOD_OPTIONS,
  INTERESTED_DOMAIN_OPTIONS,
  REGION_OPTIONS,
  type InterestedDomain,
} from "@/types/funnel";
import { deriveInputValidation } from "@/utils/validationHelpers";

const MAX_SELECTABLE_DOMAINS = 3;

interface ApplicantInfoStepProps {
  context: ApplicantInfoContext;
  onNext: () => void;
  onBack: () => void;
}

export function ApplicantInfoStep({ context, onNext, onBack }: ApplicantInfoStepProps) {
  const { control, handleSubmit, formState, setError } = useApplyApplicantInfoForm();

  const { mutate: saveProfile } = useMemberProfileMutation({
    onSuccess: () => {
      onNext();
    },
    onError: () => {
      toastController.destructive(APPLY_MESSAGE.fail.saveProfile);
    },
  });

  const onSubmit = (data: ProfileData) => {
    saveProfile({
      recruitId: context.recruitId,
      profile: { ...data, jobFamily: context.jobFamily },
    });
  };

  return (
    <ApplyStepLayout
      variant='apply'
      title={APPLY_TITLE.applicantInfo}
      current={1}
      jobFamily={context.jobFamily}
      onBack={onBack}
    >
      <div className='flex flex-col items-start gap-(--semantic-spacing-24) self-stretch'>
        <form
          id='applicantForm'
          className='flex flex-col gap-(--semantic-spacing-24) self-stretch'
          onSubmit={e => void handleSubmit(onSubmit)(e)}
        >
          <Controller
            name='name'
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label={
                  <>
                    이름
                    <RequiredMark />
                  </>
                }
                validation={deriveInputValidation({
                  hasError: Boolean(fieldState.error),
                  hasValue: Boolean(field.value?.length),
                })}
                placeholder='김젝트'
                helperText={fieldState.error?.message ?? ""}
                value={field.value ?? ""}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name='phoneNumber'
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                type='tel'
                label={
                  <>
                    휴대폰 번호
                    <RequiredMark />
                  </>
                }
                validation={deriveInputValidation({
                  hasError: Boolean(fieldState.error),
                  hasValue: Boolean(field.value?.length),
                })}
                placeholder='01012345678'
                helperText={fieldState.error?.message ?? ""}
                value={field.value ?? ""}
                onChange={e => {
                  const filtered = e.target.value.replace(/[^0-9-]/g, "");
                  field.onChange(filtered);
                }}
                onBlur={() => {
                  field.onBlur();

                  const result = phoneNumberCompleteSchema.safeParse(field.value);

                  if (!result.success) {
                    setError("phoneNumber", {
                      message: result.error.issues[0].message,
                    });
                  }
                }}
              />
            )}
          />
          <Controller
            name='careerDetails'
            control={control}
            render={({ field }) => (
              <SelectController
                label={
                  <>
                    지원자 신분
                    <RequiredMark />
                  </>
                }
                placeholder='현재 신분을 선택해주세요'
                value={field.value}
                options={CAREER_DETAILS_OPTIONS}
                onChange={value => field.onChange(value)}
              />
            )}
          />

          <Controller
            name='region'
            control={control}
            render={({ field }) => (
              <SelectController
                label={
                  <>
                    거주 지역
                    <RequiredMark />
                  </>
                }
                placeholder='현재 거주하는 지역을 선택해주세요'
                value={field.value}
                options={REGION_OPTIONS}
                onChange={value => field.onChange(value)}
              />
            )}
          />

          <Controller
            name='experiencePeriod'
            control={control}
            render={({ field }) => (
              <SelectController
                label={
                  <div className='flex items-center gap-(--semantic-spacing-4) text-(--semantic-object-normal)'>
                    <span>
                      직무 관련 경험 기간
                      <RequiredMark />
                    </span>
                    <Tooltip.Provider>
                      <Tooltip.Root>
                        <Tooltip.Trigger
                          className='text-(--semantic-object-alternative)'
                          aria-label='직무 관련 경험 기간 안내'
                        >
                          <Icon name='information-fill' size='2xs' color='inherit' />
                        </Tooltip.Trigger>
                        <Tooltip.Content>학습과 경력을 모두 포함한 기간</Tooltip.Content>
                      </Tooltip.Root>
                    </Tooltip.Provider>
                  </div>
                }
                placeholder='직무 관련 경험 기간을 선택해주세요'
                value={field.value}
                options={EXPERIENCE_PERIOD_OPTIONS}
                onChange={value => field.onChange(value)}
              />
            )}
          />

          <Controller
            name='interestedDomains'
            control={control}
            render={({ field }) => {
              const hasReachedMaxDomains = field.value.length >= MAX_SELECTABLE_DOMAINS;
              const isOptionDisabled = (optionValue: InterestedDomain) =>
                hasReachedMaxDomains && !field.value.includes(optionValue);

              return (
                <div className='flex flex-col items-start justify-center gap-(--semantic-spacing-12) self-stretch'>
                  <Label size='md'>
                    관심 도메인(최대 {MAX_SELECTABLE_DOMAINS}개)
                    <RequiredMark />
                  </Label>
                  <div className='tablet:grid-cols-3 grid grid-cols-2 gap-2 self-stretch'>
                    {INTERESTED_DOMAIN_OPTIONS.map(option => (
                      <Checkbox.Content
                        key={option.value}
                        label={option.label}
                        variant='outlined'
                        checked={field.value.includes(option.value)}
                        disabled={isOptionDisabled(option.value)}
                        onCheckedChange={checked => {
                          if (checked === true) {
                            field.onChange([...field.value, option.value]);
                          } else {
                            field.onChange(field.value.filter(d => d !== option.value));
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            }}
          />
        </form>
      </div>
      <BlockButton.Basic
        className='self-start'
        type='submit'
        form='applicantForm'
        disabled={!formState.isValid}
        size='md'
        variant='solid'
        hierarchy='accent'
        suffixIcon='arrow-right-line'
      >
        다음 단계로 진행하기
      </BlockButton.Basic>
    </ApplyStepLayout>
  );
}
