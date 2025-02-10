import ProgressBridge from './ProgressBridge';
import ProgressIndex from './ProgressIndex';

interface ProgressIndicatorProps {
  totalStep: number;
  currentStep: number;
}

function ProgressIndicator({ totalStep, currentStep }: ProgressIndicatorProps) {
  console.log(new Array(totalStep).fill(0));
  return (
    <div className='flex'>
      <ProgressIndex isActive={true}>{1}</ProgressIndex>
      {totalStep > 1 &&
        new Array(totalStep - 1).fill(0).map((_, index) => (
          <>
            <ProgressBridge isActive={currentStep >= index + 2} />
            <ProgressIndex isActive={currentStep >= index + 2}>{index + 2}</ProgressIndex>
          </>
        ))}
    </div>
  );
}

export default ProgressIndicator;
