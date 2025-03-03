import { useState } from 'react';

const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  const openDialog = () => {
    setIsOpen(true);
  };

  return { isOpen, openDialog, closeDialog };
};

export default useDialog;
