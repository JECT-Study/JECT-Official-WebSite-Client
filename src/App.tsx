import './instrument';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { RouterProvider } from 'react-router-dom';

import { disabledPage, PATH } from './constants/path';
import { useGlobalErrorHandler } from './hooks/useGlobalErrorHandler';
import useRedirectMaintenance from './hooks/useRedirectMaintenance';
import TempMobile from './pages/TempMobile';
import router from './router';

function App() {
  const handleGlobalError = useGlobalErrorHandler();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: handleGlobalError,
        }),
        mutationCache: new MutationCache({
          onError: handleGlobalError,
        }),
      }),
  );

  useRedirectMaintenance(5, 7, PATH.maintenance);

  if (isMobile) {
    return <TempMobile />;
  }

  if (disabledPage.includes(window.location.pathname)) {
    return void router.navigate(PATH.apply);
  }

  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.MODE !== 'production' && <ReactQueryDevtools />}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
