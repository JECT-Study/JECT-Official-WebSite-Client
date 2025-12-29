import type { AxiosRequestConfig } from "axios";
import axios from "axios";

import {
  applicationStatusResponseSchema,
  memberProfileResponseSchema,
  memberProfileInitialStatusResponseSchema,
  questionResponseSchema,
  answersResponseSchema,
  type ApplicationStatusResponseSchema,
  type MemberProfileResponseSchema,
  type MemberProfileInitialStatusResponseSchema,
  type QuestionResponseSchema,
  type AnswersResponseSchema,
  type JobFamily,
} from "./schemas";

import { API_ENDPOINT } from "@/constants/apiEndpoint";
import type {
  AnswersPayload,
  PresignedUrlPayload,
  PresignedUrlResponse,
} from "@/types/apis/application";
import type {
  MemberProfilePayload,
  PinLoginPayload,
  RegisterMemberPayload,
  ResetPinPayload,
  VerificationEmailCodePayload,
  VerificationEmailCodeQueryParams,
  EmailAuthPayload,
} from "@/types/apis/apply";
import { httpClient } from "@/utils/httpClient";

export const applyApi = {
  getProfileInitialStatus: () =>
    httpClient.get<MemberProfileInitialStatusResponseSchema>(
      API_ENDPOINT.memberProfileInitialStatus,
      memberProfileInitialStatusResponseSchema,
    ),

  getStatus: (email: string) => {
    const params = new URLSearchParams({ email });
    return httpClient.get<ApplicationStatusResponseSchema>(
      `${API_ENDPOINT.applyStatus}?${params.toString()}`,
      applicationStatusResponseSchema,
    );
  },

  getProfile: () =>
    httpClient.get<MemberProfileResponseSchema>(
      API_ENDPOINT.memberProfile,
      memberProfileResponseSchema,
    ),

  updateProfile: (data: MemberProfilePayload) =>
    httpClient.post<null>(API_ENDPOINT.applyProfile, data),

  getQuestions: (jobFamily: JobFamily) => {
    const params = new URLSearchParams({ jobFamily });
    return httpClient.get<QuestionResponseSchema>(
      `${API_ENDPOINT.question}?${params.toString()}`,
      questionResponseSchema,
    );
  },

  getDraft: () => httpClient.get<AnswersResponseSchema>(API_ENDPOINT.draft, answersResponseSchema),

  saveDraft: (jobFamily: JobFamily, answers: AnswersPayload) => {
    const params = new URLSearchParams({ jobFamily });
    return httpClient.post<null>(`${API_ENDPOINT.draft}?${params.toString()}`, answers);
  },

  deleteDraft: () => httpClient.delete<null>(API_ENDPOINT.draft),

  submit: (jobFamily: JobFamily, answers: AnswersPayload) => {
    const params = new URLSearchParams({ jobFamily });
    return httpClient.post<null>(`${API_ENDPOINT.submitAnswer}?${params.toString()}`, answers);
  },

  checkEmailExists: (email: string) => {
    const params = new URLSearchParams({ email });
    return httpClient.get<boolean>(`${API_ENDPOINT.checkEmailExists}?${params.toString()}`);
  },

  sendAuthCode: ({ email, sendGroupCode }: EmailAuthPayload) => {
    const params = new URLSearchParams({ email, sendGroupCode });
    return httpClient.post<null>(`${API_ENDPOINT.sendEmailAuthCode}?${params.toString()}`);
  },

  verifyAuthCode: (
    data: VerificationEmailCodePayload,
    queryParams: VerificationEmailCodeQueryParams,
  ) => {
    const params = new URLSearchParams({ template: queryParams.template });
    return httpClient.post<{ token: string }>(
      `${API_ENDPOINT.verifyEmailCode}?${params.toString()}`,
      data,
    );
  },

  loginWithPin: (data: PinLoginPayload) =>
    httpClient.post<{ accessToken: string; refreshToken: string }>(API_ENDPOINT.pinLogin, data),

  registerMember: (data: RegisterMemberPayload) =>
    httpClient.post<boolean>(API_ENDPOINT.registerMember, data),

  resetPin: (data: ResetPinPayload) => httpClient.put<null>(API_ENDPOINT.resetPin, data),

  createPresignedUrls: (files: PresignedUrlPayload) =>
    httpClient.post<PresignedUrlResponse>(API_ENDPOINT.uploadPortfolio, files),

  uploadFileToS3: (url: string, file: File, config?: AxiosRequestConfig) =>
    axios.put(url, file, {
      headers: { "Content-Type": file.type },
      ...config,
    }),
} as const;
