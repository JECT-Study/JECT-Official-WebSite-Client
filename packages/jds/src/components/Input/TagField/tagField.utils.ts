import type { Tag } from "./tagField.types";

/**
 * TagField의 비즈니스 로직을 처리하는 순수 함수 유틸리티
 *
 * 모든 함수는 순수 함수로 작성되어 있으며, React 의존성이 없습니다.
 * 테스트, 재사용, 디버깅이 용이합니다.
 */

/**
 * 태그 유효성 검증 결과
 */
export interface TagValidationResult {
  isValid: boolean;
  reason?: "empty" | "maxTags" | "duplicate";
}

/**
 * Backspace 키 동작 타입
 * - 'remove': 선택된 태그 제거
 * - 'select': 마지막 태그 선택
 * - 'none': 아무 동작 안 함
 */
export type BackspaceAction = "remove" | "select" | "none";

/**
 * TagField 유틸리티 함수 모음
 */
export const TagFieldUtils = {
  /**
   * 태그 유효성 검증
   *
   * @param value - 검증할 태그 값
   * @param tags - 현재 태그 목록
   * @param maxTags - 최대 태그 개수
   * @param allowDuplicates - 중복 허용 여부
   * @returns 검증 결과 및 실패 사유
   *
   */
  validateTag: (
    value: string,
    tags: Tag[],
    maxTags?: number,
    allowDuplicates: boolean = false,
  ): TagValidationResult => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return { isValid: false, reason: "empty" };
    }

    if (maxTags !== undefined && tags.length >= maxTags) {
      return { isValid: false, reason: "maxTags" };
    }

    if (!allowDuplicates && tags.some(tag => tag.label === trimmedValue)) {
      return { isValid: false, reason: "duplicate" };
    }

    return { isValid: true };
  },

  /**
   * 새로운 태그 생성
   *
   * @param label - 태그 레이블
   * @returns 생성된 태그 객체
   *
   */
  createTag: (label: string): Tag => ({
    id: crypto.randomUUID(),
    label: label.trim(),
  }),

  /**
   * 태그 추가
   *
   * 유효성 검증 후 새 태그를 추가한 배열을 반환합니다.
   * 유효하지 않은 경우 원본 배열을 그대로 반환합니다.
   *
   * @param tags - 현재 태그 목록
   * @param newLabel - 추가할 태그 레이블
   * @param maxTags - 최대 태그 개수
   * @param allowDuplicates - 중복 허용 여부
   * @returns 새로운 태그 배열
   *
   */
  addTag: (
    tags: Tag[],
    newLabel: string,
    maxTags?: number,
    allowDuplicates: boolean = false,
  ): Tag[] => {
    const validation = TagFieldUtils.validateTag(newLabel, tags, maxTags, allowDuplicates);

    if (!validation.isValid) {
      return tags;
    }

    const newTag = TagFieldUtils.createTag(newLabel);
    return [...tags, newTag];
  },

  /**
   * 태그 제거
   *
   * @param tags - 현재 태그 목록
   * @param tagId - 제거할 태그 ID
   * @returns 태그가 제거된 새 배열
   *
   */
  removeTag: (tags: Tag[], tagId: string): Tag[] => {
    return tags.filter(tag => tag.id !== tagId);
  },

  /**
   * 키 이벤트 처리 여부 결정
   *
   * IME 조합 중이거나 처리할 키가 아닌 경우 false를 반환합니다.
   *
   * @param key - 키 이름
   * @param isComposing - IME 조합 중 여부
   * @returns 이벤트 처리 여부
   *
   */
  shouldHandleKeyEvent: (key: string, isComposing: boolean): boolean => {
    if (isComposing) return false;
    return ["Enter", "Backspace"].includes(key);
  },

  /**
   * Backspace 키 동작 결정
   *
   * 입력 값, 태그 목록, 선택 상태를 기반으로 Backspace 키의 동작을 결정합니다.
   * - 입력 값이 있거나 태그가 없으면 'none'
   * - 마지막 태그가 이미 선택되어 있으면 'remove'
   * - 그 외의 경우 'select'
   *
   * @param inputValue - 현재 입력 값
   * @param tags - 현재 태그 목록
   * @param selectedTagId - 선택된 태그 ID
   * @returns Backspace 동작 타입
   *
   */
  getBackspaceAction: (
    inputValue: string,
    tags: Tag[],
    selectedTagId: string | null,
  ): BackspaceAction => {
    if (inputValue || tags.length === 0) {
      return "none";
    }

    const lastTag = tags[tags.length - 1];
    if (selectedTagId === lastTag.id) {
      return "remove";
    }

    return "select";
  },

  /**
   * 마지막 태그 ID 가져오기
   *
   * @param tags - 태그 목록
   * @returns 마지막 태그 ID 또는 null
   *
   */
  getLastTagId: (tags: Tag[]): string | null => {
    if (tags.length === 0) return null;
    return tags[tags.length - 1].id;
  },
};
