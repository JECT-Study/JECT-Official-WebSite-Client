import { z } from 'zod';

export const applyEmailSchema = z.object({
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      '올바른 이메일 형식을 입력해주세요.',
    ),
});

export type ApplyEmailFormData = z.infer<typeof applyEmailSchema>;

export const applyVerificationEmailCodeSchema = z.object({
  verificationEmailCode: z.string().regex(/^\d{6}$/, '인증번호는 6자리 숫자여야 합니다.'),
});

export type ApplyVerificationEmailCodeFormData = z.infer<typeof applyVerificationEmailCodeSchema>;

export const applyPinSchema = z.object({
  pin: z.string().regex(/^\d{6}$/, 'PIN은 6자리 숫자여야 합니다.'),
});

export type ApplyPinFormData = z.infer<typeof applyPinSchema>;

export const applyApplicantInfoSchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요.')
    .max(5, '이름은 5자 이내로 작성해주세요.')
    .regex(/^[가-힣ㄱ-ㅎㅏ-ㅣ]+$/, '이름은 한글로 작성해주세요.'),

  phoneNumber: z
    .string()
    .min(1, '휴대폰 번호를 입력해주세요.')
    .transform(val => val.replace(/[\s-]/g, ''))
    .refine(val => val.length <= 2 || val.startsWith('010'), {
      message: '"010"으로 시작하는 휴대폰 번호를 입력해주세요.',
    })
    .refine(val => val.length <= 11, {
      message: '"010"을 포함해 총 11자리까지만 입력해주세요.',
    }),
});

export type ApplyApplicantInfoFormData = z.infer<typeof applyApplicantInfoSchema>;
