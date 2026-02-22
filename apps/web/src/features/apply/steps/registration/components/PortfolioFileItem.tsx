import { FileItem } from "@jects/jds";
import type { MouseEvent } from "react";

import type { PortfolioFile } from "@/types/apis/application";
import { changeFileSizeUnit } from "@/utils/changeFileSizeUnit";

interface PortfolioFileItemProps {
  portfolio: PortfolioFile;
  onDelete: (id: string) => void;
}

export function PortfolioFileItem({ portfolio, onDelete }: PortfolioFileItemProps) {
  const openFile = () => {
    window.open(portfolio.fileUrl, "_blank", "noopener,noreferrer");
  };

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    onDelete(portfolio.id);
  };

  return (
    <FileItem
      fileName={portfolio.fileName}
      fileSize={changeFileSizeUnit(Number(portfolio.fileSize), ["KB", "MB"], true)}
      onClick={openFile}
      removeable
      onRemove={handleDelete}
    />
  );
}
