import { captureException } from "@sentry/react";
import { Suspense, type ReactNode, type ComponentType } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

interface AsyncBoundaryProps {
  children: ReactNode;
  pendingFallback: ReactNode;
  rejectedFallback: ComponentType<FallbackProps>;
  onError?: (error: Error, info: React.ErrorInfo) => void;
  onReset?: () => void;
}

export function AsyncBoundary({
  children,
  pendingFallback,
  rejectedFallback: RejectedFallback,
  onError,
  onReset,
}: AsyncBoundaryProps) {
  const handleError = (error: Error, info: React.ErrorInfo) => {
    // Sentry에 에러 보고
    captureException(error, {
      tags: { type: "AsyncBoundary" },
      extra: {
        componentStack: info.componentStack,
      },
    });

    // 추가 에러 처리
    onError?.(error, info);
  };

  return (
    <ErrorBoundary FallbackComponent={RejectedFallback} onError={handleError} onReset={onReset}>
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}

//ToDo: 기본 에러 Fallback - 공용 에러와 동일하게 설정해도 됨
export function DefaultErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className='flex flex-col items-center justify-center gap-4 p-8'>
      <div className='text-center'>
        <h3 className='text-lg font-semibold text-object-hero-dark'>문제가 발생했습니다</h3>
        <p className='mt-2 text-sm text-object-alternative-dark'>
          {error.message || "잠시 후 다시 시도해주세요"}
        </p>
      </div>
      <button
        onClick={resetErrorBoundary}
        className='rounded-lg bg-accent-hero-dark px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hero-dark/90'
      >
        다시 시도
      </button>
    </div>
  );
}

//Todo: 기본 로딩 Falback - 기본과 동일하게
export function DefaultLoadingFallback() {
  return (
    <div className='flex items-center justify-center p-8'>
      <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-accent-hero-dark' />
    </div>
  );
}
