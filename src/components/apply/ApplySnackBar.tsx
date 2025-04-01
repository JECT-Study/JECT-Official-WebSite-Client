import { useNavigate } from 'react-router-dom';

import SnackBar from '../common/snackbar/SnackBar';

import { PATH } from '@/constants/path';

interface ApplySnackBarProps {
  message: string;
  isMain?: boolean;
}

function ApplySnackBar({ message, isMain = false }: ApplySnackBarProps) {
  const navigate = useNavigate();

  const handleAction = () => {
    void navigate(PATH.apply);
  };

  return (
    <div
      className={`${isMain ? 'w-[33.5rem]' : 'w-[31.25rem]'} fixed inset-x-0 bottom-[7.875rem] left-1/2 z-50 -translate-x-1/2`}
    >
      <SnackBar message={message} buttonLabel='젝트 3기 지원하기' onAction={handleAction} />
    </div>
  );
}

export default ApplySnackBar;
