import { Navigate, useNavigate } from 'react-router-dom';

import BlockButton from '@/components/common/button/BlockButton';
import Icon from '@/components/common/icon/Icon';
import InputField from '@/components/common/input/InputField';
import ProgressIndicator from '@/components/common/progress/ProgressIndicator';
import Title from '@/components/common/title/Title';
import { APPLY_TITLE } from '@/constants/applyPageData';
import { PATH } from '@/constants/path';
import { useApplyApplicantInfoForm } from '@/hooks/useApplyApplicantInfoForm';
import useCheckApplicationStatus from '@/hooks/useCheckApplicationStatus';
import { useMemberProfileInitialMutation } from '@/hooks/useMemberProfileInitialMutation';
import { ApplyApplicantInfoFormData } from '@/schema/applySchema';
import { MemberProfileInitialPayload } from '@/types/apis/apply';
import { handleError } from '@/utils/errorLogger';
import { CreateSubmitHandler } from '@/utils/formHelpers';

function ApplyApplicantInfo() {
  const navigate = useNavigate();
  const { data: applicationStatus } = useCheckApplicationStatus();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useApplyApplicantInfoForm();

  const { mutate: updateProfileMutate, isPending: isUpdatingProfile } =
    useMemberProfileInitialMutation();

  if (applicationStatus?.data) {
    return <Navigate to={PATH.main} replace />;
  }

  const name = watch('name');
  const phoneNumber = watch('phoneNumber');

  const onSubmit = (data: ApplyApplicantInfoFormData) => {
    const profileData: MemberProfileInitialPayload = {
      name: data.name,
      phoneNumber: data.phoneNumber,
    };

    updateProfileMutate(profileData, {
      onSuccess: response => {
        if (response.status === 'SUCCESS') {
          void navigate(PATH.applyRegistration);
        }
      },
      onError: error => {
        handleError(error, '프로필 업데이트 실패');
      },
    });
  };

  const handleApplicantInfoSubmit = CreateSubmitHandler<
    ApplyApplicantInfoFormData,
    ApplyApplicantInfoFormData
  >(handleSubmit, onSubmit);

  const isSubmitButtonDisabled = !isValid || isUpdatingProfile;

  return (
    <div className='gap-9xl flex flex-col items-center pt-(--gap-9xl) pb-(--gap-12xl)'>
      <ProgressIndicator totalStep={3} currentStep={2} />
      <section className='gap-9xl flex w-[26.25rem] flex-col items-stretch *:first:self-center'>
        <Title hierarchy='strong'>{APPLY_TITLE.applicantInfo}</Title>
        <form
          id='applicantForm'
          className='gap-3xl onSubmit={handleApplicantInfoSubmit} flex flex-col'
          onSubmit={handleApplicantInfoSubmit}
        >
          <InputField
            labelText='이름'
            isError={!!errors.name}
            isSuccess={name?.length > 0 && !errors.name}
            placeholder='김젝트'
            helper={errors.name ? errors.name.message : ''}
            {...register('name')}
          />
          <InputField
            type='tel'
            labelText='휴대폰 번호'
            isError={!!errors.phoneNumber}
            isSuccess={phoneNumber?.length > 0 && !errors.phoneNumber}
            placeholder='01012345678'
            helper={errors.phoneNumber ? errors.phoneNumber.message : ''}
            {...register('phoneNumber')}
          />
        </form>
        <BlockButton
          type='submit'
          form='applicantForm'
          size='lg'
          style='solid'
          hierarchy='accent'
          rightIcon={
            <Icon
              name='forward'
              size='md'
              fillColor={
                isSubmitButtonDisabled
                  ? 'fill-accent-trans-hero-dark'
                  : 'fill-object-static-inverse-hero-dark'
              }
            />
          }
          disabled={isSubmitButtonDisabled}
        >
          다음 단계로 진행하기
        </BlockButton>
      </section>
    </div>
  );
}

export default ApplyApplicantInfo;
