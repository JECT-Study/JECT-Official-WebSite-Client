import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import { useGlobalQueryErrorHandler } from './hooks/useGlobalQueryErrorHandler';
import router from './router';

function App() {
  const handleGlobalError = useGlobalQueryErrorHandler();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: handleGlobalError,
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.MODE !== 'production' && <ReactQueryDevtools />}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
