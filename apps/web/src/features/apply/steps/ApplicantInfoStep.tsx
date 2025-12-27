import {
  BlockButton,
  Checkbox,
  Label,
  Select,
  SelectField,
  TextField,
  toastController,
} from "@ject/jds";
import { useState } from "react";
import { Controller } from "react-hook-form";

import { APPLY_MESSAGE } from "@/constants/applyMessages";
import { APPLY_TITLE } from "@/constants/applyPageData";
import { ApplyStepLayout } from "@/features/shared/components";
import { useMemberProfileMutation } from "@/hooks/apply";
import { useApplyApplicantInfoForm } from "@/hooks/useApplyApplicantInfoForm";
import type { ApplicantInfoContext, ProfileData } from "@/types/funnel";
import {
  CAREER_DETAILS_OPTIONS,
  EXPERIENCE_PERIOD_OPTIONS,
  INTERESTED_DOMAIN_OPTIONS,
  REGION_OPTIONS,
  findLabelByValue,
  type CareerDetails,
  type ExperiencePeriod,
  type Region,
} from "@/types/funnel";
import { deriveInputValidation } from "@/utils/validationHelpers";

type SelectFieldName = "careerDetails" | "region" | "experiencePeriod";

interface ApplicantInfoStepProps {
  context: ApplicantInfoContext;
  onNext: () => void;
  onBack: () => void;
}

export function ApplicantInfoStep({ context, onNext, onBack }: ApplicantInfoStepProps) {
  const { control, handleSubmit, formState } = useApplyApplicantInfoForm();

  const [openSelect, setOpenSelect] = useState<SelectFieldName | null>(null);

  const { mutate: saveProfile } = useMemberProfileMutation({
    onSuccess: () => {
      onNext();
    },
    onError: () => {
      toastController.destructive(APPLY_MESSAGE.fail.saveProfile);
    },
  });

  const onSubmit = (data: ProfileData) => {
    saveProfile(data);
  };

  const toggleSelect = (name: SelectFieldName) => {
    setOpenSelect(prev => (prev === name ? null : name));
  };

  const closeSelect = () => {
    setOpenSelect(null);
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
              label='이름'
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
              label='휴대폰 번호'
              validation={deriveInputValidation({
                hasError: Boolean(fieldState.error),
                hasValue: Boolean(field.value?.length),
              })}
              placeholder='01012345678'
              helperText={fieldState.error?.message ?? ""}
              value={field.value ?? ""}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name='careerDetails'
          control={control}
          render={({ field }) => (
            <div className='flex flex-col'>
              <SelectField
                label='지원자 신분'
                placeholder='선택하세요'
                value={findLabelByValue(CAREER_DETAILS_OPTIONS, field.value)}
                isOpen={openSelect === "careerDetails"}
                onClick={() => toggleSelect("careerDetails")}
              />
              {openSelect === "careerDetails" && (
                <Select
                  variant='radio'
                  value={field.value}
                  onChange={value => {
                    field.onChange(value as CareerDetails);
                    closeSelect();
                  }}
                >
                  {CAREER_DETAILS_OPTIONS.map(option => (
                    <Select.Radio key={option.value} value={option.value}>
                      {option.label}
                    </Select.Radio>
                  ))}
                </Select>
              )}
            </div>
          )}
        />

        <Controller
          name='region'
          control={control}
          render={({ field }) => (
            <div className='flex flex-col'>
              <SelectField
                label='거주 지역'
                placeholder='선택하세요'
                value={field.value ? findLabelByValue(REGION_OPTIONS, field.value) : ""}
                isOpen={openSelect === "region"}
                onClick={() => toggleSelect("region")}
              />
              {openSelect === "region" && (
                <Select
                  variant='radio'
                  value={field.value ?? ""}
                  onChange={value => {
                    field.onChange(value as Region);
                    closeSelect();
                  }}
                >
                  {REGION_OPTIONS.map(option => (
                    <Select.Radio key={option.value} value={option.value}>
                      {option.label}
                    </Select.Radio>
                  ))}
                </Select>
              )}
            </div>
          )}
        />

        <Controller
          name='experiencePeriod'
          control={control}
          render={({ field }) => (
            <div className='flex flex-col'>
              <SelectField
                label='직무 관련 경험 기간'
                placeholder='선택하세요'
                value={findLabelByValue(EXPERIENCE_PERIOD_OPTIONS, field.value)}
                isOpen={openSelect === "experiencePeriod"}
                onClick={() => toggleSelect("experiencePeriod")}
              />
              {openSelect === "experiencePeriod" && (
                <Select
                  variant='radio'
                  value={field.value}
                  onChange={value => {
                    field.onChange(value as ExperiencePeriod);
                    closeSelect();
                  }}
                >
                  {EXPERIENCE_PERIOD_OPTIONS.map(option => (
                    <Select.Radio key={option.value} value={option.value}>
                      {option.label}
                    </Select.Radio>
                  ))}
                </Select>
              )}
            </div>
          )}
        />

        <Controller
          name='interestedDomains'
          control={control}
          render={({ field }) => (
            <div className='gap-md flex flex-col'>
              <Label size='md'>관심 도메인 (선택, 복수 선택 가능)</Label>
              <div className='grid grid-cols-2 gap-2 md:grid-cols-3'>
                {INTERESTED_DOMAIN_OPTIONS.map(option => (
                  <Checkbox.Content
                    key={option.value}
                    label={option.label}
                    variant='outlined'
                    checked={field.value.includes(option.value)}
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
          )}
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
