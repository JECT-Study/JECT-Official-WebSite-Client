export type JobFamily = 'PM' | 'PD' | 'FE' | 'BE';

export interface Question {
  id: number;
  inputType: 'TEXT' | 'URL' | 'FILE' | 'SELECT';
  title: string;
  body: null | string[];
  inputHint: string;
  maxLength: number | null;
  isRequired: boolean;
}

export type QuestionResponse = Question[];
