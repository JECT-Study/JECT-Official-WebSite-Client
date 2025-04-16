import { captureException } from '@sentry/react';

import { PATH } from '@/constants/path';
import { ExternalAPIError, InternalAPIError, NetworkError } from '@/errors/APIError';
import { externalApiErrorMapping, internalApiErrorMapping } from '@/errors/errorMappings';
import router from '@/router';
import { useDialogActions } from '@/stores/dialogStore';
import { useToastActions } from '@/stores/toastStore';

export const useGlobalErrorHandler = () => {
  const { openDialog } = useDialogActions();
  const { addToast } = useToastActions();

  return (error: unknown) => {
    if (error instanceof InternalAPIError) {
      if (error.status in internalApiErrorMapping) {
        return internalApiErrorMapping[error.status]({ openDialog });
      }

      captureException(error, {
        tags: { type: 'UnhandledInternalAPIError', status: error.status },
        extra: { message: error.message, name: error.name },
      });

      return;
    } else if (error instanceof ExternalAPIError) {
      if (error.status in externalApiErrorMapping) {
        return externalApiErrorMapping[error.status]();
      }

      captureException(error, {
        tags: { type: 'UnhandledExternalAPIError', status: error.status },
        extra: { message: error.message, name: error.name },
      });

      return void router.navigate(PATH.nonSpecificError);
    } else if (error instanceof NetworkError) {
      return addToast('네트워크 상태가 불안정해요. 다시 시도해 주세요.', 'negative');
    }

    captureException(error, {
      tags: { type: 'UnhandledUnknownError' },
      extra: {
        rawType: typeof error,
        value: error,
        ...(error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
              name: error.name,
            }
          : {}),
      },
    });

    return void router.navigate(PATH.nonSpecificError);
  };
};
