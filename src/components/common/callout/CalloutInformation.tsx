import Label from '../Label';

interface CalloutProps {
  title: string;
  labels: string[];
}

function CalloutInformation({ title, labels }: CalloutProps) {
  return (
    <div className='bg-surface-deep-dark border-border-assistive-dark gap-xs radius-xs flex items-center border px-(--gap-lg) py-(--gap-xs)'>
      <Label hierarchy='stronger' weight='bold' textColor='text-object-hero-dark'>
        {title}
      </Label>
      {labels.map(label => (
        <Label hierarchy='normal' weight='normal' textColor='text-object-neutral-dark'>
          {label}
        </Label>
      ))}
    </div>
  );
}

export default CalloutInformation;
