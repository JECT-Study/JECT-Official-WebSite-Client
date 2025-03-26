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
