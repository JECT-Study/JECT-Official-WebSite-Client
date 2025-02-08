import Label from '../Label';

interface CalloutProps {
  title: string;
  labels: string[];
}

function CalloutInformation({ title, labels }: CalloutProps) {
  return (
    <div className='bg-surface-deep-dark border-border-assistive-dark gap-xs radius-xs flex items-center border px-(--gap-lg) py-(--gap-xs)'>
      <Label hierarchy='stronger' weight='bold' text={title} textColor='text-object-hero-dark' />
      {labels.map(label => (
        <Label
          hierarchy='normal'
          weight='normal'
          text={label}
          textColor='text-object-neutral-dark'
        />
      ))}
    </div>
  );
}

export default CalloutInformation;
