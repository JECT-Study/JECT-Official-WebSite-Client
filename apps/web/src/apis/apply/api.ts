import type { AxiosRequestConfig } from "axios";
import axios from "axios";

import {
  applicationStatusResponseSchema,
  memberMeResponseSchema,
  memberProfileInitialStatusResponseSchema,
  questionResponseSchema,
  answersResponseSchema,
  type ApplicationStatusResponseSchema,
  type MemberMeResponseSchema,
  type MemberProfileInitialStatusResponseSchema,
  type QuestionResponseSchema,
  type AnswersResponseSchema,
} from "./schemas";

import { API_ENDPOINT } from "@/constants/apiEndpoint";
import type {
  AnswersPayload,
  PresignedUrlPayload,
  PresignedUrlResponse,
} from "@/types/apis/application";
import type {
  EmailExistsParams,
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

  getStatus: (recruitId: number) => {
    const params = new URLSearchParams({ recruitId: String(recruitId) });
    return httpClient.get<ApplicationStatusResponseSchema>(
      `${API_ENDPOINT.applyStatus}?${params.toString()}`,
      applicationStatusResponseSchema,
    );
  },

  getMe: () =>
    httpClient.get<MemberMeResponseSchema>(API_ENDPOINT.memberMe, memberMeResponseSchema),

  updateProfile: (recruitId: number, data: MemberProfilePayload) => {
    const params = new URLSearchParams({ recruitId: String(recruitId) });
    return httpClient.post<null>(`${API_ENDPOINT.applyProfile}?${params.toString()}`, data);
  },

  getQuestions: (recruitId: number) => {
    const params = new URLSearchParams({ recruitId: String(recruitId) });
    return httpClient.get<QuestionResponseSchema>(
      `${API_ENDPOINT.question}?${params.toString()}`,
      questionResponseSchema,
    );
  },

  getDraft: (recruitId: number) => {
    const params = new URLSearchParams({ recruitId: String(recruitId) });
    return httpClient.get<AnswersResponseSchema>(
      `${API_ENDPOINT.draft}?${params.toString()}`,
      answersResponseSchema,
    );
  },

  saveDraft: (recruitId: number, answers: AnswersPayload) => {
    const params = new URLSearchParams({ recruitId: String(recruitId) });
    return httpClient.post<null>(`${API_ENDPOINT.draft}?${params.toString()}`, answers);
  },

  deleteDraft: (recruitId: number) => {
    const params = new URLSearchParams({ recruitId: String(recruitId) });
    return httpClient.delete<null>(`${API_ENDPOINT.draft}?${params.toString()}`);
  },

  submit: (recruitId: number, answers: AnswersPayload) => {
    const params = new URLSearchParams({ recruitId: String(recruitId) });
    return httpClient.post<null>(`${API_ENDPOINT.submitAnswer}?${params.toString()}`, answers);
  },

  checkEmailExists: ({ email, recruitId }: EmailExistsParams) => {
    const params = new URLSearchParams({ email, recruitId: String(recruitId) });
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
