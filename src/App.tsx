import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import routerList from './router';

const router = createBrowserRouter(routerList);

function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.MODE !== 'production' && <ReactQueryDevtools />}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
