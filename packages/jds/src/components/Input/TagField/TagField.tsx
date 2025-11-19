import {
  forwardRef,
  useCallback,
  type KeyboardEvent,
  type ChangeEvent,
  type MouseEvent,
  type ComponentPropsWithoutRef,
} from 'react';

import { StyledTagInputWrapper, StyledTagInput } from './tagField.styles';
import type { Tag, TagFieldProps } from './tagField.types';
import { TagFieldUtils } from './tagField.utils';
import { TagList } from './TagList';
import { useTagFieldState } from './useTagFieldState';
import { FormField } from '../shared/FormField';
import { useFormField } from '../shared/FormFieldContext';

type TagFieldInputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'style' | 'value' | 'onChange' | 'disabled' | 'readOnly'
> & {
  tags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
  maxTags?: number;
  allowDuplicates?: boolean;
  placeholder?: string;
};

const TagFieldInput = forwardRef<HTMLInputElement, TagFieldInputProps>(
  (
    {
      tags,
      onTagsChange,
      maxTags,
      allowDuplicates = false,
      placeholder = '태그를 입력하세요',
      ...restProps
    },
    ref,
  ) => {
    const { fieldId, style, validation, isDisabled, isReadOnly } = useFormField();
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

    //Todo: 키보드 핸들러의 경우 유틸리티 순수 함수로 분기
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (!TagFieldUtils.shouldHandleKeyEvent(e.key, isComposing || e.nativeEvent.isComposing)) {
          return;
        }

        if (e.key === 'Enter') {
          e.preventDefault();
          const newTags = TagFieldUtils.addTag(tags, inputValue, maxTags, allowDuplicates);

          if (newTags !== tags) {
            onTagsChange(newTags);
            clearInput();
            clearSelection();
          }
          return;
        }

        if (e.key === 'Backspace') {
          e.preventDefault();
          const action = TagFieldUtils.getBackspaceAction(inputValue, tags, selectedTagId);

          if (action === 'remove') {
            const lastTagId = TagFieldUtils.getLastTagId(tags);
            if (lastTagId) {
              onTagsChange(TagFieldUtils.removeTag(tags, lastTagId));
              clearSelection();
            }
          } else if (action === 'select') {
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
      if (ref && typeof ref !== 'function' && ref.current) {
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
      <StyledTagInputWrapper
        $style={style}
        $validation={validation}
        $disabled={isDisabled}
        $readOnly={isReadOnly}
        onClick={handleWrapperClick}
      >
        <TagList
          tags={tags}
          hasTag={hasTag}
          selectedTagId={selectedTagId}
          onTagClick={handleTagClick}
        />
        <StyledTagInput
          ref={ref}
          id={fieldId}
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
    );
  },
);

TagFieldInput.displayName = 'TagFieldInput';

export const TagField = forwardRef<HTMLInputElement, TagFieldProps>(
  (
    {
      style = 'outlined',
      layout = 'vertical',
      validation = 'none',
      interaction = 'enabled',
      label,
      labelIcon,
      helperText,
      ...restProps
    },
    ref,
  ) => {
    return (
      <FormField
        style={style}
        layout={layout}
        validation={validation}
        interaction={interaction}
        label={label}
        labelIcon={labelIcon}
        helperText={helperText}
      >
        <TagFieldInput ref={ref} {...restProps} />
      </FormField>
    );
  },
);

TagField.displayName = 'TagField';
