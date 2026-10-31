import type { SVGProps } from "react";
const SvgPositionApp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='currentColor'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#position-app_svg__a)'>
      <path
        fill='#AFB8F6'
        d='M0 9.6c0-4.525 0-6.788 1.406-8.194S5.075 0 9.6 0h4.8c4.525 0 6.788 0 8.194 1.406S24 5.075 24 9.6v4.8c0 4.525 0 6.788-1.406 8.194S18.925 24 14.4 24H9.6c-4.525 0-6.788 0-8.194-1.406S0 18.925 0 14.4z'
      />
      <path
        fill='#3A4482'
        d='M17 5.333a.833.833 0 0 0-.833-.833H7.833A.833.833 0 0 0 7 5.333v13.334c0 .46.373.833.833.833h8.334c.46 0 .833-.373.833-.833zm-4.992 10.834a.833.833 0 0 1 0 1.666H12a.833.833 0 0 1 0-1.666zm6.659 2.5a2.5 2.5 0 0 1-2.5 2.5H7.833a2.5 2.5 0 0 1-2.5-2.5V5.333a2.5 2.5 0 0 1 2.5-2.5h8.334a2.5 2.5 0 0 1 2.5 2.5z'
      />
    </g>
    <defs>
      <clipPath id='position-app_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgPositionApp;
