import './instrument';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { RouterProvider } from 'react-router-dom';

import { useGlobalErrorHandler } from './hooks/useGlobalErrorHandler';
import TempMobile from './pages/TempMobile';
import router from './router';

import { AmplitudeProvider } from '@/lib/amplitude';

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

  if (isMobile) {
    return <TempMobile />;
  }

  return (
    <AmplitudeProvider>
      <QueryClientProvider client={queryClient}>
        {import.meta.env.MODE !== 'production' && <ReactQueryDevtools />}
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AmplitudeProvider>
  );
}

export default App;
