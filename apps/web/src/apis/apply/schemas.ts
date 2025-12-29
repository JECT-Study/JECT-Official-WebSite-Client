import { z } from "zod";

export const applicationStatusSchema = z.enum([
  "NO_APPLICATION",
  "JOINED",
  "TEMP_SAVED",
  "SUBMITTED",
]);

export const applicationStatusResponseSchema = z.object({
  status: applicationStatusSchema,
});

export type ApplicationStatusResponseSchema = z.infer<typeof applicationStatusResponseSchema>;

export const memberProfileInitialStatusResponseSchema = z.boolean();

export type MemberProfileInitialStatusResponseSchema = z.infer<
  typeof memberProfileInitialStatusResponseSchema
>;

export const careerDetailsSchema = z.enum([
  "STUDENT",
  "EXPECTED_GRADUATE",
  "JOB_SEEKER",
  "BETWEEN_JOBS",
  "EMPLOYEE",
]);

export const regionSchema = z.enum([
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

export const experiencePeriodSchema = z.enum(["NONE", "ONE_TO_TWO", "THREE_TO_FOUR", "FIVE_PLUS"]);

export const interestedDomainSchema = z.enum([
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

export const memberProfileResponseSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  careerDetails: careerDetailsSchema,
  region: regionSchema,
  experiencePeriod: experiencePeriodSchema,
  interestedDomains: z.array(interestedDomainSchema),
});

export type MemberProfileResponseSchema = z.infer<typeof memberProfileResponseSchema>;

export const questionInputTypeSchema = z.enum(["TEXT", "URL", "FILE", "SELECT"]);

export const questionSchema = z.object({
  id: z.number(),
  sequence: z.number(),
  inputType: questionInputTypeSchema,
  isRequired: z.boolean(),
  title: z.string(),
  label: z.string(),
  selectOptions: z.array(z.string()).nullable(),
  inputHint: z.string(),
  maxTextLength: z.number().nullable(),
  maxFileSize: z.number().nullable(),
});

export const questionResponseSchema = z.object({
  questionResponses: z.array(questionSchema),
});

export type QuestionResponseSchema = z.infer<typeof questionResponseSchema>;

export const portfolioResponseSchema = z.object({
  fileUrl: z.string(),
  fileName: z.string(),
  fileSize: z.string(),
  sequence: z.string(),
});

export const jobFamilySchema = z.enum(["PM", "PD", "FE", "BE"]);

export const answersResponseSchema = z.object({
  jobFamily: jobFamilySchema.optional(),
  answers: z.record(z.string(), z.string()),
  portfolios: z.array(portfolioResponseSchema),
});

export type AnswersResponseSchema = z.infer<typeof answersResponseSchema>;

export type JobFamily = z.infer<typeof jobFamilySchema>;
export type Question = z.infer<typeof questionSchema>;
export type QuestionInputType = z.infer<typeof questionInputTypeSchema>;
export type PortfolioResponse = z.infer<typeof portfolioResponseSchema>;
export type ApplicationStatus = z.infer<typeof applicationStatusSchema>;
