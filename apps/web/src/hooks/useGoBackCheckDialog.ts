import { useEffect } from "react";
import { NavigationType, useBlocker } from "react-router-dom";

import { useDialogActions } from "@/stores/dialogStore";

const useGoBackCheckDialog = (when: boolean) => {
  const { openDialog } = useDialogActions();
  const blocker = useBlocker(({ historyAction }) => {
    return when && historyAction === NavigationType.Pop;
  });

  useEffect(() => {
    if (blocker.state !== "blocked") return;

    openDialog({
      type: "dirtyCheck",
      onPrimaryBtnClick: () => blocker.proceed(),
      onSecondaryBtnClick: () => blocker.reset(),
    });
  }, [blocker, openDialog]);
};

export default useGoBackCheckDialog;
