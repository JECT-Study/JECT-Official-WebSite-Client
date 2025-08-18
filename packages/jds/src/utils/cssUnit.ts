export function rem(pixels: number): string {
  return `${parseFloat((pixels / 16).toFixed(4))}rem`;
}

// fontSize: 현재 요소의 폰트 크기 (px)
export function em(fontSize: number, spacing: number): string {
  return `${parseFloat((spacing / fontSize).toFixed(4))}em`;
}

export function lh(fontSize: number, lineHeight: number): string {
  return `${parseFloat((lineHeight / fontSize).toFixed(1))}`;
}
