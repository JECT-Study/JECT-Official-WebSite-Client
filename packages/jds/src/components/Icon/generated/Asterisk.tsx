import type { SVGProps } from "react";
const SvgAsterisk = (props: SVGProps<SVGSVGElement>) => (
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
      d='M12 5a1 1 0 0 1 1 1v4.267l3.695-2.133a1 1 0 0 1 1 1.732L14 12l3.696 2.134a1 1 0 0 1-1 1.732L13 13.732V18a1 1 0 0 1-2 0v-4.269l-3.696 2.135a1 1 0 0 1-1-1.732L9.999 12 6.304 9.866a1 1 0 0 1 1-1.732L11 10.268V6a1 1 0 0 1 1-1'
    />
  </svg>
);
export default SvgAsterisk;
