import { useEffect } from 'react';
import { useBlocker } from 'react-router-dom';

import { useDialogActions } from '@/stores/dialogStore';

const useLeaveConfirmDialog = (when: boolean) => {
  const blocker = useBlocker(when);
  const { openDialog } = useDialogActions();

  useEffect(() => {
    if (blocker.state === 'blocked') {
      openDialog({
        type: 'leaveConfirm',
        onPrimaryBtnClick: () => blocker.proceed(),
        onSecondaryBtnClick: () => blocker.reset(),
      });
    }
  }, [blocker, openDialog]);
};

export default useLeaveConfirmDialog;
