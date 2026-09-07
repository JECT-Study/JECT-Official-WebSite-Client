import type { SVGProps } from "react";
const SvgDiamond = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='currentColor'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M12 .998a3.4 3.4 0 0 1 2.412 1.001L22 9.588a3.415 3.415 0 0 1 .117 4.704l-.116.121-7.59 7.59a3.41 3.41 0 0 1-4.825 0l-7.588-7.59a3.41 3.41 0 0 1 0-4.825l7.588-7.589A3.42 3.42 0 0 1 12 .998m0 2.001a1.4 1.4 0 0 0-.998.413l-7.59 7.59a1.42 1.42 0 0 0-.414.999 1.41 1.41 0 0 0 .413.997l7.59 7.59a1.41 1.41 0 0 0 1.539.307c.17-.07.326-.175.457-.306l7.59-7.59a1.42 1.42 0 0 0 .415-.998 1.4 1.4 0 0 0-.32-.896l-.095-.102-7.59-7.59a1.4 1.4 0 0 0-.998-.414'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgDiamond;
