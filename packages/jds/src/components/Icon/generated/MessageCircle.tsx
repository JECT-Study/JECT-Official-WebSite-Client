import type { SVGProps } from "react";
const SvgMessageCircle = (props: SVGProps<SVGSVGElement>) => (
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
      d='M5.605 3.05a11.001 11.001 0 0 1 15.423 15.234A11 11 0 0 1 7.4 21.99a1 1 0 0 0-.509-.046l-3.354.981-.023.007a2 2 0 0 1-2.473-2.336l.028-.107 1.043-3.222a1 1 0 0 0-.047-.549 11 11 0 0 1 3.54-13.67m7.11-.022a9 9 0 0 0-8.987 12.518l.164.36.029.067a3 3 0 0 1 .141 1.75 1 1 0 0 1-.025.093l-1.03 3.18 3.382-.988q.042-.011.086-.02a3 3 0 0 1 1.45.07l.199.067.067.029a9.001 9.001 0 1 0 4.524-17.126'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgMessageCircle;
