import { BlockButton, LabelButton, TextField, toastController } from "@ject/jds";
import type { FormEventHandler } from "react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { PATH } from "@/constants/path";
import {
  useCheckEmailExistsMutation,
  useSendAuthCodeMutation,
  useVerifyAuthCodeMutation,
} from "@/hooks/apply";
import { useApplyEmailForm } from "@/hooks/useApplyEmailForm";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import { deriveInputValidation } from "@/utils/validationHelpers";

const formatTime = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${String(sec).padStart(2, "0")}`;
};

interface AuthCodeFormProps {
  defaultEmail?: string;
  sendGroupCode: "AUTH_CODE" | "PIN_RESET";
  onVerified: (email: string, authCode: string) => void | Promise<void>;
  onExistingMember?: (email: string) => void;
}

export function AuthCodeForm({
  defaultEmail = "",
  sendGroupCode,
  onVerified,
  onExistingMember,
}: AuthCodeFormProps) {
  const navigate = useNavigate();
  const { jobFamily } = useParams<{ jobFamily: string }>();

  const [hasSentCode, setHasSentCode] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null);
  const [authCode, setAuthCode] = useState("");

  const timer = useCountdownTimer();

  const {
    control: emailControl,
    watch: watchEmail,
    getFieldState,
    formState,
  } = useApplyEmailForm();

  const currentEmail = watchEmail("email") || defaultEmail;
  const emailState = getFieldState("email", formState);

  const { mutateAsync: checkEmailMutateAsync } = useCheckEmailExistsMutation();
  const { mutate: sendCodeMutate } = useSendAuthCodeMutation();
  const { mutateAsync: verifyCodeMutateAsync } = useVerifyAuthCodeMutation();

  const handleSendEmailCode = async () => {
    setEmailErrorMessage(null);
    //Todo: PIN_RESET 일 때는 checkEmailMutate가 호출되지 않도록
    const isUserExists = await checkEmailMutateAsync(currentEmail);

    if (sendGroupCode === "AUTH_CODE" && isUserExists) {
      onExistingMember?.(currentEmail);
      return;
    }

    if (sendGroupCode === "PIN_RESET" && !isUserExists) {
      setEmailErrorMessage("가입되지 않은 이메일입니다. 이메일을 확인해주세요.");
      return;
    }

    sendCodeMutate(
      { email: currentEmail, sendGroupCode },
      {
        onSuccess: () => {
          setHasSentCode(true);
          if (sendGroupCode === "AUTH_CODE") {
            timer.start(180);
          }
        },
        onError: () => {
          toastController.destructive(
            "인증번호 발송 실패",
            "일시적 오류일 수 있으니 다시 시도해주세요.",
          );
        },
      },
    );
  };

  const handleVerifyCode: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    verifyCodeMutateAsync({ email: currentEmail, authCode, template: sendGroupCode })
      .then(() => onVerified(currentEmail, authCode))
      .catch(() => {
        toastController.destructive(
          "인증번호 시도 실패",
          "일시적 오류일 수 있으니 다시 시도해주세요.",
        );
      });
  };

  const hasEmailFormError = Boolean(emailState.error) || Boolean(emailErrorMessage);

  const emailValidation = deriveInputValidation({
    hasError: hasEmailFormError,
    hasValue: Boolean(currentEmail?.length),
  });

  const emailHelperText = emailState.error?.message ?? emailErrorMessage ?? "";

  const authCodeHelperText = timer.isActive
    ? `인증번호 유효 시간 ${formatTime(timer.seconds)}`
    : "";

  return (
    <div className='flex flex-col items-start gap-(--semantic-spacing-24) self-stretch'>
      <Controller
        name='email'
        control={emailControl}
        defaultValue={defaultEmail}
        render={({ field }) => (
          <TextField.Button
            type='email'
            label='이메일'
            validation={emailValidation}
            helperText={emailHelperText}
            placeholder='이메일을 입력해주세요'
            value={field.value}
            onChange={field.onChange}
            button={
              <BlockButton.Basic
                size='md'
                variant='solid'
                hierarchy='primary'
                disabled={!formState.isValid}
                onClick={() => void handleSendEmailCode()}
              >
                인증번호 받기
              </BlockButton.Basic>
            }
          />
        )}
      />
      {hasSentCode && (
        <form className='self-stretch' onSubmit={handleVerifyCode}>
          <TextField.Button
            label='인증번호'
            helperText={authCodeHelperText}
            placeholder='인증번호를 입력해주세요'
            value={authCode}
            onChange={e => setAuthCode(e.target.value)}
            button={
              <BlockButton.Basic type='submit' size='md' variant='solid' hierarchy='primary'>
                인증하기
              </BlockButton.Basic>
            }
          />
        </form>
      )}
      {hasSentCode && (
        <LabelButton.Basic
          size='sm'
          hierarchy='secondary'
          suffixIcon='arrow-right-s-line'
          onClick={() => {
            if (jobFamily) {
              void navigate(`${PATH.applyGuide}/${jobFamily}?tab=faq&faq=faq-5`);
            }
          }}
        >
          인증번호를 받지 못하셨나요?
        </LabelButton.Basic>
      )}
    </div>
  );
}
