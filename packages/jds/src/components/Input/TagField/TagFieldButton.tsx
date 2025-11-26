import {
  forwardRef,
  useId,
  useCallback,
  type KeyboardEvent,
  type ChangeEvent,
  type MouseEvent,
} from "react";

import {
  StyledFieldContainer,
  StyledLabelContainer,
  StyledFieldLabel,
  StyledInputColumn,
  StyledHelperText,
  StyledTagInputWrapper,
  StyledTagContainer,
  StyledTagWrapper,
  StyledTagInput,
  StyledInputRow,
} from "./tagField.styles";
import type { TagFieldButtonProps } from "./tagField.types";
import { ContentBadge } from "../../Badge";
import { Icon } from "../../Icon";
import { getInteractionStates } from "../input.types";
import { TagFieldUtils } from "./tagField.utils";
import { useTagFieldState } from "./useTagFieldState";

export const TagFieldButton = forwardRef<HTMLInputElement, TagFieldButtonProps>(
  (
    {
      style = "outlined",
      layout = "vertical",
      validation = "none",
      interaction = "enabled",
      label,
      labelIcon,
      helperText,
      button,
      tags,
      onTagsChange,
      maxTags,
      allowDuplicates = false,
      placeholder = "태그를 입력하세요",
      ...restProps
    },
    ref,
  ) => {
    const inputId = useId();
    const { isDisabled, isReadOnly, isInteractive } = getInteractionStates(interaction);
    const hasTag = tags.length > 0;

    const {
      inputValue,
      setInputValue,
      clearInput,
      isComposing,
      handleCompositionStart,
      handleCompositionEnd,
      selectedTagId,
      setSelectedTagId,
      clearSelection,
    } = useTagFieldState();

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (!TagFieldUtils.shouldHandleKeyEvent(e.key, isComposing || e.nativeEvent.isComposing)) {
          return;
        }

        if (e.key === "Enter") {
          e.preventDefault();
          const newTags = TagFieldUtils.addTag(tags, inputValue, maxTags, allowDuplicates);

          if (newTags !== tags) {
            onTagsChange(newTags);
            clearInput();
            clearSelection();
          }
          return;
        }

        if (e.key === "Backspace") {
          e.preventDefault();
          const action = TagFieldUtils.getBackspaceAction(inputValue, tags, selectedTagId);

          if (action === "remove") {
            const lastTagId = TagFieldUtils.getLastTagId(tags);
            if (lastTagId) {
              onTagsChange(TagFieldUtils.removeTag(tags, lastTagId));
              clearSelection();
            }
          } else if (action === "select") {
            const lastTagId = TagFieldUtils.getLastTagId(tags);
            if (lastTagId) {
              setSelectedTagId(lastTagId);
            }
          }
          return;
        }

        if (selectedTagId) {
          clearSelection();
        }
      },
      [
        isComposing,
        inputValue,
        tags,
        selectedTagId,
        maxTags,
        allowDuplicates,
        onTagsChange,
        clearInput,
        clearSelection,
        setSelectedTagId,
      ],
    );

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (selectedTagId) {
          clearSelection();
        }
      },
      [selectedTagId, clearSelection, setInputValue],
    );

    const handleWrapperClick = useCallback(() => {
      if (ref && typeof ref !== "function" && ref.current) {
        ref.current.focus();
      }
    }, [ref]);

    const handleTagClick = useCallback(
      (e: MouseEvent, tagId: string) => {
        e.stopPropagation();
        onTagsChange(TagFieldUtils.removeTag(tags, tagId));
      },
      [tags, onTagsChange],
    );

    return (
      <StyledFieldContainer $layout={layout}>
        {label && (
          <StyledLabelContainer $layout={layout}>
            <StyledFieldLabel
              as="label"
              htmlFor={inputId}
              size="sm"
              weight="normal"
              $disabled={isDisabled}
              $readOnly={isReadOnly}
              $layout={layout}
            >
              {label}
            </StyledFieldLabel>
            {labelIcon && <Icon name={labelIcon} size="2xs" />}
          </StyledLabelContainer>
        )}

        <StyledInputColumn>
          <StyledInputRow $style={style} $layout={layout}>
            <StyledTagInputWrapper
              $style={style}
              $validation={validation}
              $disabled={isDisabled}
              $readOnly={isReadOnly}
              onClick={handleWrapperClick}
            >
              <StyledTagContainer $hasTag={hasTag}>
                {tags.map(tag => (
                  <StyledTagWrapper
                    key={tag.id}
                    $isSelected={selectedTagId === tag.id}
                    $isInteractive={isInteractive}
                    onClick={isInteractive ? e => handleTagClick(e, tag.id) : undefined}
                  >
                    <ContentBadge.Basic
                      size="xs"
                      hierarchy="secondary"
                      badgeStyle="alpha"
                      withIcon={isInteractive}
                    >
                      {tag.label}
                    </ContentBadge.Basic>
                  </StyledTagWrapper>
                ))}
              </StyledTagContainer>
              <StyledTagInput
                ref={ref}
                id={inputId}
                $disabled={isDisabled}
                $readOnly={isReadOnly}
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                disabled={isDisabled}
                readOnly={isReadOnly}
                placeholder={placeholder}
                {...restProps}
              />
            </StyledTagInputWrapper>
            {button}
          </StyledInputRow>

          {helperText && (
            <StyledHelperText
              as="span"
              size="sm"
              weight="normal"
              $validation={validation}
              $disabled={isDisabled}
              $readOnly={isReadOnly}
            >
              {helperText}
            </StyledHelperText>
          )}
        </StyledInputColumn>
      </StyledFieldContainer>
    );
  },
);

TagFieldButton.displayName = "TagField.Button";
