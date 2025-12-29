import { useState, useCallback } from "react";

/**
 * TagField의 상태 관리 Hook
 *
 * TagField와 TagFieldButton에서 공통으로 사용하는 상태 관리 로직입니다.
 * - 입력 값 상태
 * - IME 조합 상태
 * - 선택된 태그 ID 상태
 *
 * 비즈니스 로직은 포함하지 않으며, 순수하게 상태 관리만 담당합니다.
 *
 */
export const useTagFieldState = () => {
  const [inputValue, setInputValue] = useState("");

  const [isComposing, setIsComposing] = useState(false);

  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);

  /**
   * 입력 값 초기화
   */
  const clearInput = useCallback(() => {
    setInputValue("");
  }, []);

  /**
   * IME 조합 시작 핸들러
   */
  const handleCompositionStart = useCallback(() => {
    setIsComposing(true);
  }, []);

  /**
   * IME 조합 종료 핸들러
   */
  const handleCompositionEnd = useCallback(() => {
    setIsComposing(false);
  }, []);

  /**
   * 선택 상태 초기화
   */
  const clearSelection = useCallback(() => {
    setSelectedTagId(null);
  }, []);

  return {
    inputValue,
    setInputValue,
    clearInput,

    isComposing,
    setIsComposing,
    handleCompositionStart,
    handleCompositionEnd,

    selectedTagId,
    setSelectedTagId,
    clearSelection,
  };
};
