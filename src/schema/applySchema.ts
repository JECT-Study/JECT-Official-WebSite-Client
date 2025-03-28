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
    .transform(val => val.trim())
    .refine(val => val === '' || val.length <= 5, {
      message: '이름은 5자 이내로 작성해주세요.',
    })
    .refine(val => val === '' || /^[가-힣ㄱ-ㅎㅏ-ㅣ]+$/.test(val), {
      message: '이름은 한글로 작성해주세요.',
    }),

  phoneNumber: z
    .string()
    .transform(val => val.replace(/[\s-]/g, ''))
    .refine(val => val === '' || val.startsWith('0'), {
      message: '휴대폰 번호는 0으로 시작해야 합니다.',
    })
    .refine(val => val === '' || val.length <= 2 || val.startsWith('010'), {
      message: '"010"으로 시작하는 휴대폰 번호를 입력해주세요.',
    })
    .refine(val => val === '' || val.length <= 11, {
      message: '"010"을 포함해 총 11자리까지만 입력해주세요.',
    })
    .refine(val => val === '' || val.length !== 11 || /^\d{11}$/.test(val), {
      message: '휴대폰 번호는 숫자만 입력해주세요.',
    }),
});

export type ApplyApplicantInfoFormData = z.infer<typeof applyApplicantInfoSchema>;
