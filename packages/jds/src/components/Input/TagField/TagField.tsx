import {
  forwardRef,
  useId,
  useState,
  useCallback,
  type KeyboardEvent,
  type ChangeEvent,
  type MouseEvent,
} from 'react';

import {
  StyledFieldContainer,
  StyledLabelContainer,
  StyledFieldLabel,
  StyledInputColumn,
  StyledHelperText,
  StyledTagInputWrapper,
  StyledTagContainer,
  StyledTagInput,
} from './tagField.styles';
import type { TagFieldProps, Tag } from './tagField.types';
import { ContentBadge } from '../../Badge';
import { Icon } from '../../Icon';

export const TagField = forwardRef<HTMLInputElement, TagFieldProps>(
  (
    {
      style = 'outlined',
      layout = 'vertical',
      validation = 'none',
      disabled = false,
      readOnly = false,
      label,
      labelIcon,
      helperText,
      tags,
      onTagsChange,
      maxTags,
      allowDuplicates = false,
      placeholder = '태그를 입력하세요',
      ...restProps
    },
    ref,
  ) => {
    const inputId = useId();
    const hasTag = tags.length > 0;

    const [inputValue, setInputValue] = useState('');

    const [isComposing, setIsComposing] = useState(false);

    const [selectedTagId, setSelectedTagId] = useState<string | null>(null);

    const handleCompositionStart = useCallback(() => {
      setIsComposing(true);
    }, []);

    const handleCompositionEnd = useCallback(() => {
      setIsComposing(false);
    }, []);

    const addTag = useCallback(
      (value: string) => {
        const trimmedValue = value.trim();
        if (!trimmedValue) return;

        if (maxTags !== undefined && tags.length >= maxTags) return;

        if (!allowDuplicates && tags.some(tag => tag.label === trimmedValue)) return;

        const newTag: Tag = {
          id: crypto.randomUUID(),
          label: trimmedValue,
        };

        onTagsChange([...tags, newTag]);
        setInputValue('');
        setSelectedTagId(null);
      },
      [tags, maxTags, allowDuplicates, onTagsChange],
    );

    const removeTag = useCallback(
      (tagId: string) => {
        onTagsChange(tags.filter(tag => tag.id !== tagId));
        setSelectedTagId(null);
      },
      [tags, onTagsChange],
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (isComposing || e.nativeEvent.isComposing) {
          return;
        }

        if (e.key === 'Enter') {
          e.preventDefault();
          addTag(inputValue);
          return;
        }

        if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
          e.preventDefault();

          const lastTag = tags[tags.length - 1];

          if (selectedTagId === lastTag.id) {
            removeTag(lastTag.id);
          } else {
            setSelectedTagId(lastTag.id);
          }
        }
        if (e.key !== 'Backspace' && selectedTagId) {
          setSelectedTagId(null);
        }
      },
      [isComposing, inputValue, tags, selectedTagId, addTag, removeTag],
    );

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (selectedTagId) {
          setSelectedTagId(null);
        }
      },
      [selectedTagId],
    );

    const handleWrapperClick = useCallback(() => {
      if (ref && typeof ref !== 'function' && ref.current) {
        ref.current.focus();
      }
    }, [ref]);

    const handleTagClick = useCallback(
      (e: MouseEvent, tagId: string) => {
        e.stopPropagation();
        removeTag(tagId);
      },
      [removeTag],
    );

    const isInteractive = !disabled && !readOnly;

    return (
      <StyledFieldContainer $layout={layout}>
        {label && (
          <StyledLabelContainer $layout={layout}>
            <StyledFieldLabel
              as='label'
              htmlFor={inputId}
              size='sm'
              weight='normal'
              $disabled={disabled}
              $readOnly={readOnly}
              $layout={layout}
            >
              {label}
            </StyledFieldLabel>
            {labelIcon && <Icon name={labelIcon} size='2xs' />}
          </StyledLabelContainer>
        )}

        <StyledInputColumn>
          <StyledTagInputWrapper
            $style={style}
            $validation={validation}
            $disabled={disabled}
            $readOnly={readOnly}
            onClick={handleWrapperClick}
          >
            <StyledTagContainer $hasTag={hasTag}>
              {tags.map(tag => (
                <div
                  key={tag.id}
                  onClick={isInteractive ? e => handleTagClick(e, tag.id) : undefined}
                  style={{ cursor: isInteractive ? 'pointer' : 'default' }}
                >
                  <ContentBadge.Basic
                    size='sm'
                    hierarchy='secondary'
                    badgeStyle='solid'
                    withIcon={isInteractive}
                  >
                    {tag.label}
                  </ContentBadge.Basic>
                </div>
              ))}
            </StyledTagContainer>
            <StyledTagInput
              ref={ref}
              id={inputId}
              $disabled={disabled}
              $readOnly={readOnly}
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              disabled={disabled}
              readOnly={readOnly}
              placeholder={placeholder}
              {...restProps}
            />
          </StyledTagInputWrapper>

          {helperText && (
            <StyledHelperText
              as='span'
              size='sm'
              weight='normal'
              $validation={validation}
              $disabled={disabled}
              $readOnly={readOnly}
            >
              {helperText}
            </StyledHelperText>
          )}
        </StyledInputColumn>
      </StyledFieldContainer>
    );
  },
);

TagField.displayName = 'TagField';
