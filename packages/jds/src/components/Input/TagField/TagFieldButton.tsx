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
  StyledTagWrapper,
  StyledTagInput,
  StyledInputRow,
} from './tagField.styles';
import type { TagFieldButtonProps, Tag } from './tagField.types';
import { ContentBadge } from '../../Badge';
import { Icon } from '../../Icon';
import { getInteractionStates } from '../input.types';

export const TagFieldButton = forwardRef<HTMLInputElement, TagFieldButtonProps>(
  (
    {
      style = 'outlined',
      layout = 'vertical',
      validation = 'none',
      interaction = 'enabled',
      label,
      labelIcon,
      helperText,
      button,
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
    const { disabled, readOnly, isInteractive } = getInteractionStates(interaction);
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
          <StyledInputRow $style={style} $layout={layout}>
            <StyledTagInputWrapper
              $style={style}
              $validation={validation}
              $disabled={disabled}
              $readOnly={readOnly}
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
                      size='xs'
                      hierarchy='secondary'
                      badgeStyle='alpha'
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
            {button}
          </StyledInputRow>

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

TagFieldButton.displayName = 'TagField.Button';
