import { captureException } from "@sentry/react";
import { AxiosError } from "axios";
import { ZodError } from "zod";

import { PATH } from "@/constants/path";
import { ExternalAPIError, InternalAPIError, NetworkError } from "@/errors/APIError";
import { externalApiErrorMapping, internalApiErrorMapping } from "@/errors/errorMappings";
import router from "@/router";
import { useDialogActions } from "@/stores/dialogStore";
import { useToastActions } from "@/stores/toastStore";
import type { ApiResponse } from "@/types/apis/response";

export const useGlobalErrorHandler = () => {
  const { openDialog } = useDialogActions();
  const { addToast } = useToastActions();

  return (error: unknown) => {
    //TODO: 서버에서 비즈니스 에러를 HTTP 400/500으로 반환하도록 수정 필요
    if (error instanceof AxiosError && error.response) {
      const responseData = error.response.data as ApiResponse<unknown>;

      if (
        responseData?.status &&
        responseData.status !== "SUCCESS" &&
        responseData.status !== "TEMP_APPLICATION_NOT_FOUND"
      ) {
        const message = (responseData.data as string) || `API 에러: ${responseData.status}`;
        const internalError = new InternalAPIError(
          message,
          responseData.status,
          error.config?.url || "",
        );

        if (responseData.status in internalApiErrorMapping) {
          return internalApiErrorMapping[responseData.status]({ openDialog });
        }

        captureException(internalError, {
          tags: { type: "BusinessLogicError", status: responseData.status },
          extra: { message, url: error.config?.url },
        });

        return;
      }

      const status = error.response.status;
      if (status in externalApiErrorMapping) {
        return externalApiErrorMapping[status]();
      }

      captureException(error, {
        tags: { type: "HTTPError", status },
        extra: { message: error.message, url: error.config?.url },
      });

      return void router.navigate(PATH.nonSpecificError);
    }

    if (error instanceof ZodError) {
      captureException(error, {
        tags: { type: "ZodValidationError" },
        extra: { errors: error.errors },
      });

      return;
    }

    if (error instanceof InternalAPIError) {
      if (error.status in internalApiErrorMapping) {
        return internalApiErrorMapping[error.status]({ openDialog });
      }

      captureException(error, {
        tags: { type: "UnhandledInternalAPIError", status: error.status },
        extra: { message: error.message, name: error.name, url: error.url },
      });

      return;
    } else if (error instanceof ExternalAPIError) {
      if (error.status in externalApiErrorMapping) {
        return externalApiErrorMapping[error.status]();
      }

      captureException(error, {
        tags: { type: "UnhandledExternalAPIError", status: error.status },
        extra: { message: error.message, name: error.name, url: error.url },
      });

      return void router.navigate(PATH.nonSpecificError);
    } else if (error instanceof NetworkError) {
      return addToast("네트워크 상태가 불안정해요. 다시 시도해 주세요.", "negative");
    }

    captureException(error, {
      tags: { type: "UnhandledUnknownError" },
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
