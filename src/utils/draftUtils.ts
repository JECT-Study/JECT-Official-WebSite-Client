import { AnswersResponse } from '@/types/apis/answer';

const setDraftLocal = (answersData: AnswersResponse) => {
  window.localStorage.setItem('draft', JSON.stringify(answersData));
};

const removeDraftLocal = () => {
  window.localStorage.removeItem('draft');
};

const getDraftLocal = () => {
  const data = window.localStorage.getItem('draft');

  if (!data) return null;

  const draft = JSON.parse(data) as AnswersResponse;

  return draft;
};

export { setDraftLocal, removeDraftLocal, getDraftLocal };
