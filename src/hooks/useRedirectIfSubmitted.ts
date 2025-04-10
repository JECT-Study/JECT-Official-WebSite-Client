import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATH } from '@/constants/path';

export const useRedirectIfSubmitted = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isSuccessSubmit = localStorage.getItem('applicationSubmit');

    if (isSuccessSubmit) void navigate(PATH.applyComplete);
  }, [navigate]);
};
