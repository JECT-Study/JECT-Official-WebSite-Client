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
  const { isInteractive } = useFormField();

  const handleRemoveIconClick = (e: MouseEvent) => {
    e.stopPropagation();

    if (isInteractive && onRemove) onRemove(tag.id);
  };

  const handleBodyClick = (e: MouseEvent) => {
    e.stopPropagation();

    if (isInteractive && onSelect) onSelect(e, tag.id);
  };

  return (
    <StyledTagWrapper
      key={tag.id}
      $isSelected={isSelected}
      $isInteractive={isInteractive}
      onClick={isInteractive ? handleBodyClick : undefined}
      onMouseDown={e => e.preventDefault()}
    >
      <ContentBadge.Basic
        size='xs'
        hierarchy='secondary'
        badgeStyle='alpha'
        withIcon={isInteractive}
        onIconClick={isInteractive ? handleRemoveIconClick : undefined}
      >
        {tag.label}
      </ContentBadge.Basic>
    </StyledTagWrapper>
  );
};
