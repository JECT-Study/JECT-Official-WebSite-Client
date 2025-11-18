import { ChangeEvent, DragEvent, useCallback, useReducer, useRef } from 'react';
import { UseUploaderOptions } from './uploader.types';
import { validateAcceptedFile } from './uploader.utils';

interface State {
  isDragging: boolean;
  files: File[];
}

const initialState: State = {
  isDragging: false,
  files: [],
};

type Action =
  | { type: 'DRAG_ENTER' }
  | { type: 'DRAG_LEAVE' }
  | { type: 'SET_FILES'; files: File[] };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'DRAG_ENTER':
      return { ...state, isDragging: true };
    case 'DRAG_LEAVE':
      return { ...state, isDragging: false };
    case 'SET_FILES':
      return { ...state, files: action.files };
    default:
      return state;
  }
};

export const useUploader = <T extends HTMLElement>(options: UseUploaderOptions) => {
  const {
    accept,
    maxFileSize,
    maxTotalSize,
    existingFilesSize = 0,
    onUpload,
    onError,
    files: controlledFiles,
  } = options;
  const [state, dispatch] = useReducer(reducer, initialState);
  const enterCounter = useRef(0);

  const isControlled = controlledFiles !== undefined;
  const files = isControlled ? controlledFiles : state.files;

  const handleDragEnter = useCallback((e: DragEvent<T>) => {
    e.preventDefault();

    enterCounter.current++;
    if (enterCounter.current === 1) dispatch({ type: 'DRAG_ENTER' });
  }, []);

  const handleDragOver = useCallback((e: DragEvent<T>) => {
    e.preventDefault();
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<T>) => {
    e.preventDefault();

    enterCounter.current--;
    if (enterCounter.current === 0) dispatch({ type: 'DRAG_LEAVE' });
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

  const setFiles = useCallback(
    (newFiles: File[]) => {
      if (!isControlled) dispatch({ type: 'SET_FILES', files: newFiles });
      onUpload?.(newFiles);
    },
    [isControlled, onUpload],
  );

  const handleDrop = useCallback(
    (e: DragEvent<T>) => {
      e.preventDefault();

      enterCounter.current = 0;
      dispatch({ type: 'DRAG_LEAVE' });

      if (!e.dataTransfer) return;

      const droppedFiles = Array.from(e.dataTransfer.files);
      const validFiles = handleFiles(droppedFiles);

      if (validFiles.length > 0) setFiles(validFiles);
    },
    [handleFiles, onUpload],
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      const validFiles = handleFiles(files);

      if (validFiles && validFiles.length > 0) setFiles(validFiles);

      e.target.value = '';
    },
    [onUpload, handleFiles],
  );

  return {
    isDragging: state.isDragging,
    files,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleInputChange,
  };
};
