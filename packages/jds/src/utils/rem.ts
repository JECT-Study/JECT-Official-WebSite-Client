export function rem(token: number): string {
  return `${parseFloat((token / 16).toFixed(4))}rem`;
}
