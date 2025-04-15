import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { PATH } from '@/constants/path';

interface RedirectIfSubmittedProps {
  children: ReactNode;
}

function RedirectIfSubmitted({ children }: RedirectIfSubmittedProps) {
  const isSubmitted = localStorage.getItem('applicationSubmit') === 'success';

  if (isSubmitted) {
    return <Navigate to={PATH.applyComplete} replace />;
  }

  return <>{children}</>;
}

export default RedirectIfSubmitted;
