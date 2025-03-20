export type JobFamily = 'PM' | 'PD' | 'FE' | 'BE';

export interface Question {
  id: number;
  inputType: 'TEXT' | 'URL' | 'FILE';
  title: string;
  body: null;
  inputHint: string;
  maxLength: number | null;
  isRequired: boolean;
}
