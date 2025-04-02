import { useNavigate } from 'react-router-dom';

import SnackBar from '../common/snackbar/SnackBar';

import { PATH } from '@/constants/path';

interface ApplySnackBarProps {
  message: string;
  width?: string;
}

function ApplySnackBar({ message, width = '' }: ApplySnackBarProps) {
  const navigate = useNavigate();

  const handleAction = () => {
    void navigate(PATH.apply);
  };

  return (
    <div className={`${width} fixed inset-x-0 bottom-[3rem] left-1/2 z-50 -translate-x-1/2`}>
      <SnackBar message={message} buttonLabel='젝트 3기 지원하기' onAction={handleAction} />
    </div>
  );
}

export default ApplySnackBar;
