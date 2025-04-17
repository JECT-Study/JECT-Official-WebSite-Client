import * as Sentry from '@sentry/react';

/**
 * 에러 로깅을 무겁지 않은 정도로 처리하는 것을 의도하는 유틸리티 함수입니다.
 * 추가적인 데이터가 필요하다면 원하는 옵션 등을 넣으면 됩니다.
 */

export const logError = (
  error: unknown,
  operationName: string,
  extraData?: Record<string, any>,
) => {
  if (import.meta.env.MODE === 'development') {
    console.error(`[${operationName}]`, error);
  }

  if (import.meta.env.MODE !== 'development') {
    Sentry.captureException(error, {
      tags: { operation: operationName },
      extra: {
        ...extraData,
        ...(error instanceof Error
          ? {
              message: error.message,
              name: error.name,
            }
          : {}),
      },
    });
  }
};
