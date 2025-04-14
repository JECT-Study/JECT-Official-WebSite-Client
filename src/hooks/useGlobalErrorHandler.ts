import { PATH } from '@/constants/path';
import { ExternalAPIError, InternalAPIError, NetworkError } from '@/errors/APIError';
import router from '@/router';
import { OpenDialogOption, useDialogActions } from '@/stores/dialogStore';
import { useToastActions } from '@/stores/toastStore';

const internalApiErrorMapping: Record<
  string,
  (handlers: { openDialog: (option: OpenDialogOption) => void }) => void
> = {
  'G-10': () => void router.navigate(PATH.nonSpecificError),
  'G-07': ({ openDialog }) =>
    openDialog({
      type: 'expiredSession',
      onPrimaryBtnClick: () => void router.navigate(PATH.applyVerify),
    }),
  NOT_FOUND_MEMBER: () => void router.navigate(PATH.notFoundError),
  PROJECT_NOT_FOUND: () => void router.navigate(PATH.notFoundError),
  QUESTION_NOT_FOUND: () => void router.navigate(PATH.notFoundError),
  RECRUIT_NOT_FOUND: () => void router.navigate(PATH.notFoundError),
};

const externalApiErrorMapping: Record<number, () => void> = {
  403: () => void router.navigate(PATH.notFoundError),
  404: () => void router.navigate(PATH.notFoundError),
};

export const useGlobalErrorHandler = () => {
  const { openDialog } = useDialogActions();
  const { addToast } = useToastActions();

  return (error: unknown) => {
    if (error instanceof InternalAPIError) {
      if (error.status in internalApiErrorMapping) {
        return internalApiErrorMapping[error.status]({ openDialog });
      }

      return;
    } else if (error instanceof ExternalAPIError) {
      if (error.status in externalApiErrorMapping) {
        return externalApiErrorMapping[error.status]();
      }

      return void router.navigate(PATH.nonSpecificError);
    } else if (error instanceof NetworkError) {
      return addToast('네트워크 상태가 불안정해요. 다시 시도해 주세요.', 'negative');
    }
  };
};
