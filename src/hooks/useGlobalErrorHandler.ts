import { PATH } from '@/constants/path';
import { ExternalAPIError, InternalAPIError, NetworkError } from '@/errors/APIError';
import router from '@/router';
import { useDialogActions } from '@/stores/dialogStore';
import { useToastActions } from '@/stores/toastStore';

export const useGlobalErrorHandler = () => {
  const { openDialog } = useDialogActions();
  const { addToast } = useToastActions();

  return (error: unknown) => {
    if (error instanceof InternalAPIError) {
      switch (error.status) {
        case 'G-10':
        case 'G-02':
          return void router.navigate(PATH.nonSpecificError);
        case 'NOT_FOUND_MEMBER':
        case 'PROJECT_NOT_FOUND':
        case 'QUESTION_NOT_FOUND':
        case 'RECRUIT_NOT_FOUND':
          return void router.navigate(PATH.notFoundError);
        case 'G-07':
          return openDialog({
            type: 'expiredSession',
            onPrimaryBtnClick: () => void router.navigate(PATH.applyVerify),
          });
        default:
          return;
      }
    } else if (error instanceof ExternalAPIError) {
      switch (error.status) {
        case 401:
          return openDialog({
            type: 'expiredSession',
            onPrimaryBtnClick: () => void router.navigate(PATH.applyVerify),
          });
        case 403:
        case 404:
          return void router.navigate(PATH.notFoundError);
        default:
          return void router.navigate(PATH.nonSpecificError);
      }
    } else if (error instanceof NetworkError) {
      return addToast('네트워크 상태가 불안정해요. 다시 시도해 주세요.', 'negative');
    }
  };
};
