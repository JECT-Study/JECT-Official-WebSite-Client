const SELECTED_OPTION_SELECTOR = '[aria-selected="true"]';

export const getOptionId = (listboxId: string, value: string) =>
  `${listboxId}-option-${encodeURIComponent(value)}`;

export const hasSelectedOption = (listboxEl: HTMLElement) =>
  listboxEl.querySelector(SELECTED_OPTION_SELECTOR) != null;

export const scrollSelectedOptionIntoView = (listboxEl: HTMLElement) => {
  const selected = listboxEl.querySelector<HTMLElement>(SELECTED_OPTION_SELECTOR);
  if (selected == null) return;

  const listRect = listboxEl.getBoundingClientRect();
  const optionRect = selected.getBoundingClientRect();

  if (optionRect.top < listRect.top) {
    listboxEl.scrollTop += optionRect.top - listRect.top;
  } else if (optionRect.bottom > listRect.bottom) {
    listboxEl.scrollTop += optionRect.bottom - listRect.bottom;
  }
};
