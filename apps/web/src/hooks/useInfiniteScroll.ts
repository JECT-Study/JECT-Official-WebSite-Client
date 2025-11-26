import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
  threshold?: number;
}

/**
 * 무한 스크롤을 위한 커스텀 훅
 * @param hasNextPage 다음 페이지 존재 여부
 * @param isFetchingNextPage 다음 페이지 로딩 중 여부
 * @param fetchNextPage 다음 페이지 불러오는 함수
 * @param threshold 교차 지점 비율 (0~1)
 * @returns ref 요소
 */
export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold = 0.1,
}: UseInfiniteScrollProps) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          void fetchNextPage().catch(error => {
            console.error("다음 페이지 불러오기 실패:", error);
          });
        }
      },
      { threshold },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, threshold]);

  return observerTarget;
};
