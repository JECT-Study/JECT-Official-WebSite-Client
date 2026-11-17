import type { SVGProps } from "react";
const SvgPositionPm = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='currentColor'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#position-pm_svg__a)'>
      <path
        fill='#FFA76E'
        d='M0 9.6c0-4.525 0-6.788 1.406-8.194S5.075 0 9.6 0h4.8c4.525 0 6.788 0 8.194 1.406S24 5.075 24 9.6v4.8c0 4.525 0 6.788-1.406 8.194S18.925 24 14.4 24H9.6c-4.525 0-6.788 0-8.194-1.406S0 18.925 0 14.4z'
      />
      <g fill='#713A1F' fillRule='evenodd' clipPath='url(#position-pm_svg__b)' clipRule='evenodd'>
        <path d='M15.27 7.676a.833.833 0 0 1 1.054 1.054l-1.503 4.51a2.5 2.5 0 0 1-1.582 1.58L8.73 16.325a.833.833 0 0 1-1.054-1.054l1.503-4.51a2.5 2.5 0 0 1 1.582-1.58zm-3.982 3.085a.83.83 0 0 0-.492.437l-.035.09-.976 2.927 2.927-.976a.83.83 0 0 0 .527-.527l.976-2.927z' />
        <path d='M12 2.833a9.167 9.167 0 1 1 0 18.334 9.167 9.167 0 0 1 0-18.334M12 4.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15' />
      </g>
    </g>
    <defs>
      <clipPath id='position-pm_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
      <clipPath id='position-pm_svg__b'>
        <path fill='#fff' d='M2 2h20v20H2z' />
      </clipPath>
    </defs>
  </svg>
);
export default SvgPositionPm;
