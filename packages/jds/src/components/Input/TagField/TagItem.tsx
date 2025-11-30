import type { MouseEvent } from "react";

import { StyledTagWrapper } from "./tagField.styles";
import type { Tag } from "./tagField.types";
import { ContentBadge } from "../../Badge";
import { useFormField } from "../shared/FormFieldContext";

export interface TagItemProps {
  tag: Tag;
  isSelected: boolean;
  onClick?: (e: MouseEvent, tagId: string) => void;
}

export const TagItem = ({ tag, isSelected, onClick }: TagItemProps) => {
  const { isInteractive } = useFormField();

  return (
    <StyledTagWrapper
      key={tag.id}
      $isSelected={isSelected}
      $isInteractive={isInteractive}
      onClick={isInteractive && onClick ? e => onClick(e, tag.id) : undefined}
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
  );
};
