export const getOptionId = (listboxId: string, value: string) =>
  `${listboxId}-option-${encodeURIComponent(value)}`;

export const scrollSelectedOptionIntoView = (listboxEl: HTMLElement) => {
  const selected = listboxEl.querySelector<HTMLElement>('[aria-selected="true"]');
  if (selected == null) return;

  const listRect = listboxEl.getBoundingClientRect();
  const optionRect = selected.getBoundingClientRect();

  if (optionRect.top < listRect.top) {
    listboxEl.scrollTop += optionRect.top - listRect.top;
  } else if (optionRect.bottom > listRect.bottom) {
    listboxEl.scrollTop += optionRect.bottom - listRect.bottom;
  }
};
