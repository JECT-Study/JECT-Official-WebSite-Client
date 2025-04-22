import * as Sentry from '@sentry/react';
import axios from 'axios';
import React from 'react';
import {
  createBrowserRouter,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom';

import { InternalAPIError, NetworkError } from '@/errors/APIError';
import { ApiResponse } from '@/types/apis/response';

export const IGNORED_ERROR_STATUSES = [
  // 사용자 입력 시 일부 속성이 누락된 경우
  'G-01',
  'G-12',
  'G-13',
  'G-14',
  'INVALID_EXTENSION',

  // 인증 및 인가 관련
  'G-06',
  'G-07',
  'G-08',
  'G-09',
  'INVALID_AUTH_CODE',
  'NOT_FOUND_AUTH_CODE',
  'INVALID_REFRESH_TOKEN',
  'EXPIRED_REFRESH_TOKEN',
  'INVALID_CREDENTIALS',

  // 데이터가 DB에 없는 경우
  'G-02',
  'G-04',
  'NOT_FOUND_MEMBER',
  'PROJECT_NOT_FOUND',
  'QUESTION_NOT_FOUND',
  'RECRUIT_NOT_FOUND',
  'TEMP_APPLICATION_NOT_FOUND',

  // 허용되지 않는 액션
  'G-03',

  // 리소스 중복
  'ALREADY_EXIST_MEMBER',

  // 모집 기간 만료
  'G-11',
];

export const CRITICAL_ERROR_STATUSES = ['G-10', 'G-05'];

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.reactRouterV7BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
  tracesSampleRate: 0.1,
  sampleRate: 0.1,

  beforeSend: (event, hint) => {
    const original = hint?.originalException;

    if (original instanceof InternalAPIError) {
      const status = String(original.status);
      if (IGNORED_ERROR_STATUSES.includes(status)) return null;
      if (CRITICAL_ERROR_STATUSES.includes(status)) return event;
      return null;
    }

    if (axios.isAxiosError(original) && typeof original.response?.data === 'object') {
      const apiStatus = String((original.response.data as ApiResponse<unknown>).status);
      if (IGNORED_ERROR_STATUSES.includes(apiStatus)) return null;
      if (CRITICAL_ERROR_STATUSES.includes(apiStatus)) return event;
      return null;
    }

    if (original instanceof NetworkError && navigator.onLine) {
      return null;
    }

    return event;
  },
  maxBreadcrumbs: 15,
  enabled: !import.meta.env.DEV,
});

export const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouterV7(createBrowserRouter);
