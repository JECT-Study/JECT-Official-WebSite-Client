import type { SVGProps } from "react";
const SvgSave = (props: SVGProps<SVGSVGElement>) => (
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
      d='M15.214 2a3 3 0 0 1 2.092.894v-.001l3.801 3.8c.561.554.882 1.305.893 2.093V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3zM5 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h1v-6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6h1a1 1 0 0 0 1-1V8.814l-.006-.098a1 1 0 0 0-.294-.602l-.008-.007L15.886 4.3a1 1 0 0 0-.602-.294L15.185 4H8v3h7a1 1 0 1 1 0 2H8a2 2 0 0 1-2-2V4zm3 16h8v-6H8z'
      clipRule='evenodd'
    />
  </svg>
);
export default SvgSave;
