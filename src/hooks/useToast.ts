import { ToastType, useToastActions } from '@/stores/toastStore';

const useToast = () => {
  const { addToast } = useToastActions();

  const toast = (option: { message: string; type?: ToastType }) => {
    addToast(option.message, option.type);
  };

  return { toast };
};

export default useToast;
