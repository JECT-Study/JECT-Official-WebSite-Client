import axios, { CancelToken } from 'axios';

import { API_ENDPOINT } from '@/constants/apiEndpoint';
import {
  AnswersPayload,
  AnswersResponse,
  JobFamily,
  PresignedUrlPayload,
  PresignedUrlResponse,
  QuestionResponse,
} from '@/types/apis/application';
import { ApiResponse } from '@/types/apis/response';
import { requestHandler } from '@/utils/httpClient';

export const getQuestions = async (jobFamily: JobFamily) => {
  const params = new URLSearchParams({ jobFamily });
  const url = `${API_ENDPOINT.question}?${params.toString()}`;
  return await requestHandler<QuestionResponse>('get', url);
};

export const putUploadFileToS3 = async (url: string, file: File, cancelToken: CancelToken) => {
  return axios.put<ApiResponse<PresignedUrlResponse>>(url, file, {
    headers: { 'Content-Type': file.type },
    cancelToken,
  });
};

export const postUploadPortfolio = async (files: PresignedUrlPayload) => {
  return await requestHandler<PresignedUrlResponse, PresignedUrlPayload>(
    'post',
    API_ENDPOINT.uploadPortfolio,
    files,
  );
};

export const postDraft = async (jobFamily: JobFamily, answers: AnswersPayload) => {
  const params = new URLSearchParams({ jobFamily });
  const url = `${API_ENDPOINT.draft}?${params.toString()}`;
  return await requestHandler<null, AnswersPayload>('post', url, answers);
};

export const getDraft = async () => {
  return await requestHandler<AnswersResponse>('get', API_ENDPOINT.draft);
};

export const deleteDraft = async () => {
  return await requestHandler<null>('delete', API_ENDPOINT.draft);
};

export const postSubmitAnswer = async (jobFamily: JobFamily, answers: AnswersPayload) => {
  const params = new URLSearchParams({ jobFamily });
  const url = `${API_ENDPOINT.draft}?${params.toString()}`;
  return await requestHandler<null, AnswersPayload>('post', url, answers);
};
