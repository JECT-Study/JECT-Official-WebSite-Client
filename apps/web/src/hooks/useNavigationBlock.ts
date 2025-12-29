import { useCallback, useEffect, useRef, useState } from "react";
import { useBeforeUnload, useBlocker, useLocation } from "react-router-dom";
import type { BlockerFunction } from "react-router-dom";

import { PATH } from "@/constants/path";

// 이탈 시 다이얼로그를 표시해야 하는 단계 (작성 중인 내용이 있는 단계)
const STEPS_REQUIRING_BLOCK = ["지원자정보", "지원서작성"];

/**
 * 지원서 작성 페이지 이탈 차단 훅
 * - useBlocker: GNB, Sidebar 등에서 navigate() 호출 시 차단
 * - popstate: 브라우저 뒤로가기/앞으로가기 버튼 차단
 * - beforeunload: 브라우저 새로고침/탭 닫기 시 기본 confirm 표시
 */
export function useNavigationBlock() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isNavigatingRef = useRef(false);
  // 브라우저 뒤로가기 처리용 상태 (인스턴스별로 독립적으로 관리)
  const pendingNavigationRef = useRef<number | null>(null);

  const location = useLocation();

  const isApplyPage =
    location.pathname.startsWith(PATH.applyFunnel) ||
    location.pathname.startsWith(PATH.applyContinue);

  // 현재 URL에서 step 확인
  const searchParams = new URLSearchParams(location.search);
  const currentStep =
    searchParams.get("apply-funnel.step") || searchParams.get("continue-writing-funnel.step");
  const isBlockRequired = isApplyPage && STEPS_REQUIRING_BLOCK.includes(currentStep ?? "");

  // useBlocker: GNB, Sidebar 등에서 navigate() 호출 시 차단
  const blockerFunction: BlockerFunction = useCallback(
    ({ currentLocation, nextLocation }) => {
      if (currentLocation.pathname === nextLocation.pathname) {
        return false;
      }
      return isBlockRequired && !isNavigatingRef.current;
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

  // 브라우저 새로고침/탭 닫기 시 기본 confirm 표시
  useBeforeUnload(
    useCallback(
      (e) => {
        if (isBlockRequired) {
          e.preventDefault();
        }
      },
      [isBlockRequired],
    ),
  );

  // 브라우저 뒤로가기/앞으로가기 감지 (popstate)
  useEffect(() => {
    if (!isBlockRequired) return;

    // 현재 상태를 히스토리에 추가하여 뒤로가기 감지 가능하게 함
    const currentUrl = window.location.href;
    window.history.pushState({ blockNavigation: true }, "", currentUrl);

    const handlePopState = () => {
      if (isNavigatingRef.current) return;

      // 뒤로가기 감지 시 현재 URL을 다시 pushState로 복원하여 실제 이동을 막음
      window.history.pushState({ blockNavigation: true }, "", currentUrl);
      pendingNavigationRef.current = -2; // pushState로 추가된 엔트리 포함해서 2단계 뒤로
      setIsDialogOpen(true);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isBlockRequired]); // location 의존성 제거하여 pushState 중복 호출 방지

  // 네비게이션 완료 시 플래그 리셋 (setTimeout 대신 location 변경 감지)
  useEffect(() => {
    isNavigatingRef.current = false;
  }, [location.pathname]);

  const handleConfirm = useCallback(() => {
    setIsDialogOpen(false);
    isNavigatingRef.current = true;

    // blocker로 차단된 경우 (GNB, Sidebar 등)
    if (blocker.state === "blocked") {
      blocker.proceed?.();
    }
    // popstate로 차단된 경우 (브라우저 뒤로가기)
    else if (pendingNavigationRef.current !== null) {
      window.history.go(pendingNavigationRef.current);
      pendingNavigationRef.current = null;
    }
    // isNavigatingRef는 location.pathname 변경 감지 useEffect에서 리셋됨
  }, [blocker]);

  const handleCancel = useCallback(() => {
    setIsDialogOpen(false);

    if (blocker.state === "blocked") {
      blocker.reset?.();
    }
    pendingNavigationRef.current = null;
  }, [blocker]);

  return {
    isApplyPage,
    isBlockRequired,
    isDialogOpen,
    handleConfirm,
    handleCancel,
  };
}
