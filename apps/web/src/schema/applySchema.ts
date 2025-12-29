import { z } from "zod";

export const applyEmailSchema = z.object({
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "올바른 이메일 형식을 입력해주세요.",
    ),
});

export type ApplyEmailFormData = z.infer<typeof applyEmailSchema>;

export const applyAuthCodeSchema = z.object({
  authCode: z.string().min(1),
});

export type ApplyAuthCodeFormData = z.infer<typeof applyAuthCodeSchema>;

export const applyPinSchema = z.object({
  pin: z.string().regex(/^\d{6}$/, "올바르지 않은 PIN 형식입니다."),
});

export type ApplyPinFormData = z.infer<typeof applyPinSchema>;

const careerDetailsEnum = z.enum([
  "STUDENT",
  "EXPECTED_GRADUATE",
  "JOB_SEEKER",
  "BETWEEN_JOBS",
  "EMPLOYEE",
]);

const regionEnum = z.enum([
  "SEOUL",
  "GYEONGGI",
  "INCHEON",
  "BUSAN",
  "DAEGU",
  "DAEJEON",
  "GWANGJU",
  "ULSAN",
  "SEJONG",
  "GANGWON",
  "CHUNGBUK",
  "CHUNGNAM",
  "JEONBUK",
  "JEONNAM",
  "GYEONGBUK",
  "GYEONGNAM",
  "JEJU",
  "OVERSEAS",
]);

const experiencePeriodEnum = z.enum(["NONE", "ONE_TO_TWO", "THREE_TO_FOUR", "FIVE_PLUS"]);

const interestedDomainEnum = z.enum([
  "GAME",
  "EDUCATION",
  "MARKETING",
  "MOBILITY",
  "PRODUCTIVITY",
  "SOCIAL_NETWORK",
  "UTILITY",
  "E_COMMERCE",
  "COMMUNITY",
  "CONTENTS",
  "TRAVELTECH",
  "FASHION_BEAUTY",
  "FOODTECH",
  "PROPTECH",
  "FINTECH",
  "HEALTHCARE",
  "HR",
]);

export const applyApplicantInfoSchema = z.object({
  name: z
    .string()
    .min(1, "이름을 입력해주세요.")
    .max(5, "이름은 5자 이내로 작성해주세요.")
    .regex(/^[가-힣ㄱ-ㅎㅏ-ㅣ]+$/, "이름은 한글로 작성해주세요."),

  phoneNumber: z
    .string()
    .min(1, "휴대폰 번호를 입력해주세요.")
    .transform(val => val.replace(/[\s-]/g, ""))
    .refine(val => /^\d+$/.test(val), {
      message: "휴대폰 번호는 숫자만 입력해주세요.",
    })
    .refine(val => val.length <= 2 || val.startsWith("010"), {
      message: '"010"으로 시작하는 휴대폰 번호를 입력해주세요.',
    })
    .refine(val => val.length <= 11, {
      message: '"010"을 포함해 총 11자리까지만 입력해주세요.',
    }),

  careerDetails: careerDetailsEnum,

  region: regionEnum,

  experiencePeriod: experiencePeriodEnum.optional(),

  interestedDomains: z.array(interestedDomainEnum).min(1, "관심 도메인을 최소 1개 이상 선택해주세요."),
});

export type ApplyApplicantInfoFormData = z.infer<typeof applyApplicantInfoSchema>;
