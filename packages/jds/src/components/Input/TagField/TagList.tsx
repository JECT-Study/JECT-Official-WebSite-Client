import type { MouseEvent } from "react";

import { StyledTagContainer } from "./tagField.styles";
import type { Tag } from "./tagField.types";
import { TagItem } from "./TagItem";

export interface TagListProps {
  tags: Tag[];
  hasTag: boolean;
  selectedTagId: string | null;
  onTagSelect?: (e: MouseEvent, tagId: string) => void;
  onTagRemove?: (tagId: string) => void;
}

export const TagList = ({
  tags,
  hasTag,
  selectedTagId,
  onTagSelect,
  onTagRemove,
}: TagListProps) => {
  return (
    <StyledTagContainer $hasTag={hasTag}>
      {tags.map(tag => (
        <TagItem
          key={tag.id}
          tag={tag}
          isSelected={selectedTagId === tag.id}
          onSelect={onTagSelect}
          onRemove={onTagRemove}
        />
      ))}
    </StyledTagContainer>
  );
};
