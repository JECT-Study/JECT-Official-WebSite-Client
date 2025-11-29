interface ProgressIndexProps {
  children: number;
  isActive: boolean;
}

const ACTIVE_STYLE = "border-border-trans-normal-dark bg-accent-normal-dark text-object-hero-dark";
const INACTIVE_STYLE =
  "border-border-trans-assistive-dark bg-fill-assistive-dark text-object-assistive-dark";

function ProgressIndex({ children, isActive }: ProgressIndexProps) {
  const activeStyle = isActive ? ACTIVE_STYLE : INACTIVE_STYLE;

  return (
    <div
      className={`${activeStyle} radius-md title-02 flex h-[3rem] w-[3rem] items-center justify-center border-2`}
    >
      {children}
    </div>
  );
}

export default ProgressIndex;
