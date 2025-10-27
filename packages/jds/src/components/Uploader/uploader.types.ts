export type UploaderState = 'rest' | 'dragover';

export interface UploaderFileProps {
  isLoading?: boolean;
  isDisabled?: boolean;
}

export interface UploaderImageProps {
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

export interface UploaderImageContainerButtonProps {
  $isDisabled: boolean;
  $isLoading: boolean;
}

export interface UploaderImageIconProps {
  $isDisabled: boolean;
}

export interface UploaderImageLabelProps {
  $isDisabled: boolean;
}
