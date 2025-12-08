import { captureException } from "@sentry/react";
import { type ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import { ErrorFallback } from "./ErrorFallback";

interface ErrorBoundaryProps {
  children: ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        captureException(error, {
          tags: { type: "ErrorBoundary" },
          extra: {
            componentStack: errorInfo.componentStack,
            errorInfo,
          },
        });
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
