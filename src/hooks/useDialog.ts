import { useState } from 'react';

const useDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  return { isDialogOpen, openDialog, closeDialog };
};

export default useDialog;
