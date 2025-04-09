import { Fragment } from 'react/jsx-runtime';

import ProgressBridge from './ProgressBridge';
import ProgressIndex from './ProgressIndex';

interface ProgressIndicatorProps {
  totalStep: number;
  currentStep: number;
}

function ProgressIndicator({ totalStep, currentStep }: ProgressIndicatorProps) {
  return (
    <div className='flex'>
      <ProgressIndex isActive={true}>{1}</ProgressIndex>
      {totalStep > 1 &&
        Array.from({ length: totalStep - 1 }).map((_, index) => (
          <Fragment key={index}>
            <ProgressBridge isActive={currentStep >= index + 2} />
            <ProgressIndex isActive={currentStep >= index + 2}>{index + 2}</ProgressIndex>
          </Fragment>
        ))}
    </div>
  );
}

export default ProgressIndicator;
