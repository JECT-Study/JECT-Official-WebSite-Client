import "./instrument";
import "./utils/apiTest";

import { JDSThemeProvider } from "@ject/jds/theme";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense, useState } from "react";
import { isMobile } from "react-device-detect";
import { RouterProvider } from "react-router-dom";

import { ErrorBoundary } from "./components/app/ErrorBoundary";
import { LoadingFallback } from "./components/app/LoadingFallback";
import { disabledPage, PATH } from "./constants/path";
import { useGlobalErrorHandler } from "./hooks/useGlobalErrorHandler";
import TempMobile from "./pages/TempMobile";
import router from "./router";

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

  if (disabledPage.includes(window.location.pathname)) {
    return void router.navigate(PATH.apply);
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        {import.meta.env.MODE !== "production" && <ReactQueryDevtools />}
        <JDSThemeProvider>
          <Suspense fallback={<LoadingFallback />}>
            <RouterProvider router={router} />
          </Suspense>
        </JDSThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
