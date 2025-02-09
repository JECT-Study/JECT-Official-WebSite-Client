import Label from '@/components/common/label/Label';
import Title from '@/components/common/title/Title';

interface CalloutProps {
  title: string;
  labelText: string;
}

function CalloutNumerical({ title, labelText }: CalloutProps) {
  return (
    <div className='bg-surface-deep-dark border-border-assistive-dark gap-md radius-sm flex flex-col items-center border px-(--gap-4xl) py-(--gap-3xl)'>
      <Title hierarchy='stronger'>{title}</Title>
      <Label hierarchy='normal' weight='bold' textColor='text-object-neutral-dark'>
        {labelText}
      </Label>
    </div>
  );
}

export default CalloutNumerical;
