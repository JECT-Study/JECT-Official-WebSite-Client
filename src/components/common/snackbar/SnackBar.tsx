import BlockButton from '@/components/common/button/BlockButton';
import Icon from '@/components/common/icon/Icon';

export interface SnackBarProps {
  message: string;
  buttonLabel: string;
  onAction?: () => void;
}

export const SnackBar = ({ message, buttonLabel, onAction }: SnackBarProps) => {
  return (
    <div className='gap-4xl radius-md shadow-overlay bg-accent-trans-neutral-dark flex w-full flex-row items-center px-(--gap-2xl) py-(--gap-sm)'>
      <span className='text-object-hero-dark label-bold-lg flex flex-1 shrink-0 basis-0'>
        {message}
      </span>
      <BlockButton
        size='md'
        style='solid'
        hierarchy='accent'
        onClick={onAction}
        rightIcon={
          <Icon name='forward' size='sm' fillColor='fill-object-static-inverse-hero-dark' />
        }
      >
        {buttonLabel}
      </BlockButton>
    </div>
  );
};

export default SnackBar;
