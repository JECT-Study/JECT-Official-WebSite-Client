import { BlockButton, LabelButton } from "@ject/jds";
import type { FallbackProps } from "react-error-boundary";
import { Outlet, useNavigate } from "react-router-dom";

import {
  AsyncBoundary,
  DefaultLoadingFallback,
} from "@/components/common/async-boundary/AsyncBoundary";
import { PATH } from "@/constants/path";

function ApplyLayout() {
  return (
    <div className='flex flex-1 flex-col items-center self-stretch pt-[calc(var(--semantic-spacing-64)+var(--semantic-margin-2xl))] pb-(--semantic-margin-2xl)'>
      <AsyncBoundary
        pendingFallback={<ApplyLoadingFallback />}
        rejectedFallback={ApplyErrorFallback}
      >
        <Outlet />
      </AsyncBoundary>
    </div>
  );
}

//Todo: Apply 로딩 fallback - 일단 공용이랑 동일하게 교체
function ApplyLoadingFallback() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <DefaultLoadingFallback />
      <p className='text-body-md-normal text-object-alternative-dark mt-4'>
        페이지를 불러오고 있습니다...
      </p>
    </div>
  );
}

//Todo: Apply 에러 fallback - 일단 공용이랑 동일하게 교체
function ApplyErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    void navigate(PATH.main);
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-6'>
      <div className='text-center'>
        <h2 className='text-title-lg-bold text-object-hero-dark'>문제가 발생했습니다</h2>
        <p className='text-body-md-normal text-object-alternative-dark mt-2'>
          {error.message || "잠시 후 다시 시도해주세요"}
        </p>
      </div>
      <div className='gap-md flex'>
        <BlockButton.Basic
          size='md'
          variant='solid'
          hierarchy='secondary'
          onClick={resetErrorBoundary}
        >
          다시 시도
        </BlockButton.Basic>
        <LabelButton.Basic size='md' hierarchy='tertiary' onClick={handleGoHome}>
          홈으로 돌아가기
        </LabelButton.Basic>
      </div>
    </div>
  );
}

export default ApplyLayout;
