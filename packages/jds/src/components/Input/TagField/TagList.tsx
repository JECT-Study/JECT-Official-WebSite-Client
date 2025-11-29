import type { MouseEvent } from "react";

import { StyledTagContainer } from "./tagField.styles";
import type { Tag } from "./tagField.types";
import { TagItem } from "./TagItem";

export interface TagListProps {
  tags: Tag[];
  hasTag: boolean;
  selectedTagId: string | null;
  onTagClick?: (e: MouseEvent, tagId: string) => void;
}

export const TagList = ({ tags, hasTag, selectedTagId, onTagClick }: TagListProps) => {
  return (
    <StyledTagContainer $hasTag={hasTag}>
      {tags.map(tag => (
        <TagItem
          key={tag.id}
          tag={tag}
          isSelected={selectedTagId === tag.id}
          onClick={onTagClick}
        />
      ))}
    </StyledTagContainer>
  );
};
