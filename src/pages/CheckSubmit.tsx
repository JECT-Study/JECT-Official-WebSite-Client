import { Navigate, Outlet } from 'react-router-dom';

import { PATH } from '@/constants/path';
import useCheckApplicationStatus from '@/hooks/useCheckApplicationStatus';

function CheckSubmit() {
  const { data: applicationStatus } = useCheckApplicationStatus();

  if (applicationStatus?.data) {
    return <Navigate to={PATH.main} />;
  }
  return <Outlet />;
}

export default CheckSubmit;
