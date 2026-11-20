import type { SVGProps } from "react";
const SvgPositionPd = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='currentColor'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#position-pd_svg__a)'>
      <path
        fill='#D6AAFA'
        d='M0 9.6c0-4.525 0-6.788 1.406-8.194S5.075 0 9.6 0h4.8c4.525 0 6.788 0 8.194 1.406S24 5.075 24 9.6v4.8c0 4.525 0 6.788-1.406 8.194S18.925 24 14.4 24H9.6c-4.525 0-6.788 0-8.194-1.406S0 18.925 0 14.4z'
      />
      <path
        fill='#5E377E'
        fillRule='evenodd'
        d='M4.672 3.688a1.25 1.25 0 0 1 .714.071L18.72 9.174c.213.087.398.23.534.414l.055.082.05.085a1.252 1.252 0 0 1-.796 1.787l-4.644 1.197 4.503 4.504a.833.833 0 1 1-1.178 1.178L12.74 13.92l-1.197 4.643-.002.008a1.25 1.25 0 0 1-2.364.154l-.002-.005L3.758 5.387l.001-.001A1.25 1.25 0 0 1 4.03 4.03c.175-.175.4-.294.642-.342m5.572 13.234.993-3.846a2.5 2.5 0 0 1 .643-1.158l.019-.02.015-.013a2.5 2.5 0 0 1 1.128-.64l3.881-1-11.248-4.57z'
        clipRule='evenodd'
      />
    </g>
    <defs>
      <clipPath id='position-pd_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgPositionPd;
