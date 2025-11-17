import { ChangeEvent, DragEvent, useCallback, useState } from 'react';
import { UseUploaderOptions } from './uploader.types';
import { validateAcceptedFile } from './uploader.utils';

export const useUploader = <T extends HTMLElement>(options: UseUploaderOptions) => {
  const { accept, maxFileSize, maxTotalSize, existingFilesSize = 0, onUpload, onError } = options;
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDragOver = useCallback((e: DragEvent<T>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFiles = useCallback(
    (droppedFiles: File[]) => {
      let newTotalSize = existingFilesSize || 0;
      const validFiles: File[] = [];

      for (const file of droppedFiles) {
        if (maxFileSize && file.size > maxFileSize) {
          onError?.({ type: 'FILE_TOO_LARGE', file });
          continue;
        }

        if (accept && !validateAcceptedFile(accept, file)) {
          onError?.({ type: 'INVALID_TYPE', file });
          continue;
        }

        if (maxTotalSize && newTotalSize + file.size > maxTotalSize) {
          onError?.({ type: 'TOTAL_SIZE_EXCEEDED', file });
          break;
        }

        validFiles.push(file);
        newTotalSize += file.size;
      }

      return validFiles;
    },
    [accept, maxFileSize, maxTotalSize, existingFilesSize, onError],
  );

  const handleDrop = useCallback(
    (e: DragEvent<T>) => {
      if (!e.dataTransfer) return;

      e.preventDefault();
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      const validFiles = handleFiles(droppedFiles);

      if (validFiles && validFiles.length > 0) {
        setFiles(validFiles);
        onUpload?.(validFiles);
      }
    },
    [onUpload, onError, handleFiles],
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      const validFiles = handleFiles(files);

      if (validFiles && validFiles.length > 0) {
        onUpload?.(validFiles);
      }

      e.target.value = '';
    },
    [onUpload, handleFiles],
  );

  return {
    isDragging,
    files,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleInputChange,
  };
};
