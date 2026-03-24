import type { MouseEvent } from "react";

import { StyledTagWrapper } from "./tagField.styles";
import type { Tag } from "./tagField.types";
import { ContentBadge } from "../../Badge";
import { useFormField } from "../shared/FormFieldContext";

export interface TagItemProps {
  tag: Tag;
  isSelected: boolean;
  onSelect?: (e: MouseEvent, tagId: string) => void;
  onRemove?: (tagId: string) => void;
}

export const TagItem = ({ tag, isSelected, onSelect, onRemove }: TagItemProps) => {
  const { isInteractive, isDisabled } = useFormField();

  const handleRemoveIconClick = (e: MouseEvent) => {
    e.stopPropagation();

    if (onRemove) onRemove(tag.id);
  };

  const handleBodyClick = (e: MouseEvent) => {
    e.stopPropagation();

    if (onSelect) onSelect(e, tag.id);
  };

  return (
    <StyledTagWrapper
      $isSelected={isSelected}
      $isInteractive={isInteractive}
      onClick={isInteractive ? handleBodyClick : undefined}
      onMouseDown={e => e.preventDefault()}
    >
      <ContentBadge.Basic
        size='xs'
        hierarchy='secondary'
        badgeStyle='alpha'
        isMuted={isDisabled}
        withIcon={isInteractive}
        onIconClick={isInteractive ? handleRemoveIconClick : undefined}
      >
        {tag.label}
      </ContentBadge.Basic>
    </StyledTagWrapper>
  );
};
