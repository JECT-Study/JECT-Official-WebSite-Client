import type { ComponentPropsWithoutRef } from 'react';

export type InputStyle = 'outlined' | 'empty';

export type InputLayout = 'vertical' | 'horizontal';

export type InputValidation = 'none' | 'error' | 'success';

export type InputInteraction = 'enabled' | 'disabled' | 'readOnly';

export interface FieldPublicProps {
  style?: InputStyle;
  layout?: InputLayout;
  validation?: InputValidation;
  interaction?: InputInteraction;
}

export type FieldInputPublicProps = Omit<ComponentPropsWithoutRef<'input'>, 'style'>;

export type FieldTextAreaPublicProps = Omit<ComponentPropsWithoutRef<'textarea'>, 'style'>;

//ToDo: 순수 함수 계열의 공용 유틸리티로 변경해도 될듯
export const getInteractionStates = (interaction: InputInteraction = 'enabled') => ({
  isDisabled: interaction === 'disabled',
  isReadOnly: interaction === 'readOnly',
  isInteractive: interaction === 'enabled',
});
