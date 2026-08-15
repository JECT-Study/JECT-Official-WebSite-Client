import { z } from "zod";

import { jobFamilySchema } from "@/apis/apply/schemas";

export const recruitTypeSchema = z.enum([
  "SEMESTER",
  "MAKERS",
  "SUPPORTERS",
  "REGULAR",
  "REGULAR_WAITLIST",
  "BACKFILL",
  "MANUAL",
]);

export const recruitTypeDetailSchema = z.enum(["REGULAR", "NEW", "REFILL"]);

export const activeRecruitmentSchema = z.object({
  recruitId: z.number(),
  semesterId: z.number(),
  semesterName: z.string(),
  recruitType: recruitTypeSchema,
  recruitTypeDescription: z.string(),
  recruitTypeDetail: recruitTypeDetailSchema,
  recruitTypeDetailDescription: z.string(),
  jobFamily: jobFamilySchema,
  jobFamilyDescription: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export const activeRecruitmentsResponseSchema = z.object({
  recruitments: z.array(activeRecruitmentSchema),
});

export type ActiveRecruitmentsResponseSchema = z.infer<typeof activeRecruitmentsResponseSchema>;
export type ActiveRecruitment = z.infer<typeof activeRecruitmentSchema>;
export type RecruitType = z.infer<typeof recruitTypeSchema>;
export type RecruitTypeDetail = z.infer<typeof recruitTypeDetailSchema>;
