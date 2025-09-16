import type { SVGProps } from 'react';
const SvgAbsolute = (props: SVGProps<SVGSVGElement>) => (
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
      d='M4 19.114c0 .375 0 .563.096.694a.5.5 0 0 0 .11.11c.131.096.32.096.694.096H7v2H5.6c-1.5 0-2.25 0-2.776-.382a2 2 0 0 1-.442-.442C2 20.664 2 19.914 2 18.415v-1.4h2zM22 18.415c0 1.5 0 2.25-.382 2.775a2 2 0 0 1-.442.442c-.526.382-1.276.382-2.776.382H17v-2h2.1c.375 0 .563 0 .694-.095a.5.5 0 0 0 .11-.11c.096-.132.096-.32.096-.695v-2.1h2z'
    />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M9 7.014h6v-2h2v2h2v2h-2v6h2v2h-2v2h-2v-2H9v2H7v-2H5v-2h2v-6H5v-2h2v-2h2zm0 8h6v-6H9z'
      clipRule='evenodd'
    />
    <path
      fill='currentColor'
      d='M7 4.014H4.9c-.375 0-.563 0-.694.096a.5.5 0 0 0-.11.11C4 4.352 4 4.54 4 4.915v2.1H2V5.613c0-1.5 0-2.25.382-2.776a2 2 0 0 1 .442-.442C3.35 2.014 4.1 2.014 5.6 2.014H7zM18.4 2.014c1.5 0 2.25 0 2.776.382q.256.187.442.442C22 3.364 22 4.114 22 5.614v1.4h-2v-2.1c0-.374 0-.562-.096-.694a.5.5 0 0 0-.11-.11c-.131-.096-.32-.096-.694-.096H17v-2z'
    />
  </svg>
);
export default SvgAbsolute;
