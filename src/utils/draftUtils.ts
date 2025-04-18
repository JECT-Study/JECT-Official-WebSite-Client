import { decryptData, encryptData } from './cryto';

import { AnswersResponse } from '@/types/apis/application';

const setDraftLocal = (answersData: AnswersResponse) => {
  const encryptedData = encryptData(answersData);

  window.localStorage.setItem('draft', encryptedData);
};

const removeDraftLocal = () => {
  window.localStorage.removeItem('draft');
};

const hasDraftLocal = () => {
  const data = window.localStorage.getItem('draft');

  if (!data) return false;

  return true;
};

const getDraftLocal = () => {
  const data = window.localStorage.getItem('draft');

  if (!data) return null;

  return decryptData<AnswersResponse>(data);
};

export { setDraftLocal, removeDraftLocal, getDraftLocal, hasDraftLocal };
