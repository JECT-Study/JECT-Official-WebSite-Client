export type JobFamily = 'PM' | 'PD' | 'FE' | 'BE';

export interface Question {
  id: number;
  sequence: number;
  inputType: 'TEXT' | 'URL' | 'FILE' | 'SELECT';
  isRequired: boolean;
  title: string;
  label: string;
  selectOptions: string[] | null;
  inputHint: string;
  maxTextLength: number | null;
  maxFileSize: number | null;
}

export type QuestionResponse = Question[];
