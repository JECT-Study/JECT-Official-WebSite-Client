interface ProgressIndexProps {
  children: number;
  isActive: boolean;
}

function ProgressIndex({ children, isActive }: ProgressIndexProps) {
  const activeStyle = isActive
    ? 'border-border-trans-normal-dark bg-accent-normal-dark text-object-hero-dark'
    : 'border-border-trans-assistive-dark bg-fill-assistive-dark text-object-assistive-dark';

  return (
    <div
      className={`${activeStyle} radius-md title-02 flex h-[3rem] w-[3rem] items-center justify-center border-2`}
    >
      {children}
    </div>
  );
}

export default ProgressIndex;
