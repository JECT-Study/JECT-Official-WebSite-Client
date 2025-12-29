import { useCallback, useEffect, useState } from "react";
import { useBlocker, useLocation } from "react-router-dom";
import type { BlockerFunction } from "react-router-dom";

import { PATH } from "@/constants/path";

// 이탈 시 다이얼로그를 표시해야 하는 단계 (작성 중인 내용이 있는 단계)
const STEPS_REQUIRING_BLOCK = ["지원자정보", "지원서작성"];

/**
 * 지원서 작성 페이지 이탈 차단 훅
 */
export function useNavigationBlock() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const location = useLocation();

  const isApplyPage =
    location.pathname.startsWith(PATH.applyFunnel) ||
    location.pathname.startsWith(PATH.applyContinue);

  // 현재 URL에서 step 확인
  const searchParams = new URLSearchParams(location.search);
  const currentStep =
    searchParams.get("apply-funnel.step") || searchParams.get("continue-writing-funnel.step");
  const isBlockRequired = isApplyPage && STEPS_REQUIRING_BLOCK.includes(currentStep ?? "");

  // useBlocker: navigate() 호출 시 차단
  const blockerFunction: BlockerFunction = useCallback(
    ({ currentLocation, nextLocation }) => {
      // 같은 페이지면 차단하지 않음
      if (currentLocation.pathname === nextLocation.pathname) {
        return false;
      }
      return isBlockRequired;
    },
    [isBlockRequired],
  );

  const blocker = useBlocker(blockerFunction);

  // blocker 상태 변경 시 다이얼로그 표시
  useEffect(() => {
    if (blocker.state === "blocked") {
      setIsDialogOpen(true);
    }
  }, [blocker.state]);

  const handleConfirm = useCallback(() => {
    setIsDialogOpen(false);
    blocker.proceed?.();
  }, [blocker]);

  const handleCancel = useCallback(() => {
    setIsDialogOpen(false);
    blocker.reset?.();
  }, [blocker]);

  return {
    isApplyPage,
    isBlockRequired,
    isDialogOpen,
    handleConfirm,
    handleCancel,
  };
}
