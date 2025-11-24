import type { ProgressBridgeProps } from "./ProgressBridge";

function ProgressVerticalBridge({ isActive }: ProgressBridgeProps) {
  return (
    <div className="flex items-center">
      <div
        className={`${isActive ? "bg-accent-normal-dark" : "bg-object-disabled-dark"} h-[4.5rem] w-[0.375rem]`}
      ></div>
    </div>
  );
}

export default ProgressVerticalBridge;
