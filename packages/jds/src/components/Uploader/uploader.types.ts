export type UploaderState = 'rest' | 'dragover';

export interface UploaderFileProps {
  isLoading?: boolean;
  isDisabled?: boolean;
}

export interface UploaderButtonProps {
  isLoading: boolean;
  isDisabled: boolean;
}

export interface UploaderFileContainerDivProps {
  $isDisabled: boolean;
  $isLoading: boolean;
  state: UploaderState;
}
