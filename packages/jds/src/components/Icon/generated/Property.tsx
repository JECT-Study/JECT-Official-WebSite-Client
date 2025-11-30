import type { SVGProps } from "react";
const SvgProperty = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='currentColor'
    viewBox='0 0 24 25'
    {...props}
  >
    <path
      fill='currentColor'
      d='M11.647 3.175a.5.5 0 0 1 .707 0l8.485 8.486a.5.5 0 0 1 0 .707l-8.485 8.485a.5.5 0 0 1-.707 0l-4.498-4.497a.2.2 0 0 1 .141-.342h2.346L12 18.378l6.364-6.364L12 5.65 9.636 8.014H7.29a.2.2 0 0 1-.14-.342z'
    />
    <path
      fill='currentColor'
      d='M12 9.764a2.25 2.25 0 1 1-2.014 3.25H3.004v-2h6.982A2.25 2.25 0 0 1 12 9.764'
    />
  </svg>
);
export default SvgProperty;
