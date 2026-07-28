export const getOptionId = (listboxId: string, value: string) =>
  `${listboxId}-option-${encodeURIComponent(value)}`;
