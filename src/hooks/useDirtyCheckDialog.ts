import { useEffect } from 'react';
import { useBlocker } from 'react-router-dom';

import { useDialogActions } from '@/stores/dialogStore';

const useDirtyCheckDialog = (when: boolean) => {
  const { openDialog } = useDialogActions();
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    return when && currentLocation.pathname !== nextLocation.pathname;
  });

  useEffect(() => {
    if (blocker.state === 'blocked') {
      openDialog({
        type: 'dirtyCheck',
        onPrimaryBtnClick: () => blocker.proceed(),
        onSecondaryBtnClick: () => blocker.reset(),
      });
    }
  }, [blocker, openDialog]);
};

export default useDirtyCheckDialog;
