import type { SVGProps } from "react";
const SvgShapes = (props: SVGProps<SVGSVGElement>) => (
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
      d='M9 13a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2zm-5 7h5v-5H4zM17.5 13a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9m0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M12.17 1.647a1.7 1.7 0 0 1 .424.094l.2.088.187.114q.18.125.323.29l.131.176.012.018 3.696 5.934a1.7 1.7 0 0 1-1.412 2.638H8.3a1.7 1.7 0 0 1-1.738-1.74l.007-.117a1.7 1.7 0 0 1 .265-.765l3.72-5.91v.001c.141-.235.336-.434.57-.578l.193-.103c.2-.089.415-.14.634-.147zM8.806 8.999h6.379L12.01 3.905z'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgShapes;
