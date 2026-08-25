import type { SVGProps } from "react";
const SvgGlobe = (props: SVGProps<SVGSVGElement>) => (
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
      d='M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1M3.057 13a9 9 0 0 0 6.61 7.692A15.5 15.5 0 0 1 7.033 13zm13.91 0a15.5 15.5 0 0 1-2.635 7.692A9 9 0 0 0 20.943 13zm-7.93 0A13.5 13.5 0 0 0 12 20.483 13.5 13.5 0 0 0 14.963 13zm.63-9.693A9.005 9.005 0 0 0 3.057 11h3.976a15.5 15.5 0 0 1 2.634-7.693M12 3.516A13.5 13.5 0 0 0 9.037 11h5.926A13.5 13.5 0 0 0 12 3.516m2.332-.21A15.5 15.5 0 0 1 16.967 11h3.976a9.005 9.005 0 0 0-6.611-7.693'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgGlobe;
