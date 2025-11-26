export interface ProgressBridgeProps {
  isActive: boolean;
}

function ProgressBridge({ isActive }: ProgressBridgeProps) {
  return (
    <div className='flex items-center'>
      <div
        className={`${isActive ? "bg-accent-normal-dark" : "bg-object-disabled-dark"} h-[0.375rem] w-[2.5rem]`}
      ></div>
    </div>
  );
}

export default ProgressBridge;
